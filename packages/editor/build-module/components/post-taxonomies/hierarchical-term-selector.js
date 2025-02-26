/**
 * WordPress dependencies
 */
import { __, _n, _x, sprintf } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import { Button, CheckboxControl, TextControl, TreeSelect, withFilters, Flex, FlexItem, SearchControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useDebounce } from '@wordpress/compose';
import { store as coreStore } from '@wordpress/core-data';
import { speak } from '@wordpress/a11y';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { buildTermsTree } from '../../utils/terms';
import { store as editorStore } from '../../store';

/**
 * Module Constants
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_QUERY = {
  per_page: -1,
  orderby: 'name',
  order: 'asc',
  _fields: 'id,name,parent',
  context: 'view'
};
const MIN_TERMS_COUNT_FOR_FILTER = 8;
const EMPTY_ARRAY = [];

/**
 * Sort Terms by Selected.
 *
 * @param {Object[]} termsTree Array of terms in tree format.
 * @param {number[]} terms     Selected terms.
 *
 * @return {Object[]} Sorted array of terms.
 */
export function sortBySelected(termsTree, terms) {
  const treeHasSelection = termTree => {
    if (terms.indexOf(termTree.id) !== -1) {
      return true;
    }
    if (undefined === termTree.children) {
      return false;
    }
    return termTree.children.map(treeHasSelection).filter(child => child).length > 0;
  };
  const termOrChildIsSelected = (termA, termB) => {
    const termASelected = treeHasSelection(termA);
    const termBSelected = treeHasSelection(termB);
    if (termASelected === termBSelected) {
      return 0;
    }
    if (termASelected && !termBSelected) {
      return -1;
    }
    if (!termASelected && termBSelected) {
      return 1;
    }
    return 0;
  };
  const newTermTree = [...termsTree];
  newTermTree.sort(termOrChildIsSelected);
  return newTermTree;
}

/**
 * Find term by parent id or name.
 *
 * @param {Object[]}      terms  Array of Terms.
 * @param {number|string} parent id.
 * @param {string}        name   Term name.
 * @return {Object} Term object.
 */
export function findTerm(terms, parent, name) {
  return terms.find(term => {
    return (!term.parent && !parent || parseInt(term.parent) === parseInt(parent)) && term.name.toLowerCase() === name.toLowerCase();
  });
}

/**
 * Get filter matcher function.
 *
 * @param {string} filterValue Filter value.
 * @return {(function(Object): (Object|boolean))} Matcher function.
 */
export function getFilterMatcher(filterValue) {
  const matchTermsForFilter = originalTerm => {
    if ('' === filterValue) {
      return originalTerm;
    }

    // Shallow clone, because we'll be filtering the term's children and
    // don't want to modify the original term.
    const term = {
      ...originalTerm
    };

    // Map and filter the children, recursive so we deal with grandchildren
    // and any deeper levels.
    if (term.children.length > 0) {
      term.children = term.children.map(matchTermsForFilter).filter(child => child);
    }

    // If the term's name contains the filterValue, or it has children
    // (i.e. some child matched at some point in the tree) then return it.
    if (-1 !== term.name.toLowerCase().indexOf(filterValue.toLowerCase()) || term.children.length > 0) {
      return term;
    }

    // Otherwise, return false. After mapping, the list of terms will need
    // to have false values filtered out.
    return false;
  };
  return matchTermsForFilter;
}

/**
 * Hierarchical term selector.
 *
 * @param {Object} props      Component props.
 * @param {string} props.slug Taxonomy slug.
 * @return {Element}        Hierarchical term selector component.
 */
export function HierarchicalTermSelector({
  slug
}) {
  var _taxonomy$labels$sear, _taxonomy$name;
  const [adding, setAdding] = useState(false);
  const [formName, setFormName] = useState('');
  /**
   * @type {[number|'', Function]}
   */
  const [formParent, setFormParent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filteredTermsTree, setFilteredTermsTree] = useState([]);
  const debouncedSpeak = useDebounce(speak, 500);
  const {
    hasCreateAction,
    hasAssignAction,
    terms,
    loading,
    availableTerms,
    taxonomy
  } = useSelect(select => {
    var _post$_links, _post$_links2;
    const {
      getCurrentPost,
      getEditedPostAttribute
    } = select(editorStore);
    const {
      getTaxonomy,
      getEntityRecords,
      isResolving
    } = select(coreStore);
    const _taxonomy = getTaxonomy(slug);
    const post = getCurrentPost();
    return {
      hasCreateAction: _taxonomy ? (_post$_links = post._links?.['wp:action-create-' + _taxonomy.rest_base]) !== null && _post$_links !== void 0 ? _post$_links : false : false,
      hasAssignAction: _taxonomy ? (_post$_links2 = post._links?.['wp:action-assign-' + _taxonomy.rest_base]) !== null && _post$_links2 !== void 0 ? _post$_links2 : false : false,
      terms: _taxonomy ? getEditedPostAttribute(_taxonomy.rest_base) : EMPTY_ARRAY,
      loading: isResolving('getEntityRecords', ['taxonomy', slug, DEFAULT_QUERY]),
      availableTerms: getEntityRecords('taxonomy', slug, DEFAULT_QUERY) || EMPTY_ARRAY,
      taxonomy: _taxonomy
    };
  }, [slug]);
  const {
    editPost
  } = useDispatch(editorStore);
  const {
    saveEntityRecord
  } = useDispatch(coreStore);
  const availableTermsTree = useMemo(() => sortBySelected(buildTermsTree(availableTerms), terms),
  // Remove `terms` from the dependency list to avoid reordering every time
  // checking or unchecking a term.
  [availableTerms]);
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  if (!hasAssignAction) {
    return null;
  }

  /**
   * Append new term.
   *
   * @param {Object} term Term object.
   * @return {Promise} A promise that resolves to save term object.
   */
  const addTerm = term => {
    return saveEntityRecord('taxonomy', slug, term, {
      throwOnError: true
    });
  };

  /**
   * Update terms for post.
   *
   * @param {number[]} termIds Term ids.
   */
  const onUpdateTerms = termIds => {
    editPost({
      [taxonomy.rest_base]: termIds
    });
  };

  /**
   * Handler for checking term.
   *
   * @param {number} termId
   */
  const onChange = termId => {
    const hasTerm = terms.includes(termId);
    const newTerms = hasTerm ? terms.filter(id => id !== termId) : [...terms, termId];
    onUpdateTerms(newTerms);
  };
  const onChangeFormName = value => {
    setFormName(value);
  };

  /**
   * Handler for changing form parent.
   *
   * @param {number|''} parentId Parent post id.
   */
  const onChangeFormParent = parentId => {
    setFormParent(parentId);
  };
  const onToggleForm = () => {
    setShowForm(!showForm);
  };
  const onAddTerm = async event => {
    var _taxonomy$labels$sing;
    event.preventDefault();
    if (formName === '' || adding) {
      return;
    }

    // Check if the term we are adding already exists.
    const existingTerm = findTerm(availableTerms, formParent, formName);
    if (existingTerm) {
      // If the term we are adding exists but is not selected select it.
      if (!terms.some(term => term === existingTerm.id)) {
        onUpdateTerms([...terms, existingTerm.id]);
      }
      setFormName('');
      setFormParent('');
      return;
    }
    setAdding(true);
    let newTerm;
    try {
      newTerm = await addTerm({
        name: formName,
        parent: formParent ? formParent : undefined
      });
    } catch (error) {
      createErrorNotice(error.message, {
        type: 'snackbar'
      });
      return;
    }
    const defaultName = slug === 'category' ? __('Category') : __('Term');
    const termAddedMessage = sprintf( /* translators: %s: taxonomy name */
    _x('%s added', 'term'), (_taxonomy$labels$sing = taxonomy?.labels?.singular_name) !== null && _taxonomy$labels$sing !== void 0 ? _taxonomy$labels$sing : defaultName);
    speak(termAddedMessage, 'assertive');
    setAdding(false);
    setFormName('');
    setFormParent('');
    onUpdateTerms([...terms, newTerm.id]);
  };
  const setFilter = value => {
    const newFilteredTermsTree = availableTermsTree.map(getFilterMatcher(value)).filter(term => term);
    const getResultCount = termsTree => {
      let count = 0;
      for (let i = 0; i < termsTree.length; i++) {
        count++;
        if (undefined !== termsTree[i].children) {
          count += getResultCount(termsTree[i].children);
        }
      }
      return count;
    };
    setFilterValue(value);
    setFilteredTermsTree(newFilteredTermsTree);
    const resultCount = getResultCount(newFilteredTermsTree);
    const resultsFoundMessage = sprintf( /* translators: %d: number of results */
    _n('%d result found.', '%d results found.', resultCount), resultCount);
    debouncedSpeak(resultsFoundMessage, 'assertive');
  };
  const renderTerms = renderedTerms => {
    return renderedTerms.map(term => {
      return /*#__PURE__*/_jsxs("div", {
        className: "editor-post-taxonomies__hierarchical-terms-choice",
        children: [/*#__PURE__*/_jsx(CheckboxControl, {
          __nextHasNoMarginBottom: true,
          checked: terms.indexOf(term.id) !== -1,
          onChange: () => {
            const termId = parseInt(term.id, 10);
            onChange(termId);
          },
          label: decodeEntities(term.name)
        }), !!term.children.length && /*#__PURE__*/_jsx("div", {
          className: "editor-post-taxonomies__hierarchical-terms-subchoices",
          children: renderTerms(term.children)
        })]
      }, term.id);
    });
  };
  const labelWithFallback = (labelProperty, fallbackIsCategory, fallbackIsNotCategory) => {
    var _taxonomy$labels$labe;
    return (_taxonomy$labels$labe = taxonomy?.labels?.[labelProperty]) !== null && _taxonomy$labels$labe !== void 0 ? _taxonomy$labels$labe : slug === 'category' ? fallbackIsCategory : fallbackIsNotCategory;
  };
  const newTermButtonLabel = labelWithFallback('add_new_item', __('Add new category'), __('Add new term'));
  const newTermLabel = labelWithFallback('new_item_name', __('Add new category'), __('Add new term'));
  const parentSelectLabel = labelWithFallback('parent_item', __('Parent Category'), __('Parent Term'));
  const noParentOption = `— ${parentSelectLabel} —`;
  const newTermSubmitLabel = newTermButtonLabel;
  const filterLabel = (_taxonomy$labels$sear = taxonomy?.labels?.search_items) !== null && _taxonomy$labels$sear !== void 0 ? _taxonomy$labels$sear : __('Search Terms');
  const groupLabel = (_taxonomy$name = taxonomy?.name) !== null && _taxonomy$name !== void 0 ? _taxonomy$name : __('Terms');
  const showFilter = availableTerms.length >= MIN_TERMS_COUNT_FOR_FILTER;
  return /*#__PURE__*/_jsxs(Flex, {
    direction: "column",
    gap: "4",
    children: [showFilter && /*#__PURE__*/_jsx(SearchControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: filterLabel,
      value: filterValue,
      onChange: setFilter
    }), /*#__PURE__*/_jsx("div", {
      className: "editor-post-taxonomies__hierarchical-terms-list",
      tabIndex: "0",
      role: "group",
      "aria-label": groupLabel,
      children: renderTerms('' !== filterValue ? filteredTermsTree : availableTermsTree)
    }), !loading && hasCreateAction && /*#__PURE__*/_jsx(FlexItem, {
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        onClick: onToggleForm,
        className: "editor-post-taxonomies__hierarchical-terms-add",
        "aria-expanded": showForm,
        variant: "link",
        children: newTermButtonLabel
      })
    }), showForm && /*#__PURE__*/_jsx("form", {
      onSubmit: onAddTerm,
      children: /*#__PURE__*/_jsxs(Flex, {
        direction: "column",
        gap: "4",
        children: [/*#__PURE__*/_jsx(TextControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          className: "editor-post-taxonomies__hierarchical-terms-input",
          label: newTermLabel,
          value: formName,
          onChange: onChangeFormName,
          required: true
        }), !!availableTerms.length && /*#__PURE__*/_jsx(TreeSelect, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: parentSelectLabel,
          noOptionLabel: noParentOption,
          onChange: onChangeFormParent,
          selectedId: formParent,
          tree: availableTermsTree
        }), /*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "secondary",
            type: "submit",
            className: "editor-post-taxonomies__hierarchical-terms-submit",
            children: newTermSubmitLabel
          })
        })]
      })
    })]
  });
}
export default withFilters('editor.PostTaxonomyType')(HierarchicalTermSelector);
//# sourceMappingURL=hierarchical-term-selector.js.map
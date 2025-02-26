/**
 * WordPress dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { FormTokenField, withFilters } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import deprecated from '@wordpress/deprecated';
import { store as coreStore } from '@wordpress/core-data';
import { useDebounce } from '@wordpress/compose';
import { speak } from '@wordpress/a11y';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { unescapeString, unescapeTerm } from '../../utils/terms';
import MostUsedTerms from './most-used-terms';

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation.
 *
 * @type {Array<any>}
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_ARRAY = [];

/**
 * How the max suggestions limit was chosen:
 *  - Matches the `per_page` range set by the REST API.
 *  - Can't use "unbound" query. The `FormTokenField` needs a fixed number.
 *  - Matches default for `FormTokenField`.
 */
const MAX_TERMS_SUGGESTIONS = 100;
const DEFAULT_QUERY = {
  per_page: MAX_TERMS_SUGGESTIONS,
  _fields: 'id,name',
  context: 'view'
};
const isSameTermName = (termA, termB) => unescapeString(termA).toLowerCase() === unescapeString(termB).toLowerCase();
const termNamesToIds = (names, terms) => {
  return names.map(termName => terms.find(term => isSameTermName(term.name, termName))?.id).filter(id => id !== undefined);
};

/**
 * Renders a flat term selector component.
 *
 * @param {Object}  props                         The component props.
 * @param {string}  props.slug                    The slug of the taxonomy.
 * @param {boolean} props.__nextHasNoMarginBottom Start opting into the new margin-free styles that will become the default in a future version, currently scheduled to be WordPress 7.0. (The prop can be safely removed once this happens.)
 *
 * @return {JSX.Element} The rendered flat term selector component.
 */
export function FlatTermSelector({
  slug,
  __nextHasNoMarginBottom
}) {
  var _taxonomy$labels$add_, _taxonomy$labels$sing2;
  const [values, setValues] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(setSearch, 500);
  if (!__nextHasNoMarginBottom) {
    deprecated('Bottom margin styles for wp.editor.PostTaxonomiesFlatTermSelector', {
      since: '6.7',
      version: '7.0',
      hint: 'Set the `__nextHasNoMarginBottom` prop to true to start opting into the new styles, which will become the default in a future version.'
    });
  }
  const {
    terms,
    termIds,
    taxonomy,
    hasAssignAction,
    hasCreateAction,
    hasResolvedTerms
  } = useSelect(select => {
    var _post$_links, _post$_links2;
    const {
      getCurrentPost,
      getEditedPostAttribute
    } = select(editorStore);
    const {
      getEntityRecords,
      getTaxonomy,
      hasFinishedResolution
    } = select(coreStore);
    const post = getCurrentPost();
    const _taxonomy = getTaxonomy(slug);
    const _termIds = _taxonomy ? getEditedPostAttribute(_taxonomy.rest_base) : EMPTY_ARRAY;
    const query = {
      ...DEFAULT_QUERY,
      include: _termIds?.join(','),
      per_page: -1
    };
    return {
      hasCreateAction: _taxonomy ? (_post$_links = post._links?.['wp:action-create-' + _taxonomy.rest_base]) !== null && _post$_links !== void 0 ? _post$_links : false : false,
      hasAssignAction: _taxonomy ? (_post$_links2 = post._links?.['wp:action-assign-' + _taxonomy.rest_base]) !== null && _post$_links2 !== void 0 ? _post$_links2 : false : false,
      taxonomy: _taxonomy,
      termIds: _termIds,
      terms: _termIds?.length ? getEntityRecords('taxonomy', slug, query) : EMPTY_ARRAY,
      hasResolvedTerms: hasFinishedResolution('getEntityRecords', ['taxonomy', slug, query])
    };
  }, [slug]);
  const {
    searchResults
  } = useSelect(select => {
    const {
      getEntityRecords
    } = select(coreStore);
    return {
      searchResults: !!search ? getEntityRecords('taxonomy', slug, {
        ...DEFAULT_QUERY,
        search
      }) : EMPTY_ARRAY
    };
  }, [search, slug]);

  // Update terms state only after the selectors are resolved.
  // We're using this to avoid terms temporarily disappearing on slow networks
  // while core data makes REST API requests.
  useEffect(() => {
    if (hasResolvedTerms) {
      const newValues = (terms !== null && terms !== void 0 ? terms : []).map(term => unescapeString(term.name));
      setValues(newValues);
    }
  }, [terms, hasResolvedTerms]);
  const suggestions = useMemo(() => {
    return (searchResults !== null && searchResults !== void 0 ? searchResults : []).map(term => unescapeString(term.name));
  }, [searchResults]);
  const {
    editPost
  } = useDispatch(editorStore);
  const {
    saveEntityRecord
  } = useDispatch(coreStore);
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  if (!hasAssignAction) {
    return null;
  }
  async function findOrCreateTerm(term) {
    try {
      const newTerm = await saveEntityRecord('taxonomy', slug, term, {
        throwOnError: true
      });
      return unescapeTerm(newTerm);
    } catch (error) {
      if (error.code !== 'term_exists') {
        throw error;
      }
      return {
        id: error.data.term_id,
        name: term.name
      };
    }
  }
  function onUpdateTerms(newTermIds) {
    editPost({
      [taxonomy.rest_base]: newTermIds
    });
  }
  function onChange(termNames) {
    const availableTerms = [...(terms !== null && terms !== void 0 ? terms : []), ...(searchResults !== null && searchResults !== void 0 ? searchResults : [])];
    const uniqueTerms = termNames.reduce((acc, name) => {
      if (!acc.some(n => n.toLowerCase() === name.toLowerCase())) {
        acc.push(name);
      }
      return acc;
    }, []);
    const newTermNames = uniqueTerms.filter(termName => !availableTerms.find(term => isSameTermName(term.name, termName)));

    // Optimistically update term values.
    // The selector will always re-fetch terms later.
    setValues(uniqueTerms);
    if (newTermNames.length === 0) {
      onUpdateTerms(termNamesToIds(uniqueTerms, availableTerms));
      return;
    }
    if (!hasCreateAction) {
      return;
    }
    Promise.all(newTermNames.map(termName => findOrCreateTerm({
      name: termName
    }))).then(newTerms => {
      const newAvailableTerms = availableTerms.concat(newTerms);
      onUpdateTerms(termNamesToIds(uniqueTerms, newAvailableTerms));
    }).catch(error => {
      createErrorNotice(error.message, {
        type: 'snackbar'
      });
      // In case of a failure, try assigning available terms.
      // This will invalidate the optimistic update.
      onUpdateTerms(termNamesToIds(uniqueTerms, availableTerms));
    });
  }
  function appendTerm(newTerm) {
    var _taxonomy$labels$sing;
    if (termIds.includes(newTerm.id)) {
      return;
    }
    const newTermIds = [...termIds, newTerm.id];
    const defaultName = slug === 'post_tag' ? __('Tag') : __('Term');
    const termAddedMessage = sprintf( /* translators: %s: term name. */
    _x('%s added', 'term'), (_taxonomy$labels$sing = taxonomy?.labels?.singular_name) !== null && _taxonomy$labels$sing !== void 0 ? _taxonomy$labels$sing : defaultName);
    speak(termAddedMessage, 'assertive');
    onUpdateTerms(newTermIds);
  }
  const newTermLabel = (_taxonomy$labels$add_ = taxonomy?.labels?.add_new_item) !== null && _taxonomy$labels$add_ !== void 0 ? _taxonomy$labels$add_ : slug === 'post_tag' ? __('Add new tag') : __('Add new Term');
  const singularName = (_taxonomy$labels$sing2 = taxonomy?.labels?.singular_name) !== null && _taxonomy$labels$sing2 !== void 0 ? _taxonomy$labels$sing2 : slug === 'post_tag' ? __('Tag') : __('Term');
  const termAddedLabel = sprintf( /* translators: %s: term name. */
  _x('%s added', 'term'), singularName);
  const termRemovedLabel = sprintf( /* translators: %s: term name. */
  _x('%s removed', 'term'), singularName);
  const removeTermLabel = sprintf( /* translators: %s: term name. */
  _x('Remove %s', 'term'), singularName);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(FormTokenField, {
      __next40pxDefaultSize: true,
      value: values,
      suggestions: suggestions,
      onChange: onChange,
      onInputChange: debouncedSearch,
      maxSuggestions: MAX_TERMS_SUGGESTIONS,
      label: newTermLabel,
      messages: {
        added: termAddedLabel,
        removed: termRemovedLabel,
        remove: removeTermLabel
      },
      __nextHasNoMarginBottom: __nextHasNoMarginBottom
    }), /*#__PURE__*/_jsx(MostUsedTerms, {
      taxonomy: taxonomy,
      onSelect: appendTerm
    })]
  });
}
export default withFilters('editor.PostTaxonomyType')(FlatTermSelector);
//# sourceMappingURL=flat-term-selector.js.map
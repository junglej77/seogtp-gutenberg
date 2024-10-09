/**
 * WordPress dependencies
 */
import { useState, useMemo, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Flex, FlexItem, SearchControl, TextHighlight, Composite, __experimentalText as Text, __experimentalVStack as VStack } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { useDebouncedInput } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { mapToIHasNameAndId } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
function SuggestionListItem({
  suggestion,
  search,
  onSelect,
  entityForSuggestions
}) {
  const baseCssClass = 'edit-site-custom-template-modal__suggestions_list__list-item';
  return /*#__PURE__*/_jsxs(Composite.Item, {
    render: /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      role: "option",
      className: baseCssClass,
      onClick: () => onSelect(entityForSuggestions.config.getSpecificTemplate(suggestion))
    }),
    children: [/*#__PURE__*/_jsx(Text, {
      size: "body",
      lineHeight: 1.53846153846 // 20px
      ,
      weight: 500,
      className: `${baseCssClass}__title`,
      children: /*#__PURE__*/_jsx(TextHighlight, {
        text: decodeEntities(suggestion.name),
        highlight: search
      })
    }), suggestion.link && /*#__PURE__*/_jsx(Text, {
      size: "body",
      lineHeight: 1.53846153846 // 20px
      ,
      className: `${baseCssClass}__info`,
      children: suggestion.link
    })]
  });
}
function useSearchSuggestions(entityForSuggestions, search) {
  const {
    config
  } = entityForSuggestions;
  const query = useMemo(() => ({
    order: 'asc',
    context: 'view',
    search,
    per_page: search ? 20 : 10,
    ...config.queryArgs(search)
  }), [search, config]);
  const {
    records: searchResults,
    hasResolved: searchHasResolved
  } = useEntityRecords(entityForSuggestions.type, entityForSuggestions.slug, query);
  const [suggestions, setSuggestions] = useState(EMPTY_ARRAY);
  useEffect(() => {
    if (!searchHasResolved) {
      return;
    }
    let newSuggestions = EMPTY_ARRAY;
    if (searchResults?.length) {
      newSuggestions = searchResults;
      if (config.recordNamePath) {
        newSuggestions = mapToIHasNameAndId(newSuggestions, config.recordNamePath);
      }
    }
    // Update suggestions only when the query has resolved, so as to keep
    // the previous results in the UI.
    setSuggestions(newSuggestions);
  }, [searchResults, searchHasResolved]);
  return suggestions;
}
function SuggestionList({
  entityForSuggestions,
  onSelect
}) {
  const [search, setSearch, debouncedSearch] = useDebouncedInput();
  const suggestions = useSearchSuggestions(entityForSuggestions, debouncedSearch);
  const {
    labels
  } = entityForSuggestions;
  const [showSearchControl, setShowSearchControl] = useState(false);
  if (!showSearchControl && suggestions?.length > 9) {
    setShowSearchControl(true);
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [showSearchControl && /*#__PURE__*/_jsx(SearchControl, {
      __nextHasNoMarginBottom: true,
      onChange: setSearch,
      value: search,
      label: labels.search_items,
      placeholder: labels.search_items
    }), !!suggestions?.length && /*#__PURE__*/_jsx(Composite, {
      orientation: "vertical",
      role: "listbox",
      className: "edit-site-custom-template-modal__suggestions_list",
      "aria-label": __('Suggestions list'),
      children: suggestions.map(suggestion => /*#__PURE__*/_jsx(SuggestionListItem, {
        suggestion: suggestion,
        search: debouncedSearch,
        onSelect: onSelect,
        entityForSuggestions: entityForSuggestions
      }, suggestion.slug))
    }), debouncedSearch && !suggestions?.length && /*#__PURE__*/_jsx(Text, {
      as: "p",
      className: "edit-site-custom-template-modal__no-results",
      children: labels.not_found
    })]
  });
}
function AddCustomTemplateModalContent({
  onSelect,
  entityForSuggestions
}) {
  const [showSearchEntities, setShowSearchEntities] = useState(entityForSuggestions.hasGeneralTemplate);
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 4,
    className: "edit-site-custom-template-modal__contents-wrapper",
    alignment: "left",
    children: [!showSearchEntities && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Text, {
        as: "p",
        children: __('Select whether to create a single template for all items or a specific one.')
      }), /*#__PURE__*/_jsxs(Flex, {
        className: "edit-site-custom-template-modal__contents",
        gap: "4",
        align: "initial",
        children: [/*#__PURE__*/_jsxs(FlexItem, {
          isBlock: true,
          as: Button,
          onClick: () => {
            const {
              slug,
              title,
              description,
              templatePrefix
            } = entityForSuggestions.template;
            onSelect({
              slug,
              title,
              description,
              templatePrefix
            });
          },
          children: [/*#__PURE__*/_jsx(Text, {
            as: "span",
            weight: 500,
            lineHeight: 1.53846153846 // 20px
            ,
            children: entityForSuggestions.labels.all_items
          }), /*#__PURE__*/_jsx(Text, {
            as: "span",
            lineHeight: 1.53846153846 // 20px
            ,
            children:
            // translators: The user is given the choice to set up a template for all items of a post type or taxonomy, or just a specific one.
            __('For all items')
          })]
        }), /*#__PURE__*/_jsxs(FlexItem, {
          isBlock: true,
          as: Button,
          onClick: () => {
            setShowSearchEntities(true);
          },
          children: [/*#__PURE__*/_jsx(Text, {
            as: "span",
            weight: 500,
            lineHeight: 1.53846153846 // 20px
            ,
            children: entityForSuggestions.labels.singular_name
          }), /*#__PURE__*/_jsx(Text, {
            as: "span",
            lineHeight: 1.53846153846 // 20px
            ,
            children:
            // translators: The user is given the choice to set up a template for all items of a post type or taxonomy, or just a specific one.
            __('For a specific item')
          })]
        })]
      })]
    }), showSearchEntities && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Text, {
        as: "p",
        children: __('This template will be used only for the specific item chosen.')
      }), /*#__PURE__*/_jsx(SuggestionList, {
        entityForSuggestions: entityForSuggestions,
        onSelect: onSelect
      })]
    })]
  });
}
export default AddCustomTemplateModalContent;
//# sourceMappingURL=add-custom-template-modal-content.js.map
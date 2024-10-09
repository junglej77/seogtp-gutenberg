/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, SelectControl, RangeControl, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption, Notice, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { debounce } from '@wordpress/compose';
import { useEffect, useState, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import OrderControl from './order-control';
import AuthorControl from './author-control';
import ParentControl from './parent-control';
import { TaxonomyControls } from './taxonomy-controls';
import StickyControl from './sticky-control';
import CreateNewPostLink from './create-new-post-link';
import PerPageControl from './per-page-control';
import OffsetControl from './offset-controls';
import PagesControl from './pages-control';
import { unlock } from '../../../lock-unlock';
import { usePostTypes, useIsPostTypeHierarchical, useAllowedControls, isControlAllowed, useTaxonomies } from '../../utils';
import { useToolsPanelDropdownMenuProps } from '../../../utils/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  BlockInfo
} = unlock(blockEditorPrivateApis);
export default function QueryInspectorControls(props) {
  const {
    attributes,
    setQuery,
    setDisplayLayout
  } = props;
  const {
    query,
    displayLayout
  } = attributes;
  const {
    order,
    orderBy,
    author: authorIds,
    pages,
    postType,
    perPage,
    offset,
    sticky,
    inherit,
    taxQuery,
    parents
  } = query;
  const allowedControls = useAllowedControls(attributes);
  const [showSticky, setShowSticky] = useState(postType === 'post');
  const {
    postTypesTaxonomiesMap,
    postTypesSelectOptions
  } = usePostTypes();
  const taxonomies = useTaxonomies(postType);
  const isPostTypeHierarchical = useIsPostTypeHierarchical(postType);
  useEffect(() => {
    setShowSticky(postType === 'post');
  }, [postType]);
  const onPostTypeChange = newValue => {
    const updateQuery = {
      postType: newValue
    };
    // We need to dynamically update the `taxQuery` property,
    // by removing any not supported taxonomy from the query.
    const supportedTaxonomies = postTypesTaxonomiesMap[newValue];
    const updatedTaxQuery = Object.entries(taxQuery || {}).reduce((accumulator, [taxonomySlug, terms]) => {
      if (supportedTaxonomies.includes(taxonomySlug)) {
        accumulator[taxonomySlug] = terms;
      }
      return accumulator;
    }, {});
    updateQuery.taxQuery = !!Object.keys(updatedTaxQuery).length ? updatedTaxQuery : undefined;
    if (newValue !== 'post') {
      updateQuery.sticky = '';
    }
    // We need to reset `parents` because they are tied to each post type.
    updateQuery.parents = [];
    setQuery(updateQuery);
  };
  const [querySearch, setQuerySearch] = useState(query.search);
  const onChangeDebounced = useCallback(debounce(() => {
    if (query.search !== querySearch) {
      setQuery({
        search: querySearch
      });
    }
  }, 250), [querySearch, query.search]);
  useEffect(() => {
    onChangeDebounced();
    return onChangeDebounced.cancel;
  }, [querySearch, onChangeDebounced]);
  const showInheritControl = isControlAllowed(allowedControls, 'inherit');
  const showPostTypeControl = !inherit && isControlAllowed(allowedControls, 'postType');
  const postTypeControlLabel = __('Post type');
  const postTypeControlHelp = __('Select the type of content to display: posts, pages, or custom post types.');
  const showColumnsControl = false;
  const showOrderControl = !inherit && isControlAllowed(allowedControls, 'order');
  const showStickyControl = !inherit && showSticky && isControlAllowed(allowedControls, 'sticky');
  const showSettingsPanel = showInheritControl || showPostTypeControl || showColumnsControl || showOrderControl || showStickyControl;
  const showTaxControl = !!taxonomies?.length && isControlAllowed(allowedControls, 'taxQuery');
  const showAuthorControl = isControlAllowed(allowedControls, 'author');
  const showSearchControl = isControlAllowed(allowedControls, 'search');
  const showParentControl = isControlAllowed(allowedControls, 'parents') && isPostTypeHierarchical;
  const showFiltersPanel = showTaxControl || showAuthorControl || showSearchControl || showParentControl;
  const dropdownMenuProps = useToolsPanelDropdownMenuProps();
  const showPostCountControl = isControlAllowed(allowedControls, 'postCount');
  const showOffSetControl = isControlAllowed(allowedControls, 'offset');
  const showPagesControl = isControlAllowed(allowedControls, 'pages');
  const showDisplayPanel = showPostCountControl || showOffSetControl || showPagesControl;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!!postType && /*#__PURE__*/_jsx(BlockInfo, {
      children: /*#__PURE__*/_jsx(CreateNewPostLink, {
        postType: postType
      })
    }), showSettingsPanel && /*#__PURE__*/_jsxs(PanelBody, {
      title: __('Settings'),
      children: [showInheritControl && /*#__PURE__*/_jsxs(ToggleGroupControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Query type'),
        isBlock: true,
        onChange: value => {
          setQuery({
            inherit: !!value
          });
        },
        help: inherit ? __('Display a list of posts or custom post types based on the current template.') : __('Display a list of posts or custom post types based on specific criteria.'),
        value: !!inherit,
        children: [/*#__PURE__*/_jsx(ToggleGroupControlOption, {
          value: true,
          label: __('Default')
        }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
          value: false,
          label: __('Custom')
        })]
      }), showPostTypeControl && (postTypesSelectOptions.length > 2 ? /*#__PURE__*/_jsx(SelectControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        options: postTypesSelectOptions,
        value: postType,
        label: postTypeControlLabel,
        onChange: onPostTypeChange,
        help: postTypeControlHelp
      }) : /*#__PURE__*/_jsx(ToggleGroupControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        isBlock: true,
        value: postType,
        label: postTypeControlLabel,
        onChange: onPostTypeChange,
        help: postTypeControlHelp,
        children: postTypesSelectOptions.map(option => /*#__PURE__*/_jsx(ToggleGroupControlOption, {
          value: option.value,
          label: option.label
        }, option.value))
      })), showColumnsControl && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Columns'),
          value: displayLayout.columns,
          onChange: value => setDisplayLayout({
            columns: value
          }),
          min: 2,
          max: Math.max(6, displayLayout.columns)
        }), displayLayout.columns > 6 && /*#__PURE__*/_jsx(Notice, {
          status: "warning",
          isDismissible: false,
          children: __('This column count exceeds the recommended amount and may cause visual breakage.')
        })]
      }), showOrderControl && /*#__PURE__*/_jsx(OrderControl, {
        order,
        orderBy,
        onChange: setQuery
      }), showStickyControl && /*#__PURE__*/_jsx(StickyControl, {
        value: sticky,
        onChange: value => setQuery({
          sticky: value
        })
      })]
    }), !inherit && showDisplayPanel && /*#__PURE__*/_jsxs(ToolsPanel, {
      className: "block-library-query-toolspanel__display",
      label: __('Display'),
      resetAll: () => {
        setQuery({
          offset: 0,
          pages: 0
        });
      },
      dropdownMenuProps: dropdownMenuProps,
      children: [/*#__PURE__*/_jsx(ToolsPanelItem, {
        label: __('Items'),
        hasValue: () => perPage > 0,
        children: /*#__PURE__*/_jsx(PerPageControl, {
          perPage: perPage,
          offset: offset,
          onChange: setQuery
        })
      }), /*#__PURE__*/_jsx(ToolsPanelItem, {
        label: __('Offset'),
        hasValue: () => offset > 0,
        onDeselect: () => setQuery({
          offset: 0
        }),
        children: /*#__PURE__*/_jsx(OffsetControl, {
          offset: offset,
          onChange: setQuery
        })
      }), /*#__PURE__*/_jsx(ToolsPanelItem, {
        label: __('Max Pages to Show'),
        hasValue: () => pages > 0,
        onDeselect: () => setQuery({
          pages: 0
        }),
        children: /*#__PURE__*/_jsx(PagesControl, {
          pages: pages,
          onChange: setQuery
        })
      })]
    }), !inherit && showFiltersPanel && /*#__PURE__*/_jsxs(ToolsPanel, {
      className: "block-library-query-toolspanel__filters" // unused but kept for backward compatibility
      ,
      label: __('Filters'),
      resetAll: () => {
        setQuery({
          author: '',
          parents: [],
          search: '',
          taxQuery: null
        });
        setQuerySearch('');
      },
      dropdownMenuProps: dropdownMenuProps,
      children: [showTaxControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
        label: __('Taxonomies'),
        hasValue: () => Object.values(taxQuery || {}).some(terms => !!terms.length),
        onDeselect: () => setQuery({
          taxQuery: null
        }),
        children: /*#__PURE__*/_jsx(TaxonomyControls, {
          onChange: setQuery,
          query: query
        })
      }), showAuthorControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
        hasValue: () => !!authorIds,
        label: __('Authors'),
        onDeselect: () => setQuery({
          author: ''
        }),
        children: /*#__PURE__*/_jsx(AuthorControl, {
          value: authorIds,
          onChange: setQuery
        })
      }), showSearchControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
        hasValue: () => !!querySearch,
        label: __('Keyword'),
        onDeselect: () => setQuerySearch(''),
        children: /*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Keyword'),
          value: querySearch,
          onChange: setQuerySearch
        })
      }), showParentControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
        hasValue: () => !!parents?.length,
        label: __('Parents'),
        onDeselect: () => setQuery({
          parents: []
        }),
        children: /*#__PURE__*/_jsx(ParentControl, {
          parents: parents,
          postType: postType,
          onChange: setQuery
        })
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map
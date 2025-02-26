/**
 * WordPress dependencies
 */
import { Spinner, SearchControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDebouncedInput } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import MediaList from './media-list';
import { useMediaResults } from './hooks';
import InserterNoResults from '../no-results';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const INITIAL_MEDIA_ITEMS_PER_PAGE = 10;
export function MediaCategoryPanel({
  rootClientId,
  onInsert,
  category
}) {
  const [search, setSearch, debouncedSearch] = useDebouncedInput();
  const {
    mediaList,
    isLoading
  } = useMediaResults(category, {
    per_page: !!debouncedSearch ? 20 : INITIAL_MEDIA_ITEMS_PER_PAGE,
    search: debouncedSearch
  });
  const baseCssClass = 'block-editor-inserter__media-panel';
  const searchLabel = category.labels.search_items || __('Search');
  return /*#__PURE__*/_jsxs("div", {
    className: baseCssClass,
    children: [/*#__PURE__*/_jsx(SearchControl, {
      __nextHasNoMarginBottom: true,
      className: `${baseCssClass}-search`,
      onChange: setSearch,
      value: search,
      label: searchLabel,
      placeholder: searchLabel
    }), isLoading && /*#__PURE__*/_jsx("div", {
      className: `${baseCssClass}-spinner`,
      children: /*#__PURE__*/_jsx(Spinner, {})
    }), !isLoading && !mediaList?.length && /*#__PURE__*/_jsx(InserterNoResults, {}), !isLoading && !!mediaList?.length && /*#__PURE__*/_jsx(MediaList, {
      rootClientId: rootClientId,
      onClick: onInsert,
      mediaList: mediaList,
      category: category
    })]
  });
}
//# sourceMappingURL=media-panel.js.map
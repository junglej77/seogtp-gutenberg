/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, memo, useContext } from '@wordpress/element';
import { SearchControl } from '@wordpress/components';
import { useDebouncedInput } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import DataViewsContext from '../dataviews-context';
import { jsx as _jsx } from "react/jsx-runtime";
const DataViewsSearch = memo(function Search({
  label
}) {
  const {
    view,
    onChangeView
  } = useContext(DataViewsContext);
  const [search, setSearch, debouncedSearch] = useDebouncedInput(view.search);
  useEffect(() => {
    var _view$search;
    setSearch((_view$search = view.search) !== null && _view$search !== void 0 ? _view$search : '');
  }, [view.search, setSearch]);
  const onChangeViewRef = useRef(onChangeView);
  const viewRef = useRef(view);
  useEffect(() => {
    onChangeViewRef.current = onChangeView;
    viewRef.current = view;
  }, [onChangeView, view]);
  useEffect(() => {
    if (debouncedSearch !== viewRef.current?.search) {
      onChangeViewRef.current({
        ...viewRef.current,
        page: 1,
        search: debouncedSearch
      });
    }
  }, [debouncedSearch]);
  const searchLabel = label || __('Search');
  return /*#__PURE__*/_jsx(SearchControl, {
    className: "dataviews-search",
    __nextHasNoMarginBottom: true,
    onChange: setSearch,
    value: search,
    label: searchLabel,
    placeholder: searchLabel,
    size: "compact"
  });
});
export default DataViewsSearch;
//# sourceMappingURL=index.js.map
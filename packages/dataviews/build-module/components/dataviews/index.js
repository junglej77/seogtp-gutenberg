/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack } from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import DataViewsContext from '../dataviews-context';
import { default as DataViewsFilters, useFilters, FilterVisibilityToggle } from '../dataviews-filters';
import DataViewsLayout from '../dataviews-layout';
import DataViewsFooter from '../dataviews-footer';
import DataViewsSearch from '../dataviews-search';
import DataViewsViewConfig from '../dataviews-view-config';
import { normalizeFields } from '../../normalize-fields';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const defaultGetItemId = item => item.id;
export default function DataViews({
  view,
  onChangeView,
  fields,
  search = true,
  searchLabel = undefined,
  actions = [],
  data,
  getItemId = defaultGetItemId,
  isLoading = false,
  paginationInfo,
  defaultLayouts,
  selection: selectionProperty,
  onChangeSelection,
  header
}) {
  const [selectionState, setSelectionState] = useState([]);
  const [density, setDensity] = useState(0);
  const isUncontrolled = selectionProperty === undefined || onChangeSelection === undefined;
  const selection = isUncontrolled ? selectionState : selectionProperty;
  const [openedFilter, setOpenedFilter] = useState(null);
  function setSelectionWithChange(value) {
    const newValue = typeof value === 'function' ? value(selection) : value;
    if (isUncontrolled) {
      setSelectionState(newValue);
    }
    if (onChangeSelection) {
      onChangeSelection(newValue);
    }
  }
  const _fields = useMemo(() => normalizeFields(fields), [fields]);
  const _selection = useMemo(() => {
    return selection.filter(id => data.some(item => getItemId(item) === id));
  }, [selection, data, getItemId]);
  const filters = useFilters(_fields, view);
  const [isShowingFilter, setIsShowingFilter] = useState(() => (filters || []).some(filter => filter.isPrimary));
  return /*#__PURE__*/_jsx(DataViewsContext.Provider, {
    value: {
      view,
      onChangeView,
      fields: _fields,
      actions,
      data,
      isLoading,
      paginationInfo,
      selection: _selection,
      onChangeSelection: setSelectionWithChange,
      openedFilter,
      setOpenedFilter,
      getItemId,
      density
    },
    children: /*#__PURE__*/_jsxs("div", {
      className: "dataviews-wrapper",
      children: [/*#__PURE__*/_jsxs(HStack, {
        alignment: "top",
        justify: "space-between",
        className: "dataviews__view-actions",
        spacing: 1,
        children: [/*#__PURE__*/_jsxs(HStack, {
          justify: "start",
          expanded: false,
          className: "dataviews__search",
          children: [search && /*#__PURE__*/_jsx(DataViewsSearch, {
            label: searchLabel
          }), /*#__PURE__*/_jsx(FilterVisibilityToggle, {
            filters: filters,
            view: view,
            onChangeView: onChangeView,
            setOpenedFilter: setOpenedFilter,
            setIsShowingFilter: setIsShowingFilter,
            isShowingFilter: isShowingFilter
          })]
        }), /*#__PURE__*/_jsxs(HStack, {
          spacing: 1,
          expanded: false,
          style: {
            flexShrink: 0
          },
          children: [/*#__PURE__*/_jsx(DataViewsViewConfig, {
            defaultLayouts: defaultLayouts,
            density: density,
            setDensity: setDensity
          }), header]
        })]
      }), isShowingFilter && /*#__PURE__*/_jsx(DataViewsFilters, {}), /*#__PURE__*/_jsx(DataViewsLayout, {}), /*#__PURE__*/_jsx(DataViewsFooter, {})]
    })
  });
}
//# sourceMappingURL=index.js.map
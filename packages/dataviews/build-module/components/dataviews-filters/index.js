/**
 * WordPress dependencies
 */
import { memo, useContext, useRef, useMemo, useCallback } from '@wordpress/element';
import { __experimentalHStack as HStack, Button } from '@wordpress/components';
import { funnel } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import FilterSummary from './filter-summary';
import { default as AddFilter, AddFilterDropdownMenu } from './add-filter';
import ResetFilters from './reset-filters';
import DataViewsContext from '../dataviews-context';
import { sanitizeOperators } from '../../utils';
import { ALL_OPERATORS, OPERATOR_IS, OPERATOR_IS_NOT } from '../../constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function useFilters(fields, view) {
  return useMemo(() => {
    const filters = [];
    fields.forEach(field => {
      if (!field.elements?.length) {
        return;
      }
      const operators = sanitizeOperators(field);
      if (operators.length === 0) {
        return;
      }
      const isPrimary = !!field.filterBy?.isPrimary;
      filters.push({
        field: field.id,
        name: field.label,
        elements: field.elements,
        singleSelection: operators.some(op => [OPERATOR_IS, OPERATOR_IS_NOT].includes(op)),
        operators,
        isVisible: isPrimary || !!view.filters?.some(f => f.field === field.id && ALL_OPERATORS.includes(f.operator)),
        isPrimary
      });
    });
    // Sort filters by primary property. We need the primary filters to be first.
    // Then we sort by name.
    filters.sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) {
        return -1;
      }
      if (!a.isPrimary && b.isPrimary) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    return filters;
  }, [fields, view]);
}
export function FilterVisibilityToggle({
  filters,
  view,
  onChangeView,
  setOpenedFilter,
  isShowingFilter,
  setIsShowingFilter
}) {
  const onChangeViewWithFilterVisibility = useCallback(_view => {
    onChangeView(_view);
    setIsShowingFilter(true);
  }, [onChangeView, setIsShowingFilter]);
  const visibleFilters = filters.filter(filter => filter.isVisible);
  const hasVisibleFilters = !!visibleFilters.length;
  if (filters.length === 0) {
    return null;
  }
  if (!hasVisibleFilters) {
    return /*#__PURE__*/_jsx(AddFilterDropdownMenu, {
      filters: filters,
      view: view,
      onChangeView: onChangeViewWithFilterVisibility,
      setOpenedFilter: setOpenedFilter,
      trigger: /*#__PURE__*/_jsx(Button, {
        className: "dataviews-filters__visibility-toggle",
        size: "compact",
        icon: funnel,
        label: __('Add filter'),
        isPressed: false,
        "aria-expanded": false
      })
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "dataviews-filters__container-visibility-toggle",
    children: [/*#__PURE__*/_jsx(Button, {
      className: "dataviews-filters__visibility-toggle",
      size: "compact",
      icon: funnel,
      label: __('Toggle filter display'),
      onClick: () => {
        if (!isShowingFilter) {
          setOpenedFilter(null);
        }
        setIsShowingFilter(!isShowingFilter);
      },
      isPressed: isShowingFilter,
      "aria-expanded": isShowingFilter
    }), hasVisibleFilters && !!view.filters?.length && /*#__PURE__*/_jsx("span", {
      className: "dataviews-filters-toggle__count",
      children: view.filters?.length
    })]
  });
}
function Filters() {
  const {
    fields,
    view,
    onChangeView,
    openedFilter,
    setOpenedFilter
  } = useContext(DataViewsContext);
  const addFilterRef = useRef(null);
  const filters = useFilters(fields, view);
  const addFilter = /*#__PURE__*/_jsx(AddFilter, {
    filters: filters,
    view: view,
    onChangeView: onChangeView,
    ref: addFilterRef,
    setOpenedFilter: setOpenedFilter
  }, "add-filter");
  const visibleFilters = filters.filter(filter => filter.isVisible);
  if (visibleFilters.length === 0) {
    return null;
  }
  const filterComponents = [...visibleFilters.map(filter => {
    return /*#__PURE__*/_jsx(FilterSummary, {
      filter: filter,
      view: view,
      onChangeView: onChangeView,
      addFilterRef: addFilterRef,
      openedFilter: openedFilter
    }, filter.field);
  }), addFilter];
  filterComponents.push( /*#__PURE__*/_jsx(ResetFilters, {
    filters: filters,
    view: view,
    onChangeView: onChangeView
  }, "reset-filters"));
  return /*#__PURE__*/_jsx(HStack, {
    justify: "flex-start",
    style: {
      width: 'fit-content'
    },
    className: "dataviews-filters__container",
    wrap: true,
    children: filterComponents
  });
}
export default memo(Filters);
//# sourceMappingURL=index.js.map
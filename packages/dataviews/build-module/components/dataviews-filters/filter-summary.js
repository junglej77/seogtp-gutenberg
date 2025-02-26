/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { Dropdown, __experimentalVStack as VStack, __experimentalHStack as HStack, FlexItem, SelectControl, Tooltip, Icon } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useRef, createInterpolateElement } from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';
const ENTER = 'Enter';
const SPACE = ' ';

/**
 * Internal dependencies
 */
import SearchWidget from './search-widget';
import { OPERATORS, OPERATOR_IS, OPERATOR_IS_NOT, OPERATOR_IS_ANY, OPERATOR_IS_NONE, OPERATOR_IS_ALL, OPERATOR_IS_NOT_ALL } from '../../constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const FilterText = ({
  activeElements,
  filterInView,
  filter
}) => {
  if (activeElements === undefined || activeElements.length === 0) {
    return filter.name;
  }
  const filterTextWrappers = {
    Name: /*#__PURE__*/_jsx("span", {
      className: "dataviews-filters__summary-filter-text-name"
    }),
    Value: /*#__PURE__*/_jsx("span", {
      className: "dataviews-filters__summary-filter-text-value"
    })
  };
  if (filterInView?.operator === OPERATOR_IS_ANY) {
    return createInterpolateElement(sprintf( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is any: Admin, Editor". */
    __('<Name>%1$s is any: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === OPERATOR_IS_NONE) {
    return createInterpolateElement(sprintf( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is none: Admin, Editor". */
    __('<Name>%1$s is none: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === OPERATOR_IS_ALL) {
    return createInterpolateElement(sprintf( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is all: Admin, Editor". */
    __('<Name>%1$s is all: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === OPERATOR_IS_NOT_ALL) {
    return createInterpolateElement(sprintf( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is not all: Admin, Editor". */
    __('<Name>%1$s is not all: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === OPERATOR_IS) {
    return createInterpolateElement(sprintf( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is: Admin". */
    __('<Name>%1$s is: </Name><Value>%2$s</Value>'), filter.name, activeElements[0].label), filterTextWrappers);
  }
  if (filterInView?.operator === OPERATOR_IS_NOT) {
    return createInterpolateElement(sprintf( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is not: Admin". */
    __('<Name>%1$s is not: </Name><Value>%2$s</Value>'), filter.name, activeElements[0].label), filterTextWrappers);
  }
  return sprintf( /* translators: 1: Filter name e.g.: "Unknown status for Author". */
  __('Unknown status for %1$s'), filter.name);
};
function OperatorSelector({
  filter,
  view,
  onChangeView
}) {
  const operatorOptions = filter.operators?.map(operator => ({
    value: operator,
    label: OPERATORS[operator]?.label
  }));
  const currentFilter = view.filters?.find(_filter => _filter.field === filter.field);
  const value = currentFilter?.operator || filter.operators[0];
  return operatorOptions.length > 1 && /*#__PURE__*/_jsxs(HStack, {
    spacing: 2,
    justify: "flex-start",
    className: "dataviews-filters__summary-operators-container",
    children: [/*#__PURE__*/_jsx(FlexItem, {
      className: "dataviews-filters__summary-operators-filter-name",
      children: filter.name
    }), /*#__PURE__*/_jsx(SelectControl, {
      label: __('Conditions'),
      value: value,
      options: operatorOptions,
      onChange: newValue => {
        var _view$filters, _view$filters2;
        const operator = newValue;
        const newFilters = currentFilter ? [...((_view$filters = view.filters) !== null && _view$filters !== void 0 ? _view$filters : []).map(_filter => {
          if (_filter.field === filter.field) {
            return {
              ..._filter,
              operator
            };
          }
          return _filter;
        })] : [...((_view$filters2 = view.filters) !== null && _view$filters2 !== void 0 ? _view$filters2 : []), {
          field: filter.field,
          operator,
          value: undefined
        }];
        onChangeView({
          ...view,
          page: 1,
          filters: newFilters
        });
      },
      size: "small",
      __nextHasNoMarginBottom: true,
      hideLabelFromVision: true
    })]
  });
}
export default function FilterSummary({
  addFilterRef,
  openedFilter,
  ...commonProps
}) {
  const toggleRef = useRef(null);
  const {
    filter,
    view,
    onChangeView
  } = commonProps;
  const filterInView = view.filters?.find(f => f.field === filter.field);
  const activeElements = filter.elements.filter(element => {
    if (filter.singleSelection) {
      return element.value === filterInView?.value;
    }
    return filterInView?.value?.includes(element.value);
  });
  const isPrimary = filter.isPrimary;
  const hasValues = filterInView?.value !== undefined;
  const canResetOrRemove = !isPrimary || hasValues;
  return /*#__PURE__*/_jsx(Dropdown, {
    defaultOpen: openedFilter === filter.field,
    contentClassName: "dataviews-filters__summary-popover",
    popoverProps: {
      placement: 'bottom-start',
      role: 'dialog'
    },
    onClose: () => {
      toggleRef.current?.focus();
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsxs("div", {
      className: "dataviews-filters__summary-chip-container",
      children: [/*#__PURE__*/_jsx(Tooltip, {
        text: sprintf( /* translators: 1: Filter name. */
        __('Filter by: %1$s'), filter.name.toLowerCase()),
        placement: "top",
        children: /*#__PURE__*/_jsx("div", {
          className: clsx('dataviews-filters__summary-chip', {
            'has-reset': canResetOrRemove,
            'has-values': hasValues
          }),
          role: "button",
          tabIndex: 0,
          onClick: onToggle,
          onKeyDown: event => {
            if ([ENTER, SPACE].includes(event.key)) {
              onToggle();
              event.preventDefault();
            }
          },
          "aria-pressed": isOpen,
          "aria-expanded": isOpen,
          ref: toggleRef,
          children: /*#__PURE__*/_jsx(FilterText, {
            activeElements: activeElements,
            filterInView: filterInView,
            filter: filter
          })
        })
      }), canResetOrRemove && /*#__PURE__*/_jsx(Tooltip, {
        text: isPrimary ? __('Reset') : __('Remove'),
        placement: "top",
        children: /*#__PURE__*/_jsx("button", {
          className: clsx('dataviews-filters__summary-chip-remove', {
            'has-values': hasValues
          }),
          onClick: () => {
            onChangeView({
              ...view,
              page: 1,
              filters: view.filters?.filter(_filter => _filter.field !== filter.field)
            });
            // If the filter is not primary and can be removed, it will be added
            // back to the available filters from `Add filter` component.
            if (!isPrimary) {
              addFilterRef.current?.focus();
            } else {
              // If is primary, focus the toggle button.
              toggleRef.current?.focus();
            }
          },
          children: /*#__PURE__*/_jsx(Icon, {
            icon: closeSmall
          })
        })
      })]
    }),
    renderContent: () => {
      return /*#__PURE__*/_jsxs(VStack, {
        spacing: 0,
        justify: "flex-start",
        children: [/*#__PURE__*/_jsx(OperatorSelector, {
          ...commonProps
        }), /*#__PURE__*/_jsx(SearchWidget, {
          ...commonProps
        })]
      });
    }
  });
}
//# sourceMappingURL=filter-summary.js.map
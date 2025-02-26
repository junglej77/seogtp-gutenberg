/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports
import * as Ariakit from '@ariakit/react';
import removeAccents from 'remove-accents';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { useState, useMemo, useDeferredValue } from '@wordpress/element';
import { VisuallyHidden, Icon, Composite } from '@wordpress/components';
import { search, check } from '@wordpress/icons';
import { SVG, Circle } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const radioCheck = /*#__PURE__*/_jsx(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/_jsx(Circle, {
    cx: 12,
    cy: 12,
    r: 3
  })
});
function normalizeSearchInput(input = '') {
  return removeAccents(input.trim().toLowerCase());
}
const EMPTY_ARRAY = [];
const getCurrentValue = (filterDefinition, currentFilter) => {
  if (filterDefinition.singleSelection) {
    return currentFilter?.value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value;
  }
  if (!Array.isArray(currentFilter?.value) && !!currentFilter?.value) {
    return [currentFilter.value];
  }
  return EMPTY_ARRAY;
};
const getNewValue = (filterDefinition, currentFilter, value) => {
  if (filterDefinition.singleSelection) {
    return value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value.includes(value) ? currentFilter.value.filter(v => v !== value) : [...currentFilter.value, value];
  }
  return [value];
};
function generateFilterElementCompositeItemId(prefix, filterElementValue) {
  return `${prefix}-${filterElementValue}`;
}
function ListBox({
  view,
  filter,
  onChangeView
}) {
  const baseId = useInstanceId(ListBox, 'dataviews-filter-list-box');
  const [activeCompositeId, setActiveCompositeId] = useState(
  // When there are one or less operators, the first item is set as active
  // (by setting the initial `activeId` to `undefined`).
  // With 2 or more operators, the focus is moved on the operators control
  // (by setting the initial `activeId` to `null`), meaning that there won't
  // be an active item initially. Focus is then managed via the
  // `onFocusVisible` callback.
  filter.operators?.length === 1 ? undefined : null);
  const currentFilter = view.filters?.find(f => f.field === filter.field);
  const currentValue = getCurrentValue(filter, currentFilter);
  return /*#__PURE__*/_jsx(Composite, {
    virtualFocus: true,
    focusLoop: true,
    activeId: activeCompositeId,
    setActiveId: setActiveCompositeId,
    role: "listbox",
    className: "dataviews-filters__search-widget-listbox",
    "aria-label": sprintf( /* translators: List of items for a filter. 1: Filter name. e.g.: "List of: Author". */
    __('List of: %1$s'), filter.name),
    onFocusVisible: () => {
      // `onFocusVisible` needs the `Composite` component to be focusable,
      // which is implicitly achieved via the `virtualFocus` prop.
      if (!activeCompositeId && filter.elements.length) {
        setActiveCompositeId(generateFilterElementCompositeItemId(baseId, filter.elements[0].value));
      }
    },
    render: /*#__PURE__*/_jsx(Composite.Typeahead, {}),
    children: filter.elements.map(element => /*#__PURE__*/_jsxs(Composite.Hover, {
      render: /*#__PURE__*/_jsx(Composite.Item, {
        id: generateFilterElementCompositeItemId(baseId, element.value),
        render: /*#__PURE__*/_jsx("div", {
          "aria-label": element.label,
          role: "option",
          className: "dataviews-filters__search-widget-listitem"
        }),
        onClick: () => {
          var _view$filters, _view$filters2;
          const newFilters = currentFilter ? [...((_view$filters = view.filters) !== null && _view$filters !== void 0 ? _view$filters : []).map(_filter => {
            if (_filter.field === filter.field) {
              return {
                ..._filter,
                operator: currentFilter.operator || filter.operators[0],
                value: getNewValue(filter, currentFilter, element.value)
              };
            }
            return _filter;
          })] : [...((_view$filters2 = view.filters) !== null && _view$filters2 !== void 0 ? _view$filters2 : []), {
            field: filter.field,
            operator: filter.operators[0],
            value: getNewValue(filter, currentFilter, element.value)
          }];
          onChangeView({
            ...view,
            page: 1,
            filters: newFilters
          });
        }
      }),
      children: [/*#__PURE__*/_jsxs("span", {
        className: "dataviews-filters__search-widget-listitem-check",
        children: [filter.singleSelection && currentValue === element.value && /*#__PURE__*/_jsx(Icon, {
          icon: radioCheck
        }), !filter.singleSelection && currentValue.includes(element.value) && /*#__PURE__*/_jsx(Icon, {
          icon: check
        })]
      }), /*#__PURE__*/_jsx("span", {
        children: element.label
      })]
    }, element.value))
  });
}
function ComboboxList({
  view,
  filter,
  onChangeView
}) {
  const [searchValue, setSearchValue] = useState('');
  const deferredSearchValue = useDeferredValue(searchValue);
  const currentFilter = view.filters?.find(_filter => _filter.field === filter.field);
  const currentValue = getCurrentValue(filter, currentFilter);
  const matches = useMemo(() => {
    const normalizedSearch = normalizeSearchInput(deferredSearchValue);
    return filter.elements.filter(item => normalizeSearchInput(item.label).includes(normalizedSearch));
  }, [filter.elements, deferredSearchValue]);
  return /*#__PURE__*/_jsxs(Ariakit.ComboboxProvider, {
    selectedValue: currentValue,
    setSelectedValue: value => {
      var _view$filters3, _view$filters4;
      const newFilters = currentFilter ? [...((_view$filters3 = view.filters) !== null && _view$filters3 !== void 0 ? _view$filters3 : []).map(_filter => {
        if (_filter.field === filter.field) {
          return {
            ..._filter,
            operator: currentFilter.operator || filter.operators[0],
            value
          };
        }
        return _filter;
      })] : [...((_view$filters4 = view.filters) !== null && _view$filters4 !== void 0 ? _view$filters4 : []), {
        field: filter.field,
        operator: filter.operators[0],
        value
      }];
      onChangeView({
        ...view,
        page: 1,
        filters: newFilters
      });
    },
    setValue: setSearchValue,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "dataviews-filters__search-widget-filter-combobox__wrapper",
      children: [/*#__PURE__*/_jsx(Ariakit.ComboboxLabel, {
        render: /*#__PURE__*/_jsx(VisuallyHidden, {
          children: __('Search items')
        }),
        children: __('Search items')
      }), /*#__PURE__*/_jsx(Ariakit.Combobox, {
        autoSelect: "always",
        placeholder: __('Search'),
        className: "dataviews-filters__search-widget-filter-combobox__input"
      }), /*#__PURE__*/_jsx("div", {
        className: "dataviews-filters__search-widget-filter-combobox__icon",
        children: /*#__PURE__*/_jsx(Icon, {
          icon: search
        })
      })]
    }), /*#__PURE__*/_jsxs(Ariakit.ComboboxList, {
      className: "dataviews-filters__search-widget-filter-combobox-list",
      alwaysVisible: true,
      children: [matches.map(element => {
        return /*#__PURE__*/_jsxs(Ariakit.ComboboxItem, {
          resetValueOnSelect: false,
          value: element.value,
          className: "dataviews-filters__search-widget-listitem",
          hideOnClick: false,
          setValueOnClick: false,
          focusOnHover: true,
          children: [/*#__PURE__*/_jsxs("span", {
            className: "dataviews-filters__search-widget-listitem-check",
            children: [filter.singleSelection && currentValue === element.value && /*#__PURE__*/_jsx(Icon, {
              icon: radioCheck
            }), !filter.singleSelection && currentValue.includes(element.value) && /*#__PURE__*/_jsx(Icon, {
              icon: check
            })]
          }), /*#__PURE__*/_jsxs("span", {
            children: [/*#__PURE__*/_jsx(Ariakit.ComboboxItemValue, {
              className: "dataviews-filters__search-widget-filter-combobox-item-value",
              value: element.label
            }), !!element.description && /*#__PURE__*/_jsx("span", {
              className: "dataviews-filters__search-widget-listitem-description",
              children: element.description
            })]
          })]
        }, element.value);
      }), !matches.length && /*#__PURE__*/_jsx("p", {
        children: __('No results found')
      })]
    })]
  });
}
export default function SearchWidget(props) {
  const Widget = props.filter.elements.length > 10 ? ComboboxList : ListBox;
  return /*#__PURE__*/_jsx(Widget, {
    ...props
  });
}
//# sourceMappingURL=search-widget.js.map
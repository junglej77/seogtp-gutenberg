/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useCallback, memo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import RangeControl from '../range-control';
import SelectControl from '../select-control';
import CategorySelect from './category-select';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_MIN_ITEMS = 1;
const DEFAULT_MAX_ITEMS = 100;
const options = [{
  label: __('Newest to oldest'),
  value: 'date/desc'
}, {
  label: __('Oldest to newest'),
  value: 'date/asc'
}, {
  /* translators: Label for ordering posts by title in ascending order. */
  label: __('A → Z'),
  value: 'title/asc'
}, {
  /* translators: Label for ordering posts by title in descending order. */
  label: __('Z → A'),
  value: 'title/desc'
}];
const QueryControls = memo(({
  categoriesList,
  selectedCategoryId,
  numberOfItems,
  order,
  orderBy,
  maxItems = DEFAULT_MAX_ITEMS,
  minItems = DEFAULT_MIN_ITEMS,
  onCategoryChange,
  onNumberOfItemsChange,
  onOrderChange,
  onOrderByChange
}) => {
  const onChange = useCallback(value => {
    const [newOrderBy, newOrder] = value.split('/');
    if (newOrder !== order) {
      onOrderChange(newOrder);
    }
    if (newOrderBy !== orderBy) {
      onOrderByChange(newOrderBy);
    }
  }, [order, orderBy, onOrderByChange, onOrderChange]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [onOrderChange && onOrderByChange && /*#__PURE__*/_jsx(SelectControl, {
      label: __('Order by'),
      value: `${orderBy}/${order}`,
      options: options,
      onChange: onChange,
      hideCancelButton: true
    }), onCategoryChange && /*#__PURE__*/_jsx(CategorySelect, {
      categoriesList: categoriesList,
      label: __('Category'),
      noOptionLabel: _x('All', 'categories'),
      selectedCategoryId: selectedCategoryId,
      onChange: onCategoryChange,
      hideCancelButton: true
    }), onNumberOfItemsChange && /*#__PURE__*/_jsx(RangeControl, {
      __next40pxDefaultSize: true,
      label: __('Number of items'),
      value: numberOfItems,
      onChange: onNumberOfItemsChange,
      min: minItems,
      max: maxItems,
      required: true
    })]
  });
});
export default QueryControls;
//# sourceMappingURL=index.native.js.map
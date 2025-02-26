/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AuthorSelect from './author-select';
import CategorySelect from './category-select';
import FormTokenField from '../form-token-field';
import RangeControl from '../range-control';
import SelectControl from '../select-control';
import { VStack } from '../v-stack';
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_MIN_ITEMS = 1;
const DEFAULT_MAX_ITEMS = 100;
const MAX_CATEGORIES_SUGGESTIONS = 20;
function isSingleCategorySelection(props) {
  return 'categoriesList' in props;
}
function isMultipleCategorySelection(props) {
  return 'categorySuggestions' in props;
}

/**
 * Controls to query for posts.
 *
 * ```jsx
 * const MyQueryControls = () => (
 *   <QueryControls
 *     { ...{ maxItems, minItems, numberOfItems, order, orderBy } }
 *     onOrderByChange={ ( newOrderBy ) => {
 *       updateQuery( { orderBy: newOrderBy } )
 *     }
 *     onOrderChange={ ( newOrder ) => {
 *       updateQuery( { order: newOrder } )
 *     }
 *     categoriesList={ categories }
 *     selectedCategoryId={ category }
 *     onCategoryChange={ ( newCategory ) => {
 *       updateQuery( { category: newCategory } )
 *     }
 *     onNumberOfItemsChange={ ( newNumberOfItems ) => {
 *       updateQuery( { numberOfItems: newNumberOfItems } )
 *     } }
 *   />
 * );
 * ```
 */
export function QueryControls({
  authorList,
  selectedAuthorId,
  numberOfItems,
  order,
  orderBy,
  maxItems = DEFAULT_MAX_ITEMS,
  minItems = DEFAULT_MIN_ITEMS,
  onAuthorChange,
  onNumberOfItemsChange,
  onOrderChange,
  onOrderByChange,
  // Props for single OR multiple category selection are not destructured here,
  // but instead are destructured inline where necessary.
  ...props
}) {
  return /*#__PURE__*/_jsx(VStack, {
    spacing: "4",
    className: "components-query-controls",
    children: [onOrderChange && onOrderByChange && /*#__PURE__*/_jsx(SelectControl, {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: __('Order by'),
      value: orderBy === undefined || order === undefined ? undefined : `${orderBy}/${order}`,
      options: [{
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
      }],
      onChange: value => {
        if (typeof value !== 'string') {
          return;
        }
        const [newOrderBy, newOrder] = value.split('/');
        if (newOrder !== order) {
          onOrderChange(newOrder);
        }
        if (newOrderBy !== orderBy) {
          onOrderByChange(newOrderBy);
        }
      }
    }, "query-controls-order-select"), isSingleCategorySelection(props) && props.categoriesList && props.onCategoryChange && /*#__PURE__*/_jsx(CategorySelect, {
      __next40pxDefaultSize: true,
      categoriesList: props.categoriesList,
      label: __('Category'),
      noOptionLabel: _x('All', 'categories'),
      selectedCategoryId: props.selectedCategoryId,
      onChange: props.onCategoryChange
    }, "query-controls-category-select"), isMultipleCategorySelection(props) && props.categorySuggestions && props.onCategoryChange && /*#__PURE__*/_jsx(FormTokenField, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: __('Categories'),
      value: props.selectedCategories && props.selectedCategories.map(item => ({
        id: item.id,
        // Keeping the fallback to `item.value` for legacy reasons,
        // even if items of `selectedCategories` should not have a
        // `value` property.
        // @ts-expect-error
        value: item.name || item.value
      })),
      suggestions: Object.keys(props.categorySuggestions),
      onChange: props.onCategoryChange,
      maxSuggestions: MAX_CATEGORIES_SUGGESTIONS
    }, "query-controls-categories-select"), onAuthorChange && /*#__PURE__*/_jsx(AuthorSelect, {
      __next40pxDefaultSize: true,
      authorList: authorList,
      label: __('Author'),
      noOptionLabel: _x('All', 'authors'),
      selectedAuthorId: selectedAuthorId,
      onChange: onAuthorChange
    }, "query-controls-author-select"), onNumberOfItemsChange && /*#__PURE__*/_jsx(RangeControl, {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: __('Number of items'),
      value: numberOfItems,
      onChange: onNumberOfItemsChange,
      min: minItems,
      max: maxItems,
      required: true
    }, "query-controls-range-control")]
  });
}
export default QueryControls;
//# sourceMappingURL=index.js.map
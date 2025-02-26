/**
 * WordPress dependencies
 */
import { Button, SearchControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function PatternCategoriesList({
  selectedCategory,
  patternCategories,
  onClickCategory
}) {
  const baseClassName = 'block-editor-block-patterns-explorer__sidebar';
  return /*#__PURE__*/_jsx("div", {
    className: `${baseClassName}__categories-list`,
    children: patternCategories.map(({
      name,
      label
    }) => {
      return /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        label: label,
        className: `${baseClassName}__categories-list__item`,
        isPressed: selectedCategory === name,
        onClick: () => {
          onClickCategory(name);
        },
        children: label
      }, name);
    })
  });
}
function PatternsExplorerSearch({
  searchValue,
  setSearchValue
}) {
  const baseClassName = 'block-editor-block-patterns-explorer__search';
  return /*#__PURE__*/_jsx("div", {
    className: baseClassName,
    children: /*#__PURE__*/_jsx(SearchControl, {
      __nextHasNoMarginBottom: true,
      onChange: setSearchValue,
      value: searchValue,
      label: __('Search for patterns'),
      placeholder: __('Search')
    })
  });
}
function PatternExplorerSidebar({
  selectedCategory,
  patternCategories,
  onClickCategory,
  searchValue,
  setSearchValue
}) {
  const baseClassName = 'block-editor-block-patterns-explorer__sidebar';
  return /*#__PURE__*/_jsxs("div", {
    className: baseClassName,
    children: [/*#__PURE__*/_jsx(PatternsExplorerSearch, {
      searchValue: searchValue,
      setSearchValue: setSearchValue
    }), !searchValue && /*#__PURE__*/_jsx(PatternCategoriesList, {
      selectedCategory: selectedCategory,
      patternCategories: patternCategories,
      onClickCategory: onClickCategory
    })]
  });
}
export default PatternExplorerSidebar;
//# sourceMappingURL=pattern-explorer-sidebar.js.map
/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PatternExplorerSidebar from './pattern-explorer-sidebar';
import PatternList from './pattern-list';
import { usePatternCategories } from '../block-patterns-tab/use-pattern-categories';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function PatternsExplorer({
  initialCategory,
  rootClientId
}) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory?.name);
  const patternCategories = usePatternCategories(rootClientId);
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-block-patterns-explorer",
    children: [/*#__PURE__*/_jsx(PatternExplorerSidebar, {
      selectedCategory: selectedCategory,
      patternCategories: patternCategories,
      onClickCategory: setSelectedCategory,
      searchValue: searchValue,
      setSearchValue: setSearchValue
    }), /*#__PURE__*/_jsx(PatternList, {
      searchValue: searchValue,
      selectedCategory: selectedCategory,
      patternCategories: patternCategories,
      rootClientId: rootClientId
    })]
  });
}
function PatternsExplorerModal({
  onModalClose,
  ...restProps
}) {
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Patterns'),
    onRequestClose: onModalClose,
    isFullScreen: true,
    children: /*#__PURE__*/_jsx(PatternsExplorer, {
      ...restProps
    })
  });
}
export default PatternsExplorerModal;
//# sourceMappingURL=index.js.map
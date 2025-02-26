/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import PatternsExplorerModal from '../block-patterns-explorer';
import MobileTabNavigation from '../mobile-tab-navigation';
import { PatternCategoryPreviews } from './pattern-category-previews';
import { usePatternCategories } from './use-pattern-categories';
import CategoryTabs from '../category-tabs';
import InserterNoResults from '../no-results';
import { store as blockEditorStore } from '../../../store';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function BlockPatternsTab({
  onSelectCategory,
  selectedCategory,
  onInsert,
  rootClientId,
  children
}) {
  const [showPatternsExplorer, setShowPatternsExplorer] = useState(false);
  const categories = usePatternCategories(rootClientId);
  const isMobile = useViewportMatch('medium', '<');
  const isResolvingPatterns = useSelect(select => unlock(select(blockEditorStore)).isResolvingPatterns(), []);
  if (isResolvingPatterns) {
    return /*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__patterns-loading",
      children: /*#__PURE__*/_jsx(Spinner, {})
    });
  }
  if (!categories.length) {
    return /*#__PURE__*/_jsx(InserterNoResults, {});
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!isMobile && /*#__PURE__*/_jsxs("div", {
      className: "block-editor-inserter__block-patterns-tabs-container",
      children: [/*#__PURE__*/_jsx(CategoryTabs, {
        categories: categories,
        selectedCategory: selectedCategory,
        onSelectCategory: onSelectCategory,
        children: children
      }), /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "block-editor-inserter__patterns-explore-button",
        onClick: () => setShowPatternsExplorer(true),
        variant: "secondary",
        children: __('Explore all patterns')
      })]
    }), isMobile && /*#__PURE__*/_jsx(MobileTabNavigation, {
      categories: categories,
      children: category => /*#__PURE__*/_jsx("div", {
        className: "block-editor-inserter__category-panel",
        children: /*#__PURE__*/_jsx(PatternCategoryPreviews, {
          onInsert: onInsert,
          rootClientId: rootClientId,
          category: category,
          showTitlesAsTooltip: false
        }, category.name)
      })
    }), showPatternsExplorer && /*#__PURE__*/_jsx(PatternsExplorerModal, {
      initialCategory: selectedCategory || categories[0],
      patternCategories: categories,
      onModalClose: () => setShowPatternsExplorer(false),
      rootClientId: rootClientId
    })]
  });
}
export default BlockPatternsTab;
//# sourceMappingURL=index.js.map
/**
 * WordPress dependencies
 */
import { useMemo, useState, useCallback, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { __experimentalHStack as HStack, __experimentalVStack as VStack, __experimentalHeading as Heading, __experimentalText as Text, FlexBlock } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import usePatternsState from '../hooks/use-patterns-state';
import BlockPatternsList from '../../block-patterns-list';
import usePatternsPaging from '../hooks/use-patterns-paging';
import { PatternsFilter } from './patterns-filter';
import { usePatternCategories } from './use-pattern-categories';
import { isPatternFiltered, allPatternsCategory, myPatternsCategory, INSERTER_PATTERN_TYPES } from './utils';
import { store as blockEditorStore } from '../../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const noop = () => {};
export function PatternCategoryPreviews({
  rootClientId,
  onInsert,
  onHover = noop,
  category,
  showTitlesAsTooltip
}) {
  const isZoomOutMode = useSelect(select => select(blockEditorStore).__unstableGetEditorMode() === 'zoom-out', []);
  const [allPatterns,, onClickPattern] = usePatternsState(onInsert, rootClientId, category?.name);
  const [patternSyncFilter, setPatternSyncFilter] = useState('all');
  const [patternSourceFilter, setPatternSourceFilter] = useState('all');
  const availableCategories = usePatternCategories(rootClientId, patternSourceFilter);
  const scrollContainerRef = useRef();
  const currentCategoryPatterns = useMemo(() => allPatterns.filter(pattern => {
    if (isPatternFiltered(pattern, patternSourceFilter, patternSyncFilter)) {
      return false;
    }
    if (category.name === allPatternsCategory.name) {
      return true;
    }
    if (category.name === myPatternsCategory.name && pattern.type === INSERTER_PATTERN_TYPES.user) {
      return true;
    }
    if (category.name === 'uncategorized') {
      // The uncategorized category should show all the patterns without any category...
      if (!pattern.categories) {
        return true;
      }

      // ...or with no available category.
      return !pattern.categories.some(catName => availableCategories.some(c => c.name === catName));
    }
    return pattern.categories?.includes(category.name);
  }), [allPatterns, availableCategories, category.name, patternSourceFilter, patternSyncFilter]);
  const pagingProps = usePatternsPaging(currentCategoryPatterns, category, scrollContainerRef);
  const {
    changePage
  } = pagingProps;

  // Hide block pattern preview on unmount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => onHover(null), []);
  const onSetPatternSyncFilter = useCallback(value => {
    setPatternSyncFilter(value);
    changePage(1);
  }, [setPatternSyncFilter, changePage]);
  const onSetPatternSourceFilter = useCallback(value => {
    setPatternSourceFilter(value);
    changePage(1);
  }, [setPatternSourceFilter, changePage]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(VStack, {
      spacing: 2,
      className: "block-editor-inserter__patterns-category-panel-header",
      children: [/*#__PURE__*/_jsxs(HStack, {
        children: [/*#__PURE__*/_jsx(FlexBlock, {
          children: /*#__PURE__*/_jsx(Heading, {
            className: "block-editor-inserter__patterns-category-panel-title",
            size: 13,
            level: 4,
            as: "div",
            children: category.label
          })
        }), /*#__PURE__*/_jsx(PatternsFilter, {
          patternSyncFilter: patternSyncFilter,
          patternSourceFilter: patternSourceFilter,
          setPatternSyncFilter: onSetPatternSyncFilter,
          setPatternSourceFilter: onSetPatternSourceFilter,
          scrollContainerRef: scrollContainerRef,
          category: category
        })]
      }), !currentCategoryPatterns.length && /*#__PURE__*/_jsx(Text, {
        variant: "muted",
        className: "block-editor-inserter__patterns-category-no-results",
        children: __('No results found')
      })]
    }), currentCategoryPatterns.length > 0 && /*#__PURE__*/_jsxs(_Fragment, {
      children: [isZoomOutMode && /*#__PURE__*/_jsx(Text, {
        size: "12",
        as: "p",
        className: "block-editor-inserter__help-text",
        children: __('Drag and drop patterns into the canvas.')
      }), /*#__PURE__*/_jsx(BlockPatternsList, {
        ref: scrollContainerRef,
        shownPatterns: pagingProps.categoryPatternsAsyncList,
        blockPatterns: pagingProps.categoryPatterns,
        onClickPattern: onClickPattern,
        onHover: onHover,
        label: category.label,
        orientation: "vertical",
        category: category.name,
        isDraggable: true,
        showTitlesAsTooltip: showTitlesAsTooltip,
        patternFilter: patternSourceFilter,
        pagingProps: pagingProps
      })]
    })]
  });
}
//# sourceMappingURL=pattern-category-previews.js.map
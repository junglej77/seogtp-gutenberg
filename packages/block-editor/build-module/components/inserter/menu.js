/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { forwardRef, useState, useCallback, useMemo, useRef, useLayoutEffect } from '@wordpress/element';
import { VisuallyHidden, SearchControl, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDebouncedInput } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Tips from './tips';
import InserterPreviewPanel from './preview-panel';
import BlockTypesTab from './block-types-tab';
import BlockPatternsTab from './block-patterns-tab';
import { PatternCategoryPreviews } from './block-patterns-tab/pattern-category-previews';
import { MediaTab, MediaCategoryPanel } from './media-tab';
import InserterSearchResults from './search-results';
import useInsertionPoint from './hooks/use-insertion-point';
import { store as blockEditorStore } from '../../store';
import TabbedSidebar from '../tabbed-sidebar';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const NOOP = () => {};
function InserterMenu({
  rootClientId,
  clientId,
  isAppender,
  __experimentalInsertionIndex,
  onSelect,
  showInserterHelpPanel,
  showMostUsedBlocks,
  __experimentalFilterValue = '',
  shouldFocusBlock = true,
  onPatternCategorySelection,
  onClose,
  __experimentalInitialTab,
  __experimentalInitialCategory
}, ref) {
  const isZoomOutMode = useSelect(select => select(blockEditorStore).__unstableGetEditorMode() === 'zoom-out', []);
  const [filterValue, setFilterValue, delayedFilterValue] = useDebouncedInput(__experimentalFilterValue);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedPatternCategory, setSelectedPatternCategory] = useState(__experimentalInitialCategory);
  const [patternFilter, setPatternFilter] = useState('all');
  const [selectedMediaCategory, setSelectedMediaCategory] = useState(null);
  function getInitialTab() {
    if (__experimentalInitialTab) {
      return __experimentalInitialTab;
    }
    if (isZoomOutMode) {
      return 'patterns';
    }
  }
  const [selectedTab, setSelectedTab] = useState(getInitialTab());
  const [destinationRootClientId, onInsertBlocks, onToggleInsertionPoint] = useInsertionPoint({
    rootClientId,
    clientId,
    isAppender,
    insertionIndex: __experimentalInsertionIndex,
    shouldFocusBlock
  });
  const blockTypesTabRef = useRef();
  const onInsert = useCallback((blocks, meta, shouldForceFocusBlock, _rootClientId) => {
    onInsertBlocks(blocks, meta, shouldForceFocusBlock, _rootClientId);
    onSelect(blocks);

    // Check for focus loss due to filtering blocks by selected block type
    window.requestAnimationFrame(() => {
      if (!shouldFocusBlock && !blockTypesTabRef.current?.contains(ref.current.ownerDocument.activeElement)) {
        // There has been a focus loss, so focus the first button in the block types tab
        blockTypesTabRef.current?.querySelector('button').focus();
      }
    });
  }, [onInsertBlocks, onSelect, shouldFocusBlock]);
  const onInsertPattern = useCallback((blocks, patternName) => {
    onToggleInsertionPoint(false);
    onInsertBlocks(blocks, {
      patternName
    });
    onSelect();
  }, [onInsertBlocks, onSelect]);
  const onHover = useCallback(item => {
    onToggleInsertionPoint(item);
    setHoveredItem(item);
  }, [onToggleInsertionPoint, setHoveredItem]);
  const onClickPatternCategory = useCallback((patternCategory, filter) => {
    setSelectedPatternCategory(patternCategory);
    setPatternFilter(filter);
    onPatternCategorySelection?.();
  }, [setSelectedPatternCategory, onPatternCategorySelection]);
  const showPatternPanel = selectedTab === 'patterns' && !delayedFilterValue && !!selectedPatternCategory;
  const showMediaPanel = selectedTab === 'media' && !!selectedMediaCategory;
  const inserterSearch = useMemo(() => {
    if (selectedTab === 'media') {
      return null;
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(SearchControl, {
        __nextHasNoMarginBottom: true,
        className: "block-editor-inserter__search",
        onChange: value => {
          if (hoveredItem) {
            setHoveredItem(null);
          }
          setFilterValue(value);
        },
        value: filterValue,
        label: __('Search for blocks and patterns'),
        placeholder: __('Search')
      }), !!delayedFilterValue && /*#__PURE__*/_jsx(InserterSearchResults, {
        filterValue: delayedFilterValue,
        onSelect: onSelect,
        onHover: onHover,
        rootClientId: rootClientId,
        clientId: clientId,
        isAppender: isAppender,
        __experimentalInsertionIndex: __experimentalInsertionIndex,
        showBlockDirectory: true,
        shouldFocusBlock: shouldFocusBlock,
        prioritizePatterns: selectedTab === 'patterns'
      })]
    });
  }, [selectedTab, hoveredItem, setHoveredItem, setFilterValue, filterValue, delayedFilterValue, onSelect, onHover, shouldFocusBlock, clientId, rootClientId, __experimentalInsertionIndex, isAppender]);
  const blocksTab = useMemo(() => {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        className: "block-editor-inserter__block-list",
        children: /*#__PURE__*/_jsx(BlockTypesTab, {
          ref: blockTypesTabRef,
          rootClientId: destinationRootClientId,
          onInsert: onInsert,
          onHover: onHover,
          showMostUsedBlocks: showMostUsedBlocks
        })
      }), showInserterHelpPanel && /*#__PURE__*/_jsxs("div", {
        className: "block-editor-inserter__tips",
        children: [/*#__PURE__*/_jsx(VisuallyHidden, {
          as: "h2",
          children: __('A tip for using the block editor')
        }), /*#__PURE__*/_jsx(Tips, {})]
      })]
    });
  }, [destinationRootClientId, onInsert, onHover, showMostUsedBlocks, showInserterHelpPanel]);
  const patternsTab = useMemo(() => {
    return /*#__PURE__*/_jsx(BlockPatternsTab, {
      rootClientId: destinationRootClientId,
      onInsert: onInsertPattern,
      onSelectCategory: onClickPatternCategory,
      selectedCategory: selectedPatternCategory,
      children: showPatternPanel && /*#__PURE__*/_jsx(PatternCategoryPreviews, {
        rootClientId: destinationRootClientId,
        onInsert: onInsertPattern,
        category: selectedPatternCategory,
        patternFilter: patternFilter,
        showTitlesAsTooltip: true
      })
    });
  }, [destinationRootClientId, onInsertPattern, onClickPatternCategory, patternFilter, selectedPatternCategory, showPatternPanel]);
  const mediaTab = useMemo(() => {
    return /*#__PURE__*/_jsx(MediaTab, {
      rootClientId: destinationRootClientId,
      selectedCategory: selectedMediaCategory,
      onSelectCategory: setSelectedMediaCategory,
      onInsert: onInsert,
      children: showMediaPanel && /*#__PURE__*/_jsx(MediaCategoryPanel, {
        rootClientId: destinationRootClientId,
        onInsert: onInsert,
        category: selectedMediaCategory
      })
    });
  }, [destinationRootClientId, onInsert, selectedMediaCategory, setSelectedMediaCategory, showMediaPanel]);
  const handleSetSelectedTab = value => {
    // If no longer on patterns tab remove the category setting.
    if (value !== 'patterns') {
      setSelectedPatternCategory(null);
    }
    setSelectedTab(value);
  };

  // Focus first active tab, if any
  const tabsRef = useRef();
  useLayoutEffect(() => {
    if (tabsRef.current) {
      window.requestAnimationFrame(() => {
        tabsRef.current.querySelector('[role="tab"][aria-selected="true"]')?.focus();
      });
    }
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    className: clsx('block-editor-inserter__menu', {
      'show-panel': showPatternPanel || showMediaPanel,
      'is-zoom-out': isZoomOutMode
    }),
    ref: ref,
    children: [/*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__main-area",
      children: /*#__PURE__*/_jsx(TabbedSidebar, {
        ref: tabsRef,
        onSelect: handleSetSelectedTab,
        onClose: onClose,
        selectedTab: selectedTab,
        closeButtonLabel: __('Close block inserter'),
        tabs: [{
          name: 'blocks',
          title: __('Blocks'),
          panel: /*#__PURE__*/_jsxs(_Fragment, {
            children: [inserterSearch, selectedTab === 'blocks' && !delayedFilterValue && blocksTab]
          })
        }, {
          name: 'patterns',
          title: __('Patterns'),
          panel: /*#__PURE__*/_jsxs(_Fragment, {
            children: [inserterSearch, selectedTab === 'patterns' && !delayedFilterValue && patternsTab]
          })
        }, {
          name: 'media',
          title: __('Media'),
          panel: /*#__PURE__*/_jsxs(_Fragment, {
            children: [inserterSearch, mediaTab]
          })
        }]
      })
    }), showInserterHelpPanel && hoveredItem && /*#__PURE__*/_jsx(Popover, {
      className: "block-editor-inserter__preview-container__popover",
      placement: "right-start",
      offset: 16,
      focusOnMount: false,
      animate: false,
      children: /*#__PURE__*/_jsx(InserterPreviewPanel, {
        item: hoveredItem
      })
    })]
  });
}
export const PrivateInserterMenu = forwardRef(InserterMenu);
function PublicInserterMenu(props, ref) {
  return /*#__PURE__*/_jsx(PrivateInserterMenu, {
    ...props,
    onPatternCategorySelection: NOOP,
    ref: ref
  });
}
export default forwardRef(PublicInserterMenu);
//# sourceMappingURL=menu.js.map
/**
 * WordPress dependencies
 */
import { useMemo, useEffect } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { VisuallyHidden } from '@wordpress/components';
import { useDebounce, useAsyncList } from '@wordpress/compose';
import { speak } from '@wordpress/a11y';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import BlockTypesList from '../block-types-list';
import BlockPatternsList from '../block-patterns-list';
import __unstableInserterMenuExtension from '../inserter-menu-extension';
import InserterPanel from './panel';
import InserterNoResults from './no-results';
import useInsertionPoint from './hooks/use-insertion-point';
import usePatternsState from './hooks/use-patterns-state';
import useBlockTypesState from './hooks/use-block-types-state';
import { searchBlockItems, searchItems } from './search-items';
import InserterListbox from '../inserter-listbox';
import { orderBy } from '../../utils/sorting';
import { orderInserterBlockItems } from '../../utils/order-inserter-block-items';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const INITIAL_INSERTER_RESULTS = 9;
/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation and rerendering the component.
 *
 * @type {Array}
 */
const EMPTY_ARRAY = [];
function InserterSearchResults({
  filterValue,
  onSelect,
  onHover,
  onHoverPattern,
  rootClientId,
  clientId,
  isAppender,
  __experimentalInsertionIndex,
  maxBlockPatterns,
  maxBlockTypes,
  showBlockDirectory = false,
  isDraggable = true,
  shouldFocusBlock = true,
  prioritizePatterns,
  selectBlockOnInsert,
  isQuick
}) {
  const debouncedSpeak = useDebounce(speak, 500);
  const {
    prioritizedBlocks
  } = useSelect(select => {
    const blockListSettings = select(blockEditorStore).getBlockListSettings(rootClientId);
    return {
      prioritizedBlocks: blockListSettings?.prioritizedInserterBlocks || EMPTY_ARRAY
    };
  }, [rootClientId]);
  const [destinationRootClientId, onInsertBlocks] = useInsertionPoint({
    onSelect,
    rootClientId,
    clientId,
    isAppender,
    insertionIndex: __experimentalInsertionIndex,
    shouldFocusBlock,
    selectBlockOnInsert
  });
  const [blockTypes, blockTypeCategories, blockTypeCollections, onSelectBlockType] = useBlockTypesState(destinationRootClientId, onInsertBlocks, isQuick);
  const [patterns,, onClickPattern] = usePatternsState(onInsertBlocks, destinationRootClientId);
  const filteredBlockPatterns = useMemo(() => {
    if (maxBlockPatterns === 0) {
      return [];
    }
    const results = searchItems(patterns, filterValue);
    return maxBlockPatterns !== undefined ? results.slice(0, maxBlockPatterns) : results;
  }, [filterValue, patterns, maxBlockPatterns]);
  let maxBlockTypesToShow = maxBlockTypes;
  if (prioritizePatterns && filteredBlockPatterns.length > 2) {
    maxBlockTypesToShow = 0;
  }
  const filteredBlockTypes = useMemo(() => {
    if (maxBlockTypesToShow === 0) {
      return [];
    }
    const nonPatternBlockTypes = blockTypes.filter(blockType => blockType.name !== 'core/block');
    let orderedItems = orderBy(nonPatternBlockTypes, 'frecency', 'desc');
    if (!filterValue && prioritizedBlocks.length) {
      orderedItems = orderInserterBlockItems(orderedItems, prioritizedBlocks);
    }
    const results = searchBlockItems(orderedItems, blockTypeCategories, blockTypeCollections, filterValue);
    return maxBlockTypesToShow !== undefined ? results.slice(0, maxBlockTypesToShow) : results;
  }, [filterValue, blockTypes, blockTypeCategories, blockTypeCollections, maxBlockTypesToShow, prioritizedBlocks]);

  // Announce search results on change.
  useEffect(() => {
    if (!filterValue) {
      return;
    }
    const count = filteredBlockTypes.length + filteredBlockPatterns.length;
    const resultsFoundMessage = sprintf( /* translators: %d: number of results. */
    _n('%d result found.', '%d results found.', count), count);
    debouncedSpeak(resultsFoundMessage);
  }, [filterValue, debouncedSpeak, filteredBlockTypes, filteredBlockPatterns]);
  const currentShownBlockTypes = useAsyncList(filteredBlockTypes, {
    step: INITIAL_INSERTER_RESULTS
  });
  const currentShownPatterns = useAsyncList(currentShownBlockTypes.length === filteredBlockTypes.length ? filteredBlockPatterns : EMPTY_ARRAY);
  const hasItems = filteredBlockTypes.length > 0 || filteredBlockPatterns.length > 0;
  const blocksUI = !!filteredBlockTypes.length && /*#__PURE__*/_jsx(InserterPanel, {
    title: /*#__PURE__*/_jsx(VisuallyHidden, {
      children: __('Blocks')
    }),
    children: /*#__PURE__*/_jsx(BlockTypesList, {
      items: currentShownBlockTypes,
      onSelect: onSelectBlockType,
      onHover: onHover,
      label: __('Blocks'),
      isDraggable: isDraggable
    })
  });
  const patternsUI = !!filteredBlockPatterns.length && /*#__PURE__*/_jsx(InserterPanel, {
    title: /*#__PURE__*/_jsx(VisuallyHidden, {
      children: __('Block patterns')
    }),
    children: /*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__quick-inserter-patterns",
      children: /*#__PURE__*/_jsx(BlockPatternsList, {
        shownPatterns: currentShownPatterns,
        blockPatterns: filteredBlockPatterns,
        onClickPattern: onClickPattern,
        onHover: onHoverPattern,
        isDraggable: isDraggable
      })
    })
  });
  return /*#__PURE__*/_jsxs(InserterListbox, {
    children: [!showBlockDirectory && !hasItems && /*#__PURE__*/_jsx(InserterNoResults, {}), prioritizePatterns ? patternsUI : blocksUI, !!filteredBlockTypes.length && !!filteredBlockPatterns.length && /*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__quick-inserter-separator"
    }), prioritizePatterns ? blocksUI : patternsUI, showBlockDirectory && /*#__PURE__*/_jsx(__unstableInserterMenuExtension.Slot, {
      fillProps: {
        onSelect: onSelectBlockType,
        onHover,
        filterValue,
        hasItems,
        rootClientId: destinationRootClientId
      },
      children: fills => {
        if (fills.length) {
          return fills;
        }
        if (!hasItems) {
          return /*#__PURE__*/_jsx(InserterNoResults, {});
        }
        return null;
      }
    })]
  });
}
export default InserterSearchResults;
//# sourceMappingURL=search-results.js.map
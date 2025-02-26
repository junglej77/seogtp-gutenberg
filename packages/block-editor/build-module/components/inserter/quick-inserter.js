/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, SearchControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import InserterSearchResults from './search-results';
import useInsertionPoint from './hooks/use-insertion-point';
import usePatternsState from './hooks/use-patterns-state';
import useBlockTypesState from './hooks/use-block-types-state';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const SEARCH_THRESHOLD = 6;
const SHOWN_BLOCK_TYPES = 6;
const SHOWN_BLOCK_PATTERNS = 2;
const SHOWN_BLOCK_PATTERNS_WITH_PRIORITIZATION = 4;
export default function QuickInserter({
  onSelect,
  rootClientId,
  clientId,
  isAppender,
  prioritizePatterns,
  selectBlockOnInsert,
  hasSearch = true
}) {
  const [filterValue, setFilterValue] = useState('');
  const [destinationRootClientId, onInsertBlocks] = useInsertionPoint({
    onSelect,
    rootClientId,
    clientId,
    isAppender,
    selectBlockOnInsert
  });
  const [blockTypes] = useBlockTypesState(destinationRootClientId, onInsertBlocks, true);
  const [patterns] = usePatternsState(onInsertBlocks, destinationRootClientId);
  const {
    setInserterIsOpened,
    insertionIndex
  } = useSelect(select => {
    const {
      getSettings,
      getBlockIndex,
      getBlockCount
    } = select(blockEditorStore);
    const settings = getSettings();
    const index = getBlockIndex(clientId);
    const blockCount = getBlockCount();
    return {
      setInserterIsOpened: settings.__experimentalSetIsInserterOpened,
      insertionIndex: index === -1 ? blockCount : index
    };
  }, [clientId]);
  const showPatterns = patterns.length && (!!filterValue || prioritizePatterns);
  const showSearch = hasSearch && (showPatterns && patterns.length > SEARCH_THRESHOLD || blockTypes.length > SEARCH_THRESHOLD);
  useEffect(() => {
    if (setInserterIsOpened) {
      setInserterIsOpened(false);
    }
  }, [setInserterIsOpened]);
  const {
    showInsertionPoint
  } = useDispatch(blockEditorStore);

  // When clicking Browse All select the appropriate block so as
  // the insertion point can work as expected.
  const onBrowseAll = () => {
    setInserterIsOpened({
      rootClientId,
      insertionIndex,
      filterValue,
      onSelect
    });
    showInsertionPoint(rootClientId, insertionIndex);
  };
  let maxBlockPatterns = 0;
  if (showPatterns) {
    maxBlockPatterns = prioritizePatterns ? SHOWN_BLOCK_PATTERNS_WITH_PRIORITIZATION : SHOWN_BLOCK_PATTERNS;
  }
  return /*#__PURE__*/_jsxs("div", {
    className: clsx('block-editor-inserter__quick-inserter', {
      'has-search': showSearch,
      'has-expand': setInserterIsOpened
    }),
    children: [showSearch && /*#__PURE__*/_jsx(SearchControl, {
      __nextHasNoMarginBottom: true,
      className: "block-editor-inserter__search",
      value: filterValue,
      onChange: value => {
        setFilterValue(value);
      },
      label: __('Search for blocks and patterns'),
      placeholder: __('Search')
    }), /*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__quick-inserter-results",
      children: /*#__PURE__*/_jsx(InserterSearchResults, {
        filterValue: filterValue,
        onSelect: onSelect,
        rootClientId: rootClientId,
        clientId: clientId,
        isAppender: isAppender,
        maxBlockPatterns: maxBlockPatterns,
        maxBlockTypes: SHOWN_BLOCK_TYPES,
        isDraggable: false,
        prioritizePatterns: prioritizePatterns,
        selectBlockOnInsert: selectBlockOnInsert,
        isQuick: true
      })
    }), setInserterIsOpened && /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "block-editor-inserter__quick-inserter-expand",
      onClick: onBrowseAll,
      "aria-label": __('Browse all. This will open the main inserter panel in the editor toolbar.'),
      children: __('Browse all')
    })]
  });
}
//# sourceMappingURL=quick-inserter.js.map
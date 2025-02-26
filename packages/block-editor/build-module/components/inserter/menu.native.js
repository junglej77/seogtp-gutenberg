/**
 * External dependencies
 */
import { AccessibilityInfo, TouchableHighlight, Platform } from 'react-native';

/**
 * WordPress dependencies
 */
import { useEffect, useState, useCallback } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { BottomSheet, BottomSheetConsumer, SearchControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import InserterSearchResults from './search-results';
import { store as blockEditorStore } from '../../store';
import InserterTabs from './tabs';
import styles from './style.scss';
import { filterInserterItems } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MIN_ITEMS_FOR_SEARCH = 2;
function InserterMenu({
  onSelect,
  onDismiss,
  rootClientId,
  clientId,
  isAppender,
  shouldReplaceBlock,
  insertionIndex
}) {
  const [filterValue, setFilterValue] = useState('');
  const [showTabs, setShowTabs] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const isIOS = Platform.OS === 'ios';
  const {
    showInsertionPoint,
    hideInsertionPoint,
    clearSelectedBlock,
    insertBlock,
    removeBlock,
    resetBlocks,
    insertDefaultBlock
  } = useDispatch(blockEditorStore);
  const {
    items,
    destinationRootClientId,
    showReusableBlocks
  } = useSelect(select => {
    const {
      getInserterItems,
      getBlockRootClientId,
      getBlockSelectionEnd
    } = select(blockEditorStore);
    let targetRootClientId = rootClientId;
    if (!targetRootClientId && !clientId && !isAppender) {
      const end = getBlockSelectionEnd();
      if (end) {
        targetRootClientId = getBlockRootClientId(end) || undefined;
      }
    }
    const allItems = getInserterItems(targetRootClientId);
    const reusableBlockItems = filterInserterItems(allItems, {
      onlyReusable: true
    });
    return {
      items: allItems,
      destinationRootClientId: targetRootClientId,
      showReusableBlocks: !!reusableBlockItems.length
    };
  });
  const {
    getBlockOrder,
    getBlockCount
  } = useSelect(blockEditorStore);
  useEffect(() => {
    // Show/Hide insertion point on Mount/Dismount
    if (shouldReplaceBlock) {
      const count = getBlockCount();
      // Check if there is a rootClientId because that means it is a nested replaceable block
      // and we don't want to clear/reset all blocks.
      if (count === 1 && !rootClientId) {
        // Removing the last block is not possilble with `removeBlock` action.
        // It always inserts a default block if the last of the blocks have been removed.
        clearSelectedBlock();
        resetBlocks([]);
      } else {
        const blockToReplace = getBlockOrder(destinationRootClientId)[insertionIndex];
        removeBlock(blockToReplace, false);
      }
    }
    showInsertionPoint(destinationRootClientId, insertionIndex);
    return hideInsertionPoint;
  }, []);
  const onClose = useCallback(() => {
    // If should replace but didn't insert any block
    // re-insert default block.
    if (shouldReplaceBlock) {
      insertDefaultBlock({}, destinationRootClientId, insertionIndex);
    }
    onDismiss();
  }, [shouldReplaceBlock, destinationRootClientId, insertionIndex]);
  const onInsert = useCallback(item => {
    const {
      name,
      initialAttributes,
      innerBlocks
    } = item;
    const newBlock = createBlock(name, initialAttributes, innerBlocks);
    insertBlock(newBlock, insertionIndex, destinationRootClientId, true, {
      source: 'inserter_menu'
    });
  }, [insertBlock, destinationRootClientId, insertionIndex]);
  const onSelectItem = useCallback(item => {
    // Avoid a focus loop, see https://github.com/WordPress/gutenberg/issues/30562
    if (Platform.OS === 'ios') {
      AccessibilityInfo.isScreenReaderEnabled().then(enabled => {
        // In testing, the bug focus loop needed a longer timeout when VoiceOver was enabled.
        const timeout = enabled ? 200 : 100;
        // eslint-disable-next-line @wordpress/react-no-unsafe-timeout
        setTimeout(() => {
          onInsert(item);
        }, timeout);
      });
    } else {
      onInsert(item);
    }
    onSelect(item);
  }, [onInsert, onSelect]);
  const onChangeSearch = useCallback(value => {
    setFilterValue(value);
  }, [setFilterValue]);
  const onKeyboardShow = useCallback(() => setShowTabs(false), [setShowTabs]);
  const onKeyboardHide = useCallback(() => setShowTabs(true), [setShowTabs]);
  const showSearchForm = items.length > MIN_ITEMS_FOR_SEARCH;
  const isFullScreen = !isIOS && showSearchForm;
  return /*#__PURE__*/_jsx(BottomSheet, {
    isVisible: true,
    onClose: onClose,
    onKeyboardShow: onKeyboardShow,
    onKeyboardHide: onKeyboardHide,
    header: /*#__PURE__*/_jsxs(_Fragment, {
      children: [showSearchForm && /*#__PURE__*/_jsx(SearchControl, {
        onChange: onChangeSearch,
        value: filterValue
      }), showTabs && !filterValue && /*#__PURE__*/_jsx(InserterTabs.Control, {
        onChangeTab: setTabIndex,
        showReusableBlocks: showReusableBlocks
      })]
    }),
    hasNavigation: true,
    setMinHeightToMaxHeight: true,
    contentStyle: styles['inserter-menu__list'],
    isFullScreen: isFullScreen,
    allowDragIndicator: true,
    children: /*#__PURE__*/_jsx(BottomSheetConsumer, {
      children: ({
        listProps
      }) => /*#__PURE__*/_jsx(TouchableHighlight, {
        accessible: false,
        style: styles['inserter-menu__list-wrapper'],
        children: !showTabs || filterValue ? /*#__PURE__*/_jsx(InserterSearchResults, {
          rootClientId: rootClientId,
          filterValue: filterValue,
          onSelect: onSelectItem,
          listProps: listProps,
          isFullScreen: isFullScreen
        }) : /*#__PURE__*/_jsx(InserterTabs, {
          rootClientId: rootClientId,
          listProps: listProps,
          tabIndex: tabIndex,
          onSelect: onSelectItem,
          showReusableBlocks: showReusableBlocks
        })
      })
    })
  });
}
export default InserterMenu;
//# sourceMappingURL=menu.native.js.map
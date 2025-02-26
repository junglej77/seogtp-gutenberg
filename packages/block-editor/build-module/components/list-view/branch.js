/**
 * WordPress dependencies
 */
import { __experimentalTreeGridRow as TreeGridRow, __experimentalTreeGridCell as TreeGridCell } from '@wordpress/components';
import { memo } from '@wordpress/element';
import { AsyncModeProvider, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { Appender } from './appender';
import ListViewBlock from './block';
import { useListViewContext } from './context';
import { getDragDisplacementValues, isClientIdSelected } from './utils';
import { store as blockEditorStore } from '../../store';
import useBlockDisplayInformation from '../use-block-display-information';

/**
 * Given a block, returns the total number of blocks in that subtree. This is used to help determine
 * the list position of a block.
 *
 * When a block is collapsed, we do not count their children as part of that total. In the current drag
 * implementation dragged blocks and their children are not counted.
 *
 * @param {Object}  block               block tree
 * @param {Object}  expandedState       state that notes which branches are collapsed
 * @param {Array}   draggedClientIds    a list of dragged client ids
 * @param {boolean} isExpandedByDefault flag to determine the default fallback expanded state.
 * @return {number} block count
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function countBlocks(block, expandedState, draggedClientIds, isExpandedByDefault) {
  var _expandedState$block$;
  const isDragged = draggedClientIds?.includes(block.clientId);
  if (isDragged) {
    return 0;
  }
  const isExpanded = (_expandedState$block$ = expandedState[block.clientId]) !== null && _expandedState$block$ !== void 0 ? _expandedState$block$ : isExpandedByDefault;
  if (isExpanded) {
    return 1 + block.innerBlocks.reduce(countReducer(expandedState, draggedClientIds, isExpandedByDefault), 0);
  }
  return 1;
}
const countReducer = (expandedState, draggedClientIds, isExpandedByDefault) => (count, block) => {
  var _expandedState$block$2;
  const isDragged = draggedClientIds?.includes(block.clientId);
  if (isDragged) {
    return count;
  }
  const isExpanded = (_expandedState$block$2 = expandedState[block.clientId]) !== null && _expandedState$block$2 !== void 0 ? _expandedState$block$2 : isExpandedByDefault;
  if (isExpanded && block.innerBlocks.length > 0) {
    return count + countBlocks(block, expandedState, draggedClientIds, isExpandedByDefault);
  }
  return count + 1;
};
const noop = () => {};
function ListViewBranch(props) {
  const {
    blocks,
    selectBlock = noop,
    showBlockMovers,
    selectedClientIds,
    level = 1,
    path = '',
    isBranchSelected = false,
    listPosition = 0,
    fixedListWindow,
    isExpanded,
    parentId,
    shouldShowInnerBlocks = true,
    isSyncedBranch = false,
    showAppender: showAppenderProp = true
  } = props;
  const parentBlockInformation = useBlockDisplayInformation(parentId);
  const syncedBranch = isSyncedBranch || !!parentBlockInformation?.isSynced;
  const canParentExpand = useSelect(select => {
    if (!parentId) {
      return true;
    }
    return select(blockEditorStore).canEditBlock(parentId);
  }, [parentId]);
  const {
    blockDropPosition,
    blockDropTargetIndex,
    firstDraggedBlockIndex,
    blockIndexes,
    expandedState,
    draggedClientIds
  } = useListViewContext();
  if (!canParentExpand) {
    return null;
  }

  // Only show the appender at the first level.
  const showAppender = showAppenderProp && level === 1;
  const filteredBlocks = blocks.filter(Boolean);
  const blockCount = filteredBlocks.length;
  // The appender means an extra row in List View, so add 1 to the row count.
  const rowCount = showAppender ? blockCount + 1 : blockCount;
  let nextPosition = listPosition;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [filteredBlocks.map((block, index) => {
      var _expandedState$client;
      const {
        clientId,
        innerBlocks
      } = block;
      if (index > 0) {
        nextPosition += countBlocks(filteredBlocks[index - 1], expandedState, draggedClientIds, isExpanded);
      }
      const isDragged = !!draggedClientIds?.includes(clientId);

      // Determine the displacement of the block while dragging. This
      // works out whether the current block should be displaced up or
      // down, relative to the dragged blocks and the drop target.
      const {
        displacement,
        isAfterDraggedBlocks,
        isNesting
      } = getDragDisplacementValues({
        blockIndexes,
        blockDropTargetIndex,
        blockDropPosition,
        clientId,
        firstDraggedBlockIndex,
        isDragged
      });
      const {
        itemInView
      } = fixedListWindow;
      const blockInView = itemInView(nextPosition);
      const position = index + 1;
      const updatedPath = path.length > 0 ? `${path}_${position}` : `${position}`;
      const hasNestedBlocks = !!innerBlocks?.length;
      const shouldExpand = hasNestedBlocks && shouldShowInnerBlocks ? (_expandedState$client = expandedState[clientId]) !== null && _expandedState$client !== void 0 ? _expandedState$client : isExpanded : undefined;

      // Make updates to the selected or dragged blocks synchronous,
      // but asynchronous for any other block.
      const isSelected = isClientIdSelected(clientId, selectedClientIds);
      const isSelectedBranch = isBranchSelected || isSelected && hasNestedBlocks;

      // To avoid performance issues, we only render blocks that are in view,
      // or blocks that are selected or dragged. If a block is selected,
      // it is only counted if it is the first of the block selection.
      // This prevents the entire tree from being rendered when a branch is
      // selected, or a user selects all blocks, while still enabling scroll
      // into view behavior when selecting a block or opening the list view.
      // The first and last blocks of the list are always rendered, to ensure
      // that Home and End keys work as expected.
      const showBlock = isDragged || blockInView || isSelected && clientId === selectedClientIds[0] || index === 0 || index === blockCount - 1;
      return /*#__PURE__*/_jsxs(AsyncModeProvider, {
        value: !isSelected,
        children: [showBlock && /*#__PURE__*/_jsx(ListViewBlock, {
          block: block,
          selectBlock: selectBlock,
          isSelected: isSelected,
          isBranchSelected: isSelectedBranch,
          isDragged: isDragged,
          level: level,
          position: position,
          rowCount: rowCount,
          siblingBlockCount: blockCount,
          showBlockMovers: showBlockMovers,
          path: updatedPath,
          isExpanded: isDragged ? false : shouldExpand,
          listPosition: nextPosition,
          selectedClientIds: selectedClientIds,
          isSyncedBranch: syncedBranch,
          displacement: displacement,
          isAfterDraggedBlocks: isAfterDraggedBlocks,
          isNesting: isNesting
        }), !showBlock && /*#__PURE__*/_jsx("tr", {
          children: /*#__PURE__*/_jsx("td", {
            className: "block-editor-list-view-placeholder"
          })
        }), hasNestedBlocks && shouldExpand && !isDragged && /*#__PURE__*/_jsx(ListViewBranch, {
          parentId: clientId,
          blocks: innerBlocks,
          selectBlock: selectBlock,
          showBlockMovers: showBlockMovers,
          level: level + 1,
          path: updatedPath,
          listPosition: nextPosition + 1,
          fixedListWindow: fixedListWindow,
          isBranchSelected: isSelectedBranch,
          selectedClientIds: selectedClientIds,
          isExpanded: isExpanded,
          isSyncedBranch: syncedBranch
        })]
      }, clientId);
    }), showAppender && /*#__PURE__*/_jsx(TreeGridRow, {
      level: level,
      setSize: rowCount,
      positionInSet: rowCount,
      isExpanded: true,
      children: /*#__PURE__*/_jsx(TreeGridCell, {
        children: treeGridCellProps => /*#__PURE__*/_jsx(Appender, {
          clientId: parentId,
          nestingLevel: level,
          blockCount: blockCount,
          ...treeGridCellProps
        })
      })
    })]
  });
}
export default memo(ListViewBranch);
//# sourceMappingURL=branch.js.map
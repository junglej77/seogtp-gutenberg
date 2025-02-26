/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { switchToBlockType, store as blocksStore } from '@wordpress/blocks';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { group, row, stack, grid } from '@wordpress/icons';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useConvertToGroupButtonProps } from '../convert-to-group-buttons';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const layouts = {
  group: {
    type: 'constrained'
  },
  row: {
    type: 'flex',
    flexWrap: 'nowrap'
  },
  stack: {
    type: 'flex',
    orientation: 'vertical'
  },
  grid: {
    type: 'grid'
  }
};
function BlockGroupToolbar() {
  const {
    blocksSelection,
    clientIds,
    groupingBlockName,
    isGroupable
  } = useConvertToGroupButtonProps();
  const {
    replaceBlocks
  } = useDispatch(blockEditorStore);
  const {
    canRemove,
    variations
  } = useSelect(select => {
    const {
      canRemoveBlocks
    } = select(blockEditorStore);
    const {
      getBlockVariations
    } = select(blocksStore);
    return {
      canRemove: canRemoveBlocks(clientIds),
      variations: getBlockVariations(groupingBlockName, 'transform')
    };
  }, [clientIds, groupingBlockName]);
  const onConvertToGroup = layout => {
    const newBlocks = switchToBlockType(blocksSelection, groupingBlockName);
    if (typeof layout !== 'string') {
      layout = 'group';
    }
    if (newBlocks && newBlocks.length > 0) {
      // Because the block is not in the store yet we can't use
      // updateBlockAttributes so need to manually update attributes.
      newBlocks[0].attributes.layout = layouts[layout];
      replaceBlocks(clientIds, newBlocks);
    }
  };
  const onConvertToRow = () => onConvertToGroup('row');
  const onConvertToStack = () => onConvertToGroup('stack');
  const onConvertToGrid = () => onConvertToGroup('grid');

  // Don't render the button if the current selection cannot be grouped.
  // A good example is selecting multiple button blocks within a Buttons block:
  // The group block is not a valid child of Buttons, so we should not show the button.
  // Any blocks that are locked against removal also cannot be grouped.
  if (!isGroupable || !canRemove) {
    return null;
  }
  const canInsertRow = !!variations.find(({
    name
  }) => name === 'group-row');
  const canInsertStack = !!variations.find(({
    name
  }) => name === 'group-stack');
  const canInsertGrid = !!variations.find(({
    name
  }) => name === 'group-grid');
  return /*#__PURE__*/_jsxs(ToolbarGroup, {
    children: [/*#__PURE__*/_jsx(ToolbarButton, {
      icon: group,
      label: _x('Group', 'verb'),
      onClick: onConvertToGroup
    }), canInsertRow && /*#__PURE__*/_jsx(ToolbarButton, {
      icon: row,
      label: _x('Row', 'single horizontal line'),
      onClick: onConvertToRow
    }), canInsertStack && /*#__PURE__*/_jsx(ToolbarButton, {
      icon: stack,
      label: _x('Stack', 'verb'),
      onClick: onConvertToStack
    }), canInsertGrid && /*#__PURE__*/_jsx(ToolbarButton, {
      icon: grid,
      label: _x('Grid', 'verb'),
      onClick: onConvertToGrid
    })]
  });
}
export default BlockGroupToolbar;
//# sourceMappingURL=toolbar.js.map
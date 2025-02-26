/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockActionsMenu from './block-toolbar-menu';
import BlockControls from '../block-controls';
import BlockMover from '../block-mover';
import UngroupButton from '../ungroup-button';
import { BlockSettingsButton } from '../block-settings';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const REMOVE_EMPY_PARENT_BLOCKS = ['core/buttons', 'core/columns', 'core/social-links'];
export default function BlockToolbar({
  anchorNodeRef
}) {
  const {
    rootClientId,
    blockClientId,
    isSelected,
    isValidAndVisual,
    isStackedHorizontally,
    parentBlockName,
    parentNumberOfInnerBlocks
  } = useSelect(select => {
    const {
      getBlockListSettings,
      getBlockMode,
      getBlockName,
      getBlockCount,
      getBlockRootClientId,
      getSelectedBlockClientIds,
      isBlockValid
    } = select(blockEditorStore);
    const selectedBlockClientIds = getSelectedBlockClientIds();
    const selectedBlockClientId = selectedBlockClientIds[0];
    const blockRootClientId = getBlockRootClientId(selectedBlockClientId);
    const blockListSettings = getBlockListSettings(blockRootClientId);
    const orientation = blockListSettings?.orientation;
    const isBlockStackedHorizontally = orientation === 'horizontal';
    const parentName = getBlockName(blockRootClientId);
    const numberOfInnerBlocks = getBlockCount(blockRootClientId);
    return {
      rootClientId: blockRootClientId,
      blockClientId: selectedBlockClientId,
      isSelected: selectedBlockClientIds.length > 0,
      isStackedHorizontally: isBlockStackedHorizontally,
      parentBlockName: parentName,
      parentNumberOfInnerBlocks: numberOfInnerBlocks,
      isValidAndVisual: selectedBlockClientIds.length === 1 ? isBlockValid(selectedBlockClientIds[0]) && getBlockMode(selectedBlockClientIds[0]) === 'visual' : false
    };
  }, []);
  const {
    removeBlock
  } = useDispatch(blockEditorStore);
  const onRemove = useCallback(() => {
    // Temp: remove parent block for specific cases where they don't
    // have inner blocks, ideally we should match the behavior as in
    // the Web editor and show a placeholder instead of removing the parent.
    if (REMOVE_EMPY_PARENT_BLOCKS.includes(parentBlockName) && parentNumberOfInnerBlocks === 1) {
      removeBlock(rootClientId);
      return;
    }
    removeBlock(blockClientId);
  }, [blockClientId, parentBlockName, parentNumberOfInnerBlocks, removeBlock, rootClientId]);
  if (!isSelected) {
    return null;
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: isValidAndVisual && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(BlockSettingsButton.Slot, {
        children: (fills = [null]) => {
          if (!fills?.length > 0) {
            return null;
          }
          return fills[0];
        }
      }), /*#__PURE__*/_jsx(BlockControls.Slot, {
        group: "block"
      }), /*#__PURE__*/_jsx(BlockControls.Slot, {}), /*#__PURE__*/_jsx(BlockControls.Slot, {
        group: "inline"
      }), /*#__PURE__*/_jsx(BlockControls.Slot, {
        group: "other"
      }), /*#__PURE__*/_jsx(UngroupButton, {}), /*#__PURE__*/_jsx(BlockMover, {
        clientIds: [blockClientId],
        isStackedHorizontally: isStackedHorizontally
      }), /*#__PURE__*/_jsx(BlockActionsMenu, {
        clientId: blockClientId,
        isStackedHorizontally: isStackedHorizontally,
        onDelete: onRemove,
        anchorNodeRef: anchorNodeRef
      })]
    })
  });
}
//# sourceMappingURL=index.native.js.map
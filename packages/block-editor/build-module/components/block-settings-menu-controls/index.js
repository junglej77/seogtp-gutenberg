/**
 * WordPress dependencies
 */
import { createSlotFill, MenuGroup, MenuItem, __experimentalStyleProvider as StyleProvider } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { pipe } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useConvertToGroupButtonProps, ConvertToGroupButton } from '../convert-to-group-buttons';
import { BlockLockMenuItem, useBlockLock } from '../block-lock';
import { store as blockEditorStore } from '../../store';
import BlockModeToggle from '../block-settings-menu/block-mode-toggle';
import { ModifyContentLockMenuItem } from '../content-lock';
import { BlockRenameControl, useBlockRename } from '../block-rename';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('BlockSettingsMenuControls');
const BlockSettingsMenuControlsSlot = ({
  fillProps,
  clientIds = null
}) => {
  const {
    selectedBlocks,
    selectedClientIds,
    isContentOnly
  } = useSelect(select => {
    const {
      getBlockNamesByClientId,
      getSelectedBlockClientIds,
      getBlockEditingMode
    } = select(blockEditorStore);
    const ids = clientIds !== null ? clientIds : getSelectedBlockClientIds();
    return {
      selectedBlocks: getBlockNamesByClientId(ids),
      selectedClientIds: ids,
      isContentOnly: getBlockEditingMode(ids[0]) === 'contentOnly'
    };
  }, [clientIds]);
  const {
    canLock
  } = useBlockLock(selectedClientIds[0]);
  const {
    canRename
  } = useBlockRename(selectedBlocks[0]);
  const showLockButton = selectedClientIds.length === 1 && canLock && !isContentOnly;
  const showRenameButton = selectedClientIds.length === 1 && canRename && !isContentOnly;

  // Check if current selection of blocks is Groupable or Ungroupable
  // and pass this props down to ConvertToGroupButton.
  const convertToGroupButtonProps = useConvertToGroupButtonProps(selectedClientIds);
  const {
    isGroupable,
    isUngroupable
  } = convertToGroupButtonProps;
  const showConvertToGroupButton = isGroupable || isUngroupable;
  return /*#__PURE__*/_jsx(Slot, {
    fillProps: {
      ...fillProps,
      selectedBlocks,
      selectedClientIds
    },
    children: fills => {
      if (!fills?.length > 0 && !showConvertToGroupButton && !showLockButton) {
        return null;
      }
      return /*#__PURE__*/_jsxs(MenuGroup, {
        children: [showConvertToGroupButton && /*#__PURE__*/_jsx(ConvertToGroupButton, {
          ...convertToGroupButtonProps,
          onClose: fillProps?.onClose
        }), showLockButton && /*#__PURE__*/_jsx(BlockLockMenuItem, {
          clientId: selectedClientIds[0]
        }), showRenameButton && /*#__PURE__*/_jsx(BlockRenameControl, {
          clientId: selectedClientIds[0]
        }), fills, fillProps?.canMove && !fillProps?.onlyBlock && !isContentOnly && /*#__PURE__*/_jsx(MenuItem, {
          onClick: pipe(fillProps?.onClose, fillProps?.onMoveTo),
          children: __('Move to')
        }), selectedClientIds.length === 1 && /*#__PURE__*/_jsx(ModifyContentLockMenuItem, {
          clientId: selectedClientIds[0],
          onClose: fillProps?.onClose
        }), fillProps?.count === 1 && !isContentOnly && /*#__PURE__*/_jsx(BlockModeToggle, {
          clientId: fillProps?.firstBlockClientId,
          onToggle: fillProps?.onClose
        })]
      });
    }
  });
};

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/block-settings-menu-controls/README.md
 *
 * @param {Object} props Fill props.
 * @return {Element} Element.
 */
function BlockSettingsMenuControls({
  ...props
}) {
  return /*#__PURE__*/_jsx(StyleProvider, {
    document: document,
    children: /*#__PURE__*/_jsx(Fill, {
      ...props
    })
  });
}
BlockSettingsMenuControls.Slot = BlockSettingsMenuControlsSlot;
export default BlockSettingsMenuControls;
//# sourceMappingURL=index.js.map
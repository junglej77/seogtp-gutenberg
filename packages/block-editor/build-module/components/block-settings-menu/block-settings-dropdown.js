/**
 * WordPress dependencies
 */
import { getBlockType, serialize, store as blocksStore } from '@wordpress/blocks';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { moreVertical } from '@wordpress/icons';
import { Children, cloneElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { displayShortcut } from '@wordpress/keycodes';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { pipe, useCopyToClipboard } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockActions from '../block-actions';
import BlockHTMLConvertButton from './block-html-convert-button';
import __unstableBlockSettingsMenuFirstItem from './block-settings-menu-first-item';
import BlockSettingsMenuControls from '../block-settings-menu-controls';
import BlockParentSelectorMenuItem from './block-parent-selector-menu-item';
import { store as blockEditorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const POPOVER_PROPS = {
  className: 'block-editor-block-settings-menu__popover',
  placement: 'bottom-start'
};
function CopyMenuItem({
  clientIds,
  onCopy,
  label,
  shortcut
}) {
  const {
    getBlocksByClientId
  } = useSelect(blockEditorStore);
  const ref = useCopyToClipboard(() => serialize(getBlocksByClientId(clientIds)), onCopy);
  const copyMenuItemLabel = label ? label : __('Copy');
  return /*#__PURE__*/_jsx(MenuItem, {
    ref: ref,
    shortcut: shortcut,
    children: copyMenuItemLabel
  });
}
export function BlockSettingsDropdown({
  block,
  clientIds,
  children,
  __experimentalSelectBlock,
  ...props
}) {
  // Get the client id of the current block for this menu, if one is set.
  const currentClientId = block?.clientId;
  const count = clientIds.length;
  const firstBlockClientId = clientIds[0];
  const {
    firstParentClientId,
    onlyBlock,
    parentBlockType,
    previousBlockClientId,
    selectedBlockClientIds,
    openedBlockSettingsMenu,
    isContentOnly
  } = useSelect(select => {
    const {
      getBlockCount,
      getBlockName,
      getBlockRootClientId,
      getPreviousBlockClientId,
      getSelectedBlockClientIds,
      getBlockAttributes,
      getOpenedBlockSettingsMenu,
      getBlockEditingMode
    } = unlock(select(blockEditorStore));
    const {
      getActiveBlockVariation
    } = select(blocksStore);
    const _firstParentClientId = getBlockRootClientId(firstBlockClientId);
    const parentBlockName = _firstParentClientId && getBlockName(_firstParentClientId);
    return {
      firstParentClientId: _firstParentClientId,
      onlyBlock: 1 === getBlockCount(_firstParentClientId),
      parentBlockType: _firstParentClientId && (getActiveBlockVariation(parentBlockName, getBlockAttributes(_firstParentClientId)) || getBlockType(parentBlockName)),
      previousBlockClientId: getPreviousBlockClientId(firstBlockClientId),
      selectedBlockClientIds: getSelectedBlockClientIds(),
      openedBlockSettingsMenu: getOpenedBlockSettingsMenu(),
      isContentOnly: getBlockEditingMode(firstBlockClientId) === 'contentOnly'
    };
  }, [firstBlockClientId]);
  const {
    getBlockOrder,
    getSelectedBlockClientIds
  } = useSelect(blockEditorStore);
  const {
    setOpenedBlockSettingsMenu
  } = unlock(useDispatch(blockEditorStore));
  const shortcuts = useSelect(select => {
    const {
      getShortcutRepresentation
    } = select(keyboardShortcutsStore);
    return {
      duplicate: getShortcutRepresentation('core/block-editor/duplicate'),
      remove: getShortcutRepresentation('core/block-editor/remove'),
      insertAfter: getShortcutRepresentation('core/block-editor/insert-after'),
      insertBefore: getShortcutRepresentation('core/block-editor/insert-before')
    };
  }, []);
  const hasSelectedBlocks = selectedBlockClientIds.length > 0;
  async function updateSelectionAfterDuplicate(clientIdsPromise) {
    if (!__experimentalSelectBlock) {
      return;
    }
    const ids = await clientIdsPromise;
    if (ids && ids[0]) {
      __experimentalSelectBlock(ids[0], false);
    }
  }
  function updateSelectionAfterRemove() {
    if (!__experimentalSelectBlock) {
      return;
    }
    let blockToFocus = previousBlockClientId || firstParentClientId;

    // Focus the first block if there's no previous block nor parent block.
    if (!blockToFocus) {
      blockToFocus = getBlockOrder()[0];
    }

    // Only update the selection if the original selection is removed.
    const shouldUpdateSelection = hasSelectedBlocks && getSelectedBlockClientIds().length === 0;
    __experimentalSelectBlock(blockToFocus, shouldUpdateSelection);
  }

  // This can occur when the selected block (the parent)
  // displays child blocks within a List View.
  const parentBlockIsSelected = selectedBlockClientIds?.includes(firstParentClientId);

  // When a currentClientId is in use, treat the menu as a controlled component.
  // This ensures that only one block settings menu is open at a time.
  // This is a temporary solution to work around an issue with `onFocusOutside`
  // where it does not allow a dropdown to be closed if focus was never within
  // the dropdown to begin with. Examples include a user either CMD+Clicking or
  // right clicking into an inactive window.
  // See: https://github.com/WordPress/gutenberg/pull/54083
  const open = !currentClientId ? undefined : openedBlockSettingsMenu === currentClientId || false;
  function onToggle(localOpen) {
    if (localOpen && openedBlockSettingsMenu !== currentClientId) {
      setOpenedBlockSettingsMenu(currentClientId);
    } else if (!localOpen && openedBlockSettingsMenu && openedBlockSettingsMenu === currentClientId) {
      setOpenedBlockSettingsMenu(undefined);
    }
  }
  return /*#__PURE__*/_jsx(BlockActions, {
    clientIds: clientIds,
    __experimentalUpdateSelection: !__experimentalSelectBlock,
    children: ({
      canCopyStyles,
      canDuplicate,
      canInsertBlock,
      canMove,
      canRemove,
      onDuplicate,
      onInsertAfter,
      onInsertBefore,
      onRemove,
      onCopy,
      onPasteStyles,
      onMoveTo
    }) => /*#__PURE__*/_jsx(DropdownMenu, {
      icon: moreVertical,
      label: __('Options'),
      className: "block-editor-block-settings-menu",
      popoverProps: POPOVER_PROPS,
      open: open,
      onToggle: onToggle,
      noIcons: true,
      ...props,
      children: ({
        onClose
      }) => /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(MenuGroup, {
          children: [/*#__PURE__*/_jsx(__unstableBlockSettingsMenuFirstItem.Slot, {
            fillProps: {
              onClose
            }
          }), !parentBlockIsSelected && !!firstParentClientId && /*#__PURE__*/_jsx(BlockParentSelectorMenuItem, {
            parentClientId: firstParentClientId,
            parentBlockType: parentBlockType
          }), count === 1 && /*#__PURE__*/_jsx(BlockHTMLConvertButton, {
            clientId: firstBlockClientId
          }), !isContentOnly && /*#__PURE__*/_jsx(CopyMenuItem, {
            clientIds: clientIds,
            onCopy: onCopy,
            shortcut: displayShortcut.primary('c')
          }), canDuplicate && /*#__PURE__*/_jsx(MenuItem, {
            onClick: pipe(onClose, onDuplicate, updateSelectionAfterDuplicate),
            shortcut: shortcuts.duplicate,
            children: __('Duplicate')
          }), canInsertBlock && !isContentOnly && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(MenuItem, {
              onClick: pipe(onClose, onInsertBefore),
              shortcut: shortcuts.insertBefore,
              children: __('Add before')
            }), /*#__PURE__*/_jsx(MenuItem, {
              onClick: pipe(onClose, onInsertAfter),
              shortcut: shortcuts.insertAfter,
              children: __('Add after')
            })]
          })]
        }), canCopyStyles && !isContentOnly && /*#__PURE__*/_jsxs(MenuGroup, {
          children: [/*#__PURE__*/_jsx(CopyMenuItem, {
            clientIds: clientIds,
            onCopy: onCopy,
            label: __('Copy styles')
          }), /*#__PURE__*/_jsx(MenuItem, {
            onClick: onPasteStyles,
            children: __('Paste styles')
          })]
        }), /*#__PURE__*/_jsx(BlockSettingsMenuControls.Slot, {
          fillProps: {
            onClose,
            canMove,
            onMoveTo,
            onlyBlock,
            count,
            firstBlockClientId
          },
          clientIds: clientIds
        }), typeof children === 'function' ? children({
          onClose
        }) : Children.map(child => cloneElement(child, {
          onClose
        })), canRemove && /*#__PURE__*/_jsx(MenuGroup, {
          children: /*#__PURE__*/_jsx(MenuItem, {
            onClick: pipe(onClose, onRemove, updateSelectionAfterRemove),
            shortcut: shortcuts.remove,
            children: __('Delete')
          })
        })]
      })
    })
  });
}
export default BlockSettingsDropdown;
//# sourceMappingURL=block-settings-dropdown.js.map
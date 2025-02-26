/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { addSubmenu, chevronUp, chevronDown, moreVertical } from '@wordpress/icons';
import { DropdownMenu, MenuItem, MenuGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { BlockTitle, store as blockEditorStore } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const POPOVER_PROPS = {
  className: 'block-editor-block-settings-menu__popover',
  placement: 'bottom-start'
};
const BLOCKS_THAT_CAN_BE_CONVERTED_TO_SUBMENU = ['core/navigation-link', 'core/navigation-submenu'];
function AddSubmenuItem({
  block,
  onClose,
  expandedState,
  expand,
  setInsertedBlock
}) {
  const {
    insertBlock,
    replaceBlock,
    replaceInnerBlocks
  } = useDispatch(blockEditorStore);
  const clientId = block.clientId;
  const isDisabled = !BLOCKS_THAT_CAN_BE_CONVERTED_TO_SUBMENU.includes(block.name);
  return /*#__PURE__*/_jsx(MenuItem, {
    icon: addSubmenu,
    disabled: isDisabled,
    onClick: () => {
      const updateSelectionOnInsert = false;
      const newLink = createBlock('core/navigation-link');
      if (block.name === 'core/navigation-submenu') {
        insertBlock(newLink, block.innerBlocks.length, clientId, updateSelectionOnInsert);
      } else {
        // Convert to a submenu if the block currently isn't one.
        const newSubmenu = createBlock('core/navigation-submenu', block.attributes, block.innerBlocks);

        // The following must happen as two independent actions.
        // Why? Because the offcanvas editor relies on the getLastInsertedBlocksClientIds
        // selector to determine which block is "active". As the UX needs the newLink to be
        // the "active" block it must be the last block to be inserted.
        // Therefore the Submenu is first created and **then** the newLink is inserted
        // thus ensuring it is the last inserted block.
        replaceBlock(clientId, newSubmenu);
        replaceInnerBlocks(newSubmenu.clientId, [newLink], updateSelectionOnInsert);
      }

      // This call sets the local List View state for the "last inserted block".
      // This is required for the Nav Block to determine whether or not to display
      // the Link UI for this new block.
      setInsertedBlock(newLink);
      if (!expandedState[block.clientId]) {
        expand(block.clientId);
      }
      onClose();
    },
    children: __('Add submenu link')
  });
}
export default function LeafMoreMenu(props) {
  const {
    block
  } = props;
  const {
    clientId
  } = block;
  const {
    moveBlocksDown,
    moveBlocksUp,
    removeBlocks
  } = useDispatch(blockEditorStore);
  const removeLabel = sprintf( /* translators: %s: block name */
  __('Remove %s'), BlockTitle({
    clientId,
    maximumLength: 25
  }));
  const rootClientId = useSelect(select => {
    const {
      getBlockRootClientId
    } = select(blockEditorStore);
    return getBlockRootClientId(clientId);
  }, [clientId]);
  return /*#__PURE__*/_jsx(DropdownMenu, {
    icon: moreVertical,
    label: __('Options'),
    className: "block-editor-block-settings-menu",
    popoverProps: POPOVER_PROPS,
    noIcons: true,
    ...props,
    children: ({
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(MenuGroup, {
        children: [/*#__PURE__*/_jsx(MenuItem, {
          icon: chevronUp,
          onClick: () => {
            moveBlocksUp([clientId], rootClientId);
            onClose();
          },
          children: __('Move up')
        }), /*#__PURE__*/_jsx(MenuItem, {
          icon: chevronDown,
          onClick: () => {
            moveBlocksDown([clientId], rootClientId);
            onClose();
          },
          children: __('Move down')
        }), /*#__PURE__*/_jsx(AddSubmenuItem, {
          block: block,
          onClose: onClose,
          expanded: true,
          expandedState: props.expandedState,
          expand: props.expand,
          setInsertedBlock: props.setInsertedBlock
        })]
      }), /*#__PURE__*/_jsx(MenuGroup, {
        children: /*#__PURE__*/_jsx(MenuItem, {
          onClick: () => {
            removeBlocks([clientId], false);
            onClose();
          },
          children: removeLabel
        })
      })]
    })
  });
}
//# sourceMappingURL=leaf-more-menu.js.map
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */

import { dragHandle } from '@wordpress/icons';
import { ToolbarGroup, ToolbarItem, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockDraggable from '../block-draggable';
import { BlockMoverUpButton, BlockMoverDownButton } from './button';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BlockMover({
  clientIds,
  hideDragHandle,
  isBlockMoverUpButtonDisabled,
  isBlockMoverDownButtonDisabled
}) {
  const {
    canMove,
    rootClientId,
    isFirst,
    isLast,
    orientation,
    isManualGrid
  } = useSelect(select => {
    var _getBlockAttributes;
    const {
      getBlockIndex,
      getBlockListSettings,
      canMoveBlocks,
      getBlockOrder,
      getBlockRootClientId,
      getBlockAttributes
    } = select(blockEditorStore);
    const normalizedClientIds = Array.isArray(clientIds) ? clientIds : [clientIds];
    const firstClientId = normalizedClientIds[0];
    const _rootClientId = getBlockRootClientId(firstClientId);
    const firstIndex = getBlockIndex(firstClientId);
    const lastIndex = getBlockIndex(normalizedClientIds[normalizedClientIds.length - 1]);
    const blockOrder = getBlockOrder(_rootClientId);
    const {
      layout = {}
    } = (_getBlockAttributes = getBlockAttributes(_rootClientId)) !== null && _getBlockAttributes !== void 0 ? _getBlockAttributes : {};
    return {
      canMove: canMoveBlocks(clientIds),
      rootClientId: _rootClientId,
      isFirst: firstIndex === 0,
      isLast: lastIndex === blockOrder.length - 1,
      orientation: getBlockListSettings(_rootClientId)?.orientation,
      isManualGrid: layout.type === 'grid' && layout.isManualPlacement && window.__experimentalEnableGridInteractivity
    };
  }, [clientIds]);
  if (!canMove || isFirst && isLast && !rootClientId || hideDragHandle && isManualGrid) {
    return null;
  }
  return /*#__PURE__*/_jsxs(ToolbarGroup, {
    className: clsx('block-editor-block-mover', {
      'is-horizontal': orientation === 'horizontal'
    }),
    children: [!hideDragHandle && /*#__PURE__*/_jsx(BlockDraggable, {
      clientIds: clientIds,
      fadeWhenDisabled: true,
      children: draggableProps => /*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        icon: dragHandle,
        className: "block-editor-block-mover__drag-handle",
        label: __('Drag')
        // Should not be able to tab to drag handle as this
        // button can only be used with a pointer device.
        ,
        tabIndex: "-1",
        ...draggableProps
      })
    }), !isManualGrid && /*#__PURE__*/_jsxs("div", {
      className: "block-editor-block-mover__move-button-container",
      children: [/*#__PURE__*/_jsx(ToolbarItem, {
        children: itemProps => /*#__PURE__*/_jsx(BlockMoverUpButton, {
          disabled: isBlockMoverUpButtonDisabled,
          clientIds: clientIds,
          ...itemProps
        })
      }), /*#__PURE__*/_jsx(ToolbarItem, {
        children: itemProps => /*#__PURE__*/_jsx(BlockMoverDownButton, {
          disabled: isBlockMoverDownButtonDisabled,
          clientIds: clientIds,
          ...itemProps
        })
      })]
    })]
  });
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/block-mover/README.md
 */
export default BlockMover;
//# sourceMappingURL=index.js.map
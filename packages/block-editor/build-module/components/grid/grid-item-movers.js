/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { VisuallyHidden, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { chevronLeft, chevronUp, chevronDown, chevronRight } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockControls from '../block-controls';
import { useGetNumberOfBlocksBeforeCell } from './use-get-number-of-blocks-before-cell';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function GridItemMovers({
  layout,
  parentLayout,
  onChange,
  gridClientId,
  blockClientId
}) {
  var _layout$columnStart, _layout$rowStart, _layout$columnSpan, _layout$rowSpan;
  const {
    moveBlocksToPosition,
    __unstableMarkNextChangeAsNotPersistent
  } = useDispatch(blockEditorStore);
  const columnStart = (_layout$columnStart = layout?.columnStart) !== null && _layout$columnStart !== void 0 ? _layout$columnStart : 1;
  const rowStart = (_layout$rowStart = layout?.rowStart) !== null && _layout$rowStart !== void 0 ? _layout$rowStart : 1;
  const columnSpan = (_layout$columnSpan = layout?.columnSpan) !== null && _layout$columnSpan !== void 0 ? _layout$columnSpan : 1;
  const rowSpan = (_layout$rowSpan = layout?.rowSpan) !== null && _layout$rowSpan !== void 0 ? _layout$rowSpan : 1;
  const columnEnd = columnStart + columnSpan - 1;
  const rowEnd = rowStart + rowSpan - 1;
  const columnCount = parentLayout?.columnCount;
  const rowCount = parentLayout?.rowCount;
  const getNumberOfBlocksBeforeCell = useGetNumberOfBlocksBeforeCell(gridClientId, columnCount);
  return /*#__PURE__*/_jsx(BlockControls, {
    group: "parent",
    children: /*#__PURE__*/_jsxs(ToolbarGroup, {
      className: "block-editor-grid-item-mover__move-button-container",
      children: [/*#__PURE__*/_jsx("div", {
        className: "block-editor-grid-item-mover__move-horizontal-button-container is-left",
        children: /*#__PURE__*/_jsx(GridItemMover, {
          icon: isRTL() ? chevronRight : chevronLeft,
          label: __('Move left'),
          description: __('Move left'),
          isDisabled: columnStart <= 1,
          onClick: () => {
            onChange({
              columnStart: columnStart - 1
            });
            __unstableMarkNextChangeAsNotPersistent();
            moveBlocksToPosition([blockClientId], gridClientId, gridClientId, getNumberOfBlocksBeforeCell(columnStart - 1, rowStart));
          }
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "block-editor-grid-item-mover__move-vertical-button-container",
        children: [/*#__PURE__*/_jsx(GridItemMover, {
          className: "is-up-button",
          icon: chevronUp,
          label: __('Move up'),
          description: __('Move up'),
          isDisabled: rowStart <= 1,
          onClick: () => {
            onChange({
              rowStart: rowStart - 1
            });
            __unstableMarkNextChangeAsNotPersistent();
            moveBlocksToPosition([blockClientId], gridClientId, gridClientId, getNumberOfBlocksBeforeCell(columnStart, rowStart - 1));
          }
        }), /*#__PURE__*/_jsx(GridItemMover, {
          className: "is-down-button",
          icon: chevronDown,
          label: __('Move down'),
          description: __('Move down'),
          isDisabled: rowCount && rowEnd >= rowCount,
          onClick: () => {
            onChange({
              rowStart: rowStart + 1
            });
            __unstableMarkNextChangeAsNotPersistent();
            moveBlocksToPosition([blockClientId], gridClientId, gridClientId, getNumberOfBlocksBeforeCell(columnStart, rowStart + 1));
          }
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "block-editor-grid-item-mover__move-horizontal-button-container is-right",
        children: /*#__PURE__*/_jsx(GridItemMover, {
          icon: isRTL() ? chevronLeft : chevronRight,
          label: __('Move right'),
          description: __('Move right'),
          isDisabled: columnCount && columnEnd >= columnCount,
          onClick: () => {
            onChange({
              columnStart: columnStart + 1
            });
            __unstableMarkNextChangeAsNotPersistent();
            moveBlocksToPosition([blockClientId], gridClientId, gridClientId, getNumberOfBlocksBeforeCell(columnStart + 1, rowStart));
          }
        })
      })]
    })
  });
}
function GridItemMover({
  className,
  icon,
  label,
  isDisabled,
  onClick,
  description
}) {
  const instanceId = useInstanceId(GridItemMover);
  const descriptionId = `block-editor-grid-item-mover-button__description-${instanceId}`;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToolbarButton, {
      className: clsx('block-editor-grid-item-mover-button', className),
      icon: icon,
      label: label,
      "aria-describedby": descriptionId,
      onClick: isDisabled ? null : onClick,
      disabled: isDisabled,
      accessibleWhenDisabled: true
    }), /*#__PURE__*/_jsx(VisuallyHidden, {
      id: descriptionId,
      children: description
    })]
  });
}
//# sourceMappingURL=grid-item-movers.js.map
/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { Flex, FlexItem } from '@wordpress/components';
import { dragHandle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BlockDraggableChip({
  count,
  icon,
  isPattern,
  fadeWhenDisabled
}) {
  const patternLabel = isPattern && __('Pattern');
  return /*#__PURE__*/_jsx("div", {
    className: "block-editor-block-draggable-chip-wrapper",
    children: /*#__PURE__*/_jsx("div", {
      className: "block-editor-block-draggable-chip",
      "data-testid": "block-draggable-chip",
      children: /*#__PURE__*/_jsxs(Flex, {
        justify: "center",
        className: "block-editor-block-draggable-chip__content",
        children: [/*#__PURE__*/_jsx(FlexItem, {
          children: icon ? /*#__PURE__*/_jsx(BlockIcon, {
            icon: icon
          }) : patternLabel || sprintf( /* translators: %d: Number of blocks. */
          _n('%d block', '%d blocks', count), count)
        }), /*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(BlockIcon, {
            icon: dragHandle
          })
        }), fadeWhenDisabled && /*#__PURE__*/_jsx(FlexItem, {
          className: "block-editor-block-draggable-chip__disabled",
          children: /*#__PURE__*/_jsx("span", {
            className: "block-editor-block-draggable-chip__disabled-icon"
          })
        })]
      })
    })
  });
}
//# sourceMappingURL=draggable-chip.js.map
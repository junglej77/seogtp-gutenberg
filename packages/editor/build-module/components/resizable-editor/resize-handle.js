/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { LEFT, RIGHT } from '@wordpress/keycodes';
import { VisuallyHidden, Tooltip, __unstableMotion as motion } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DELTA_DISTANCE = 20; // The distance to resize per keydown in pixels.

export default function ResizeHandle({
  direction,
  resizeWidthBy
}) {
  function handleKeyDown(event) {
    const {
      keyCode
    } = event;
    if (direction === 'left' && keyCode === LEFT || direction === 'right' && keyCode === RIGHT) {
      resizeWidthBy(DELTA_DISTANCE);
    } else if (direction === 'left' && keyCode === RIGHT || direction === 'right' && keyCode === LEFT) {
      resizeWidthBy(-DELTA_DISTANCE);
    }
  }
  const resizeHandleVariants = {
    active: {
      opacity: 1,
      scaleY: 1.3
    }
  };
  const resizableHandleHelpId = `resizable-editor__resize-help-${direction}`;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Tooltip, {
      text: __('Drag to resize'),
      children: /*#__PURE__*/_jsx(motion.button, {
        className: `editor-resizable-editor__resize-handle is-${direction}`,
        "aria-label": __('Drag to resize'),
        "aria-describedby": resizableHandleHelpId,
        onKeyDown: handleKeyDown,
        variants: resizeHandleVariants,
        whileFocus: "active",
        whileHover: "active",
        whileTap: "active",
        role: "separator",
        "aria-orientation": "vertical"
      }, "handle")
    }), /*#__PURE__*/_jsx(VisuallyHidden, {
      id: resizableHandleHelpId,
      children: __('Use left and right arrow keys to resize the canvas.')
    })]
  });
}
//# sourceMappingURL=resize-handle.js.map
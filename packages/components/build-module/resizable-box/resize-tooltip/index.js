/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Label from './label';
import { useResizeLabel, POSITIONS } from './utils';
import { Root } from './styles/resize-tooltip.styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};
function ResizeTooltip({
  axis,
  className,
  fadeTimeout = 180,
  isVisible = true,
  labelRef,
  onResize = noop,
  position = POSITIONS.bottom,
  showPx = true,
  zIndex = 1000,
  ...props
}, ref) {
  const {
    label,
    resizeListener
  } = useResizeLabel({
    axis,
    fadeTimeout,
    onResize,
    showPx,
    position
  });
  if (!isVisible) {
    return null;
  }
  const classes = clsx('components-resize-tooltip', className);
  return /*#__PURE__*/_jsxs(Root, {
    "aria-hidden": "true",
    className: classes,
    ref: ref,
    ...props,
    children: [resizeListener, /*#__PURE__*/_jsx(Label, {
      "aria-hidden": props['aria-hidden'],
      label: label,
      position: position,
      ref: labelRef,
      zIndex: zIndex
    })]
  });
}
const ForwardedComponent = forwardRef(ResizeTooltip);
export default ForwardedComponent;
//# sourceMappingURL=index.js.map
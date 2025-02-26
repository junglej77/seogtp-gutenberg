/**
 * WordPress dependencies
 */
import { SVG, Rect } from '@wordpress/primitives';
import { Icon, menu } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function OverlayMenuIcon({
  icon
}) {
  if (icon === 'menu') {
    return /*#__PURE__*/_jsx(Icon, {
      icon: menu
    });
  }
  return /*#__PURE__*/_jsxs(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false",
    children: [/*#__PURE__*/_jsx(Rect, {
      x: "4",
      y: "7.5",
      width: "16",
      height: "1.5"
    }), /*#__PURE__*/_jsx(Rect, {
      x: "4",
      y: "15",
      width: "16",
      height: "1.5"
    })]
  });
}
//# sourceMappingURL=overlay-menu-icon.js.map
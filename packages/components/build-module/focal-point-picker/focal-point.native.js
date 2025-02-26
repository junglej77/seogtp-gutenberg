/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function FocalPoint({
  height,
  style,
  width
}) {
  return /*#__PURE__*/_jsxs(SVG, {
    height: height,
    style: style,
    viewBox: "0 0 30 30",
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/_jsx(Path, {
      style: styles.focalPointIconPathOutline,
      d: "M15 1C7.3 1 1 7.3 1 15s6.3 14 14 14 14-6.3 14-14S22.7 1 15 1zm0 22c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
    }), /*#__PURE__*/_jsx(Path, {
      style: styles.focalPointIconPathFill,
      d: "M15 3C8.4 3 3 8.4 3 15s5.4 12 12 12 12-5.4 12-12S21.6 3 15 3zm0 22C9.5 25 5 20.5 5 15S9.5 5 15 5s10 4.5 10 10-4.5 10-10 10z"
    })]
  });
}
//# sourceMappingURL=focal-point.native.js.map
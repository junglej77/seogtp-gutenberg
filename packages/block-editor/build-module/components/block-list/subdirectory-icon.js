/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/components';
import { isRTL } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
const Subdirectory = ({
  ...extraProps
}) => /*#__PURE__*/_jsx(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: 14,
  height: 14,
  viewBox: "0 0 20 20",
  ...extraProps,
  children: /*#__PURE__*/_jsx(Path, {
    d: "M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z",
    transform: isRTL() ? 'scale(-1,1) translate(-20,0)' : undefined
  })
});
export default Subdirectory;
//# sourceMappingURL=subdirectory-icon.js.map
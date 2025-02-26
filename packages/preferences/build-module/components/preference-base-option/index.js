/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BaseOption({
  help,
  label,
  isChecked,
  onChange,
  children
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "preference-base-option",
    children: [/*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      help: help,
      label: label,
      checked: isChecked,
      onChange: onChange
    }), children]
  });
}
export default BaseOption;
//# sourceMappingURL=index.js.map
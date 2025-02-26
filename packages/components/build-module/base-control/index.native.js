/**
 * External dependencies
 */
import { Text, View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BaseControl({
  label,
  help,
  children
}) {
  return /*#__PURE__*/_jsxs(View, {
    accessible: true,
    accessibilityLabel: label,
    children: [label && /*#__PURE__*/_jsx(Text, {
      children: label
    }), children, help && /*#__PURE__*/_jsx(Text, {
      children: help
    })]
  });
}
//# sourceMappingURL=index.native.js.map
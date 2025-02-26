/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function NoPreview({
  name
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "wp-block-legacy-widget__edit-no-preview",
    children: [name && /*#__PURE__*/_jsx("h3", {
      children: name
    }), /*#__PURE__*/_jsx("p", {
      children: __('No preview available.')
    })]
  });
}
//# sourceMappingURL=no-preview.js.map
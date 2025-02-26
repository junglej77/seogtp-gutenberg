/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function InserterPanel({
  title,
  icon,
  children
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "block-editor-inserter__panel-header",
      children: [/*#__PURE__*/_jsx("h2", {
        className: "block-editor-inserter__panel-title",
        children: title
      }), /*#__PURE__*/_jsx(Icon, {
        icon: icon
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "block-editor-inserter__panel-content",
      children: children
    })]
  });
}
export default InserterPanel;
//# sourceMappingURL=panel.js.map
/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(RichText.Content, {
      tagName: "h2",
      className: "widget-title",
      value: attributes.title
    }), /*#__PURE__*/_jsx("div", {
      className: "wp-widget-group__inner-blocks",
      children: /*#__PURE__*/_jsx(InnerBlocks.Content, {})
    })]
  });
}
//# sourceMappingURL=save.js.map
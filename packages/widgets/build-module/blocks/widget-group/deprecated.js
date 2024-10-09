/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const v1 = {
  attributes: {
    title: {
      type: 'string'
    }
  },
  supports: {
    html: false,
    inserter: true,
    customClassName: true,
    reusable: false
  },
  save({
    attributes
  }) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(RichText.Content, {
        tagName: "h2",
        className: "widget-title",
        value: attributes.title
      }), /*#__PURE__*/_jsx(InnerBlocks.Content, {})]
    });
  }
};
export default [v1];
//# sourceMappingURL=deprecated.js.map
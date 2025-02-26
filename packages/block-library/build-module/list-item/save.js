/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  return /*#__PURE__*/_jsxs("li", {
    ...useBlockProps.save(),
    children: [/*#__PURE__*/_jsx(RichText.Content, {
      value: attributes.content
    }), /*#__PURE__*/_jsx(InnerBlocks.Content, {})]
  });
}
//# sourceMappingURL=save.js.map
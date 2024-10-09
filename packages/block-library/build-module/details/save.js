/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    showContent
  } = attributes;
  const summary = attributes.summary ? attributes.summary : 'Details';
  const blockProps = useBlockProps.save();
  return /*#__PURE__*/_jsxs("details", {
    ...blockProps,
    open: showContent,
    children: [/*#__PURE__*/_jsx("summary", {
      children: /*#__PURE__*/_jsx(RichText.Content, {
        value: summary
      })
    }), /*#__PURE__*/_jsx(InnerBlocks.Content, {})]
  });
}
//# sourceMappingURL=save.js.map
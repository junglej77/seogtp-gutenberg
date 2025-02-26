/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    textAlign,
    citation
  } = attributes;
  const className = clsx({
    [`has-text-align-${textAlign}`]: textAlign
  });
  return /*#__PURE__*/_jsxs("blockquote", {
    ...useBlockProps.save({
      className
    }),
    children: [/*#__PURE__*/_jsx(InnerBlocks.Content, {}), !RichText.isEmpty(citation) && /*#__PURE__*/_jsx(RichText.Content, {
      tagName: "cite",
      value: citation
    })]
  });
}
//# sourceMappingURL=save.js.map
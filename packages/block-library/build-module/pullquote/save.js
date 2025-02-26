/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    textAlign,
    citation,
    value
  } = attributes;
  const shouldShowCitation = !RichText.isEmpty(citation);
  return /*#__PURE__*/_jsx("figure", {
    ...useBlockProps.save({
      className: clsx({
        [`has-text-align-${textAlign}`]: textAlign
      })
    }),
    children: /*#__PURE__*/_jsxs("blockquote", {
      children: [/*#__PURE__*/_jsx(RichText.Content, {
        tagName: "p",
        value: value
      }), shouldShowCitation && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "cite",
        value: citation
      })]
    })
  });
}
//# sourceMappingURL=save.js.map
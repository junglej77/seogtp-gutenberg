/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, __experimentalGetElementClassName } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    url,
    caption,
    type,
    providerNameSlug
  } = attributes;
  if (!url) {
    return null;
  }
  const className = clsx('wp-block-embed', {
    [`is-type-${type}`]: type,
    [`is-provider-${providerNameSlug}`]: providerNameSlug,
    [`wp-block-embed-${providerNameSlug}`]: providerNameSlug
  });
  return /*#__PURE__*/_jsxs("figure", {
    ...useBlockProps.save({
      className
    }),
    children: [/*#__PURE__*/_jsx("div", {
      className: "wp-block-embed__wrapper",
      children: `\n${url}\n` /* URL needs to be on its own line. */
    }), !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
      className: __experimentalGetElementClassName('caption'),
      tagName: "figcaption",
      value: caption
    })]
  });
}
//# sourceMappingURL=save.js.map
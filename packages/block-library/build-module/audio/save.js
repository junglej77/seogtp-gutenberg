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
    autoplay,
    caption,
    loop,
    preload,
    src
  } = attributes;
  return src && /*#__PURE__*/_jsxs("figure", {
    ...useBlockProps.save(),
    children: [/*#__PURE__*/_jsx("audio", {
      controls: "controls",
      src: src,
      autoPlay: autoplay,
      loop: loop,
      preload: preload
    }), !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
      tagName: "figcaption",
      value: caption,
      className: __experimentalGetElementClassName('caption')
    })]
  });
}
//# sourceMappingURL=save.js.map
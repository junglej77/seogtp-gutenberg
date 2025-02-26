/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, __experimentalGetElementClassName } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Tracks from './tracks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  const {
    autoplay,
    caption,
    controls,
    loop,
    muted,
    poster,
    preload,
    src,
    playsInline,
    tracks
  } = attributes;
  return /*#__PURE__*/_jsxs("figure", {
    ...useBlockProps.save(),
    children: [src && /*#__PURE__*/_jsx("video", {
      autoPlay: autoplay,
      controls: controls,
      loop: loop,
      muted: muted,
      poster: poster,
      preload: preload !== 'metadata' ? preload : undefined,
      src: src,
      playsInline: playsInline,
      children: /*#__PURE__*/_jsx(Tracks, {
        tracks: tracks
      })
    }), !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
      className: __experimentalGetElementClassName('caption'),
      tagName: "figcaption",
      value: caption
    })]
  });
}
//# sourceMappingURL=save.js.map
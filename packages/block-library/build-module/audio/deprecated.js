/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default [{
  attributes: {
    src: {
      type: 'string',
      source: 'attribute',
      selector: 'audio',
      attribute: 'src'
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption'
    },
    id: {
      type: 'number'
    },
    autoplay: {
      type: 'boolean',
      source: 'attribute',
      selector: 'audio',
      attribute: 'autoplay'
    },
    loop: {
      type: 'boolean',
      source: 'attribute',
      selector: 'audio',
      attribute: 'loop'
    },
    preload: {
      type: 'string',
      source: 'attribute',
      selector: 'audio',
      attribute: 'preload'
    }
  },
  supports: {
    align: true
  },
  save({
    attributes
  }) {
    const {
      autoplay,
      caption,
      loop,
      preload,
      src
    } = attributes;
    return /*#__PURE__*/_jsxs("figure", {
      children: [/*#__PURE__*/_jsx("audio", {
        controls: "controls",
        src: src,
        autoPlay: autoplay,
        loop: loop,
        preload: preload
      }), !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "figcaption",
        value: caption
      })]
    });
  }
}];
//# sourceMappingURL=deprecated.js.map
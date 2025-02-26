/**
 * WordPress dependencies
 */
import { createBlock, getBlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
const {
  name: name
} = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/paragraph",
  title: "Paragraph",
  category: "text",
  description: "Start with the basic building block of all narrative.",
  keywords: ["text"],
  textdomain: "default",
  attributes: {
    align: {
      type: "string"
    },
    content: {
      type: "rich-text",
      source: "rich-text",
      selector: "p",
      __experimentalRole: "content"
    },
    dropCap: {
      type: "boolean",
      "default": false
    },
    placeholder: {
      type: "string"
    },
    direction: {
      type: "string",
      "enum": ["ltr", "rtl"]
    }
  },
  supports: {
    splitting: true,
    anchor: true,
    className: true,
    __experimentalBorder: {
      color: true,
      radius: true,
      style: true,
      width: true
    },
    color: {
      gradients: true,
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    spacing: {
      margin: true,
      padding: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
    },
    typography: {
      fontSize: true,
      lineHeight: true,
      __experimentalFontFamily: true,
      __experimentalTextDecoration: true,
      __experimentalFontStyle: true,
      __experimentalFontWeight: true,
      __experimentalLetterSpacing: true,
      __experimentalTextTransform: true,
      __experimentalWritingMode: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    __experimentalSelector: "p",
    __unstablePasteTextInline: true,
    interactivity: {
      clientNavigation: true
    }
  },
  editorStyle: "wp-block-paragraph-editor",
  style: "wp-block-paragraph"
};
const transforms = {
  from: [{
    type: 'raw',
    // Paragraph is a fallback and should be matched last.
    priority: 20,
    selector: 'p',
    schema: ({
      phrasingContentSchema,
      isPaste
    }) => ({
      p: {
        children: phrasingContentSchema,
        attributes: isPaste ? [] : ['style', 'id']
      }
    }),
    transform(node) {
      const attributes = getBlockAttributes(name, node.outerHTML);
      const {
        textAlign
      } = node.style || {};
      if (textAlign === 'left' || textAlign === 'center' || textAlign === 'right') {
        attributes.align = textAlign;
      }
      return createBlock(name, attributes);
    }
  }]
};
export default transforms;
//# sourceMappingURL=transforms.js.map
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { paragraph as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import deprecated from './deprecated';
import edit from './edit';
const metadata = {
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
      width: true,
      shadow: true
    },
    color: {
      gradients: true,
      link: true,
      __experimentalDefaultControls: {
        background: false,
        text: false
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
        fontSize: false
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
import save from './save';
import transforms from './transforms';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  example: {
    attributes: {
      content: __('In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.')
    }
  },
  __experimentalLabel(attributes, {
    context
  }) {
    const customName = attributes?.metadata?.name;
    if (context === 'list-view' && customName) {
      return customName;
    }
    if (context === 'accessibility') {
      if (customName) {
        return customName;
      }
      const {
        content
      } = attributes;
      return !content || content.length === 0 ? __('Empty') : content;
    }
  },
  transforms,
  deprecated,
  merge(attributes, attributesToMerge) {
    return {
      content: (attributes.content || '') + (attributesToMerge.content || '')
    };
  },
  edit,
  save
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
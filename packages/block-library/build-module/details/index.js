/**
 * WordPress dependencies
 */
import { details as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/details",
  title: "Details",
  category: "text",
  description: "Hide and show additional content.",
  keywords: ["accordion", "summary", "toggle", "disclosure"],
  textdomain: "default",
  attributes: {
    showContent: {
      type: "boolean",
      "default": false
    },
    summary: {
      type: "rich-text",
      source: "rich-text",
      selector: "summary"
    }
  },
  supports: {
    __experimentalOnEnter: true,
    align: ["wide", "full"],
    color: {
      gradients: true,
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    __experimentalBorder: {
      color: true,
      width: true,
      style: true
    },
    html: false,
    spacing: {
      margin: true,
      padding: true,
      blockGap: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
    },
    typography: {
      fontSize: true,
      lineHeight: true,
      __experimentalFontFamily: true,
      __experimentalFontWeight: true,
      __experimentalFontStyle: true,
      __experimentalTextTransform: true,
      __experimentalTextDecoration: true,
      __experimentalLetterSpacing: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    layout: {
      allowEditing: false
    },
    interactivity: {
      clientNavigation: true
    }
  },
  editorStyle: "wp-block-details-editor",
  style: "wp-block-details"
};
import edit from './edit';
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
      summary: 'La Mancha',
      showContent: true
    },
    innerBlocks: [{
      name: 'core/paragraph',
      attributes: {
        content: __('In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.')
      }
    }]
  },
  save,
  edit,
  transforms
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
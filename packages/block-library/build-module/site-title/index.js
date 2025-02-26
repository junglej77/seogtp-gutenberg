/**
 * WordPress dependencies
 */
import { mapMarker as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/site-title",
  title: "Site Title",
  category: "theme",
  description: "Displays the name of this site. Update the block, and the changes apply everywhere it\u2019s used. This will also appear in the browser title bar and in search results.",
  textdomain: "default",
  attributes: {
    level: {
      type: "number",
      "default": 1
    },
    levelOptions: {
      type: "array",
      "default": [0, 1, 2, 3, 4, 5, 6]
    },
    textAlign: {
      type: "string"
    },
    isLink: {
      type: "boolean",
      "default": true
    },
    linkTarget: {
      type: "string",
      "default": "_self"
    }
  },
  example: {
    viewportWidth: 500
  },
  supports: {
    align: ["wide", "full"],
    html: false,
    color: {
      gradients: true,
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true,
        link: true
      }
    },
    spacing: {
      padding: true,
      margin: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
    },
    typography: {
      fontSize: true,
      lineHeight: true,
      __experimentalFontFamily: true,
      __experimentalTextTransform: true,
      __experimentalTextDecoration: true,
      __experimentalFontStyle: true,
      __experimentalFontWeight: true,
      __experimentalLetterSpacing: true,
      __experimentalWritingMode: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    interactivity: {
      clientNavigation: true
    },
    __experimentalBorder: {
      radius: true,
      color: true,
      width: true,
      style: true
    }
  },
  editorStyle: "wp-block-site-title-editor",
  style: "wp-block-site-title",
  selectors: {
    typography: ".wp-block-site-title > span, .wp-block-site-title > a"
  }
};
import edit from './edit';
import deprecated from './deprecated';
import transforms from './transforms';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  example: {
    viewportWidth: 350,
    attributes: {
      textAlign: 'center'
    }
  },
  edit,
  transforms,
  deprecated
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
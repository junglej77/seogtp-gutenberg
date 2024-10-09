/**
 * WordPress dependencies
 */
import { postDate as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/post-date",
  title: "Date",
  category: "theme",
  description: "Display the publish date for an entry such as a post or page.",
  textdomain: "default",
  attributes: {
    textAlign: {
      type: "string"
    },
    format: {
      type: "string"
    },
    isLink: {
      type: "boolean",
      "default": false
    },
    displayType: {
      type: "string",
      "default": "date"
    }
  },
  usesContext: ["postId", "postType", "queryId"],
  example: {
    viewportWidth: 350
  },
  supports: {
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
      margin: true,
      padding: true
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
    interactivity: {
      clientNavigation: true
    },
    __experimentalBorder: {
      radius: true,
      color: true,
      width: true,
      style: true,
      __experimentalDefaultControls: {
        radius: true,
        color: true,
        width: true,
        style: true
      }
    }
  }
};
import edit from './edit';
import deprecated from './deprecated';
import variations from './variations';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  edit,
  deprecated,
  variations
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
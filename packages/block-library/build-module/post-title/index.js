/**
 * WordPress dependencies
 */
import { title as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/post-title",
  title: "Title",
  category: "theme",
  description: "Displays the title of a post, page, or any other content-type.",
  textdomain: "default",
  usesContext: ["postId", "postType", "queryId"],
  attributes: {
    textAlign: {
      type: "string"
    },
    level: {
      type: "number",
      "default": 2
    },
    levelOptions: {
      type: "array"
    },
    isLink: {
      type: "boolean",
      "default": false
    },
    rel: {
      type: "string",
      attribute: "rel",
      "default": ""
    },
    linkTarget: {
      type: "string",
      "default": "_self"
    }
  },
  example: {
    viewportWidth: 350
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
  },
  style: "wp-block-post-title",
  selectors: {
    typography: ".wp-block-post-title, .wp-block-post-title > a"
  }
};
import edit from './edit';
import deprecated from './deprecated';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  edit,
  deprecated
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
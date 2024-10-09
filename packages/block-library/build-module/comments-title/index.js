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
  name: "core/comments-title",
  title: "Comments Title",
  category: "theme",
  ancestor: ["core/comments"],
  description: "Displays a title with the number of comments.",
  textdomain: "default",
  usesContext: ["postId", "postType"],
  attributes: {
    textAlign: {
      type: "string"
    },
    showPostTitle: {
      type: "boolean",
      "default": true
    },
    showCommentsCount: {
      type: "boolean",
      "default": true
    },
    level: {
      type: "number",
      "default": 2
    },
    levelOptions: {
      type: "array"
    }
  },
  supports: {
    anchor: false,
    align: true,
    html: false,
    __experimentalBorder: {
      radius: true,
      color: true,
      width: true,
      style: true
    },
    color: {
      gradients: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
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
        fontSize: true,
        __experimentalFontFamily: true,
        __experimentalFontStyle: true,
        __experimentalFontWeight: true
      }
    },
    interactivity: {
      clientNavigation: true
    }
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
/**
 * WordPress dependencies
 */
import { postCommentsForm as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/post-comments-form",
  title: "Comments Form",
  category: "theme",
  description: "Display a post's comments form.",
  textdomain: "default",
  attributes: {
    textAlign: {
      type: "string"
    }
  },
  usesContext: ["postId", "postType"],
  supports: {
    html: false,
    color: {
      gradients: true,
      heading: true,
      link: true,
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
      __experimentalFontStyle: true,
      __experimentalFontWeight: true,
      __experimentalLetterSpacing: true,
      __experimentalTextTransform: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
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
  editorStyle: "wp-block-post-comments-form-editor",
  style: ["wp-block-post-comments-form", "wp-block-buttons", "wp-block-button"]
};
import edit from './edit';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  edit
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
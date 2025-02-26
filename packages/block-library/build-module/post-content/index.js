/**
 * WordPress dependencies
 */
import { postContent as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/post-content",
  title: "Content",
  category: "theme",
  description: "Displays the contents of a post or page.",
  textdomain: "default",
  usesContext: ["postId", "postType", "queryId"],
  example: {
    viewportWidth: 350
  },
  supports: {
    align: ["wide", "full"],
    html: false,
    layout: true,
    background: {
      backgroundImage: true,
      backgroundSize: true,
      __experimentalDefaultControls: {
        backgroundImage: true
      }
    },
    dimensions: {
      minHeight: true
    },
    spacing: {
      blockGap: true,
      padding: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
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
      __experimentalFontWeight: true,
      __experimentalFontStyle: true,
      __experimentalTextTransform: true,
      __experimentalTextDecoration: true,
      __experimentalLetterSpacing: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    }
  },
  style: "wp-block-post-content",
  editorStyle: "wp-block-post-content-editor"
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
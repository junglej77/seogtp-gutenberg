/**
 * WordPress dependencies
 */
import { postCommentsCount as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  __experimental: "fse",
  name: "core/post-comments-count",
  title: "Comments Count",
  category: "theme",
  description: "Display a post's comments count.",
  textdomain: "default",
  attributes: {
    textAlign: {
      type: "string"
    }
  },
  usesContext: ["postId"],
  supports: {
    html: false,
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
        fontSize: true
      }
    },
    interactivity: {
      clientNavigation: true
    }
  }
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
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
  name: "core/post-comments-link",
  title: "Comments Link",
  category: "theme",
  description: "Displays the link to the current post comments.",
  textdomain: "default",
  usesContext: ["postType", "postId"],
  attributes: {
    textAlign: {
      type: "string"
    }
  },
  supports: {
    html: false,
    color: {
      link: true,
      text: false,
      __experimentalDefaultControls: {
        background: true,
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
    }
  }
};
import edit from './edit';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  edit,
  icon
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
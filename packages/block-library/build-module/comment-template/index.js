/**
 * WordPress dependencies
 */
import { layout as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/comment-template",
  title: "Comment Template",
  category: "design",
  parent: ["core/comments"],
  description: "Contains the block elements used to display a comment, like the title, date, author, avatar and more.",
  textdomain: "default",
  usesContext: ["postId"],
  supports: {
    align: true,
    html: false,
    reusable: false,
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
  style: "wp-block-comment-template"
};
import edit from './edit';
import save from './save';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  edit,
  save
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
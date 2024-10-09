/**
 * WordPress dependencies
 */
import { termDescription as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/term-description",
  title: "Term Description",
  category: "theme",
  description: "Display the description of categories, tags and custom taxonomies when viewing an archive.",
  textdomain: "default",
  attributes: {
    textAlign: {
      type: "string"
    }
  },
  supports: {
    align: ["wide", "full"],
    html: false,
    color: {
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    spacing: {
      padding: true,
      margin: true
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
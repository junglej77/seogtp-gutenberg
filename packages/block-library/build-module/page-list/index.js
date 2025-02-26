/**
 * WordPress dependencies
 */
import { pages } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/page-list",
  title: "Page List",
  category: "widgets",
  allowedBlocks: ["core/page-list-item"],
  description: "Display a list of all pages.",
  keywords: ["menu", "navigation"],
  textdomain: "default",
  attributes: {
    parentPageID: {
      type: "integer",
      "default": 0
    },
    isNested: {
      type: "boolean",
      "default": false
    }
  },
  usesContext: ["textColor", "customTextColor", "backgroundColor", "customBackgroundColor", "overlayTextColor", "customOverlayTextColor", "overlayBackgroundColor", "customOverlayBackgroundColor", "fontSize", "customFontSize", "showSubmenuIcon", "style", "openSubmenusOnClick"],
  supports: {
    reusable: false,
    html: false,
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
  },
  editorStyle: "wp-block-page-list-editor",
  style: "wp-block-page-list"
};
import edit from './edit.js';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon: pages,
  example: {},
  edit
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
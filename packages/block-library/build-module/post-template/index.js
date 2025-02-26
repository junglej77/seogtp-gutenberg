/**
 * WordPress dependencies
 */
import { layout } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/post-template",
  title: "Post Template",
  category: "theme",
  parent: ["core/query"],
  description: "Contains the block elements used to render a post, like the title, date, featured image, content or excerpt, and more.",
  textdomain: "default",
  usesContext: ["queryId", "query", "displayLayout", "templateSlug", "previewPostType", "enhancedPagination"],
  supports: {
    reusable: false,
    html: false,
    align: ["wide", "full"],
    layout: true,
    color: {
      gradients: true,
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
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
    },
    spacing: {
      blockGap: {
        __experimentalDefault: "1.25em"
      },
      __experimentalDefaultControls: {
        blockGap: true
      }
    },
    interactivity: {
      clientNavigation: true
    }
  },
  style: "wp-block-post-template",
  editorStyle: "wp-block-post-template-editor"
};
import edit from './edit';
import save from './save';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon: layout,
  edit,
  save
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
/**
 * WordPress dependencies
 */
import { listItem as icon } from '@wordpress/icons';
import { privateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/list-item",
  title: "List item",
  category: "text",
  parent: ["core/list"],
  allowedBlocks: ["core/list"],
  description: "An individual item within a list.",
  textdomain: "default",
  attributes: {
    placeholder: {
      type: "string"
    },
    content: {
      type: "rich-text",
      source: "rich-text",
      selector: "li",
      __experimentalRole: "content"
    }
  },
  supports: {
    anchor: true,
    className: false,
    splitting: true,
    __experimentalBorder: {
      color: true,
      radius: true,
      style: true,
      width: true
    },
    color: {
      gradients: true,
      link: true,
      background: true,
      __experimentalDefaultControls: {
        text: true
      }
    },
    spacing: {
      margin: true,
      padding: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
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
    interactivity: {
      clientNavigation: true
    }
  },
  selectors: {
    root: ".wp-block-list > li",
    border: ".wp-block-list:not(.wp-block-list .wp-block-list) > li"
  }
};
import edit from './edit';
import save from './save';
import transforms from './transforms';
import { unlock } from '../lock-unlock';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  edit,
  save,
  merge(attributes, attributesToMerge) {
    return {
      ...attributes,
      content: attributes.content + attributesToMerge.content
    };
  },
  transforms,
  [unlock(privateApis).requiresWrapperOnCopy]: true
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
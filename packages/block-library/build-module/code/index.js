/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { code as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import edit from './edit';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/code",
  title: "Code",
  category: "text",
  description: "Display code snippets that respect your spacing and tabs.",
  textdomain: "default",
  attributes: {
    content: {
      type: "rich-text",
      source: "rich-text",
      selector: "code",
      __unstablePreserveWhiteSpace: true
    }
  },
  supports: {
    align: ["wide"],
    anchor: true,
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
      margin: ["top", "bottom"],
      padding: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
    },
    __experimentalBorder: {
      radius: true,
      color: true,
      width: true,
      style: true,
      __experimentalDefaultControls: {
        width: true,
        color: true
      }
    },
    color: {
      text: true,
      background: true,
      gradients: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    interactivity: {
      clientNavigation: true
    }
  },
  style: "wp-block-code"
};
import save from './save';
import transforms from './transforms';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  example: {
    attributes: {
      /* eslint-disable @wordpress/i18n-no-collapsible-whitespace */
      // translators: Preserve \n markers for line breaks
      content: __('// A “block” is the abstract term used\n// to describe units of markup that\n// when composed together, form the\n// content or layout of a page.\nregisterBlockType( name, settings );')
      /* eslint-enable @wordpress/i18n-no-collapsible-whitespace */
    }
  },
  merge(attributes, attributesToMerge) {
    return {
      content: attributes.content + '\n\n' + attributesToMerge.content
    };
  },
  transforms,
  edit,
  save
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
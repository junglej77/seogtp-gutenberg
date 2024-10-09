/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { search as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/search",
  title: "Search",
  category: "widgets",
  description: "Help visitors find your content.",
  keywords: ["find"],
  textdomain: "default",
  attributes: {
    label: {
      type: "string",
      __experimentalRole: "content"
    },
    showLabel: {
      type: "boolean",
      "default": true
    },
    placeholder: {
      type: "string",
      "default": "",
      __experimentalRole: "content"
    },
    width: {
      type: "number"
    },
    widthUnit: {
      type: "string"
    },
    buttonText: {
      type: "string",
      __experimentalRole: "content"
    },
    buttonPosition: {
      type: "string",
      "default": "button-outside"
    },
    buttonUseIcon: {
      type: "boolean",
      "default": false
    },
    query: {
      type: "object",
      "default": {}
    },
    isSearchFieldHidden: {
      type: "boolean",
      "default": false
    }
  },
  supports: {
    align: ["left", "center", "right"],
    color: {
      gradients: true,
      __experimentalSkipSerialization: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    interactivity: true,
    typography: {
      __experimentalSkipSerialization: true,
      __experimentalSelector: ".wp-block-search__label, .wp-block-search__input, .wp-block-search__button",
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
    __experimentalBorder: {
      color: true,
      radius: true,
      width: true,
      __experimentalSkipSerialization: true,
      __experimentalDefaultControls: {
        color: true,
        radius: true,
        width: true
      }
    },
    spacing: {
      margin: true
    },
    html: false
  },
  editorStyle: "wp-block-search-editor",
  style: "wp-block-search"
};
import edit from './edit';
import variations from './variations';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  example: {
    attributes: {
      buttonText: __('Search'),
      label: __('Search')
    },
    viewportWidth: 400
  },
  variations,
  edit
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
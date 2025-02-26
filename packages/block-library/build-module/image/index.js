/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { image as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import deprecated from './deprecated';
import edit from './edit';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/image",
  title: "Image",
  category: "media",
  usesContext: ["allowResize", "imageCrop", "fixedHeight"],
  description: "Insert an image to make a visual statement.",
  keywords: ["img", "photo", "picture"],
  textdomain: "default",
  attributes: {
    blob: {
      type: "string",
      __experimentalRole: "local"
    },
    url: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "src",
      __experimentalRole: "content"
    },
    alt: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "alt",
      "default": "",
      __experimentalRole: "content"
    },
    caption: {
      type: "rich-text",
      source: "rich-text",
      selector: "figcaption",
      __experimentalRole: "content"
    },
    lightbox: {
      type: "object",
      enabled: {
        type: "boolean"
      }
    },
    title: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "title",
      __experimentalRole: "content"
    },
    href: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "href",
      __experimentalRole: "content"
    },
    rel: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "rel"
    },
    linkClass: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "class"
    },
    id: {
      type: "number",
      __experimentalRole: "content"
    },
    width: {
      type: "string"
    },
    height: {
      type: "string"
    },
    aspectRatio: {
      type: "string"
    },
    scale: {
      type: "string"
    },
    sizeSlug: {
      type: "string"
    },
    linkDestination: {
      type: "string"
    },
    linkTarget: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "target"
    }
  },
  supports: {
    interactivity: true,
    align: ["left", "center", "right", "wide", "full"],
    anchor: true,
    color: {
      text: false,
      background: false
    },
    filter: {
      duotone: true
    },
    spacing: {
      margin: true
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
    shadow: {
      __experimentalSkipSerialization: true
    }
  },
  selectors: {
    border: ".wp-block-image img, .wp-block-image .wp-block-image__crop-area, .wp-block-image .components-placeholder",
    shadow: ".wp-block-image img, .wp-block-image .wp-block-image__crop-area, .wp-block-image .components-placeholder",
    filter: {
      duotone: ".wp-block-image img, .wp-block-image .components-placeholder"
    }
  },
  styles: [{
    name: "default",
    label: "Default",
    isDefault: true
  }, {
    name: "rounded",
    label: "Rounded"
  }],
  editorStyle: "wp-block-image-editor",
  style: "wp-block-image"
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
      sizeSlug: 'large',
      url: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
      // translators: Caption accompanying an image of the Mont Blanc, which serves as an example for the Image block.
      caption: __('Mont Blanc appears—still, snowy, and serene.')
    }
  },
  __experimentalLabel(attributes, {
    context
  }) {
    const customName = attributes?.metadata?.name;
    if (context === 'list-view' && customName) {
      return customName;
    }
    if (context === 'accessibility') {
      const {
        caption,
        alt,
        url
      } = attributes;
      if (!url) {
        return __('Empty');
      }
      if (!alt) {
        return caption || '';
      }

      // This is intended to be read by a screen reader.
      // A period simply means a pause, no need to translate it.
      return alt + (caption ? '. ' + caption : '');
    }
  },
  getEditWrapperProps(attributes) {
    return {
      'data-align': attributes.align
    };
  },
  transforms,
  edit,
  save,
  deprecated
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map
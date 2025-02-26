/**
 * WordPress dependencies
 */
import { postFeaturedImage as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/post-featured-image",
  title: "Featured Image",
  category: "theme",
  description: "Display a post's featured image.",
  textdomain: "default",
  attributes: {
    isLink: {
      type: "boolean",
      "default": false
    },
    aspectRatio: {
      type: "string"
    },
    width: {
      type: "string"
    },
    height: {
      type: "string"
    },
    scale: {
      type: "string",
      "default": "cover"
    },
    sizeSlug: {
      type: "string"
    },
    rel: {
      type: "string",
      attribute: "rel",
      "default": ""
    },
    linkTarget: {
      type: "string",
      "default": "_self"
    },
    overlayColor: {
      type: "string"
    },
    customOverlayColor: {
      type: "string"
    },
    dimRatio: {
      type: "number",
      "default": 0
    },
    gradient: {
      type: "string"
    },
    customGradient: {
      type: "string"
    },
    useFirstImageFromPost: {
      type: "boolean",
      "default": false
    }
  },
  usesContext: ["postId", "postType", "queryId"],
  example: {
    viewportWidth: 350
  },
  supports: {
    align: ["left", "right", "center", "wide", "full"],
    color: {
      text: false,
      background: false
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
    filter: {
      duotone: true
    },
    shadow: {
      __experimentalSkipSerialization: true
    },
    html: false,
    spacing: {
      margin: true,
      padding: true
    },
    interactivity: {
      clientNavigation: true
    }
  },
  selectors: {
    border: ".wp-block-post-featured-image img, .wp-block-post-featured-image .block-editor-media-placeholder, .wp-block-post-featured-image .wp-block-post-featured-image__overlay",
    shadow: ".wp-block-post-featured-image img, .wp-block-post-featured-image .components-placeholder",
    filter: {
      duotone: ".wp-block-post-featured-image img, .wp-block-post-featured-image .wp-block-post-featured-image__placeholder, .wp-block-post-featured-image .components-placeholder__illustration, .wp-block-post-featured-image .components-placeholder::before"
    }
  },
  editorStyle: "wp-block-post-featured-image-editor",
  style: "wp-block-post-featured-image"
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
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/embed",
  title: "Embed",
  category: "embed",
  description: "Add a block that displays content pulled from other sites, like Twitter or YouTube.",
  textdomain: "default",
  attributes: {
    url: {
      type: "string",
      __experimentalRole: "content"
    },
    caption: {
      type: "rich-text",
      source: "rich-text",
      selector: "figcaption",
      __experimentalRole: "content"
    },
    type: {
      type: "string",
      __experimentalRole: "content"
    },
    providerNameSlug: {
      type: "string",
      __experimentalRole: "content"
    },
    allowResponsive: {
      type: "boolean",
      "default": true
    },
    responsive: {
      type: "boolean",
      "default": false,
      __experimentalRole: "content"
    },
    previewable: {
      type: "boolean",
      "default": true,
      __experimentalRole: "content"
    }
  },
  supports: {
    align: true,
    spacing: {
      margin: true
    },
    interactivity: {
      clientNavigation: true
    }
  },
  editorStyle: "wp-block-embed-editor",
  style: "wp-block-embed"
};
/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  attributes: blockAttributes
} = metadata;

// In #41140 support was added to global styles for caption elements which added a `wp-element-caption` classname
// to the embed figcaption element.
const v2 = {
  attributes: blockAttributes,
  save({
    attributes
  }) {
    const {
      url,
      caption,
      type,
      providerNameSlug
    } = attributes;
    if (!url) {
      return null;
    }
    const className = clsx('wp-block-embed', {
      [`is-type-${type}`]: type,
      [`is-provider-${providerNameSlug}`]: providerNameSlug,
      [`wp-block-embed-${providerNameSlug}`]: providerNameSlug
    });
    return /*#__PURE__*/_jsxs("figure", {
      ...useBlockProps.save({
        className
      }),
      children: [/*#__PURE__*/_jsx("div", {
        className: "wp-block-embed__wrapper",
        children: `\n${url}\n` /* URL needs to be on its own line. */
      }), !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "figcaption",
        value: caption
      })]
    });
  }
};
const v1 = {
  attributes: blockAttributes,
  save({
    attributes: {
      url,
      caption,
      type,
      providerNameSlug
    }
  }) {
    if (!url) {
      return null;
    }
    const embedClassName = clsx('wp-block-embed', {
      [`is-type-${type}`]: type,
      [`is-provider-${providerNameSlug}`]: providerNameSlug
    });
    return /*#__PURE__*/_jsxs("figure", {
      className: embedClassName,
      children: [`\n${url}\n` /* URL needs to be on its own line. */, !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "figcaption",
        value: caption
      })]
    });
  }
};
const deprecated = [v2, v1];
export default deprecated;
//# sourceMappingURL=deprecated.js.map
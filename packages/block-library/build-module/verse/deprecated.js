/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import migrateFontFamily from '../utils/migrate-font-family';
import { jsx as _jsx } from "react/jsx-runtime";
const v1 = {
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'pre',
      default: ''
    },
    textAlign: {
      type: 'string'
    }
  },
  save({
    attributes
  }) {
    const {
      textAlign,
      content
    } = attributes;
    return /*#__PURE__*/_jsx(RichText.Content, {
      tagName: "pre",
      style: {
        textAlign
      },
      value: content
    });
  }
};
const v2 = {
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'pre',
      default: '',
      __unstablePreserveWhiteSpace: true,
      __experimentalRole: 'content'
    },
    textAlign: {
      type: 'string'
    }
  },
  supports: {
    anchor: true,
    color: {
      gradients: true,
      link: true
    },
    typography: {
      fontSize: true,
      __experimentalFontFamily: true
    },
    spacing: {
      padding: true
    }
  },
  save({
    attributes
  }) {
    const {
      textAlign,
      content
    } = attributes;
    const className = clsx({
      [`has-text-align-${textAlign}`]: textAlign
    });
    return /*#__PURE__*/_jsx("pre", {
      ...useBlockProps.save({
        className
      }),
      children: /*#__PURE__*/_jsx(RichText.Content, {
        value: content
      })
    });
  },
  migrate: migrateFontFamily,
  isEligible({
    style
  }) {
    return style?.typography?.fontFamily;
  }
};

/**
 * New deprecations need to be placed first
 * for them to have higher priority.
 *
 * Old deprecations may need to be updated as well.
 *
 * See block-deprecation.md
 */
export default [v2, v1];
//# sourceMappingURL=deprecated.js.map
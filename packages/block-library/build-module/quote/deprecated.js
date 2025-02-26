/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { createBlock, parseWithAttributeSchema } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const migrateToQuoteV2 = attributes => {
  const {
    value,
    ...restAttributes
  } = attributes;
  return [{
    ...restAttributes
  }, value ? parseWithAttributeSchema(value, {
    type: 'array',
    source: 'query',
    selector: 'p',
    query: {
      content: {
        type: 'string',
        source: 'html'
      }
    }
  }).map(({
    content
  }) => createBlock('core/paragraph', {
    content
  })) : createBlock('core/paragraph')];
};
const TEXT_ALIGN_OPTIONS = ['left', 'right', 'center'];

// Migrate existing text alignment settings to the renamed attribute.
const migrateTextAlign = (attributes, innerBlocks) => {
  const {
    align,
    ...rest
  } = attributes;
  // Check if there are valid alignments stored in the old attribute
  // and assign them to the new attribute name.
  const migratedAttributes = TEXT_ALIGN_OPTIONS.includes(align) ? {
    ...rest,
    textAlign: align
  } : attributes;
  return [migratedAttributes, innerBlocks];
};

// Migrate the v2 blocks with style === `2`;
const migrateLargeStyle = (attributes, innerBlocks) => {
  return [{
    ...attributes,
    className: attributes.className ? attributes.className + ' is-style-large' : 'is-style-large'
  }, innerBlocks];
};

// Version before the 'align' attribute was replaced with 'textAlign'.
const v4 = {
  attributes: {
    value: {
      type: 'string',
      source: 'html',
      selector: 'blockquote',
      multiline: 'p',
      default: '',
      __experimentalRole: 'content'
    },
    citation: {
      type: 'string',
      source: 'html',
      selector: 'cite',
      default: '',
      __experimentalRole: 'content'
    },
    align: {
      type: 'string'
    }
  },
  supports: {
    anchor: true,
    html: false,
    __experimentalOnEnter: true,
    __experimentalOnMerge: true,
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
        fontSize: true,
        fontAppearance: true
      }
    },
    color: {
      gradients: true,
      heading: true,
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    }
  },
  isEligible: ({
    align
  }) => TEXT_ALIGN_OPTIONS.includes(align),
  save({
    attributes
  }) {
    const {
      align,
      citation
    } = attributes;
    const className = clsx({
      [`has-text-align-${align}`]: align
    });
    return /*#__PURE__*/_jsxs("blockquote", {
      ...useBlockProps.save({
        className
      }),
      children: [/*#__PURE__*/_jsx(InnerBlocks.Content, {}), !RichText.isEmpty(citation) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "cite",
        value: citation
      })]
    });
  },
  migrate: migrateTextAlign
};
const v3 = {
  attributes: {
    value: {
      type: 'string',
      source: 'html',
      selector: 'blockquote',
      multiline: 'p',
      default: '',
      __experimentalRole: 'content'
    },
    citation: {
      type: 'string',
      source: 'html',
      selector: 'cite',
      default: '',
      __experimentalRole: 'content'
    },
    align: {
      type: 'string'
    }
  },
  supports: {
    anchor: true,
    __experimentalSlashInserter: true,
    typography: {
      fontSize: true,
      lineHeight: true,
      __experimentalFontStyle: true,
      __experimentalFontWeight: true,
      __experimentalLetterSpacing: true,
      __experimentalTextTransform: true,
      __experimentalDefaultControls: {
        fontSize: true,
        fontAppearance: true
      }
    }
  },
  save({
    attributes
  }) {
    const {
      align,
      value,
      citation
    } = attributes;
    const className = clsx({
      [`has-text-align-${align}`]: align
    });
    return /*#__PURE__*/_jsxs("blockquote", {
      ...useBlockProps.save({
        className
      }),
      children: [/*#__PURE__*/_jsx(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "cite",
        value: citation
      })]
    });
  },
  migrate(attributes) {
    return migrateTextAlign(...migrateToQuoteV2(attributes));
  }
};
const v2 = {
  attributes: {
    value: {
      type: 'string',
      source: 'html',
      selector: 'blockquote',
      multiline: 'p',
      default: ''
    },
    citation: {
      type: 'string',
      source: 'html',
      selector: 'cite',
      default: ''
    },
    align: {
      type: 'string'
    }
  },
  migrate(attributes) {
    return migrateTextAlign(...migrateToQuoteV2(attributes));
  },
  save({
    attributes
  }) {
    const {
      align,
      value,
      citation
    } = attributes;
    return /*#__PURE__*/_jsxs("blockquote", {
      style: {
        textAlign: align ? align : null
      },
      children: [/*#__PURE__*/_jsx(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "cite",
        value: citation
      })]
    });
  }
};
const v1 = {
  attributes: {
    value: {
      type: 'string',
      source: 'html',
      selector: 'blockquote',
      multiline: 'p',
      default: ''
    },
    citation: {
      type: 'string',
      source: 'html',
      selector: 'cite',
      default: ''
    },
    align: {
      type: 'string'
    },
    style: {
      type: 'number',
      default: 1
    }
  },
  migrate(attributes) {
    if (attributes.style === 2) {
      const {
        style,
        ...restAttributes
      } = attributes;
      return migrateTextAlign(...migrateLargeStyle(...migrateToQuoteV2(restAttributes)));
    }
    return migrateTextAlign(...migrateToQuoteV2(attributes));
  },
  save({
    attributes
  }) {
    const {
      align,
      value,
      citation,
      style
    } = attributes;
    return /*#__PURE__*/_jsxs("blockquote", {
      className: style === 2 ? 'is-large' : '',
      style: {
        textAlign: align ? align : null
      },
      children: [/*#__PURE__*/_jsx(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "cite",
        value: citation
      })]
    });
  }
};
const v0 = {
  attributes: {
    value: {
      type: 'string',
      source: 'html',
      selector: 'blockquote',
      multiline: 'p',
      default: ''
    },
    citation: {
      type: 'string',
      source: 'html',
      selector: 'footer',
      default: ''
    },
    align: {
      type: 'string'
    },
    style: {
      type: 'number',
      default: 1
    }
  },
  migrate(attributes) {
    if (!isNaN(parseInt(attributes.style))) {
      const {
        style,
        ...restAttributes
      } = attributes;
      return migrateTextAlign(...migrateToQuoteV2(restAttributes));
    }
    return migrateTextAlign(...migrateToQuoteV2(attributes));
  },
  save({
    attributes
  }) {
    const {
      align,
      value,
      citation,
      style
    } = attributes;
    return /*#__PURE__*/_jsxs("blockquote", {
      className: `blocks-quote-style-${style}`,
      style: {
        textAlign: align ? align : null
      },
      children: [/*#__PURE__*/_jsx(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && /*#__PURE__*/_jsx(RichText.Content, {
        tagName: "footer",
        value: citation
      })]
    });
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
export default [v4, v3, v2, v1, v0];
//# sourceMappingURL=deprecated.js.map
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { AlignmentControl, BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { Platform } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Figure } from './figure';
import { BlockQuote } from './blockquote';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const isWebPlatform = Platform.OS === 'web';
function PullQuoteEdit({
  attributes,
  setAttributes,
  isSelected,
  insertBlocksAfter
}) {
  const {
    textAlign,
    citation,
    value
  } = attributes;
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const shouldShowCitation = !RichText.isEmpty(citation) || isSelected;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      group: "block",
      children: /*#__PURE__*/_jsx(AlignmentControl, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })
    }), /*#__PURE__*/_jsx(Figure, {
      ...blockProps,
      children: /*#__PURE__*/_jsxs(BlockQuote, {
        children: [/*#__PURE__*/_jsx(RichText, {
          identifier: "value",
          tagName: "p",
          value: value,
          onChange: nextValue => setAttributes({
            value: nextValue
          }),
          "aria-label": __('Pullquote text'),
          placeholder:
          // translators: placeholder text used for the quote
          __('Add quote'),
          textAlign: "center"
        }), shouldShowCitation && /*#__PURE__*/_jsx(RichText, {
          identifier: "citation",
          tagName: isWebPlatform ? 'cite' : undefined,
          style: {
            display: 'block'
          },
          value: citation,
          "aria-label": __('Pullquote citation text'),
          placeholder:
          // translators: placeholder text used for the citation
          __('Add citation'),
          onChange: nextCitation => setAttributes({
            citation: nextCitation
          }),
          className: "wp-block-pullquote__citation",
          __unstableMobileNoFocusOnMount: true,
          textAlign: "center",
          __unstableOnSplitAtEnd: () => insertBlocksAfter(createBlock(getDefaultBlockName()))
        })]
      })
    })]
  });
}
export default PullQuoteEdit;
//# sourceMappingURL=edit.js.map
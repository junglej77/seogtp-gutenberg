/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, BlockControls, AlignmentToolbar, useBlockProps } from '@wordpress/block-editor';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function VerseEdit({
  attributes,
  setAttributes,
  mergeBlocks,
  onRemove,
  insertBlocksAfter,
  style
}) {
  const {
    textAlign,
    content
  } = attributes;
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    }),
    style
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(AlignmentToolbar, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })
    }), /*#__PURE__*/_jsx(RichText, {
      tagName: "pre",
      identifier: "content",
      preserveWhiteSpace: true,
      value: content,
      onChange: nextContent => {
        setAttributes({
          content: nextContent
        });
      },
      "aria-label": __('Verse text'),
      placeholder: __('Write verse…'),
      onRemove: onRemove,
      onMerge: mergeBlocks,
      textAlign: textAlign,
      ...blockProps,
      __unstablePastePlainText: true,
      __unstableOnSplitAtDoubleLineEnd: () => insertBlocksAfter(createBlock(getDefaultBlockName()))
    })]
  });
}
//# sourceMappingURL=edit.js.map
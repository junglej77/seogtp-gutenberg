/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, useInnerBlocksProps, __experimentalGetElementClassName } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function saveWithInnerBlocks({
  attributes
}) {
  const {
    caption,
    columns,
    imageCrop
  } = attributes;
  const className = clsx('has-nested-images', {
    [`columns-${columns}`]: columns !== undefined,
    [`columns-default`]: columns === undefined,
    'is-cropped': imageCrop
  });
  const blockProps = useBlockProps.save({
    className
  });
  const innerBlocksProps = useInnerBlocksProps.save(blockProps);
  return /*#__PURE__*/_jsxs("figure", {
    ...innerBlocksProps,
    children: [innerBlocksProps.children, !RichText.isEmpty(caption) && /*#__PURE__*/_jsx(RichText.Content, {
      tagName: "figcaption",
      className: clsx('blocks-gallery-caption', __experimentalGetElementClassName('caption')),
      value: caption
    })]
  });
}
//# sourceMappingURL=save.js.map
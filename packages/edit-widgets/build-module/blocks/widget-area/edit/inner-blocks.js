/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useEntityBlockEditor } from '@wordpress/core-data';
import { InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useIsDraggingWithin from './use-is-dragging-within';
import { jsx as _jsx } from "react/jsx-runtime";
export default function WidgetAreaInnerBlocks({
  id
}) {
  const [blocks, onInput, onChange] = useEntityBlockEditor('root', 'postType');
  const innerBlocksRef = useRef();
  const isDraggingWithinInnerBlocks = useIsDraggingWithin(innerBlocksRef);
  const shouldHighlightDropZone = isDraggingWithinInnerBlocks;
  // Using the experimental hook so that we can control the className of the element.
  const innerBlocksProps = useInnerBlocksProps({
    ref: innerBlocksRef
  }, {
    value: blocks,
    onInput,
    onChange,
    templateLock: false,
    renderAppender: InnerBlocks.ButtonBlockAppender
  });
  return /*#__PURE__*/_jsx("div", {
    "data-widget-area-id": id,
    className: clsx('wp-block-widget-area__inner-blocks block-editor-inner-blocks editor-styles-wrapper', {
      'wp-block-widget-area__highlight-drop-zone': shouldHighlightDropZone
    }),
    children: /*#__PURE__*/_jsx("div", {
      ...innerBlocksProps
    })
  });
}
//# sourceMappingURL=inner-blocks.js.map
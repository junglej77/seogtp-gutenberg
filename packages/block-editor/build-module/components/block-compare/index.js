/**
 * External dependencies
 */
import clsx from 'clsx';
// diff doesn't tree-shake correctly, so we import from the individual
// module here, to avoid including too much of the library
import { diffChars } from 'diff/lib/diff/character';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSaveContent } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import BlockView from './block-view';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BlockCompare({
  block,
  onKeep,
  onConvert,
  convertor,
  convertButtonText
}) {
  function getDifference(originalContent, newContent) {
    const difference = diffChars(originalContent, newContent);
    return difference.map((item, pos) => {
      const classes = clsx({
        'block-editor-block-compare__added': item.added,
        'block-editor-block-compare__removed': item.removed
      });
      return /*#__PURE__*/_jsx("span", {
        className: classes,
        children: item.value
      }, pos);
    });
  }
  function getConvertedContent(convertedBlock) {
    // The convertor may return an array of items or a single item.
    const newBlocks = Array.isArray(convertedBlock) ? convertedBlock : [convertedBlock];

    // Get converted block details.
    const newContent = newBlocks.map(item => getSaveContent(item.name, item.attributes, item.innerBlocks));
    return newContent.join('');
  }
  const converted = getConvertedContent(convertor(block));
  const difference = getDifference(block.originalContent, converted);
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-block-compare__wrapper",
    children: [/*#__PURE__*/_jsx(BlockView, {
      title: __('Current'),
      className: "block-editor-block-compare__current",
      action: onKeep,
      actionText: __('Convert to HTML'),
      rawContent: block.originalContent,
      renderedContent: block.originalContent
    }), /*#__PURE__*/_jsx(BlockView, {
      title: __('After Conversion'),
      className: "block-editor-block-compare__converted",
      action: onConvert,
      actionText: convertButtonText,
      rawContent: difference,
      renderedContent: converted
    })]
  });
}
export default BlockCompare;
//# sourceMappingURL=index.js.map
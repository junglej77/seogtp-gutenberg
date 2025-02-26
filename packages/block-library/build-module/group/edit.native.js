/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { compose, withPreferredColorScheme, useResizeObserver } from '@wordpress/compose';
import { InnerBlocks, store as blockEditorStore } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { alignmentHelpers } from '@wordpress/components';

/**
 * Internal dependencies
 */
import styles from './editor.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  isFullWidth
} = alignmentHelpers;
function GroupEdit({
  attributes,
  hasInnerBlocks,
  isSelected,
  isLastInnerBlockSelected,
  getStylesFromColorScheme,
  style,
  blockWidth
}) {
  const {
    align
  } = attributes;
  const [resizeObserver, sizes] = useResizeObserver();
  const {
    width
  } = sizes || {
    width: 0
  };
  const renderAppender = useCallback(() => /*#__PURE__*/_jsx(View, {
    style: [!hasInnerBlocks && styles.groupAppender, isFullWidth(align) && !hasInnerBlocks && styles.fullwidthGroupAppender, isFullWidth(align) && hasInnerBlocks && styles.fullwidthHasInnerGroupAppender],
    children: /*#__PURE__*/_jsx(InnerBlocks.ButtonBlockAppender, {})
  }), [align, hasInnerBlocks]);
  if (!isSelected && !hasInnerBlocks) {
    return /*#__PURE__*/_jsx(View, {
      style: [getStylesFromColorScheme(styles.groupPlaceholder, styles.groupPlaceholderDark), !hasInnerBlocks && {
        ...styles.marginVerticalDense,
        ...styles.marginHorizontalNone
      }]
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    style: [isSelected && hasInnerBlocks && styles.innerBlocks, style, isSelected && hasInnerBlocks && style?.backgroundColor && styles.hasBackgroundAppender, isLastInnerBlockSelected && style?.backgroundColor && styles.isLastInnerBlockSelected],
    children: [resizeObserver, /*#__PURE__*/_jsx(InnerBlocks, {
      renderAppender: isSelected && renderAppender,
      parentWidth: width,
      blockWidth: blockWidth
    })]
  });
}
export default compose([withSelect((select, {
  clientId
}) => {
  const {
    getBlock,
    getBlockIndex,
    hasSelectedInnerBlock,
    getBlockRootClientId,
    getSelectedBlockClientId,
    getBlockAttributes
  } = select(blockEditorStore);
  const block = getBlock(clientId);
  const hasInnerBlocks = !!(block && block.innerBlocks.length);
  const isInnerBlockSelected = hasInnerBlocks && hasSelectedInnerBlock(clientId, true);
  let isLastInnerBlockSelected = false;
  if (isInnerBlockSelected) {
    const {
      innerBlocks
    } = block;
    const selectedBlockClientId = getSelectedBlockClientId();
    const totalInnerBlocks = innerBlocks.length - 1;
    const blockIndex = getBlockIndex(selectedBlockClientId);
    isLastInnerBlockSelected = totalInnerBlocks === blockIndex;
  }
  const parentId = getBlockRootClientId(clientId);
  const parentBlockAlignment = getBlockAttributes(parentId)?.align;
  return {
    hasInnerBlocks,
    isLastInnerBlockSelected,
    parentBlockAlignment
  };
}), withPreferredColorScheme])(GroupEdit);
//# sourceMappingURL=edit.native.js.map
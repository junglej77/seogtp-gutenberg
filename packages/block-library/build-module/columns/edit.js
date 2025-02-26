/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { InspectorControls, useInnerBlocksProps, BlockControls, BlockVerticalAlignmentToolbar, __experimentalBlockVariationPicker, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { useDispatch, useSelect, useRegistry } from '@wordpress/data';
import { createBlock, createBlocksFromInnerBlocksTemplate, store as blocksStore } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { hasExplicitPercentColumnWidths, getMappedColumnWidths, getRedistributedColumnWidths, toWidthPrecision } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_BLOCK = {
  name: 'core/column'
};
function ColumnInspectorControls({
  clientId,
  setAttributes,
  isStackedOnMobile
}) {
  const {
    count,
    canInsertColumnBlock,
    minCount
  } = useSelect(select => {
    const {
      canInsertBlockType,
      canRemoveBlock,
      getBlocks,
      getBlockCount
    } = select(blockEditorStore);
    const innerBlocks = getBlocks(clientId);

    // Get the indexes of columns for which removal is prevented.
    // The highest index will be used to determine the minimum column count.
    const preventRemovalBlockIndexes = innerBlocks.reduce((acc, block, index) => {
      if (!canRemoveBlock(block.clientId)) {
        acc.push(index);
      }
      return acc;
    }, []);
    return {
      count: getBlockCount(clientId),
      canInsertColumnBlock: canInsertBlockType('core/column', clientId),
      minCount: Math.max(...preventRemovalBlockIndexes) + 1
    };
  }, [clientId]);
  const {
    getBlocks
  } = useSelect(blockEditorStore);
  const {
    replaceInnerBlocks
  } = useDispatch(blockEditorStore);

  /**
   * Updates the column count, including necessary revisions to child Column
   * blocks to grant required or redistribute available space.
   *
   * @param {number} previousColumns Previous column count.
   * @param {number} newColumns      New column count.
   */
  function updateColumns(previousColumns, newColumns) {
    let innerBlocks = getBlocks(clientId);
    const hasExplicitWidths = hasExplicitPercentColumnWidths(innerBlocks);

    // Redistribute available width for existing inner blocks.
    const isAddingColumn = newColumns > previousColumns;
    if (isAddingColumn && hasExplicitWidths) {
      // If adding a new column, assign width to the new column equal to
      // as if it were `1 / columns` of the total available space.
      const newColumnWidth = toWidthPrecision(100 / newColumns);
      const newlyAddedColumns = newColumns - previousColumns;

      // Redistribute in consideration of pending block insertion as
      // constraining the available working width.
      const widths = getRedistributedColumnWidths(innerBlocks, 100 - newColumnWidth * newlyAddedColumns);
      innerBlocks = [...getMappedColumnWidths(innerBlocks, widths), ...Array.from({
        length: newlyAddedColumns
      }).map(() => {
        return createBlock('core/column', {
          width: `${newColumnWidth}%`
        });
      })];
    } else if (isAddingColumn) {
      innerBlocks = [...innerBlocks, ...Array.from({
        length: newColumns - previousColumns
      }).map(() => {
        return createBlock('core/column');
      })];
    } else if (newColumns < previousColumns) {
      // The removed column will be the last of the inner blocks.
      innerBlocks = innerBlocks.slice(0, -(previousColumns - newColumns));
      if (hasExplicitWidths) {
        // Redistribute as if block is already removed.
        const widths = getRedistributedColumnWidths(innerBlocks, 100);
        innerBlocks = getMappedColumnWidths(innerBlocks, widths);
      }
    }
    replaceInnerBlocks(clientId, innerBlocks);
  }
  return /*#__PURE__*/_jsxs(PanelBody, {
    title: __('Settings'),
    children: [canInsertColumnBlock && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(RangeControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        label: __('Columns'),
        value: count,
        onChange: value => updateColumns(count, Math.max(minCount, value)),
        min: Math.max(1, minCount),
        max: Math.max(6, count)
      }), count > 6 && /*#__PURE__*/_jsx(Notice, {
        status: "warning",
        isDismissible: false,
        children: __('This column count exceeds the recommended amount and may cause visual breakage.')
      })]
    }), /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Stack on mobile'),
      checked: isStackedOnMobile,
      onChange: () => setAttributes({
        isStackedOnMobile: !isStackedOnMobile
      })
    })]
  });
}
function ColumnsEditContainer({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    isStackedOnMobile,
    verticalAlignment,
    templateLock
  } = attributes;
  const registry = useRegistry();
  const {
    getBlockOrder
  } = useSelect(blockEditorStore);
  const {
    updateBlockAttributes
  } = useDispatch(blockEditorStore);
  const classes = clsx({
    [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
    [`is-not-stacked-on-mobile`]: !isStackedOnMobile
  });
  const blockProps = useBlockProps({
    className: classes
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    defaultBlock: DEFAULT_BLOCK,
    directInsert: true,
    orientation: 'horizontal',
    renderAppender: false,
    templateLock
  });

  /**
   * Update all child Column blocks with a new vertical alignment setting
   * based on whatever alignment is passed in. This allows change to parent
   * to overide anything set on a individual column basis.
   *
   * @param {string} newVerticalAlignment The vertical alignment setting.
   */
  function updateAlignment(newVerticalAlignment) {
    const innerBlockClientIds = getBlockOrder(clientId);

    // Update own and child Column block vertical alignments.
    // This is a single action; the batching prevents creating multiple history records.
    registry.batch(() => {
      setAttributes({
        verticalAlignment: newVerticalAlignment
      });
      updateBlockAttributes(innerBlockClientIds, {
        verticalAlignment: newVerticalAlignment
      });
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(BlockVerticalAlignmentToolbar, {
        onChange: updateAlignment,
        value: verticalAlignment
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(ColumnInspectorControls, {
        clientId: clientId,
        setAttributes: setAttributes,
        isStackedOnMobile: isStackedOnMobile
      })
    }), /*#__PURE__*/_jsx("div", {
      ...innerBlocksProps
    })]
  });
}
function Placeholder({
  clientId,
  name,
  setAttributes
}) {
  const {
    blockType,
    defaultVariation,
    variations
  } = useSelect(select => {
    const {
      getBlockVariations,
      getBlockType,
      getDefaultBlockVariation
    } = select(blocksStore);
    return {
      blockType: getBlockType(name),
      defaultVariation: getDefaultBlockVariation(name, 'block'),
      variations: getBlockVariations(name, 'block')
    };
  }, [name]);
  const {
    replaceInnerBlocks
  } = useDispatch(blockEditorStore);
  const blockProps = useBlockProps();
  return /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: /*#__PURE__*/_jsx(__experimentalBlockVariationPicker, {
      icon: blockType?.icon?.src,
      label: blockType?.title,
      variations: variations,
      instructions: __('Divide into columns. Select a layout:'),
      onSelect: (nextVariation = defaultVariation) => {
        if (nextVariation.attributes) {
          setAttributes(nextVariation.attributes);
        }
        if (nextVariation.innerBlocks) {
          replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks), true);
        }
      },
      allowSkip: true
    })
  });
}
const ColumnsEdit = props => {
  const {
    clientId
  } = props;
  const hasInnerBlocks = useSelect(select => select(blockEditorStore).getBlocks(clientId).length > 0, [clientId]);
  const Component = hasInnerBlocks ? ColumnsEditContainer : Placeholder;
  return /*#__PURE__*/_jsx(Component, {
    ...props
  });
};
export default ColumnsEdit;
//# sourceMappingURL=edit.js.map
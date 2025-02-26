/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useState, useEffect, forwardRef, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __experimentalUseDropZone as useDropZone } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { useBlockElement } from '../block-list/use-block-props/use-block-refs';
import BlockPopoverCover from '../block-popover/cover';
import { range, GridRect, getGridInfo } from './utils';
import { store as blockEditorStore } from '../../store';
import { useGetNumberOfBlocksBeforeCell } from './use-get-number-of-blocks-before-cell';
import ButtonBlockAppender from '../button-block-appender';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
export function GridVisualizer({
  clientId,
  contentRef,
  parentLayout
}) {
  const isDistractionFree = useSelect(select => select(blockEditorStore).getSettings().isDistractionFree, []);
  const gridElement = useBlockElement(clientId);
  if (isDistractionFree || !gridElement) {
    return null;
  }
  const isManualGrid = parentLayout?.isManualPlacement && window.__experimentalEnableGridInteractivity;
  return /*#__PURE__*/_jsx(GridVisualizerGrid, {
    gridClientId: clientId,
    gridElement: gridElement,
    isManualGrid: isManualGrid,
    ref: contentRef
  });
}
const GridVisualizerGrid = forwardRef(({
  gridClientId,
  gridElement,
  isManualGrid
}, ref) => {
  const [gridInfo, setGridInfo] = useState(() => getGridInfo(gridElement));
  const [isDroppingAllowed, setIsDroppingAllowed] = useState(false);
  useEffect(() => {
    const observers = [];
    for (const element of [gridElement, ...gridElement.children]) {
      const observer = new window.ResizeObserver(() => {
        setGridInfo(getGridInfo(gridElement));
      });
      observer.observe(element);
      observers.push(observer);
    }
    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [gridElement]);
  useEffect(() => {
    function onGlobalDrag() {
      setIsDroppingAllowed(true);
    }
    function onGlobalDragEnd() {
      setIsDroppingAllowed(false);
    }
    document.addEventListener('drag', onGlobalDrag);
    document.addEventListener('dragend', onGlobalDragEnd);
    return () => {
      document.removeEventListener('drag', onGlobalDrag);
      document.removeEventListener('dragend', onGlobalDragEnd);
    };
  }, []);
  return /*#__PURE__*/_jsx(BlockPopoverCover, {
    className: clsx('block-editor-grid-visualizer', {
      'is-dropping-allowed': isDroppingAllowed
    }),
    clientId: gridClientId,
    __unstablePopoverSlot: "__unstable-block-tools-after",
    children: /*#__PURE__*/_jsx("div", {
      ref: ref,
      className: "block-editor-grid-visualizer__grid",
      style: gridInfo.style,
      children: isManualGrid ? /*#__PURE__*/_jsx(ManualGridVisualizer, {
        gridClientId: gridClientId,
        gridInfo: gridInfo
      }) : Array.from({
        length: gridInfo.numItems
      }, (_, i) => /*#__PURE__*/_jsx(GridVisualizerCell, {
        color: gridInfo.currentColor
      }, i))
    })
  });
});
function ManualGridVisualizer({
  gridClientId,
  gridInfo
}) {
  const [highlightedRect, setHighlightedRect] = useState(null);
  const gridItemStyles = useSelect(select => {
    const {
      getBlockOrder,
      getBlockStyles
    } = unlock(select(blockEditorStore));
    const blockOrder = getBlockOrder(gridClientId);
    return getBlockStyles(blockOrder);
  }, [gridClientId]);
  const occupiedRects = useMemo(() => {
    const rects = [];
    for (const style of Object.values(gridItemStyles)) {
      var _style$layout;
      const {
        columnStart,
        rowStart,
        columnSpan = 1,
        rowSpan = 1
      } = (_style$layout = style?.layout) !== null && _style$layout !== void 0 ? _style$layout : {};
      if (!columnStart || !rowStart) {
        continue;
      }
      rects.push(new GridRect({
        columnStart,
        rowStart,
        columnSpan,
        rowSpan
      }));
    }
    return rects;
  }, [gridItemStyles]);
  return range(1, gridInfo.numRows).map(row => range(1, gridInfo.numColumns).map(column => {
    var _highlightedRect$cont;
    const isCellOccupied = occupiedRects.some(rect => rect.contains(column, row));
    const isHighlighted = (_highlightedRect$cont = highlightedRect?.contains(column, row)) !== null && _highlightedRect$cont !== void 0 ? _highlightedRect$cont : false;
    return /*#__PURE__*/_jsx(GridVisualizerCell, {
      color: gridInfo.currentColor,
      className: isHighlighted && 'is-highlighted',
      children: isCellOccupied ? /*#__PURE__*/_jsx(GridVisualizerDropZone, {
        column: column,
        row: row,
        gridClientId: gridClientId,
        gridInfo: gridInfo,
        setHighlightedRect: setHighlightedRect
      }) : /*#__PURE__*/_jsx(GridVisualizerAppender, {
        column: column,
        row: row,
        gridClientId: gridClientId,
        gridInfo: gridInfo,
        setHighlightedRect: setHighlightedRect
      })
    }, `${row}-${column}`);
  }));
}
function GridVisualizerCell({
  color,
  children,
  className
}) {
  return /*#__PURE__*/_jsx("div", {
    className: clsx('block-editor-grid-visualizer__cell', className),
    style: {
      boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${color} 20%, #0000)`,
      color
    },
    children: children
  });
}
function useGridVisualizerDropZone(column, row, gridClientId, gridInfo, setHighlightedRect) {
  const {
    getBlockAttributes,
    getBlockRootClientId,
    canInsertBlockType,
    getBlockName
  } = useSelect(blockEditorStore);
  const {
    updateBlockAttributes,
    moveBlocksToPosition,
    __unstableMarkNextChangeAsNotPersistent
  } = useDispatch(blockEditorStore);
  const getNumberOfBlocksBeforeCell = useGetNumberOfBlocksBeforeCell(gridClientId, gridInfo.numColumns);
  return useDropZoneWithValidation({
    validateDrag(srcClientId) {
      const blockName = getBlockName(srcClientId);
      if (!canInsertBlockType(blockName, gridClientId)) {
        return false;
      }
      const attributes = getBlockAttributes(srcClientId);
      const rect = new GridRect({
        columnStart: column,
        rowStart: row,
        columnSpan: attributes.style?.layout?.columnSpan,
        rowSpan: attributes.style?.layout?.rowSpan
      });
      const isInBounds = new GridRect({
        columnSpan: gridInfo.numColumns,
        rowSpan: gridInfo.numRows
      }).containsRect(rect);
      return isInBounds;
    },
    onDragEnter(srcClientId) {
      const attributes = getBlockAttributes(srcClientId);
      setHighlightedRect(new GridRect({
        columnStart: column,
        rowStart: row,
        columnSpan: attributes.style?.layout?.columnSpan,
        rowSpan: attributes.style?.layout?.rowSpan
      }));
    },
    onDragLeave() {
      // onDragEnter can be called before onDragLeave if the user moves
      // their mouse quickly, so only clear the highlight if it was set
      // by this cell.
      setHighlightedRect(prevHighlightedRect => prevHighlightedRect?.columnStart === column && prevHighlightedRect?.rowStart === row ? null : prevHighlightedRect);
    },
    onDrop(srcClientId) {
      setHighlightedRect(null);
      const attributes = getBlockAttributes(srcClientId);
      updateBlockAttributes(srcClientId, {
        style: {
          ...attributes.style,
          layout: {
            ...attributes.style?.layout,
            columnStart: column,
            rowStart: row
          }
        }
      });
      __unstableMarkNextChangeAsNotPersistent();
      moveBlocksToPosition([srcClientId], getBlockRootClientId(srcClientId), gridClientId, getNumberOfBlocksBeforeCell(column, row));
    }
  });
}
function GridVisualizerDropZone({
  column,
  row,
  gridClientId,
  gridInfo,
  setHighlightedRect
}) {
  return /*#__PURE__*/_jsx("div", {
    className: "block-editor-grid-visualizer__drop-zone",
    ref: useGridVisualizerDropZone(column, row, gridClientId, gridInfo, setHighlightedRect)
  });
}
function GridVisualizerAppender({
  column,
  row,
  gridClientId,
  gridInfo,
  setHighlightedRect
}) {
  const {
    updateBlockAttributes,
    moveBlocksToPosition,
    __unstableMarkNextChangeAsNotPersistent
  } = useDispatch(blockEditorStore);
  const getNumberOfBlocksBeforeCell = useGetNumberOfBlocksBeforeCell(gridClientId, gridInfo.numColumns);
  return /*#__PURE__*/_jsx(ButtonBlockAppender, {
    rootClientId: gridClientId,
    className: "block-editor-grid-visualizer__appender",
    ref: useGridVisualizerDropZone(column, row, gridClientId, gridInfo, setHighlightedRect),
    style: {
      color: gridInfo.currentColor
    },
    onSelect: block => {
      if (!block) {
        return;
      }
      updateBlockAttributes(block.clientId, {
        style: {
          layout: {
            columnStart: column,
            rowStart: row
          }
        }
      });
      __unstableMarkNextChangeAsNotPersistent();
      moveBlocksToPosition([block.clientId], gridClientId, gridClientId, getNumberOfBlocksBeforeCell(column, row));
    }
  });
}
function useDropZoneWithValidation({
  validateDrag,
  onDragEnter,
  onDragLeave,
  onDrop
}) {
  const {
    getDraggedBlockClientIds
  } = useSelect(blockEditorStore);
  return useDropZone({
    onDragEnter() {
      const [srcClientId] = getDraggedBlockClientIds();
      if (srcClientId && validateDrag(srcClientId)) {
        onDragEnter(srcClientId);
      }
    },
    onDragLeave() {
      onDragLeave();
    },
    onDrop() {
      const [srcClientId] = getDraggedBlockClientIds();
      if (srcClientId && validateDrag(srcClientId)) {
        onDrop(srcClientId);
      }
    }
  });
}
//# sourceMappingURL=grid-visualizer.js.map
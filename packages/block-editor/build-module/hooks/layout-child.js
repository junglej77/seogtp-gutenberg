/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../store';
import { useStyleOverride } from './utils';
import { useLayout } from '../components/block-list/layout';
import { GridVisualizer, GridItemResizer, GridItemMovers } from '../components/grid';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function useBlockPropsChildLayoutStyles({
  style
}) {
  var _style$layout;
  const shouldRenderChildLayoutStyles = useSelect(select => {
    return !select(blockEditorStore).getSettings().disableLayoutStyles;
  });
  const layout = (_style$layout = style?.layout) !== null && _style$layout !== void 0 ? _style$layout : {};
  const {
    selfStretch,
    flexSize,
    columnStart,
    rowStart,
    columnSpan,
    rowSpan
  } = layout;
  const parentLayout = useLayout() || {};
  const {
    columnCount,
    minimumColumnWidth
  } = parentLayout;
  const id = useInstanceId(useBlockPropsChildLayoutStyles);
  const selector = `.wp-container-content-${id}`;

  // Check that the grid layout attributes are of the correct type, so that we don't accidentally
  // write code that stores a string attribute instead of a number.
  if (process.env.NODE_ENV === 'development') {
    if (columnStart && typeof columnStart !== 'number') {
      throw new Error('columnStart must be a number');
    }
    if (rowStart && typeof rowStart !== 'number') {
      throw new Error('rowStart must be a number');
    }
    if (columnSpan && typeof columnSpan !== 'number') {
      throw new Error('columnSpan must be a number');
    }
    if (rowSpan && typeof rowSpan !== 'number') {
      throw new Error('rowSpan must be a number');
    }
  }
  let css = '';
  if (shouldRenderChildLayoutStyles) {
    if (selfStretch === 'fixed' && flexSize) {
      css = `${selector} {
				flex-basis: ${flexSize};
				box-sizing: border-box;
			}`;
    } else if (selfStretch === 'fill') {
      css = `${selector} {
				flex-grow: 1;
			}`;
    } else if (columnStart && columnSpan) {
      css = `${selector} {
				grid-column: ${columnStart} / span ${columnSpan};
			}`;
    } else if (columnStart) {
      css = `${selector} {
				grid-column: ${columnStart};
			}`;
    } else if (columnSpan) {
      css = `${selector} {
				grid-column: span ${columnSpan};
			}`;
    }
    if (rowStart && rowSpan) {
      css += `${selector} {
				grid-row: ${rowStart} / span ${rowSpan};
			}`;
    } else if (rowStart) {
      css += `${selector} {
				grid-row: ${rowStart};
			}`;
    } else if (rowSpan) {
      css += `${selector} {
				grid-row: span ${rowSpan};
			}`;
    }
    /**
     * If minimumColumnWidth is set on the parent, or if no
     * columnCount is set, the grid is responsive so a
     * container query is needed for the span to resize.
     */
    if ((columnSpan || columnStart) && (minimumColumnWidth || !columnCount)) {
      let parentColumnValue = parseFloat(minimumColumnWidth);
      /**
       * 12rem is the default minimumColumnWidth value.
       * If parentColumnValue is not a number, default to 12.
       */
      if (isNaN(parentColumnValue)) {
        parentColumnValue = 12;
      }
      let parentColumnUnit = minimumColumnWidth?.replace(parentColumnValue, '');
      /**
       * Check that parent column unit is either 'px', 'rem' or 'em'.
       * If not, default to 'rem'.
       */
      if (!['px', 'rem', 'em'].includes(parentColumnUnit)) {
        parentColumnUnit = 'rem';
      }
      let numColsToBreakAt = 2;
      if (columnSpan && columnStart) {
        numColsToBreakAt = columnSpan + columnStart - 1;
      } else if (columnSpan) {
        numColsToBreakAt = columnSpan;
      } else {
        numColsToBreakAt = columnStart;
      }
      const defaultGapValue = parentColumnUnit === 'px' ? 24 : 1.5;
      const containerQueryValue = numColsToBreakAt * parentColumnValue + (numColsToBreakAt - 1) * defaultGapValue;
      // For blocks that only span one column, we want to remove any rowStart values as
      // the container reduces in size, so that blocks are still arranged in markup order.
      const minimumContainerQueryValue = parentColumnValue * 2 + defaultGapValue - 1;
      // If a span is set we want to preserve it as long as possible, otherwise we just reset the value.
      const gridColumnValue = columnSpan && columnSpan > 1 ? '1/-1' : 'auto';
      css += `@container (max-width: ${Math.max(containerQueryValue, minimumContainerQueryValue)}${parentColumnUnit}) {
				${selector} {
					grid-column: ${gridColumnValue};
					grid-row: auto;
				}
			}`;
    }
  }
  useStyleOverride({
    css
  });

  // Only attach a container class if there is generated CSS to be attached.
  if (!css) {
    return;
  }

  // Attach a `wp-container-content` id-based classname.
  return {
    className: `wp-container-content-${id}`
  };
}
function ChildLayoutControlsPure({
  clientId,
  style,
  setAttributes
}) {
  const parentLayout = useLayout() || {};
  const {
    type: parentLayoutType = 'default',
    allowSizingOnChildren = false,
    isManualPlacement
  } = parentLayout;
  const rootClientId = useSelect(select => {
    return select(blockEditorStore).getBlockRootClientId(clientId);
  }, [clientId]);

  // Use useState() instead of useRef() so that GridItemResizer updates when ref is set.
  const [resizerBounds, setResizerBounds] = useState();
  if (parentLayoutType !== 'grid') {
    return null;
  }
  function updateLayout(layout) {
    setAttributes({
      style: {
        ...style,
        layout: {
          ...style?.layout,
          ...layout
        }
      }
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(GridVisualizer, {
      clientId: rootClientId,
      contentRef: setResizerBounds,
      parentLayout: parentLayout
    }), allowSizingOnChildren && /*#__PURE__*/_jsx(GridItemResizer, {
      clientId: clientId
      // Don't allow resizing beyond the grid visualizer.
      ,
      bounds: resizerBounds,
      onChange: updateLayout,
      parentLayout: parentLayout
    }), isManualPlacement && window.__experimentalEnableGridInteractivity && /*#__PURE__*/_jsx(GridItemMovers, {
      layout: style?.layout,
      parentLayout: parentLayout,
      onChange: updateLayout,
      gridClientId: rootClientId,
      blockClientId: clientId
    })]
  });
}
export default {
  useBlockProps: useBlockPropsChildLayoutStyles,
  edit: ChildLayoutControlsPure,
  attributeKeys: ['style'],
  hasSupport() {
    return true;
  }
};
//# sourceMappingURL=layout-child.js.map
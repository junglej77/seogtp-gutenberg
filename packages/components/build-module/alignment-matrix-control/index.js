/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Cell from './cell';
import { Composite } from '../composite';
import { GridContainer, GridRow } from './styles';
import AlignmentMatrixControlIcon from './icon';
import { GRID, getItemId, getItemValue } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedAlignmentMatrixControl({
  className,
  id,
  label = __('Alignment Matrix Control'),
  defaultValue = 'center center',
  value,
  onChange,
  width = 92,
  ...props
}) {
  const baseId = useInstanceId(UnforwardedAlignmentMatrixControl, 'alignment-matrix-control', id);
  const setActiveId = useCallback(nextActiveId => {
    const nextValue = getItemValue(baseId, nextActiveId);
    if (nextValue) {
      onChange?.(nextValue);
    }
  }, [baseId, onChange]);
  const classes = clsx('component-alignment-matrix-control', className);
  return /*#__PURE__*/_jsx(Composite, {
    defaultActiveId: getItemId(baseId, defaultValue),
    activeId: getItemId(baseId, value),
    setActiveId: setActiveId,
    rtl: isRTL(),
    render: /*#__PURE__*/_jsx(GridContainer, {
      ...props,
      "aria-label": label,
      className: classes,
      id: baseId,
      role: "grid",
      size: width
    }),
    children: GRID.map((cells, index) => /*#__PURE__*/_jsx(Composite.Row, {
      render: /*#__PURE__*/_jsx(GridRow, {
        role: "row"
      }),
      children: cells.map(cell => /*#__PURE__*/_jsx(Cell, {
        id: getItemId(baseId, cell),
        value: cell
      }, cell))
    }, index))
  });
}

/**
 * AlignmentMatrixControl components enable adjustments to horizontal and vertical alignments for UI.
 *
 * ```jsx
 * import { AlignmentMatrixControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const Example = () => {
 * 	const [ alignment, setAlignment ] = useState( 'center center' );
 *
 * 	return (
 * 		<AlignmentMatrixControl
 * 			value={ alignment }
 * 			onChange={ setAlignment }
 * 		/>
 * 	);
 * };
 * ```
 */
export const AlignmentMatrixControl = Object.assign(UnforwardedAlignmentMatrixControl, {
  /**
   * Render an alignment matrix as an icon.
   *
   * ```jsx
   * import { AlignmentMatrixControl } from '@wordpress/components';
   *
   * <Icon icon={<AlignmentMatrixControl.Icon value="top left" />} />
   * ```
   */
  Icon: Object.assign(AlignmentMatrixControlIcon, {
    displayName: 'AlignmentMatrixControl.Icon'
  })
});
export default AlignmentMatrixControl;
//# sourceMappingURL=index.js.map
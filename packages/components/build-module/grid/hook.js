/**
 * External dependencies
 */
import { css } from '@emotion/react';

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { useContextSystem } from '../context';
import { getAlignmentProps } from './utils';
import { useResponsiveValue } from '../utils/use-responsive-value';
import CONFIG from '../utils/config-values';
import { useCx } from '../utils/hooks/use-cx';
export default function useGrid(props) {
  const {
    align,
    alignment,
    className,
    columnGap,
    columns = 2,
    gap = 3,
    isInline = false,
    justify,
    rowGap,
    rows,
    templateColumns,
    templateRows,
    ...otherProps
  } = useContextSystem(props, 'Grid');
  const columnsAsArray = Array.isArray(columns) ? columns : [columns];
  const column = useResponsiveValue(columnsAsArray);
  const rowsAsArray = Array.isArray(rows) ? rows : [rows];
  const row = useResponsiveValue(rowsAsArray);
  const gridTemplateColumns = templateColumns || !!columns && `repeat( ${column}, 1fr )`;
  const gridTemplateRows = templateRows || !!rows && `repeat( ${row}, 1fr )`;
  const cx = useCx();
  const classes = useMemo(() => {
    const alignmentProps = getAlignmentProps(alignment);
    const gridClasses = /*#__PURE__*/css({
      alignItems: align,
      display: isInline ? 'inline-grid' : 'grid',
      gap: `calc( ${CONFIG.gridBase} * ${gap} )`,
      gridTemplateColumns: gridTemplateColumns || undefined,
      gridTemplateRows: gridTemplateRows || undefined,
      gridRowGap: rowGap,
      gridColumnGap: columnGap,
      justifyContent: justify,
      verticalAlign: isInline ? 'middle' : undefined,
      ...alignmentProps
    }, process.env.NODE_ENV === "production" ? "" : ";label:gridClasses;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZ3JpZC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVEc0IiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9ncmlkL2hvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcblxyXG4vKipcclxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi9jb250ZXh0JztcclxuaW1wb3J0IHsgZ2V0QWxpZ25tZW50UHJvcHMgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgdXNlUmVzcG9uc2l2ZVZhbHVlIH0gZnJvbSAnLi4vdXRpbHMvdXNlLXJlc3BvbnNpdmUtdmFsdWUnO1xyXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xyXG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XHJcbmltcG9ydCB0eXBlIHsgR3JpZFByb3BzIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VHcmlkKFxyXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgR3JpZFByb3BzLCAnZGl2JyA+XHJcbikge1xyXG5cdGNvbnN0IHtcclxuXHRcdGFsaWduLFxyXG5cdFx0YWxpZ25tZW50LFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0Y29sdW1uR2FwLFxyXG5cdFx0Y29sdW1ucyA9IDIsXHJcblx0XHRnYXAgPSAzLFxyXG5cdFx0aXNJbmxpbmUgPSBmYWxzZSxcclxuXHRcdGp1c3RpZnksXHJcblx0XHRyb3dHYXAsXHJcblx0XHRyb3dzLFxyXG5cdFx0dGVtcGxhdGVDb2x1bW5zLFxyXG5cdFx0dGVtcGxhdGVSb3dzLFxyXG5cdFx0Li4ub3RoZXJQcm9wc1xyXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ0dyaWQnICk7XHJcblxyXG5cdGNvbnN0IGNvbHVtbnNBc0FycmF5ID0gQXJyYXkuaXNBcnJheSggY29sdW1ucyApID8gY29sdW1ucyA6IFsgY29sdW1ucyBdO1xyXG5cdGNvbnN0IGNvbHVtbiA9IHVzZVJlc3BvbnNpdmVWYWx1ZSggY29sdW1uc0FzQXJyYXkgKTtcclxuXHRjb25zdCByb3dzQXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIHJvd3MgKSA/IHJvd3MgOiBbIHJvd3MgXTtcclxuXHRjb25zdCByb3cgPSB1c2VSZXNwb25zaXZlVmFsdWUoIHJvd3NBc0FycmF5ICk7XHJcblxyXG5cdGNvbnN0IGdyaWRUZW1wbGF0ZUNvbHVtbnMgPVxyXG5cdFx0dGVtcGxhdGVDb2x1bW5zIHx8ICggISEgY29sdW1ucyAmJiBgcmVwZWF0KCAkeyBjb2x1bW4gfSwgMWZyIClgICk7XHJcblx0Y29uc3QgZ3JpZFRlbXBsYXRlUm93cyA9XHJcblx0XHR0ZW1wbGF0ZVJvd3MgfHwgKCAhISByb3dzICYmIGByZXBlYXQoICR7IHJvdyB9LCAxZnIgKWAgKTtcclxuXHJcblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xyXG5cclxuXHRjb25zdCBjbGFzc2VzID0gdXNlTWVtbyggKCkgPT4ge1xyXG5cdFx0Y29uc3QgYWxpZ25tZW50UHJvcHMgPSBnZXRBbGlnbm1lbnRQcm9wcyggYWxpZ25tZW50ICk7XHJcblxyXG5cdFx0Y29uc3QgZ3JpZENsYXNzZXMgPSBjc3MoIHtcclxuXHRcdFx0YWxpZ25JdGVtczogYWxpZ24sXHJcblx0XHRcdGRpc3BsYXk6IGlzSW5saW5lID8gJ2lubGluZS1ncmlkJyA6ICdncmlkJyxcclxuXHRcdFx0Z2FwOiBgY2FsYyggJHsgQ09ORklHLmdyaWRCYXNlIH0gKiAkeyBnYXAgfSApYCxcclxuXHRcdFx0Z3JpZFRlbXBsYXRlQ29sdW1uczogZ3JpZFRlbXBsYXRlQ29sdW1ucyB8fCB1bmRlZmluZWQsXHJcblx0XHRcdGdyaWRUZW1wbGF0ZVJvd3M6IGdyaWRUZW1wbGF0ZVJvd3MgfHwgdW5kZWZpbmVkLFxyXG5cdFx0XHRncmlkUm93R2FwOiByb3dHYXAsXHJcblx0XHRcdGdyaWRDb2x1bW5HYXA6IGNvbHVtbkdhcCxcclxuXHRcdFx0anVzdGlmeUNvbnRlbnQ6IGp1c3RpZnksXHJcblx0XHRcdHZlcnRpY2FsQWxpZ246IGlzSW5saW5lID8gJ21pZGRsZScgOiB1bmRlZmluZWQsXHJcblx0XHRcdC4uLmFsaWdubWVudFByb3BzLFxyXG5cdFx0fSApO1xyXG5cclxuXHRcdHJldHVybiBjeCggZ3JpZENsYXNzZXMsIGNsYXNzTmFtZSApO1xyXG5cdH0sIFtcclxuXHRcdGFsaWduLFxyXG5cdFx0YWxpZ25tZW50LFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0Y29sdW1uR2FwLFxyXG5cdFx0Y3gsXHJcblx0XHRnYXAsXHJcblx0XHRncmlkVGVtcGxhdGVDb2x1bW5zLFxyXG5cdFx0Z3JpZFRlbXBsYXRlUm93cyxcclxuXHRcdGlzSW5saW5lLFxyXG5cdFx0anVzdGlmeSxcclxuXHRcdHJvd0dhcCxcclxuXHRdICk7XHJcblxyXG5cdHJldHVybiB7IC4uLm90aGVyUHJvcHMsIGNsYXNzTmFtZTogY2xhc3NlcyB9O1xyXG59XHJcbiJdfQ== */");
    return cx(gridClasses, className);
  }, [align, alignment, className, columnGap, cx, gap, gridTemplateColumns, gridTemplateRows, isInline, justify, rowGap]);
  return {
    ...otherProps,
    className: classes
  };
}
//# sourceMappingURL=hook.js.map
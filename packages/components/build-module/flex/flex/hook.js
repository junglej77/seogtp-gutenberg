/**
 * External dependencies
 */
import { css } from '@emotion/react';

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */

import { useContextSystem } from '../../context';
import { useResponsiveValue } from '../../utils/use-responsive-value';
import { space } from '../../utils/space';
import * as styles from '../styles';
import { useCx } from '../../utils';
function useDeprecatedProps(props) {
  const {
    isReversed,
    ...otherProps
  } = props;
  if (typeof isReversed !== 'undefined') {
    deprecated('Flex isReversed', {
      alternative: 'Flex direction="row-reverse" or "column-reverse"',
      since: '5.9'
    });
    return {
      ...otherProps,
      direction: isReversed ? 'row-reverse' : 'row'
    };
  }
  return otherProps;
}
export function useFlex(props) {
  const {
    align,
    className,
    direction: directionProp = 'row',
    expanded = true,
    gap = 2,
    justify = 'space-between',
    wrap = false,
    ...otherProps
  } = useContextSystem(useDeprecatedProps(props), 'Flex');
  const directionAsArray = Array.isArray(directionProp) ? directionProp : [directionProp];
  const direction = useResponsiveValue(directionAsArray);
  const isColumn = typeof direction === 'string' && !!direction.includes('column');
  const cx = useCx();
  const classes = useMemo(() => {
    const base = /*#__PURE__*/css({
      alignItems: align !== null && align !== void 0 ? align : isColumn ? 'normal' : 'center',
      flexDirection: direction,
      flexWrap: wrap ? 'wrap' : undefined,
      gap: space(gap),
      justifyContent: justify,
      height: isColumn && expanded ? '100%' : undefined,
      width: !isColumn && expanded ? '100%' : undefined
    }, process.env.NODE_ENV === "production" ? "" : ";label:base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0VlIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcblxyXG4vKipcclxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XHJcbmltcG9ydCBkZXByZWNhdGVkIGZyb20gJ0B3b3JkcHJlc3MvZGVwcmVjYXRlZCc7XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XHJcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi8uLi9jb250ZXh0JztcclxuaW1wb3J0IHsgdXNlUmVzcG9uc2l2ZVZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXNlLXJlc3BvbnNpdmUtdmFsdWUnO1xyXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3V0aWxzL3NwYWNlJztcclxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3N0eWxlcyc7XHJcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgdHlwZSB7IEZsZXhQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmZ1bmN0aW9uIHVzZURlcHJlY2F0ZWRQcm9wcyhcclxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEZsZXhQcm9wcywgJ2RpdicgPlxyXG4pOiBPbWl0PCB0eXBlb2YgcHJvcHMsICdpc1JldmVyc2VkJyA+IHtcclxuXHRjb25zdCB7IGlzUmV2ZXJzZWQsIC4uLm90aGVyUHJvcHMgfSA9IHByb3BzO1xyXG5cclxuXHRpZiAoIHR5cGVvZiBpc1JldmVyc2VkICE9PSAndW5kZWZpbmVkJyApIHtcclxuXHRcdGRlcHJlY2F0ZWQoICdGbGV4IGlzUmV2ZXJzZWQnLCB7XHJcblx0XHRcdGFsdGVybmF0aXZlOiAnRmxleCBkaXJlY3Rpb249XCJyb3ctcmV2ZXJzZVwiIG9yIFwiY29sdW1uLXJldmVyc2VcIicsXHJcblx0XHRcdHNpbmNlOiAnNS45JyxcclxuXHRcdH0gKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdC4uLm90aGVyUHJvcHMsXHJcblx0XHRcdGRpcmVjdGlvbjogaXNSZXZlcnNlZCA/ICdyb3ctcmV2ZXJzZScgOiAncm93JyxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gb3RoZXJQcm9wcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZsZXgoIHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleFByb3BzLCAnZGl2JyA+ICkge1xyXG5cdGNvbnN0IHtcclxuXHRcdGFsaWduLFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0ZGlyZWN0aW9uOiBkaXJlY3Rpb25Qcm9wID0gJ3JvdycsXHJcblx0XHRleHBhbmRlZCA9IHRydWUsXHJcblx0XHRnYXAgPSAyLFxyXG5cdFx0anVzdGlmeSA9ICdzcGFjZS1iZXR3ZWVuJyxcclxuXHRcdHdyYXAgPSBmYWxzZSxcclxuXHRcdC4uLm90aGVyUHJvcHNcclxuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggdXNlRGVwcmVjYXRlZFByb3BzKCBwcm9wcyApLCAnRmxleCcgKTtcclxuXHJcblx0Y29uc3QgZGlyZWN0aW9uQXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIGRpcmVjdGlvblByb3AgKVxyXG5cdFx0PyBkaXJlY3Rpb25Qcm9wXHJcblx0XHQ6IFsgZGlyZWN0aW9uUHJvcCBdO1xyXG5cdGNvbnN0IGRpcmVjdGlvbiA9IHVzZVJlc3BvbnNpdmVWYWx1ZSggZGlyZWN0aW9uQXNBcnJheSApO1xyXG5cclxuXHRjb25zdCBpc0NvbHVtbiA9XHJcblx0XHR0eXBlb2YgZGlyZWN0aW9uID09PSAnc3RyaW5nJyAmJiAhISBkaXJlY3Rpb24uaW5jbHVkZXMoICdjb2x1bW4nICk7XHJcblxyXG5cdGNvbnN0IGN4ID0gdXNlQ3goKTtcclxuXHJcblx0Y29uc3QgY2xhc3NlcyA9IHVzZU1lbW8oICgpID0+IHtcclxuXHRcdGNvbnN0IGJhc2UgPSBjc3MoIHtcclxuXHRcdFx0YWxpZ25JdGVtczogYWxpZ24gPz8gKCBpc0NvbHVtbiA/ICdub3JtYWwnIDogJ2NlbnRlcicgKSxcclxuXHRcdFx0ZmxleERpcmVjdGlvbjogZGlyZWN0aW9uLFxyXG5cdFx0XHRmbGV4V3JhcDogd3JhcCA/ICd3cmFwJyA6IHVuZGVmaW5lZCxcclxuXHRcdFx0Z2FwOiBzcGFjZSggZ2FwICksXHJcblx0XHRcdGp1c3RpZnlDb250ZW50OiBqdXN0aWZ5LFxyXG5cdFx0XHRoZWlnaHQ6IGlzQ29sdW1uICYmIGV4cGFuZGVkID8gJzEwMCUnIDogdW5kZWZpbmVkLFxyXG5cdFx0XHR3aWR0aDogISBpc0NvbHVtbiAmJiBleHBhbmRlZCA/ICcxMDAlJyA6IHVuZGVmaW5lZCxcclxuXHRcdH0gKTtcclxuXHJcblx0XHRyZXR1cm4gY3goXHJcblx0XHRcdHN0eWxlcy5GbGV4LFxyXG5cdFx0XHRiYXNlLFxyXG5cdFx0XHRpc0NvbHVtbiA/IHN0eWxlcy5JdGVtc0NvbHVtbiA6IHN0eWxlcy5JdGVtc1JvdyxcclxuXHRcdFx0Y2xhc3NOYW1lXHJcblx0XHQpO1xyXG5cdH0sIFtcclxuXHRcdGFsaWduLFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0Y3gsXHJcblx0XHRkaXJlY3Rpb24sXHJcblx0XHRleHBhbmRlZCxcclxuXHRcdGdhcCxcclxuXHRcdGlzQ29sdW1uLFxyXG5cdFx0anVzdGlmeSxcclxuXHRcdHdyYXAsXHJcblx0XSApO1xyXG5cclxuXHRyZXR1cm4geyAuLi5vdGhlclByb3BzLCBjbGFzc05hbWU6IGNsYXNzZXMsIGlzQ29sdW1uIH07XHJcbn1cclxuIl19 */");
    return cx(styles.Flex, base, isColumn ? styles.ItemsColumn : styles.ItemsRow, className);
  }, [align, className, cx, direction, expanded, gap, isColumn, justify, wrap]);
  return {
    ...otherProps,
    className: classes,
    isColumn
  };
}
//# sourceMappingURL=hook.js.map
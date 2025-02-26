/**
 * External dependencies
 */
import { animated } from '@react-spring/web';
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalTreeGridRow as TreeGridRow } from '@wordpress/components';
import { useMergeRefs } from '@wordpress/compose';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useMovingAnimation from '../use-moving-animation';
import { jsx as _jsx } from "react/jsx-runtime";
const AnimatedTreeGridRow = animated(TreeGridRow);
const ListViewLeaf = forwardRef(({
  isDragged,
  isSelected,
  position,
  level,
  rowCount,
  children,
  className,
  path,
  ...props
}, ref) => {
  const animationRef = useMovingAnimation({
    clientId: props['data-block'],
    enableAnimation: true,
    triggerAnimationOnChange: path
  });
  const mergedRef = useMergeRefs([ref, animationRef]);
  return /*#__PURE__*/_jsx(AnimatedTreeGridRow, {
    ref: mergedRef,
    className: clsx('block-editor-list-view-leaf', className),
    level: level,
    positionInSet: position,
    setSize: rowCount,
    isExpanded: undefined,
    ...props,
    children: children
  });
});
export default ListViewLeaf;
//# sourceMappingURL=leaf.js.map
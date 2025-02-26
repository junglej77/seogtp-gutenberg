/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TreeGridItem from './item';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedTreeGridCell({
  children,
  withoutGridItem = false,
  ...props
}, ref) {
  return /*#__PURE__*/_jsx("td", {
    ...props,
    role: "gridcell",
    children: withoutGridItem ? /*#__PURE__*/_jsx(_Fragment, {
      children: children
    }) : /*#__PURE__*/_jsx(TreeGridItem, {
      ref: ref,
      children: children
    })
  });
}

/**
 * `TreeGridCell` is used to create a tree hierarchy.
 * It is not a visually styled component, but instead helps with adding
 * keyboard navigation and roving tab index behaviors to tree grid structures.
 *
 * @see {@link https://www.w3.org/TR/wai-aria-practices/examples/treegrid/treegrid-1.html}
 */
export const TreeGridCell = forwardRef(UnforwardedTreeGridCell);
export default TreeGridCell;
//# sourceMappingURL=cell.js.map
/**
 * Internal dependencies
 */
import { Composite } from '../composite';
import Tooltip from '../tooltip';
import { VisuallyHidden } from '../visually-hidden';

/**
 * Internal dependencies
 */
import { ALIGNMENT_LABEL } from './utils';
import { Cell as CellView, Point } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Cell({
  id,
  value,
  ...props
}) {
  return /*#__PURE__*/_jsx(Tooltip, {
    text: ALIGNMENT_LABEL[value],
    children: /*#__PURE__*/_jsxs(Composite.Item, {
      id: id,
      render: /*#__PURE__*/_jsx(CellView, {
        ...props,
        role: "gridcell"
      }),
      children: [/*#__PURE__*/_jsx(VisuallyHidden, {
        children: value
      }), /*#__PURE__*/_jsx(Point, {
        role: "presentation"
      })]
    })
  });
}
//# sourceMappingURL=cell.js.map
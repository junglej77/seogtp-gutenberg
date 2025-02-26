/**
 * WordPress dependencies
 */
import { Icon, tip } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Tip(props) {
  const {
    children
  } = props;
  return /*#__PURE__*/_jsxs("div", {
    className: "components-tip",
    children: [/*#__PURE__*/_jsx(Icon, {
      icon: tip
    }), /*#__PURE__*/_jsx("p", {
      children: children
    })]
  });
}
export default Tip;
//# sourceMappingURL=index.js.map
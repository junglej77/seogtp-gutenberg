import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Internal dependencies
 */

/**
 * `PanelHeader` renders the header for the `Panel`.
 * This is used by the `Panel` component under the hood,
 * so it does not typically need to be used.
 */
function PanelHeader({
  label,
  children
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "components-panel__header",
    children: [label && /*#__PURE__*/_jsx("h2", {
      children: label
    }), children]
  });
}
export default PanelHeader;
//# sourceMappingURL=header.js.map
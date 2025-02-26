/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { VisuallyHidden } from '@wordpress/components';
import { _x, sprintf } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ResponsiveBlockControlLabel({
  property,
  viewport,
  desc
}) {
  const instanceId = useInstanceId(ResponsiveBlockControlLabel);
  const accessibleLabel = desc || sprintf( /* translators: 1: property name. 2: viewport name. */
  _x('Controls the %1$s property for %2$s viewports.', 'Text labelling a interface as controlling a given layout property (eg: margin) for a given screen size.'), property, viewport.label);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("span", {
      "aria-describedby": `rbc-desc-${instanceId}`,
      children: viewport.label
    }), /*#__PURE__*/_jsx(VisuallyHidden, {
      as: "span",
      id: `rbc-desc-${instanceId}`,
      children: accessibleLabel
    })]
  });
}
//# sourceMappingURL=label.js.map
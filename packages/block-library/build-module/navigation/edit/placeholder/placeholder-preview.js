/**
 * WordPress dependencies
 */
import { Icon, navigation } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const PlaceholderPreview = ({
  isVisible = true
}) => {
  return /*#__PURE__*/_jsx("div", {
    "aria-hidden": !isVisible ? true : undefined,
    className: "wp-block-navigation-placeholder__preview",
    children: /*#__PURE__*/_jsxs("div", {
      className: "wp-block-navigation-placeholder__actions__indicator",
      children: [/*#__PURE__*/_jsx(Icon, {
        icon: navigation
      }), __('Navigation')]
    })
  });
};
export default PlaceholderPreview;
//# sourceMappingURL=placeholder-preview.js.map
/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __experimentalVStack as VStack, __experimentalSpacer as Spacer, __experimentalHeading as Heading, __experimentalView as View, __experimentalNavigatorBackButton as NavigatorBackButton } from '@wordpress/components';
import { isRTL, __ } from '@wordpress/i18n';
import { chevronRight, chevronLeft } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ScreenHeader({
  title,
  description,
  onBack
}) {
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 0,
    children: [/*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(Spacer, {
        marginBottom: 0,
        paddingX: 4,
        paddingY: 3,
        children: /*#__PURE__*/_jsxs(HStack, {
          spacing: 2,
          children: [/*#__PURE__*/_jsx(NavigatorBackButton, {
            icon: isRTL() ? chevronRight : chevronLeft,
            size: "small",
            label: __('Back'),
            onClick: onBack
          }), /*#__PURE__*/_jsx(Spacer, {
            children: /*#__PURE__*/_jsx(Heading, {
              className: "edit-site-global-styles-header",
              level: 2,
              size: 13,
              children: title
            })
          })]
        })
      })
    }), description && /*#__PURE__*/_jsx("p", {
      className: "edit-site-global-styles-header__description",
      children: description
    })]
  });
}
export default ScreenHeader;
//# sourceMappingURL=header.js.map
/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { __experimentalItemGroup as ItemGroup, __experimentalVStack as VStack, __experimentalHStack as HStack, FlexItem } from '@wordpress/components';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Subtitle from '../subtitle';
import { NavigationButtonAsItem } from '../navigation-button';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function FontSizes() {
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 2,
    children: [/*#__PURE__*/_jsx(HStack, {
      justify: "space-between",
      children: /*#__PURE__*/_jsx(Subtitle, {
        level: 3,
        children: __('Font Sizes')
      })
    }), /*#__PURE__*/_jsx(ItemGroup, {
      isBordered: true,
      isSeparated: true,
      children: /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        path: "/typography/font-sizes/",
        "aria-label": __('Edit font size presets'),
        children: /*#__PURE__*/_jsxs(HStack, {
          direction: "row",
          children: [/*#__PURE__*/_jsx(FlexItem, {
            children: __('Font size presets')
          }), /*#__PURE__*/_jsx(Icon, {
            icon: isRTL() ? chevronLeft : chevronRight
          })]
        })
      })
    })]
  });
}
export default FontSizes;
//# sourceMappingURL=font-sizes-count.js.map
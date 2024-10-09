/**
 * WordPress dependencies
 */
import { __experimentalHeading as Heading, __experimentalText as Text, __experimentalHStack as HStack, __experimentalVStack as VStack, FlexItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Header({
  title,
  subTitle,
  actions
}) {
  return /*#__PURE__*/_jsxs(VStack, {
    className: "edit-site-page-header",
    as: "header",
    spacing: 0,
    children: [/*#__PURE__*/_jsxs(HStack, {
      className: "edit-site-page-header__page-title",
      children: [/*#__PURE__*/_jsx(Heading, {
        as: "h2",
        level: 3,
        weight: 500,
        className: "edit-site-page-header__title",
        truncate: true,
        children: title
      }), /*#__PURE__*/_jsx(FlexItem, {
        className: "edit-site-page-header__actions",
        children: actions
      })]
    }), subTitle && /*#__PURE__*/_jsx(Text, {
      variant: "muted",
      as: "p",
      className: "edit-site-page-header__sub-title",
      children: subTitle
    })]
  });
}
//# sourceMappingURL=header.js.map
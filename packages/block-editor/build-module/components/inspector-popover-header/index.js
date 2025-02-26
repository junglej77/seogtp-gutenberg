/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack, __experimentalHStack as HStack, __experimentalHeading as Heading, __experimentalSpacer as Spacer, Button, __experimentalText as Text } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function InspectorPopoverHeader({
  title,
  help,
  actions = [],
  onClose
}) {
  return /*#__PURE__*/_jsxs(VStack, {
    className: "block-editor-inspector-popover-header",
    spacing: 4,
    children: [/*#__PURE__*/_jsxs(HStack, {
      alignment: "center",
      children: [/*#__PURE__*/_jsx(Heading, {
        className: "block-editor-inspector-popover-header__heading",
        level: 2,
        size: 13,
        children: title
      }), /*#__PURE__*/_jsx(Spacer, {}), actions.map(({
        label,
        icon,
        onClick
      }) => /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "block-editor-inspector-popover-header__action",
        label: label,
        icon: icon,
        variant: !icon && 'tertiary',
        onClick: onClick,
        children: !icon && label
      }, label)), onClose && /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "block-editor-inspector-popover-header__action",
        label: __('Close'),
        icon: closeSmall,
        onClick: onClose
      })]
    }), help && /*#__PURE__*/_jsx(Text, {
      children: help
    })]
  });
}
//# sourceMappingURL=index.js.map
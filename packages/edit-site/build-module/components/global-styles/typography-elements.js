/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { __experimentalItemGroup as ItemGroup, __experimentalVStack as VStack, __experimentalHStack as HStack, FlexItem } from '@wordpress/components';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { NavigationButtonAsItem } from './navigation-button';
import Subtitle from './subtitle';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
function ElementItem({
  parentMenu,
  element,
  label
}) {
  var _ref;
  const prefix = element === 'text' || !element ? '' : `elements.${element}.`;
  const extraStyles = element === 'link' ? {
    textDecoration: 'underline'
  } : {};
  const [fontFamily] = useGlobalStyle(prefix + 'typography.fontFamily');
  const [fontStyle] = useGlobalStyle(prefix + 'typography.fontStyle');
  const [fontWeight] = useGlobalStyle(prefix + 'typography.fontWeight');
  const [backgroundColor] = useGlobalStyle(prefix + 'color.background');
  const [fallbackBackgroundColor] = useGlobalStyle('color.background');
  const [gradientValue] = useGlobalStyle(prefix + 'color.gradient');
  const [color] = useGlobalStyle(prefix + 'color.text');
  const navigationButtonLabel = sprintf(
  // translators: %s: is a subset of Typography, e.g., 'text' or 'links'.
  __('Typography %s styles'), label);
  return /*#__PURE__*/_jsx(NavigationButtonAsItem, {
    path: parentMenu + '/typography/' + element,
    "aria-label": navigationButtonLabel,
    children: /*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      children: [/*#__PURE__*/_jsx(FlexItem, {
        className: "edit-site-global-styles-screen-typography__indicator",
        style: {
          fontFamily: fontFamily !== null && fontFamily !== void 0 ? fontFamily : 'serif',
          background: (_ref = gradientValue !== null && gradientValue !== void 0 ? gradientValue : backgroundColor) !== null && _ref !== void 0 ? _ref : fallbackBackgroundColor,
          color,
          fontStyle,
          fontWeight,
          ...extraStyles
        },
        children: __('Aa')
      }), /*#__PURE__*/_jsx(FlexItem, {
        children: label
      })]
    })
  });
}
function TypographyElements() {
  const parentMenu = '';
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 3,
    children: [/*#__PURE__*/_jsx(Subtitle, {
      level: 3,
      children: __('Elements')
    }), /*#__PURE__*/_jsxs(ItemGroup, {
      isBordered: true,
      isSeparated: true,
      children: [/*#__PURE__*/_jsx(ElementItem, {
        parentMenu: parentMenu,
        element: "text",
        label: __('Text')
      }), /*#__PURE__*/_jsx(ElementItem, {
        parentMenu: parentMenu,
        element: "link",
        label: __('Links')
      }), /*#__PURE__*/_jsx(ElementItem, {
        parentMenu: parentMenu,
        element: "heading",
        label: __('Headings')
      }), /*#__PURE__*/_jsx(ElementItem, {
        parentMenu: parentMenu,
        element: "caption",
        label: __('Captions')
      }), /*#__PURE__*/_jsx(ElementItem, {
        parentMenu: parentMenu,
        element: "button",
        label: __('Buttons')
      })]
    })]
  });
}
export default TypographyElements;
//# sourceMappingURL=typography-elements.js.map
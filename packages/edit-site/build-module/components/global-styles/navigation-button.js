/**
 * WordPress dependencies
 */
import { __experimentalNavigatorButton as NavigatorButton, __experimentalNavigatorBackButton as NavigatorBackButton, __experimentalItem as Item, FlexItem, __experimentalHStack as HStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { IconWithCurrentColor } from './icon-with-current-color';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function GenericNavigationButton({
  icon,
  children,
  ...props
}) {
  return /*#__PURE__*/_jsxs(Item, {
    ...props,
    children: [icon && /*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      children: [/*#__PURE__*/_jsx(IconWithCurrentColor, {
        icon: icon,
        size: 24
      }), /*#__PURE__*/_jsx(FlexItem, {
        children: children
      })]
    }), !icon && children]
  });
}
function NavigationButtonAsItem(props) {
  return /*#__PURE__*/_jsx(NavigatorButton, {
    as: GenericNavigationButton,
    ...props
  });
}
function NavigationBackButtonAsItem(props) {
  return /*#__PURE__*/_jsx(NavigatorBackButton, {
    as: GenericNavigationButton,
    ...props
  });
}
export { NavigationButtonAsItem, NavigationBackButtonAsItem };
//# sourceMappingURL=navigation-button.js.map
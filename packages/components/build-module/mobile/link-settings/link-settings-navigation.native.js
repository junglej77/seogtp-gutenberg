/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';
/**
 * Internal dependencies
 */
import BottomSheet from '../bottom-sheet';
import LinkSettingsScreen from './link-settings-screen';
import LinkPickerScreen from '../link-picker/link-picker-screen';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const linkSettingsScreens = {
  settings: 'LinkSettingsScreen',
  linkPicker: 'linkPicker'
};
function LinkSettingsNavigation(props) {
  if (!props.withBottomSheet) {
    return /*#__PURE__*/_jsx(LinkSettingsScreen, {
      ...props
    });
  }
  return /*#__PURE__*/_jsx(BottomSheet, {
    isVisible: props.isVisible,
    onClose: props.onClose,
    onDismiss: props.onDismiss,
    testID: "link-settings-navigation",
    hideHeader: true,
    hasNavigation: true,
    children: /*#__PURE__*/_jsxs(BottomSheet.NavigationContainer, {
      animate: true,
      main: true,
      children: [/*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: linkSettingsScreens.settings,
        children: /*#__PURE__*/_jsx(LinkSettingsScreen, {
          ...props,
          withBottomSheet: true
        })
      }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: linkSettingsScreens.linkPicker,
        isScrollable: true,
        fullScreen: true,
        children: /*#__PURE__*/_jsx(LinkPickerScreen, {
          returnScreenName: linkSettingsScreens.settings
        })
      })]
    })
  });
}
export default memo(LinkSettingsNavigation);
//# sourceMappingURL=link-settings-navigation.native.js.map
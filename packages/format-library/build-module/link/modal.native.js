/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { BottomSheet, withSpokenMessages } from '@wordpress/components';

/**
 * Internal dependencies
 */
import screens from './modal-screens/screens';
import LinkSettingsScreen from './modal-screens/link-settings-screen';
import LinkPickerScreen from './modal-screens/link-picker-screen';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ModalLinkUI = ({
  isVisible,
  ...restProps
}) => {
  return useMemo(() => {
    return /*#__PURE__*/_jsx(BottomSheet, {
      isVisible: isVisible,
      hideHeader: true,
      onClose: restProps.onClose,
      hasNavigation: true,
      testID: "link-settings-modal",
      children: /*#__PURE__*/_jsxs(BottomSheet.NavigationContainer, {
        animate: true,
        main: true,
        children: [/*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
          name: screens.settings,
          children: /*#__PURE__*/_jsx(LinkSettingsScreen, {
            isVisible: isVisible,
            ...restProps
          })
        }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
          name: screens.picker,
          isScrollable: true,
          fullScreen: true,
          children: /*#__PURE__*/_jsx(LinkPickerScreen, {})
        })]
      })
    });
  }, [isVisible]);
};
export default withSpokenMessages(ModalLinkUI);
//# sourceMappingURL=modal.native.js.map
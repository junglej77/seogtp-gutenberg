/**
 * WordPress dependencies
 */
import { BottomSheet, ColorSettings, FocalPointSettingsPanel, LinkPickerScreen } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import styles from './container.native.scss';
import InspectorControls from '../inspector-controls';
import ImageLinkDestinationsScreen from '../image-link-destinations';
import useMultipleOriginColorsAndGradients from '../colors-gradients/use-multiple-origin-colors-and-gradients';
import { useMobileGlobalStylesColors } from '../global-styles/use-global-styles-context';
import AdvancedControls from '../inspector-controls-tabs/advanced-controls-panel';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const blockSettingsScreens = {
  settings: 'Settings',
  color: 'Color',
  focalPoint: 'FocalPoint',
  linkPicker: 'linkPicker',
  imageLinkDestinations: 'imageLinkDestinations'
};
export default function BottomSheetSettings(props) {
  const colorSettings = useMultipleOriginColorsAndGradients();
  colorSettings.allAvailableColors = useMobileGlobalStylesColors();
  const {
    closeGeneralSidebar
  } = useDispatch('core/edit-post');
  const editorSidebarOpened = useSelect(select => select('core/edit-post').isEditorSidebarOpened());
  return /*#__PURE__*/_jsx(BottomSheet, {
    isVisible: editorSidebarOpened,
    onClose: closeGeneralSidebar,
    hideHeader: true,
    contentStyle: styles.content,
    hasNavigation: true,
    testID: "block-settings-modal",
    ...props,
    children: /*#__PURE__*/_jsxs(BottomSheet.NavigationContainer, {
      animate: true,
      main: true,
      children: [/*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: blockSettingsScreens.settings,
        children: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(InspectorControls.Slot, {}), /*#__PURE__*/_jsx(AdvancedControls, {})]
        })
      }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: BottomSheet.SubSheet.screenName,
        children: /*#__PURE__*/_jsx(BottomSheet.SubSheet.Slot, {})
      }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: blockSettingsScreens.color,
        children: /*#__PURE__*/_jsx(ColorSettings, {
          defaultSettings: colorSettings
        })
      }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: blockSettingsScreens.focalPoint,
        fullScreen: true,
        children: /*#__PURE__*/_jsx(FocalPointSettingsPanel, {})
      }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: blockSettingsScreens.linkPicker,
        fullScreen: true,
        isScrollable: true,
        children: /*#__PURE__*/_jsx(LinkPickerScreen, {
          returnScreenName: blockSettingsScreens.settings
        })
      }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
        name: blockSettingsScreens.imageLinkDestinations,
        children: /*#__PURE__*/_jsx(ImageLinkDestinationsScreen, {
          ...props
        })
      })]
    })
  });
}
//# sourceMappingURL=container.native.js.map
/**
 * External dependencies
 */
import { useRoute } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { memo, useEffect, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PickerScreen from './picker-screen';
import GradientPickerScreen from './gradient-picker-screen';
import PaletteScreen from './palette.screen';
import BottomSheet from '../bottom-sheet';
import { BottomSheetContext } from '../bottom-sheet/bottom-sheet-context';
import { colorsUtils } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ColorSettingsMemo = memo(({
  defaultSettings,
  onHandleClosingBottomSheet,
  shouldEnableBottomSheetMaxHeight,
  onColorChange,
  colorValue,
  gradientValue,
  onGradientChange,
  onColorCleared,
  label,
  hideNavigation
}) => {
  useEffect(() => {
    shouldEnableBottomSheetMaxHeight(true);
    onHandleClosingBottomSheet(null);
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_jsxs(BottomSheet.NavigationContainer, {
    children: [/*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
      name: colorsUtils.screens.palette,
      initialParams: {
        defaultSettings,
        onColorChange,
        colorValue,
        gradientValue,
        onGradientChange,
        onColorCleared,
        label,
        hideNavigation
      },
      children: /*#__PURE__*/_jsx(PaletteScreen, {})
    }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
      name: colorsUtils.screens.picker,
      children: /*#__PURE__*/_jsx(PickerScreen, {})
    }), /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
      name: colorsUtils.screens.gradientPicker,
      children: /*#__PURE__*/_jsx(GradientPickerScreen, {})
    })]
  });
});
function ColorSettings(props) {
  const route = useRoute();
  const {
    onHandleClosingBottomSheet,
    shouldEnableBottomSheetMaxHeight
  } = useContext(BottomSheetContext);
  return /*#__PURE__*/_jsx(ColorSettingsMemo, {
    onHandleClosingBottomSheet: onHandleClosingBottomSheet,
    shouldEnableBottomSheetMaxHeight: shouldEnableBottomSheetMaxHeight,
    ...props,
    ...route.params
  });
}
export default ColorSettings;
//# sourceMappingURL=index.native.js.map
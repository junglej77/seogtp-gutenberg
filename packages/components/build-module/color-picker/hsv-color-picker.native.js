/**
 * External dependencies
 */
import { View, Dimensions } from 'react-native';

/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import HuePicker from './hue-picker';
import SaturationValuePicker from './saturation-picker';
import styles from './style.native.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const HsvColorPicker = props => {
  const maxWidth = Dimensions.get('window').width - 32;
  const satValPickerRef = useRef(null);
  const {
    containerStyle = {},
    currentColor,
    huePickerContainerStyle = {},
    huePickerBorderRadius = 0,
    huePickerHue = 0,
    huePickerBarWidth = maxWidth,
    huePickerBarHeight = 12,
    huePickerSliderSize = 24,
    onHuePickerDragStart,
    onHuePickerDragMove,
    onHuePickerDragEnd,
    onHuePickerDragTerminate,
    onHuePickerPress,
    satValPickerContainerStyle = {},
    satValPickerBorderRadius = 0,
    satValPickerSize = {
      width: maxWidth,
      height: 200
    },
    satValPickerSliderSize = 24,
    satValPickerHue = 0,
    satValPickerSaturation = 1,
    satValPickerValue = 1,
    onSatValPickerDragStart,
    onSatValPickerDragMove,
    onSatValPickerDragEnd,
    onSatValPickerDragTerminate,
    onSatValPickerPress
  } = props;
  return /*#__PURE__*/_jsxs(View, {
    style: [styles['hsv-container'], containerStyle],
    testID: "hsv-color-picker",
    children: [/*#__PURE__*/_jsx(SaturationValuePicker, {
      containerStyle: satValPickerContainerStyle,
      currentColor: currentColor,
      borderRadius: satValPickerBorderRadius,
      size: satValPickerSize,
      sliderSize: satValPickerSliderSize,
      hue: satValPickerHue,
      saturation: satValPickerSaturation,
      value: satValPickerValue,
      onDragStart: onSatValPickerDragStart,
      onDragMove: onSatValPickerDragMove,
      onDragEnd: onSatValPickerDragEnd,
      onDragTerminate: onSatValPickerDragTerminate,
      onPress: onSatValPickerPress,
      ref: satValPickerRef
    }), /*#__PURE__*/_jsx(HuePicker, {
      containerStyle: huePickerContainerStyle,
      borderRadius: huePickerBorderRadius,
      hue: huePickerHue,
      barWidth: huePickerBarWidth,
      barHeight: huePickerBarHeight,
      sliderSize: huePickerSliderSize,
      onDragStart: onHuePickerDragStart,
      onDragMove: onHuePickerDragMove,
      onDragEnd: onHuePickerDragEnd,
      onDragTerminate: onHuePickerDragTerminate,
      onPress: onHuePickerPress
    })]
  });
};
export default HsvColorPicker;
//# sourceMappingURL=hsv-color-picker.native.js.map
/**
 * External dependencies
 */
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';
import { withPreferredColorScheme } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Stepper({
  getStylesFromColorScheme,
  isMaxValue,
  isMinValue,
  onPressInDecrement,
  onPressInIncrement,
  onPressOut,
  value,
  shouldDisplayTextInput,
  children
}) {
  const valueStyle = getStylesFromColorScheme(styles.value, styles.valueTextDark);
  const buttonIconStyle = getStylesFromColorScheme(styles.buttonNoBg, styles.buttonNoBgTextDark);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(TouchableOpacity, {
      disabled: isMinValue,
      onPressIn: onPressInDecrement,
      onPressOut: onPressOut,
      style: [styles.buttonNoBg, isMinValue ? {
        opacity: 0.4
      } : null],
      children: /*#__PURE__*/_jsx(Icon, {
        icon: chevronDown,
        size: 24,
        color: buttonIconStyle.color
      })
    }), !shouldDisplayTextInput && /*#__PURE__*/_jsx(Text, {
      style: [valueStyle, styles.spacings],
      children: value
    }), children, /*#__PURE__*/_jsx(TouchableOpacity, {
      testID: "Increment",
      disabled: isMaxValue,
      onPressIn: onPressInIncrement,
      onPressOut: onPressOut,
      style: [styles.buttonNoBg, isMaxValue ? {
        opacity: 0.4
      } : null],
      children: /*#__PURE__*/_jsx(Icon, {
        icon: chevronUp,
        size: 24,
        color: buttonIconStyle.color
      })
    })]
  });
}
export default withPreferredColorScheme(Stepper);
//# sourceMappingURL=stepper.android.js.map
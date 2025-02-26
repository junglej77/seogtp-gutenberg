/**
 * External dependencies
 */
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@wordpress/compose';
import { Icon, plus, reset } from '@wordpress/icons';

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
  children,
  shouldDisplayTextInput
}) {
  const valueStyle = getStylesFromColorScheme(styles.value, styles.valueTextDark);
  const buttonStyle = getStylesFromColorScheme(styles.button, styles.buttonDark);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [!shouldDisplayTextInput && /*#__PURE__*/_jsx(Text, {
      style: valueStyle,
      children: value
    }), children, /*#__PURE__*/_jsx(TouchableOpacity, {
      disabled: isMinValue,
      onPressIn: onPressInDecrement,
      onPressOut: onPressOut,
      style: [buttonStyle, isMinValue ? {
        opacity: 0.4
      } : null],
      children: /*#__PURE__*/_jsx(Icon, {
        icon: reset,
        size: 24,
        color: buttonStyle.color
      })
    }), /*#__PURE__*/_jsx(TouchableOpacity, {
      testID: "Increment",
      disabled: isMaxValue,
      onPressIn: onPressInIncrement,
      onPressOut: onPressOut,
      style: [buttonStyle, isMaxValue ? {
        opacity: 0.4
      } : null],
      children: /*#__PURE__*/_jsx(Icon, {
        icon: plus,
        size: 24,
        color: buttonStyle.color
      })
    })]
  });
}
export default withPreferredColorScheme(Stepper);
//# sourceMappingURL=stepper.ios.js.map
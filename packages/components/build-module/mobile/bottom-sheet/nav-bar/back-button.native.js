/**
 * External dependencies
 */
import { View, Platform, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, arrowLeft, close } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './styles.scss';
import ActionButton from './action-button';
import chevronBack from './../chevron-back';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Button({
  onPress,
  icon,
  text
}) {
  const buttonTextStyle = usePreferredColorSchemeStyle(styles['button-text'], styles['button-text-dark']);
  return /*#__PURE__*/_jsx(View, {
    style: styles['back-button'],
    children: /*#__PURE__*/_jsxs(ActionButton, {
      onPress: onPress,
      accessibilityLabel: __('Go back'),
      accessibilityHint: __('Navigates to the previous content sheet'),
      children: [icon, text && /*#__PURE__*/_jsx(Text, {
        style: buttonTextStyle,
        maxFontSizeMultiplier: 2,
        children: text
      })]
    })
  });
}
function BackButton({
  onPress
}) {
  const chevronLeftStyle = usePreferredColorSchemeStyle(styles['chevron-left-icon'], styles['chevron-left-icon-dark']);
  const arrowLeftStyle = usePreferredColorSchemeStyle(styles['arrow-left-icon'], styles['arrow-left-icon-dark']);
  let backIcon;
  let backText;
  if (Platform.OS === 'ios') {
    backIcon = /*#__PURE__*/_jsx(Icon, {
      icon: chevronBack,
      size: 21,
      style: chevronLeftStyle
    });
    backText = __('Back');
  } else {
    backIcon = /*#__PURE__*/_jsx(Icon, {
      icon: arrowLeft,
      size: 24,
      style: arrowLeftStyle
    });
  }
  return /*#__PURE__*/_jsx(Button, {
    onPress: onPress,
    icon: backIcon,
    text: backText
  });
}
function DismissButton({
  onPress,
  iosText
}) {
  const arrowLeftStyle = usePreferredColorSchemeStyle(styles['arrow-left-icon'], styles['arrow-left-icon-dark']);
  let backIcon;
  let backText;
  if (Platform.OS === 'ios') {
    backText = iosText ? iosText : __('Cancel');
  } else {
    backIcon = /*#__PURE__*/_jsx(Icon, {
      icon: close,
      size: 24,
      style: arrowLeftStyle
    });
  }
  return /*#__PURE__*/_jsx(Button, {
    onPress: onPress,
    icon: backIcon,
    text: backText
  });
}
Button.Back = BackButton;
Button.Dismiss = DismissButton; // Cancel or Close Button.

export default Button;
//# sourceMappingURL=back-button.native.js.map
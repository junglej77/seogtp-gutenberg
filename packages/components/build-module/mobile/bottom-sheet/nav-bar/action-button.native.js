/**
 * External dependencies
 */
import { View, TouchableWithoutFeedback } from 'react-native';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

// Action button component is used by both Back and Apply Button componenets.
import { jsx as _jsx } from "react/jsx-runtime";
function ActionButton({
  onPress,
  accessibilityLabel,
  accessibilityHint,
  children
}) {
  return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    onPress: onPress,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel,
    accessibilityHint: accessibilityHint,
    children: /*#__PURE__*/_jsx(View, {
      style: styles['action-button'],
      children: children
    })
  });
}
export default ActionButton;
//# sourceMappingURL=action-button.native.js.map
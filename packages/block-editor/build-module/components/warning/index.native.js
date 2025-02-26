/**
 * External dependencies
 */
import { View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { withPreferredColorScheme } from '@wordpress/compose';
import { normalizeIconObject } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Warning({
  actions,
  title,
  message,
  icon,
  iconClass,
  preferredColorScheme,
  getStylesFromColorScheme,
  containerStyle: extraContainerStyle,
  titleStyle: extraTitleStyle,
  messageStyle: extraMessageStyle,
  ...viewProps
}) {
  icon = icon && normalizeIconObject(icon);
  const internalIconClass = 'warning-icon' + '-' + preferredColorScheme;
  const containerStyle = [getStylesFromColorScheme(styles.container, styles.containerDark), extraContainerStyle];
  const titleStyle = [getStylesFromColorScheme(styles.title, styles.titleDark), extraTitleStyle];
  const messageStyle = [getStylesFromColorScheme(styles.message, styles.messageDark), extraMessageStyle];
  return /*#__PURE__*/_jsxs(View, {
    style: containerStyle,
    ...viewProps,
    children: [icon && /*#__PURE__*/_jsx(View, {
      style: styles.icon,
      children: /*#__PURE__*/_jsx(Icon, {
        className: iconClass || internalIconClass,
        icon: icon && icon.src ? icon.src : icon
      })
    }), title && /*#__PURE__*/_jsx(Text, {
      style: titleStyle,
      children: title
    }), message && /*#__PURE__*/_jsx(Text, {
      style: messageStyle,
      children: message
    }), actions]
  });
}
export default withPreferredColorScheme(Warning);
//# sourceMappingURL=index.native.js.map
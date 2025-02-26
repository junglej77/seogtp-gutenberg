/**
 * External dependencies
 */

import { TouchableOpacity, Text, Linking } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { external, Icon } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ExternalLink({
  href,
  children
}) {
  return /*#__PURE__*/_jsxs(TouchableOpacity, {
    onPress: () => Linking.openURL(href),
    accessibilityLabel: __('Open link in a browser'),
    children: [/*#__PURE__*/_jsx(Text, {
      children: children
    }), /*#__PURE__*/_jsx(Icon, {
      icon: external
    })]
  });
}
export default ExternalLink;
//# sourceMappingURL=index.native.js.map
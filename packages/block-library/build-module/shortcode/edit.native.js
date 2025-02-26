/**
 * External dependencies
 */
import { View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PlainText } from '@wordpress/block-editor';
import { withPreferredColorScheme } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */

import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ShortcodeEdit(props) {
  const {
    attributes,
    setAttributes,
    onFocus,
    onBlur,
    getStylesFromColorScheme,
    blockWidth
  } = props;
  const titleStyle = getStylesFromColorScheme(styles.blockTitle, styles.blockTitleDark);
  const shortcodeContainerStyle = getStylesFromColorScheme(styles.blockShortcodeContainer, styles.blockShortcodeContainerDark);
  const shortcodeStyle = getStylesFromColorScheme(styles.blockShortcode, styles.blockShortcodeDark);
  const placeholderStyle = getStylesFromColorScheme(styles.placeholder, styles.placeholderDark);
  const maxWidth = blockWidth - shortcodeContainerStyle.paddingLeft + shortcodeContainerStyle.paddingRight;
  const onChange = useCallback(text => setAttributes({
    text
  }), [setAttributes]);
  return /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(Text, {
      style: titleStyle,
      children: __('Shortcode')
    }), /*#__PURE__*/_jsx(View, {
      style: shortcodeContainerStyle,
      children: /*#__PURE__*/_jsx(PlainText, {
        __experimentalVersion: 2,
        value: attributes.text,
        style: shortcodeStyle,
        onChange: onChange,
        placeholder: __('Add a shortcode…'),
        onFocus: onFocus,
        onBlur: onBlur,
        placeholderTextColor: placeholderStyle.color,
        maxWidth: maxWidth,
        disableAutocorrection: true
      })
    })]
  });
}
export default withPreferredColorScheme(ShortcodeEdit);
//# sourceMappingURL=edit.native.js.map
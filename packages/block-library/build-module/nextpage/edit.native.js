/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { withPreferredColorScheme } from '@wordpress/compose';
import { HorizontalRule } from '@wordpress/components';

/**
 * Internal dependencies
 */
import styles from './editor.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export function NextPageEdit({
  attributes,
  isSelected,
  onFocus,
  getStylesFromColorScheme
}) {
  const {
    customText = __('Page break')
  } = attributes;
  const accessibilityTitle = attributes.customText || '';
  const accessibilityState = isSelected ? ['selected'] : [];
  const textStyle = getStylesFromColorScheme(styles.nextpageText, styles.nextpageTextDark);
  const lineStyle = getStylesFromColorScheme(styles.nextpageLine, styles.nextpageLineDark);
  return /*#__PURE__*/_jsx(View, {
    accessible: true,
    accessibilityLabel: sprintf( /* translators: accessibility text. %s: Page break text. */
    __('Page break block. %s'), accessibilityTitle),
    accessibilityStates: accessibilityState,
    onAccessibilityTap: onFocus,
    children: /*#__PURE__*/_jsx(HorizontalRule, {
      text: customText,
      marginLeft: 0,
      marginRight: 0,
      textStyle: textStyle,
      lineStyle: lineStyle
    })
  });
}
export default withPreferredColorScheme(NextPageEdit);
//# sourceMappingURL=edit.native.js.map
/**
 * External dependencies
 */
import { Text, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { useGlobalStyles } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { withPreferredColorScheme } from '@wordpress/compose';
import { help, lock } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import styles from './editor.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function EditTitle({
  getStylesFromColorScheme,
  title
}) {
  const globalStyles = useGlobalStyles();
  const baseColors = globalStyles?.baseColors?.color;
  const lockIconStyle = [getStylesFromColorScheme(styles.lockIcon, styles.lockIconDark), baseColors && {
    color: baseColors.text
  }];
  const titleStyle = [getStylesFromColorScheme(styles.title, styles.titleDark), baseColors && {
    color: baseColors.text
  }];
  const infoIconStyle = [getStylesFromColorScheme(styles.infoIcon, styles.infoIconDark), baseColors && {
    color: baseColors.text
  }];
  const separatorStyle = getStylesFromColorScheme(styles.separator, styles.separatorDark);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.titleContainer,
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.lockIconContainer,
      children: /*#__PURE__*/_jsx(Icon, {
        label: __('Lock icon'),
        icon: lock,
        size: 16,
        style: lockIconStyle
      })
    }), /*#__PURE__*/_jsx(Text, {
      numberOfLines: 1,
      style: titleStyle,
      children: title
    }), /*#__PURE__*/_jsx(View, {
      style: styles.helpIconContainer,
      children: /*#__PURE__*/_jsx(Icon, {
        label: __('Help icon'),
        icon: help,
        size: 20,
        style: infoIconStyle
      })
    }), /*#__PURE__*/_jsx(View, {
      style: separatorStyle
    })]
  });
}
export default withPreferredColorScheme(EditTitle);
//# sourceMappingURL=edit-title.native.js.map
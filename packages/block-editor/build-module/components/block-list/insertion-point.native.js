/**
 * External dependencies
 */
import { Text, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withPreferredColorScheme } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BlockInsertionPoint = ({
  getStylesFromColorScheme,
  testID
}) => {
  const lineStyle = getStylesFromColorScheme(styles.lineStyleAddHere, styles.lineStyleAddHereDark);
  const labelStyle = getStylesFromColorScheme(styles.labelStyleAddHere, styles.labelStyleAddHereDark);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.containerStyleAddHere,
    testID: testID,
    children: [/*#__PURE__*/_jsx(View, {
      style: lineStyle
    }), /*#__PURE__*/_jsx(Text, {
      style: labelStyle,
      children: __('ADD BLOCK HERE')
    }), /*#__PURE__*/_jsx(View, {
      style: lineStyle
    })]
  });
};
export default withPreferredColorScheme(BlockInsertionPoint);
//# sourceMappingURL=insertion-point.native.js.map
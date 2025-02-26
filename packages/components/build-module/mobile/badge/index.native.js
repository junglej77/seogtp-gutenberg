/**
 * External dependencies
 */
import { View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Badge = ({
  label,
  children,
  show = true
}) => {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [children, /*#__PURE__*/_jsx(View, {
      style: styles.badgeContainer,
      children: show && /*#__PURE__*/_jsx(Text, {
        style: styles.badge,
        children: label
      })
    })]
  });
};
export default withPreferredColorScheme(Badge);
//# sourceMappingURL=index.native.js.map
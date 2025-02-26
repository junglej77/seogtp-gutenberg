/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */
import { Gradient, colorsUtils } from '@wordpress/components';
/**
 * Internal dependencies
 */
import styles from './editor.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ColorBackground({
  children,
  borderRadiusValue,
  backgroundColor
}) {
  const {
    isGradient
  } = colorsUtils;
  const wrapperStyles = [styles.richTextWrapper, {
    borderRadius: borderRadiusValue,
    backgroundColor
  }];
  return /*#__PURE__*/_jsxs(View, {
    style: wrapperStyles,
    children: [isGradient(backgroundColor) && /*#__PURE__*/_jsx(Gradient, {
      gradientValue: backgroundColor,
      angleCenter: {
        x: 0.5,
        y: 0.5
      },
      style: [styles.linearGradient, {
        borderRadius: borderRadiusValue
      }]
    }), children]
  });
}
export default ColorBackground;
//# sourceMappingURL=color-background.native.js.map
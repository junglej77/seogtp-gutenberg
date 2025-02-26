/**
 * External dependencies
 */
import { View, Animated } from 'react-native';
/**
 * WordPress dependencies
 */
import { Icon, check } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import styles from './style.scss';
import Gradient from '../mobile/gradient';
import { colorsUtils } from '../mobile/color-settings/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function SelectedIcon({
  opacity
}) {
  return /*#__PURE__*/_jsxs(Animated.View, {
    style: [styles.selected, {
      opacity
    }],
    children: [/*#__PURE__*/_jsx(View, {
      style: [styles.outline, styles.selectedOutline]
    }), /*#__PURE__*/_jsx(Icon, {
      icon: check,
      style: styles.icon,
      size: 24
    })]
  });
}
function ColorIndicator({
  color,
  isSelected,
  withCustomPicker,
  style,
  opacity
}) {
  const {
    isGradient
  } = colorsUtils;
  const outlineStyle = usePreferredColorSchemeStyle(styles.outline, styles.outlineDark);
  if (isGradient(color)) {
    return /*#__PURE__*/_jsxs(Gradient, {
      style: [styles.circleOption, style],
      gradientValue: color,
      children: [/*#__PURE__*/_jsx(View, {
        style: outlineStyle
      }), isSelected && /*#__PURE__*/_jsx(SelectedIcon, {
        opacity: opacity
      })]
    });
  } else if (withCustomPicker) {
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.circleOption, style],
      children: [/*#__PURE__*/_jsx(View, {
        style: outlineStyle
      }), color.map(gradientValue => {
        return /*#__PURE__*/_jsx(Gradient, {
          gradientValue: gradientValue,
          style: [styles.circleOption, styles.absolute, style]
        }, gradientValue);
      }), isSelected && /*#__PURE__*/_jsx(SelectedIcon, {})]
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.circleOption, style, {
      backgroundColor: color
    }],
    children: [/*#__PURE__*/_jsx(View, {
      style: outlineStyle
    }), isSelected && /*#__PURE__*/_jsx(SelectedIcon, {
      opacity: opacity
    })]
  });
}
export default ColorIndicator;
//# sourceMappingURL=index.native.js.map
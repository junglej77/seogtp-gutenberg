/**
 * External dependencies
 */
import { Svg } from 'react-native-svg';
import { Animated } from 'react-native';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';
import { usePreferredColorScheme } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export { Circle, G, Path, Polygon, Rect, Defs, RadialGradient, LinearGradient, Stop, Line, SvgXml } from 'react-native-svg';
const AnimatedSvg = Animated.createAnimatedComponent(forwardRef((props, ref) => /*#__PURE__*/_jsx(Svg, {
  ref: ref,
  ...props
})));
export const SVG = ({
  className = '',
  isPressed,
  animated = false,
  ...props
}) => {
  const colorScheme = usePreferredColorScheme();
  const stylesFromClasses = className.split(' ').map(element => styles[element]).filter(Boolean);
  const defaultStyle = isPressed ? styles[`is-pressed--${colorScheme}`] : styles['components-toolbar__control-' + colorScheme];
  const propStyle = Array.isArray(props.style) ? props.style.reduce((acc, el) => {
    return {
      ...acc,
      ...el
    };
  }, {}) : props.style;
  const styleValues = Object.assign({}, defaultStyle, propStyle, ...stylesFromClasses);
  const appliedProps = {
    ...props,
    style: styleValues
  };
  const SvgWrapper = animated ? AnimatedSvg : Svg;
  return /*#__PURE__*/_jsx(SvgWrapper
  // We want to re-render when style color is changed.
  , {
    height: "100%",
    width: "100%",
    ...appliedProps
  }, appliedProps.style.color);
};
//# sourceMappingURL=index.native.js.map
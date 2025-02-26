/**
 * External dependencies
 */
import { Animated, Easing, PanResponder, Text, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { createContext, useEffect, useRef, useState, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TooltipContext = createContext();
function Tooltip({
  children,
  onPress,
  style,
  visible
}) {
  const panResponder = useRef(PanResponder.create({
    /**
     * To allow dimissing the tooltip on press while also avoiding blocking
     * interactivity within the child context, we place this `onPress` side
     * effect within the `onStartShouldSetPanResponderCapture` callback.
     *
     * This is a bit unorthodox, but may be the simplest approach to achieving
     * this outcome. This is effectively a gesture responder that never
     * becomes the controlling responder. https://bit.ly/2J3ugKF
     */
    onStartShouldSetPanResponderCapture: () => {
      if (onPress) {
        onPress();
      }
      return false;
    }
  })).current;
  return /*#__PURE__*/_jsx(TooltipContext.Provider, {
    value: visible,
    children: /*#__PURE__*/_jsx(View, {
      ...(visible ? panResponder.panHandlers : {}),
      style: style,
      children: children
    })
  });
}
function Label({
  align = 'center',
  text,
  xOffset = 0,
  yOffset = 0
}) {
  const animationValue = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState(null);
  const visible = useContext(TooltipContext);
  if (typeof visible === 'undefined') {
    throw new Error('Tooltip.Label cannot be rendered outside of the Tooltip component');
  }
  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(animationValue, {
        toValue: visible ? 1 : 0,
        duration: visible ? 300 : 150,
        useNativeDriver: true,
        delay: visible ? 500 : 0,
        easing: Easing.out(Easing.quad)
      }).start();
    };
    startAnimation();
  }, [animationValue, visible]);

  // Transforms rely upon onLayout to enable custom offsets additions.
  let tooltipTransforms;
  if (dimensions) {
    tooltipTransforms = [{
      translateX: (align === 'center' ? -dimensions.width / 2 : 0) + xOffset
    }, {
      translateY: -dimensions.height + yOffset
    }];
  }
  const tooltipStyles = [styles.tooltip, {
    shadowColor: styles.tooltipShadow?.color,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    transform: tooltipTransforms
  }, align === 'left' && styles.tooltipLeftAlign];
  const arrowStyles = [styles.arrow, align === 'left' && styles.arrowLeftAlign];
  return /*#__PURE__*/_jsx(Animated.View, {
    style: {
      opacity: animationValue,
      transform: [{
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [visible ? 4 : -8, -8]
        })
      }]
    },
    children: /*#__PURE__*/_jsxs(View, {
      onLayout: ({
        nativeEvent
      }) => {
        const {
          height,
          width
        } = nativeEvent.layout;
        setDimensions({
          height,
          width
        });
      },
      style: tooltipStyles,
      children: [/*#__PURE__*/_jsx(Text, {
        style: styles.text,
        children: text
      }), /*#__PURE__*/_jsx(View, {
        style: arrowStyles
      })]
    })
  });
}
Tooltip.Label = Label;
export default Tooltip;
//# sourceMappingURL=index.native.js.map
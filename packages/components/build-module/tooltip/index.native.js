/**
 * External dependencies
 */
import { Animated, Easing, Keyboard, Platform, StyleSheet, Text, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { cloneElement, createContext, useContext, useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { createSlotFill } from '../slot-fill';
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const RIGHT_ALIGN_ARROW_OFFSET = 16;
const TOOLTIP_VERTICAL_OFFSET = 2;
const TooltipContext = createContext({
  onHandleScreenTouch: () => {}
});
const {
  Fill,
  Slot
} = createSlotFill('Tooltip');
const useKeyboardVisibility = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const previousKeyboardVisible = usePrevious(keyboardVisible);
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      if (previousKeyboardVisible !== true) {
        setKeyboardVisible(true);
      }
    });
    const keyboardHideEvent = Platform.select({
      android: 'keyboardDidHide',
      ios: 'keyboardWillHide'
    });
    const hideListener = Keyboard.addListener(keyboardHideEvent, () => {
      if (previousKeyboardVisible !== false) {
        setKeyboardVisible(false);
      }
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return keyboardVisible;
};
const Tooltip = ({
  children,
  position = 'top',
  text,
  visible: initialVisible = false
}) => {
  const referenceElementRef = useRef(null);
  const animationValue = useRef(new Animated.Value(0)).current;
  const [, horizontalPosition = 'center'] = position.split(' ');
  const [visible, setVisible] = useState(initialVisible);
  const [animating, setAnimating] = useState(false);
  const hidden = !visible && !animating;
  const previousVisible = usePrevious(visible);
  const [referenceLayout, setReferenceLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0
  });
  const [tooltipLayout, setTooltipLayout] = useState({
    height: 0,
    width: 0
  });
  const {
    onHandleScreenTouch
  } = useContext(TooltipContext);
  const keyboardVisible = useKeyboardVisibility();

  // Register callback to dismiss the tooltip whenever the screen is touched.
  useEffect(() => {
    if (visible) {
      onHandleScreenTouch(() => {
        setAnimating(true);
        setVisible(false);
      });
    }
    return () => onHandleScreenTouch(null);
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Manage visibility animation.
  useEffect(() => {
    if (
    // Initial render and visibility enabled, animate show.
    typeof previousVisible === 'undefined' && visible ||
    // Previously visible, animate hide
    previousVisible && previousVisible !== visible) {
      setAnimating(true);
      startAnimation();
    }
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Manage tooltip visibility and position in relation to keyboard.
  useEffect(() => {
    if (!visible) {
      return;
    }

    // Update tooltip position if keyboard is visible.
    if (keyboardVisible) {
      getReferenceElementPosition();
    }

    // Hide tooltip if keyboard hides
    if (typeof previousVisible !== 'undefined' && !keyboardVisible) {
      setAnimating(true);
      setVisible(false);
    }
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, keyboardVisible]);

  // Manage tooltip position during keyboard frame changes.
  useEffect(() => {
    const frameListener = Keyboard.addListener('keyboardWillChangeFrame', () => {
      if (visible) {
        getReferenceElementPosition();
      }
    });
    return () => {
      frameListener.remove();
    };
  }, [visible]);
  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: visible ? 1 : 0,
      duration: visible ? 300 : 150,
      useNativeDriver: true,
      delay: visible ? 500 : 0,
      easing: Easing.out(Easing.quad)
    }).start(() => {
      setAnimating(false);
    });
  };
  const tooltipStyles = [styles.tooltip, {
    left: referenceLayout.x + Math.floor(referenceLayout.width / 2) - (horizontalPosition === 'right' ? RIGHT_ALIGN_ARROW_OFFSET : Math.floor(tooltipLayout.width / 2)),
    top: referenceLayout.y - tooltipLayout.height - TOOLTIP_VERTICAL_OFFSET
  }];
  const tooltipBoxStyles = [styles.tooltip__box, horizontalPosition === 'right' && styles['tooltip--rightAlign'], {
    elevation: 2,
    opacity: animationValue,
    shadowColor: styles.tooltip__shadow?.color,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    transform: [{
      translateY: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [visible ? 4 : -8, -8]
      })
    }]
  }];
  const arrowStyles = [styles.tooltip__arrow, horizontalPosition === 'right' && styles['tooltip__arrow--rightAlign']];
  const getReferenceElementPosition = () => {
    // rAF allows render to complete before calculating layout
    // eslint-disable-next-line no-undef
    requestAnimationFrame(() => {
      if (!referenceElementRef.current) {
        return;
      }
      referenceElementRef.current.measure((_x, _y, width, height, pageX, pageY) => {
        setReferenceLayout({
          height,
          width,
          x: pageX,
          y: pageY
        });
      });
    });
  };
  const getTooltipLayout = ({
    nativeEvent
  }) => {
    const {
      height,
      width
    } = nativeEvent.layout;
    setTooltipLayout({
      height,
      width
    });
  };
  if (hidden) {
    return children;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [cloneElement(children, {
      ref: referenceElementRef,
      onLayout: getReferenceElementPosition
    }), /*#__PURE__*/_jsx(Fill, {
      children: /*#__PURE__*/_jsx(View, {
        onLayout: getTooltipLayout,
        style: tooltipStyles,
        children: /*#__PURE__*/_jsxs(Animated.View, {
          style: tooltipBoxStyles,
          children: [/*#__PURE__*/_jsx(Text, {
            style: styles.tooltip__text,
            children: text
          }), /*#__PURE__*/_jsx(View, {
            style: arrowStyles
          })]
        })
      })
    })]
  });
};
const TooltipSlot = ({
  children,
  ...rest
}) => {
  const [handleScreenTouch, setHandleScreenTouch] = useState(null);
  const onHandleScreenTouch = callback => {
    // Must use function to set state below as `callback` is a function itself.
    setHandleScreenTouch(() => callback);
  };
  const handleTouchStart = () => {
    handleScreenTouch();
    setHandleScreenTouch(null);
  };
  // Memoize context value to avoid unnecessary rerenders of the Provider's children
  // Disable reason: deferring this refactor to the native team.
  // see https://github.com/WordPress/gutenberg/pull/41166
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({
    onHandleScreenTouch
  }));
  return /*#__PURE__*/_jsx(TooltipContext.Provider, {
    value: value,
    children: /*#__PURE__*/_jsxs(View, {
      onTouchStart: typeof handleScreenTouch === 'function' ? handleTouchStart : undefined,
      pointerEvents: "box-none",
      style: StyleSheet.absoluteFill,
      testID: "tooltip-overlay",
      children: [children, /*#__PURE__*/_jsx(Slot, {
        ...rest
      })]
    })
  });
};
Tooltip.Slot = TooltipSlot;
export default Tooltip;
//# sourceMappingURL=index.native.js.map
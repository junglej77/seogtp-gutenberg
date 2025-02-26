/**
 * External dependencies
 */
import { ScrollView, TouchableWithoutFeedback, View, Animated, Easing, Dimensions, Platform, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useRef, useEffect } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import ColorIndicator from '../color-indicator';
import { colorsUtils } from '../mobile/color-settings/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const ANIMATION_DURATION = 200;
let contentWidth = 0;
let scrollPosition = 0;
let customIndicatorWidth = 0;
function ColorPalette({
  enableCustomColor = false,
  setColor,
  activeColor,
  isGradientColor,
  defaultSettings,
  currentSegment,
  onCustomPress,
  shouldEnableBottomSheetScroll,
  shouldShowCustomIndicatorOption = true,
  shouldShowCustomLabel = true,
  shouldShowCustomVerticalSeparator = true,
  customColorIndicatorStyles,
  customIndicatorWrapperStyles,
  label
}) {
  var _defaultSettings$colo, _defaultSettings$grad, _defaultSettings$allC, _defaultSettings$allG;
  const customSwatchGradients = ['linear-gradient(120deg, rgba(255,0,0,.8) 0%, rgba(255,255,255,1) 70.71%)', 'linear-gradient(240deg, rgba(0,255,0,.8) 0%, rgba(0,255,0,0) 70.71%)', 'linear-gradient(360deg, rgba(0,0,255,.8) 0%, rgba(0,0,255,0) 70.71%)'];
  const scrollViewRef = useRef();
  const isIOS = Platform.OS === 'ios';
  const isGradientSegment = currentSegment === colorsUtils.segments[1];
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const delayedScrollRef = useRef();
  const mergedColors = [...new Set(((_defaultSettings$colo = defaultSettings.colors) !== null && _defaultSettings$colo !== void 0 ? _defaultSettings$colo : []).map(({
    color
  }) => color))];
  const mergedGradients = [...new Set(((_defaultSettings$grad = defaultSettings.gradients) !== null && _defaultSettings$grad !== void 0 ? _defaultSettings$grad : []).map(({
    gradient
  }) => gradient))];
  const allAvailableColors = [...new Set(((_defaultSettings$allC = defaultSettings.allColors) !== null && _defaultSettings$allC !== void 0 ? _defaultSettings$allC : []).map(({
    color
  }) => color))];
  const allAvailableGradients = [...new Set(((_defaultSettings$allG = defaultSettings.allGradients) !== null && _defaultSettings$allG !== void 0 ? _defaultSettings$allG : []).map(({
    gradient
  }) => gradient))];
  const colors = isGradientSegment ? mergedGradients : mergedColors;
  const allColors = isGradientSegment ? allAvailableGradients : allAvailableColors;
  const customIndicatorColor = isGradientSegment ? activeColor : customSwatchGradients;
  const isCustomGradientColor = isGradientColor && isSelectedCustom();
  const shouldShowCustomIndicator = enableCustomColor && shouldShowCustomIndicatorOption && (!isGradientSegment || isCustomGradientColor);
  const accessibilityHint = isGradientSegment ? __('Navigates to customize the gradient') : __('Navigates to custom color picker');
  const customText = __('Custom');
  useEffect(() => {
    if (scrollViewRef.current) {
      if (isSelectedCustom()) {
        scrollToEndWithDelay();
      } else {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 0
        });
      }
    }
    // Temporarily disabling exhuastive-deps until the component can be refactored and updated safely.
    // Please see https://github.com/WordPress/gutenberg/pull/41253 for discussion and details.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSegment]);
  function isSelectedCustom() {
    const isWithinColors = activeColor && allColors?.includes(activeColor);
    if (enableCustomColor && activeColor) {
      if (isGradientSegment) {
        return isGradientColor && !isWithinColors;
      }
      return !isGradientColor && !isWithinColors;
    }
    return false;
  }
  function isSelected(color) {
    return !isSelectedCustom() && activeColor === color;
  }
  function timingAnimation(property, toValue) {
    return Animated.timing(property, {
      toValue,
      duration: ANIMATION_DURATION,
      easing: Easing.ease,
      useNativeDriver: true
    });
  }
  function performAnimation(color) {
    if (!isSelected(color)) {
      opacity.setValue(0);
    }
    Animated.parallel([timingAnimation(scale, 2), timingAnimation(opacity, 1)]).start(() => {
      opacity.setValue(1);
      scale.setValue(1);
    });
  }
  const scaleInterpolation = scale.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 0.7, 1]
  });
  function deselectCustomGradient() {
    const {
      width
    } = Dimensions.get('window');
    const isVisible = contentWidth - scrollPosition - customIndicatorWidth < width;
    if (isCustomGradientColor) {
      if (!isIOS) {
        // Scroll position on Android doesn't adjust automatically when removing the last item from the horizontal list.
        // https://github.com/facebook/react-native/issues/27504
        // Workaround: Force the scroll when deselecting custom gradient color and when custom indicator is visible on layout.
        if (isCustomGradientColor && isVisible && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: scrollPosition - customIndicatorWidth
          });
        }
      }
    }
  }
  function getColorGradientName(value) {
    const fallbackName = sprintf( /* translators: %s: the hex color value */
    __('Unlabeled color. %s'), value);
    const foundColorName = isGradientSegment ? defaultSettings.gradients?.find(gradient => gradient.gradient === value) : defaultSettings.allColors?.find(color => color.color === value);
    return foundColorName ? foundColorName?.name : fallbackName;
  }
  function onColorPress(color) {
    deselectCustomGradient();
    performAnimation(color);
    setColor(color);
  }
  function onContentSizeChange(width) {
    contentWidth = width;
    if (isSelectedCustom() && scrollViewRef.current) {
      scrollToEndWithDelay();
    }
  }
  function scrollToEndWithDelay() {
    delayedScrollRef.current = setTimeout(() => {
      scrollViewRef?.current.scrollToEnd();
    }, ANIMATION_DURATION);
    return () => {
      clearTimeout(delayedScrollRef.current);
    };
  }
  function onCustomIndicatorLayout({
    nativeEvent
  }) {
    const {
      width
    } = nativeEvent.layout;
    if (width !== customIndicatorWidth) {
      customIndicatorWidth = width;
    }
  }
  function onScroll({
    nativeEvent
  }) {
    scrollPosition = nativeEvent.contentOffset.x;
  }
  const verticalSeparatorStyle = usePreferredColorSchemeStyle(styles.verticalSeparator, styles.verticalSeparatorDark);
  const customTextStyle = usePreferredColorSchemeStyle([styles.customText, !isIOS && styles.customTextAndroid], styles.customTextDark);
  const customIndicatorWrapperStyle = [styles.customIndicatorWrapper, customIndicatorWrapperStyles];
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [label && /*#__PURE__*/_jsx(Text, {
      accessibilityRole: "header",
      style: styles.headerText,
      children: label
    }), /*#__PURE__*/_jsxs(ScrollView, {
      contentContainerStyle: styles.contentContainer,
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      keyboardShouldPersistTaps: "always",
      disableScrollViewPanResponder: true,
      scrollEventThrottle: 16,
      onScroll: onScroll,
      onContentSizeChange: onContentSizeChange,
      onScrollBeginDrag: () => shouldEnableBottomSheetScroll(false),
      onScrollEndDrag: () => shouldEnableBottomSheetScroll(true),
      ref: scrollViewRef,
      testID: `color-palette${label ? '-' + label : ''}`,
      children: [colors.map(color => {
        const scaleValue = isSelected(color) ? scaleInterpolation : 1;
        const colorName = getColorGradientName(color);
        return /*#__PURE__*/_jsx(View, {
          children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
            onPress: () => onColorPress(color),
            accessibilityRole: "button",
            accessibilityState: {
              selected: isSelected(color)
            },
            accessibilityHint: color,
            accessibilityLabel: colorName,
            testID: color,
            children: /*#__PURE__*/_jsx(Animated.View, {
              style: {
                transform: [{
                  scale: scaleValue
                }]
              },
              children: /*#__PURE__*/_jsx(ColorIndicator, {
                color: color,
                isSelected: isSelected(color),
                opacity: opacity,
                style: [styles.colorIndicator, customColorIndicatorStyles]
              })
            })
          })
        }, `${color}-${isSelected(color)}`);
      }), shouldShowCustomIndicator && /*#__PURE__*/_jsxs(View, {
        style: customIndicatorWrapperStyle,
        onLayout: onCustomIndicatorLayout,
        children: [shouldShowCustomVerticalSeparator && /*#__PURE__*/_jsx(View, {
          style: verticalSeparatorStyle
        }), /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
          onPress: onCustomPress,
          accessibilityRole: "button",
          accessibilityState: {
            selected: isSelectedCustom()
          },
          accessibilityHint: accessibilityHint,
          children: /*#__PURE__*/_jsxs(View, {
            style: customIndicatorWrapperStyle,
            children: [/*#__PURE__*/_jsx(ColorIndicator, {
              withCustomPicker: !isGradientSegment,
              color: customIndicatorColor,
              isSelected: isSelectedCustom(),
              style: [styles.colorIndicator, customColorIndicatorStyles]
            }), shouldShowCustomLabel && /*#__PURE__*/_jsx(Text, {
              style: customTextStyle,
              children: isIOS ? customText : customText.toUpperCase()
            })]
          })
        })]
      })]
    })]
  });
}
export default ColorPalette;
//# sourceMappingURL=index.native.js.map
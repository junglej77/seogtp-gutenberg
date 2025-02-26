/**
 * External dependencies
 */
import { View, TouchableWithoutFeedback, Text, Platform, Animated, Easing } from 'react-native';
/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { performLayoutAnimation } from '../layout-animation';
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ANIMATION_DURATION = 200;
const isIOS = Platform.OS === 'ios';
const Segment = ({
  isSelected,
  title,
  onPress,
  onLayout,
  ...props
}) => {
  const isSelectedIOS = isIOS && isSelected;
  const segmentStyle = [styles.segment, isIOS && styles.segmentIOS];
  const textStyle = usePreferredColorSchemeStyle(styles.buttonTextDefault, styles.buttonTextDefaultDark);
  const selectedTextStyle = usePreferredColorSchemeStyle(styles.buttonTextSelected, styles.buttonTextSelectedDark);
  const shadowStyle = usePreferredColorSchemeStyle(styles.shadowIOS, {});
  return /*#__PURE__*/_jsx(View, {
    style: isSelectedIOS && shadowStyle,
    children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      onPress: onPress,
      children: /*#__PURE__*/_jsx(View, {
        style: segmentStyle,
        onLayout: onLayout,
        ...props,
        children: /*#__PURE__*/_jsx(Text, {
          style: [textStyle, isSelected && selectedTextStyle],
          maxFontSizeMultiplier: 2,
          children: title
        })
      })
    })
  });
};
const SegmentedControls = ({
  segments,
  segmentHandler,
  selectedIndex,
  addonLeft,
  addonRight
}) => {
  const selectedSegmentIndex = selectedIndex || 0;
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(selectedSegmentIndex);
  const [segmentsDimensions, setSegmentsDimensions] = useState({
    [activeSegmentIndex]: {
      width: 0,
      height: 0
    }
  });
  const [positionAnimationValue] = useState(new Animated.Value(0));
  useEffect(() => {
    setActiveSegmentIndex(selectedSegmentIndex);
    segmentHandler(segments[selectedSegmentIndex]);
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    positionAnimationValue.setValue(calculateEndValue(activeSegmentIndex));
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentsDimensions]);
  const containerStyle = usePreferredColorSchemeStyle(styles.container, styles.containerDark);
  function performSwatchAnimation(index) {
    Animated.timing(positionAnimationValue, {
      toValue: calculateEndValue(index),
      duration: ANIMATION_DURATION,
      easing: Easing.ease,
      useNativeDriver: false
    }).start();
  }
  function calculateEndValue(index) {
    const {
      paddingLeft: offset
    } = isIOS ? styles.containerIOS : styles.container;
    const widths = Object.values(segmentsDimensions).map(dimension => dimension.width);
    const widthsDistance = widths.slice(0, index);
    const widthsDistanceSum = widthsDistance.reduce((sum, n) => sum + n, 0);
    const endValue = index === 0 ? 0 : widthsDistanceSum;
    return endValue + offset;
  }
  function onHandlePress(segment, index) {
    performLayoutAnimation(ANIMATION_DURATION);
    setActiveSegmentIndex(index);
    segmentHandler(segment);
    performSwatchAnimation(index);
  }
  function segmentOnLayout(event, index) {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    setSegmentsDimensions({
      ...segmentsDimensions,
      [index]: {
        width,
        height
      }
    });
  }
  const selectedStyle = usePreferredColorSchemeStyle(styles.selected, styles.selectedDark);
  const width = segmentsDimensions[activeSegmentIndex]?.width;
  const height = segmentsDimensions[activeSegmentIndex]?.height;
  const outlineStyle = [styles.outline, isIOS && styles.outlineIOS];
  return /*#__PURE__*/_jsxs(View, {
    style: styles.row,
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.flex,
      children: addonLeft
    }), /*#__PURE__*/_jsxs(View, {
      style: [containerStyle, isIOS && styles.containerIOS],
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [{
          width,
          left: positionAnimationValue,
          height
        }, selectedStyle, outlineStyle]
      }), segments.map((segment, index) => {
        return /*#__PURE__*/_jsx(Segment, {
          title: segment,
          onPress: () => onHandlePress(segment, index),
          isSelected: activeSegmentIndex === index,
          onLayout: event => segmentOnLayout(event, index),
          accessibilityState: {
            selected: activeSegmentIndex === index
          },
          accessibilityRole: "button",
          accessibilityLabel: segment,
          accessibilityHint: `${index + 1} on ${segments.length}`
        }, index);
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.flex,
      children: addonRight
    })]
  });
};
export default SegmentedControls;
//# sourceMappingURL=index.native.js.map
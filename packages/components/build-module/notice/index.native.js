/**
 * External dependencies
 */
import { Animated, Easing, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';

/**
 * WordPress dependencies
 */
import { useEffect, useRef, useCallback, Platform } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const HIDE_TIMER = 3000;
const Notice = ({
  onNoticeHidden,
  content,
  id,
  status
}) => {
  const {
    width
  } = useWindowDimensions();
  const animationValue = useRef(new Animated.Value(0)).current;
  const timer = useRef(null);
  useEffect(() => {
    // start animation
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad)
    }).start(({
      finished
    }) => {
      if (finished && onNoticeHidden) {
        timer.current = setTimeout(() => {
          onHide();
        }, HIDE_TIMER);
      }
    });
    return () => {
      clearTimeout(timer?.current);
    };
  }, [animationValue, onHide, onNoticeHidden]);
  const onHide = useCallback(() => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad)
    }).start(({
      finished
    }) => {
      if (finished && onNoticeHidden) {
        onNoticeHidden(id);
      }
    });
  }, [animationValue, onNoticeHidden, id]);
  const noticeSolidStyles = usePreferredColorSchemeStyle(styles.noticeSolid, styles.noticeSolidDark);
  const successTextStyles = usePreferredColorSchemeStyle(styles.successText, styles.successTextDark);
  const errorTextStyles = usePreferredColorSchemeStyle(styles.errorText, styles.errorTextDark);
  const textStyles = [status === 'success' && successTextStyles, status === 'error' && errorTextStyles];
  const containerStyles = [styles.notice, !Platform.isIOS && noticeSolidStyles, {
    width,
    transform: [{
      translateY: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, 0]
      })
    }]
  }];
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(Animated.View, {
      style: containerStyles,
      children: [/*#__PURE__*/_jsx(TouchableWithoutFeedback, {
        onPress: onHide,
        children: /*#__PURE__*/_jsx(View, {
          style: styles.noticeContent,
          children: /*#__PURE__*/_jsx(Text, {
            numberOfLines: 3,
            style: textStyles,
            children: content
          })
        })
      }), Platform.isIOS && /*#__PURE__*/_jsx(BlurView, {
        style: styles.blurBackground,
        blurType: "prominent",
        blurAmount: 10
      })]
    })
  });
};
export default Notice;
//# sourceMappingURL=index.native.js.map
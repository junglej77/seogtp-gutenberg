/**
 * External dependencies
 */
import { StyleSheet, TouchableOpacity, Text, View, Platform } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

/**
 * WordPress dependencies
 */
import { Children, cloneElement, useCallback } from '@wordpress/element';
import { usePreferredColorScheme, usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Tooltip from '../tooltip';
import Icon from '../icon';
import style from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const isAndroid = Platform.OS === 'android';
const marginBottom = isAndroid ? -0.5 : 0;
const marginLeft = -3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonInactive: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fixedRatio: {
    aspectRatio: 1
  },
  buttonActive: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  subscriptInactive: {
    color: '#7b9ab1',
    // $toolbar-button.
    fontWeight: 'bold',
    fontSize: 13,
    alignSelf: 'flex-end',
    marginLeft,
    marginBottom
  },
  subscriptInactiveDark: {
    color: '#a7aaad' // $gray_20.
  },
  subscriptActive: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    alignSelf: 'flex-end',
    marginLeft,
    marginBottom
  }
});
export function Button(props) {
  const {
    children,
    onClick,
    onLongPress,
    disabled,
    hint,
    fixedRatio = true,
    isPressed,
    'aria-disabled': ariaDisabled,
    'data-subscript': subscript,
    testID,
    icon,
    iconSize,
    showTooltip,
    label,
    shortcut,
    tooltipPosition,
    isActiveStyle,
    customContainerStyles,
    hitSlop
  } = props;
  const preferredColorScheme = usePreferredColorScheme();
  const isDisabled = ariaDisabled || disabled;
  const containerStyle = [styles.container, customContainerStyles && {
    ...customContainerStyles
  }];
  const buttonActiveColorStyles = usePreferredColorSchemeStyle(style['components-button-light--active'], style['components-button-dark--active']);
  const buttonViewStyle = {
    opacity: isDisabled ? 0.3 : 1,
    ...(fixedRatio && styles.fixedRatio),
    ...(isPressed ? styles.buttonActive : styles.buttonInactive),
    ...(isPressed ? buttonActiveColorStyles : {}),
    ...(isPressed && isActiveStyle?.borderRadius && {
      borderRadius: isActiveStyle.borderRadius
    }),
    ...(isActiveStyle?.backgroundColor && {
      backgroundColor: isActiveStyle.backgroundColor
    })
  };
  const states = [];
  if (isPressed) {
    states.push('selected');
  }
  if (isDisabled) {
    states.push('disabled');
  }
  const subscriptInactive = usePreferredColorSchemeStyle(styles.subscriptInactive, styles.subscriptInactiveDark);
  const newChildren = Children.map(children, child => {
    return child ? cloneElement(child, {
      colorScheme: preferredColorScheme,
      isPressed
    }) : child;
  });

  // Should show the tooltip if...
  const shouldShowTooltip = !isDisabled && (
  // An explicit tooltip is passed or...
  showTooltip && label ||
  // There's a shortcut or...
  shortcut ||
  // There's a label and...
  !!label && (
  // The children are empty and...
  !children || Array.isArray(children) && !children.length) &&
  // The tooltip is not explicitly disabled.
  false !== showTooltip);
  const newIcon = icon ? cloneElement( /*#__PURE__*/_jsx(Icon, {
    icon: icon,
    size: iconSize
  }), {
    isPressed
  }) : null;
  const longPressHandler = useCallback(({
    nativeEvent
  }) => {
    if (nativeEvent.state === State.ACTIVE && onLongPress) {
      onLongPress();
    }
  }, [onLongPress]);
  const element = /*#__PURE__*/_jsx(TouchableOpacity, {
    activeOpacity: 0.7,
    accessible: true,
    accessibilityLabel: label,
    accessibilityStates: states,
    accessibilityRole: "button",
    accessibilityHint: hint,
    onPress: onClick,
    style: containerStyle,
    disabled: isDisabled,
    testID: testID,
    hitSlop: hitSlop,
    children: /*#__PURE__*/_jsx(LongPressGestureHandler, {
      minDurationMs: 500,
      maxDist: 150,
      onHandlerStateChange: longPressHandler,
      children: /*#__PURE__*/_jsx(View, {
        style: buttonViewStyle,
        children: /*#__PURE__*/_jsxs(View, {
          style: {
            flexDirection: 'row'
          },
          children: [newIcon, newChildren, subscript && /*#__PURE__*/_jsx(Text, {
            style: isPressed ? styles.subscriptActive : subscriptInactive,
            children: subscript
          })]
        })
      })
    })
  });
  if (!shouldShowTooltip) {
    return element;
  }
  return /*#__PURE__*/_jsx(Tooltip, {
    text: label,
    shortcut: shortcut,
    position: tooltipPosition,
    visible: showTooltip === true,
    children: element
  });
}
export default Button;
//# sourceMappingURL=index.native.js.map
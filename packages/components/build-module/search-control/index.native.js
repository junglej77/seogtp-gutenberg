/**
 * External dependencies
 */
import { TextInput, Text, View, TouchableOpacity, Platform, useColorScheme, Keyboard } from 'react-native';

/**
 * WordPress dependencies
 */
import { useState, useRef, useMemo, useEffect, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, cancelCircleFilled as cancelCircleFilledIcon, arrowLeft as arrowLeftIcon, close as closeIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import allStyles from './style.scss';
import platformStyles from './platform-style.scss';
import Button from '../button';
import Gridicons from '../mobile/gridicons';

// Merge platform specific styles with the default styles.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const baseStyles = {
  ...allStyles
};
for (const selector in platformStyles) {
  baseStyles[selector] = {
    ...baseStyles[selector],
    ...platformStyles[selector]
  };
}
function selectModifiedStyles(styles, modifier) {
  const modifierMatcher = new RegExp(`--${modifier}$`);
  const modifierSelectors = Object.keys(styles).filter(selector => selector.match(modifierMatcher));
  return modifierSelectors.reduce((modifiedStyles, modifierSelector) => {
    const blockElementSelector = modifierSelector.split('--')[0];
    modifiedStyles[blockElementSelector] = styles[modifierSelector];
    return modifiedStyles;
  }, {});
}
function mergeStyles(styles, updateStyles, selectors) {
  selectors.forEach(selector => {
    styles[selector] = {
      ...styles[selector],
      ...updateStyles[selector]
    };
  });
  return styles;
}
function SearchControl({
  value,
  onChange,
  placeholder = __('Search blocks')
}) {
  const [isActive, setIsActive] = useState(false);
  const [currentStyles, setCurrentStyles] = useState(baseStyles);
  const isDark = useColorScheme() === 'dark';
  const inputRef = useRef();
  const onCancelTimer = useRef();
  const isIOS = Platform.OS === 'ios';
  const darkStyles = useMemo(() => {
    return selectModifiedStyles(baseStyles, 'dark');
  }, []);
  const activeStyles = useMemo(() => {
    return selectModifiedStyles(baseStyles, 'active');
  }, []);
  const activeDarkStyles = useMemo(() => {
    return selectModifiedStyles(baseStyles, 'active-dark');
  }, []);
  useEffect(() => {
    let futureStyles = {
      ...baseStyles
    };
    function mergeFutureStyles(modifiedStyles, shouldUseConditions) {
      const shouldUseModified = shouldUseConditions.every(should => should);
      const updatedStyles = shouldUseModified ? modifiedStyles : futureStyles;
      const selectors = Object.keys(modifiedStyles);
      futureStyles = mergeStyles(futureStyles, updatedStyles, selectors);
    }
    mergeFutureStyles(activeStyles, [isActive]);
    mergeFutureStyles(darkStyles, [isDark]);
    mergeFutureStyles(activeDarkStyles, [isActive, isDark]);
    setCurrentStyles(futureStyles);
    // Disable reason: deferring this refactor to the native team.
    // see https://github.com/WordPress/gutenberg/pull/41166
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isDark]);
  const clearInput = useCallback(() => {
    onChange('');
  }, [onChange]);
  const onPress = useCallback(() => {
    setIsActive(true);
    inputRef.current?.focus();
  }, []);
  const onFocus = useCallback(() => {
    setIsActive(true);
  }, []);
  const onCancel = useCallback(() => {
    clearTimeout(onCancelTimer.current);
    onCancelTimer.current = setTimeout(() => {
      inputRef.current?.blur();
      clearInput();
      setIsActive(false);
    }, 0);
  }, [clearInput]);
  const onKeyboardDidHide = useCallback(() => {
    if (!isIOS) {
      onCancel();
    }
  }, [isIOS, onCancel]);
  useEffect(() => {
    const keyboardHideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      clearTimeout(onCancelTimer.current);
      keyboardHideSubscription.remove();
    };
  }, [onKeyboardDidHide]);
  const {
    'search-control__container': containerStyle,
    'search-control__inner-container': innerContainerStyle,
    'search-control__input-container': inputContainerStyle,
    'search-control__form-input': formInputStyle,
    'search-control__form-input-placeholder': placeholderStyle,
    'search-control__input-button': inputButtonStyle,
    'search-control__input-button-left': inputButtonLeftStyle,
    'search-control__input-button-right': inputButtonRightStyle,
    'search-control__cancel-button': cancelButtonStyle,
    'search-control__cancel-button-text': cancelButtonTextStyle,
    'search-control__icon': iconStyle,
    'search-control__right-icon': rightIconStyle
  } = currentStyles;
  function renderLeftButton() {
    const button = !isIOS && isActive ? /*#__PURE__*/_jsx(Button, {
      label: __('Cancel search'),
      icon: arrowLeftIcon,
      onClick: onCancel,
      style: iconStyle
    }) : /*#__PURE__*/_jsx(Icon, {
      icon: Gridicons.search,
      fill: iconStyle?.color
    });
    return /*#__PURE__*/_jsx(View, {
      style: [inputButtonStyle, inputButtonLeftStyle],
      children: button
    });
  }
  function renderRightButton() {
    let button;

    // Add a View element to properly center the input placeholder via flexbox.
    if (isIOS && !isActive) {
      button = /*#__PURE__*/_jsx(View, {});
    }
    if (!!value) {
      button = /*#__PURE__*/_jsx(Button, {
        label: __('Clear search'),
        icon: isIOS ? cancelCircleFilledIcon : closeIcon,
        onClick: clearInput,
        style: [iconStyle, rightIconStyle]
      });
    }
    return /*#__PURE__*/_jsx(View, {
      style: [inputButtonStyle, inputButtonRightStyle],
      children: button
    });
  }
  function renderCancel() {
    if (!isIOS) {
      return null;
    }
    return /*#__PURE__*/_jsx(View, {
      style: cancelButtonStyle,
      children: /*#__PURE__*/_jsx(Text, {
        onPress: onCancel,
        style: cancelButtonTextStyle,
        accessible: true,
        accessibilityRole: "button",
        accessibilityLabel: __('Cancel search'),
        accessibilityHint: __('Cancel search'),
        children: __('Cancel')
      })
    });
  }
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: containerStyle,
    onPress: onPress,
    activeOpacity: 1,
    children: /*#__PURE__*/_jsxs(View, {
      style: innerContainerStyle,
      children: [/*#__PURE__*/_jsxs(View, {
        style: inputContainerStyle,
        children: [renderLeftButton(), /*#__PURE__*/_jsx(TextInput, {
          ref: inputRef,
          style: formInputStyle,
          placeholderTextColor: placeholderStyle?.color,
          onChangeText: onChange,
          onFocus: onFocus,
          value: value,
          placeholder: placeholder
        }), renderRightButton()]
      }), isActive && renderCancel()]
    })
  });
}
export default SearchControl;
//# sourceMappingURL=index.native.js.map
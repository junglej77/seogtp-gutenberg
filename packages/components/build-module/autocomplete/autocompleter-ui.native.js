/**
 * External dependencies
 */
import { View, Animated, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

/**
 * WordPress dependencies
 */
import { useLayoutEffect, useEffect, useRef, useState, useCallback } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BackgroundView from './background-view';
import getDefaultUseItems from './get-default-use-items';
import styles from './style.scss';
import Icon from '../icon';
import { __unstableAutocompletionItemsFill as AutocompletionItemsFill } from '../mobile/autocompletion-items';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  compose: stylesCompose
} = StyleSheet;
export function getAutoCompleterUI(autocompleter) {
  const useItems = autocompleter.useItems ? autocompleter.useItems : getDefaultUseItems(autocompleter);
  function AutocompleterUI({
    filterValue,
    selectedIndex,
    onChangeOptions,
    onSelect,
    value,
    reset
  }) {
    const [items] = useItems(filterValue);
    const filteredItems = items.filter(item => !item.isDisabled);
    const scrollViewRef = useRef();
    const animationValue = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);
    const {
      text
    } = value;
    useEffect(() => {
      if (!isVisible && text.length > 0) {
        setIsVisible(true);
      }
    }, [isVisible, text]);
    useLayoutEffect(() => {
      onChangeOptions(items);
      scrollViewRef.current?.scrollTo({
        x: 0,
        animated: false
      });
      if (isVisible && text.length > 0) {
        startAnimation(true);
      } else if (isVisible && text.length === 0) {
        startAnimation(false);
      }
      // Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
      // See https://github.com/WordPress/gutenberg/pull/41820
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, isVisible, text]);
    const activeItemStyles = usePreferredColorSchemeStyle(styles['components-autocomplete__item-active'], styles['components-autocomplete__item-active-dark']);
    const iconStyles = usePreferredColorSchemeStyle(styles['components-autocomplete__icon'], styles['components-autocomplete__icon-active-dark']);
    const activeIconStyles = usePreferredColorSchemeStyle(styles['components-autocomplete__icon-active '], styles['components-autocomplete__icon-active-dark']);
    const textStyles = usePreferredColorSchemeStyle(styles['components-autocomplete__text'], styles['components-autocomplete__text-dark']);
    const activeTextStyles = usePreferredColorSchemeStyle(styles['components-autocomplete__text-active'], styles['components-autocomplete__text-active-dark']);
    const startAnimation = useCallback(show => {
      Animated.timing(animationValue, {
        toValue: show ? 1 : 0,
        duration: show ? 200 : 100,
        useNativeDriver: true
      }).start(({
        finished
      }) => {
        if (finished && !show && isVisible) {
          setIsVisible(false);
          reset();
        }
      });
    },
    // Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
    // See https://github.com/WordPress/gutenberg/pull/41820
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isVisible]);
    const contentStyles = {
      transform: [{
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [styles['components-autocomplete'].height, 0]
        })
      }]
    };
    if (!filteredItems.length > 0 || !isVisible) {
      return null;
    }
    return /*#__PURE__*/_jsx(AutocompletionItemsFill, {
      children: /*#__PURE__*/_jsx(View, {
        style: styles['components-autocomplete'],
        children: /*#__PURE__*/_jsx(Animated.View, {
          style: contentStyles,
          children: /*#__PURE__*/_jsx(BackgroundView, {
            children: /*#__PURE__*/_jsx(ScrollView, {
              testID: "autocompleter",
              ref: scrollViewRef,
              horizontal: true,
              contentContainerStyle: styles['components-autocomplete__content'],
              showsHorizontalScrollIndicator: false,
              keyboardShouldPersistTaps: "always",
              accessibilityLabel:
              // translators: Slash inserter autocomplete results
              __('Slash inserter results'),
              children: filteredItems.map((option, index) => {
                const isActive = index === selectedIndex;
                const itemStyle = stylesCompose(styles['components-autocomplete__item'], isActive && activeItemStyles);
                const textStyle = stylesCompose(textStyles, isActive && activeTextStyles);
                const iconStyle = stylesCompose(iconStyles, isActive && activeIconStyles);
                const iconSource = option?.value?.icon?.src || option?.value?.icon;
                return /*#__PURE__*/_jsxs(TouchableOpacity, {
                  activeOpacity: 0.5,
                  style: itemStyle,
                  onPress: () => onSelect(option),
                  accessibilityLabel: sprintf(
                  // translators: %s: Block name e.g. "Image block"
                  __('%s block'), option?.value?.title),
                  children: [/*#__PURE__*/_jsx(View, {
                    style: styles['components-autocomplete__icon'],
                    children: /*#__PURE__*/_jsx(Icon, {
                      icon: iconSource,
                      size: 24,
                      style: iconStyle
                    })
                  }), /*#__PURE__*/_jsx(Text, {
                    style: textStyle,
                    children: option?.value?.title
                  })]
                }, index);
              })
            })
          })
        })
      })
    });
  }
  return AutocompleterUI;
}
export default getAutoCompleterUI;
//# sourceMappingURL=autocompleter-ui.native.js.map
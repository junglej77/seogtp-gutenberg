/**
 * External dependencies
 */
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { BottomSheet, BottomSheetContext } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const HelpDetailNavigationScreen = ({
  content,
  label
}) => {
  const navigation = useNavigation();
  const {
    listProps
  } = useContext(BottomSheetContext);
  const contentContainerStyle = StyleSheet.flatten(listProps.contentContainerStyle);
  return /*#__PURE__*/_jsx(BottomSheet.NavigationScreen, {
    isScrollable: true,
    fullScreen: true,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.container,
      children: [/*#__PURE__*/_jsxs(BottomSheet.NavBar, {
        children: [/*#__PURE__*/_jsx(BottomSheet.NavBar.BackButton, {
          onPress: navigation.goBack
        }), /*#__PURE__*/_jsx(BottomSheet.NavBar.Heading, {
          children: label
        })]
      }), /*#__PURE__*/_jsx(ScrollView, {
        ...listProps,
        contentContainerStyle: {
          ...contentContainerStyle,
          paddingBottom: Math.max(listProps.safeAreaBottomInset, contentContainerStyle.paddingBottom),
          /**
           * Remove margin set via `hideHeader`. Combining a header
           * and navigation in this bottom sheet is at odds with the
           * current `BottomSheet` implementation.
           */
          marginTop: 0
        },
        children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
          accessible: false,
          children: /*#__PURE__*/_jsx(View, {
            children: content
          })
        })
      })]
    })
  });
};
export default HelpDetailNavigationScreen;
//# sourceMappingURL=help-detail-navigation-screen.native.js.map
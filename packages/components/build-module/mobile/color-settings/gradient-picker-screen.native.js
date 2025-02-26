/**
 * External dependencies
 */
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CustomGradientPicker from '../../custom-gradient-picker';
import NavBar from '../bottom-sheet/nav-bar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const GradientPickerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    setColor,
    currentValue,
    isGradientColor
  } = route.params;
  return /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsxs(NavBar, {
      children: [/*#__PURE__*/_jsx(NavBar.BackButton, {
        onPress: navigation.goBack
      }), /*#__PURE__*/_jsx(NavBar.Heading, {
        children: __('Customize Gradient')
      })]
    }), /*#__PURE__*/_jsx(CustomGradientPicker, {
      setColor: setColor,
      currentValue: currentValue,
      isGradientColor: isGradientColor
    })]
  });
};
export default GradientPickerScreen;
//# sourceMappingURL=gradient-picker-screen.native.js.map
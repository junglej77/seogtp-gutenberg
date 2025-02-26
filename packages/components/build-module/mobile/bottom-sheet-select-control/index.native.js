/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { useNavigation } from '@react-navigation/native';
import { useState } from '@wordpress/element';
import { Icon, chevronRight, check } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import BottomSheet from '../bottom-sheet';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const EMPTY_OPTION = {
  label: ''
};
const BottomSheetSelectControl = ({
  label,
  icon,
  options: items,
  onChange,
  value: selectedValue,
  disabled
}) => {
  var _items$find;
  const [showSubSheet, setShowSubSheet] = useState(false);
  const navigation = useNavigation();
  const onChangeValue = value => {
    return () => {
      goBack();
      onChange(value);
    };
  };
  const selectedOption = (_items$find = items.find(option => option.value === selectedValue)) !== null && _items$find !== void 0 ? _items$find : EMPTY_OPTION;
  const goBack = () => {
    setShowSubSheet(false);
    navigation.goBack();
  };
  const openSubSheet = () => {
    navigation.navigate(BottomSheet.SubSheet.screenName);
    setShowSubSheet(true);
  };
  return /*#__PURE__*/_jsx(BottomSheet.SubSheet, {
    navigationButton: /*#__PURE__*/_jsx(BottomSheet.Cell, {
      label: label,
      separatorType: "none",
      icon: icon,
      value: selectedOption.label,
      onPress: openSubSheet,
      accessibilityRole: "button",
      accessibilityLabel: sprintf(
      // translators:  %1$s: Select control button label e.g. "Button width". %2$s: Select control option value e.g: "Auto, 25%".
      __('%1$s. Currently selected: %2$s'), label, selectedOption.label),
      accessibilityHint: sprintf(
      // translators: %s: Select control button label e.g. "Button width"
      __('Navigates to select %s'), label),
      disabled: disabled,
      children: disabled ? null : /*#__PURE__*/_jsx(Icon, {
        icon: chevronRight
      })
    }),
    showSheet: showSubSheet,
    children: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(BottomSheet.NavBar, {
        children: [/*#__PURE__*/_jsx(BottomSheet.NavBar.BackButton, {
          onPress: goBack
        }), /*#__PURE__*/_jsx(BottomSheet.NavBar.Heading, {
          children: label
        })]
      }), /*#__PURE__*/_jsx(View, {
        style: styles.selectControl,
        children: items.map((item, index) => /*#__PURE__*/_jsx(BottomSheet.Cell, {
          customActionButton: true,
          separatorType: "none",
          label: item.label,
          icon: item.icon,
          onPress: onChangeValue(item.value),
          leftAlign: true,
          accessibilityRole: "button",
          accessibilityLabel: item.value === selectedValue ? sprintf(
          // translators: %s: Select control option value e.g: "Auto, 25%".
          __('Selected: %s'), item.label) : item.label,
          accessibilityHint: __('Double tap to select'),
          children: item.value === selectedValue && /*#__PURE__*/_jsx(Icon, {
            icon: check
          })
        }, index))
      })]
    })
  });
};
export default BottomSheetSelectControl;
//# sourceMappingURL=index.native.js.map
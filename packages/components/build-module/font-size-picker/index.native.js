/**
 * External dependencies
 */
import { View, useWindowDimensions } from 'react-native';

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
import { default as getPxFromCssUnit } from '../mobile/utils/get-px-from-css-unit';
import { default as UnitControl, useCustomUnits } from '../unit-control';
import styles from './style.scss';
import BottomSheet from '../mobile/bottom-sheet';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_FONT_SIZE = 16;
function FontSizePicker({
  fontSizes = [],
  disableCustomFontSizes = false,
  onChange,
  value: selectedValue
}) {
  var _fontSizes$find;
  const [showSubSheet, setShowSubSheet] = useState(false);
  const navigation = useNavigation();
  const {
    height,
    width
  } = useWindowDimensions();
  const cssUnitOptions = {
    height,
    width,
    fontSize: DEFAULT_FONT_SIZE
  };
  // We need to always convert to px units because the selected value
  // could be coming from the web where it could be stored as a different unit.
  const selectedPxValue = getPxFromCssUnit(selectedValue, cssUnitOptions);
  const onChangeValue = value => {
    return () => {
      goBack();
      onChange(value);
    };
  };
  const selectedOption = (_fontSizes$find = fontSizes.find(option => option.sizePx === selectedPxValue)) !== null && _fontSizes$find !== void 0 ? _fontSizes$find : {
    name: 'Custom'
  };
  const goBack = () => {
    setShowSubSheet(false);
    navigation.goBack();
  };
  const openSubSheet = () => {
    navigation.navigate(BottomSheet.SubSheet.screenName);
    setShowSubSheet(true);
  };
  const label = __('Font Size');
  const units = useCustomUnits({
    availableUnits: ['px', 'em', 'rem', 'vw', 'vh']
  });
  const accessibilityLabel = sprintf(
  // translators: %1$s: Font size name e.g. Small
  __('Font Size, %1$s'), selectedOption.name);
  return /*#__PURE__*/_jsx(BottomSheet.SubSheet, {
    navigationButton: /*#__PURE__*/_jsx(BottomSheet.Cell, {
      label: label,
      separatorType: "none",
      value: selectedValue ? sprintf(
      // translators: %1$s: Select control font size name e.g. Small, %2$s: Select control font size e.g. 12px
      __('%1$s (%2$s)'), selectedOption.name, selectedPxValue) : __('Default'),
      onPress: openSubSheet,
      accessibilityRole: "button",
      accessibilityLabel: accessibilityLabel,
      accessibilityHint: sprintf(
      // translators: %s: Select control button label e.g. Small
      __('Navigates to select %s'), selectedOption.name),
      children: /*#__PURE__*/_jsx(Icon, {
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
      }), /*#__PURE__*/_jsxs(View, {
        style: styles['components-font-size-picker'],
        children: [/*#__PURE__*/_jsx(BottomSheet.Cell, {
          customActionButton: true,
          separatorType: "none",
          label: __('Default'),
          onPress: onChangeValue(undefined),
          leftAlign: true,
          accessibilityRole: "button",
          accessibilityLabel: __('Selected: Default'),
          accessibilityHint: __('Double tap to select default font size'),
          children: /*#__PURE__*/_jsx(View, {
            children: selectedValue === undefined && /*#__PURE__*/_jsx(Icon, {
              icon: check
            })
          })
        }, "default"), fontSizes.map((item, index) => {
          // Only display a choice that we can currenly select.
          if (!parseFloat(item.sizePx)) {
            return null;
          }
          return /*#__PURE__*/_jsx(BottomSheet.Cell, {
            customActionButton: true,
            separatorType: "none",
            label: item.name,
            subLabel: item.sizePx,
            onPress: onChangeValue(item.sizePx),
            leftAlign: true,
            accessibilityRole: "button",
            accessibilityLabel: item.sizePx === selectedValue ? sprintf(
            // translators: %s: Select font size option value e.g: "Selected: Large".
            __('Selected: %s'), item.name) : item.name,
            accessibilityHint: __('Double tap to select font size'),
            children: /*#__PURE__*/_jsx(View, {
              children: item.sizePx === selectedPxValue && /*#__PURE__*/_jsx(Icon, {
                icon: check
              })
            })
          }, index);
        }), !disableCustomFontSizes && /*#__PURE__*/_jsx(UnitControl, {
          label: __('Custom'),
          min: 0,
          max: 200,
          step: 1,
          value: selectedValue,
          onChange: nextSize => {
            if (0 === parseFloat(nextSize) || !nextSize) {
              onChange(undefined);
            } else {
              onChange(nextSize);
            }
          },
          units: units
        })]
      })]
    })
  });
}
export default FontSizePicker;
//# sourceMappingURL=index.native.js.map
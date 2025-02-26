/**
 * External dependencies
 */
import { View, Text, TouchableWithoutFeedback } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
import { useRoute, useNavigation } from '@react-navigation/native';

/**
 * Internal dependencies
 */
import ColorPalette from '../../color-palette';
import ColorIndicator from '../../color-indicator';
import NavBar from '../bottom-sheet/nav-bar';
import SegmentedControls from '../segmented-control';
import { colorsUtils } from './utils';
import PanelBody from '../../panel/body';
import { BottomSheetContext } from '../bottom-sheet/bottom-sheet-context';
import ColorControl from '../../color-control';
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const HIT_SLOP = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8
};
const PaletteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    shouldEnableBottomSheetScroll
  } = useContext(BottomSheetContext);
  const {
    label,
    onColorChange,
    onGradientChange,
    onColorCleared,
    colorValue,
    defaultSettings,
    hideNavigation = false
  } = route.params || {};
  const {
    segments,
    isGradient
  } = colorsUtils;
  const [currentValue, setCurrentValue] = useState(colorValue);
  const isGradientColor = isGradient(currentValue);
  const selectedSegmentIndex = isGradientColor ? 1 : 0;
  const [currentSegment, setCurrentSegment] = useState(segments[selectedSegmentIndex]);
  const isGradientSegment = currentSegment === colorsUtils.segments[1];
  const currentSegmentColors = !isGradientSegment ? defaultSettings.colors : defaultSettings.gradients;
  const allAvailableColors = defaultSettings?.allAvailableColors || [];
  const allAvailableGradients = currentSegmentColors.flatMap(({
    gradients
  }) => gradients).filter(Boolean);
  const horizontalSeparatorStyle = usePreferredColorSchemeStyle(styles.horizontalSeparator, styles.horizontalSeparatorDark);
  const clearButtonStyle = usePreferredColorSchemeStyle(styles.clearButton, styles.clearButtonDark);
  const selectedColorTextStyle = usePreferredColorSchemeStyle(styles.colorText, styles.colorTextDark);
  const isSolidSegment = currentSegment === segments[0];
  const isCustomGadientShown = !isSolidSegment && isGradientColor;
  const setColor = color => {
    setCurrentValue(color);
    if (isSolidSegment && onColorChange && onGradientChange) {
      onColorChange(color);
    } else if (isSolidSegment && onColorChange) {
      onColorChange(color);
    } else if (!isSolidSegment && onGradientChange) {
      onGradientChange(color);
    }
  };
  function onClear() {
    setCurrentValue(undefined);
    if (onColorCleared) {
      onColorCleared();
    }
  }
  function onCustomPress() {
    if (isSolidSegment) {
      navigation.navigate(colorsUtils.screens.picker, {
        currentValue,
        setColor
      });
    } else {
      navigation.navigate(colorsUtils.screens.gradientPicker, {
        setColor,
        isGradientColor,
        currentValue
      });
    }
  }
  function getClearButton() {
    return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      accessibilityLabel: __('Clear selected color'),
      onPress: onClear,
      hitSlop: HIT_SLOP,
      children: /*#__PURE__*/_jsx(View, {
        style: styles.clearButtonContainer,
        children: /*#__PURE__*/_jsx(Text, {
          style: clearButtonStyle,
          children: __('Reset')
        })
      })
    });
  }
  function getFooter() {
    if (onGradientChange) {
      return /*#__PURE__*/_jsx(SegmentedControls, {
        segments: segments,
        segmentHandler: setCurrentSegment,
        selectedIndex: segments.indexOf(currentSegment),
        addonLeft: currentValue && /*#__PURE__*/_jsx(ColorIndicator, {
          color: currentValue,
          style: styles.colorIndicator
        }),
        addonRight: currentValue && getClearButton()
      });
    }
    return /*#__PURE__*/_jsxs(View, {
      style: styles.footer,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.flex,
        children: currentValue && /*#__PURE__*/_jsx(ColorIndicator, {
          color: currentValue,
          style: styles.colorIndicator
        })
      }), currentValue ? /*#__PURE__*/_jsx(Text, {
        style: selectedColorTextStyle,
        maxFontSizeMultiplier: 2,
        selectable: true,
        children: currentValue.toUpperCase()
      }) : /*#__PURE__*/_jsx(Text, {
        style: styles.selectColorText,
        maxFontSizeMultiplier: 2,
        children: __('Select a color above')
      }), /*#__PURE__*/_jsx(View, {
        style: styles.flex,
        children: currentValue && getClearButton()
      })]
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    children: [!hideNavigation && /*#__PURE__*/_jsxs(NavBar, {
      children: [/*#__PURE__*/_jsx(NavBar.BackButton, {
        onPress: navigation.goBack
      }), /*#__PURE__*/_jsxs(NavBar.Heading, {
        children: [label, " "]
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.colorPalettes,
      children: currentSegmentColors.map((palette, paletteKey) => {
        const paletteSettings = {
          colors: palette.colors,
          gradients: palette.gradients,
          allColors: allAvailableColors,
          allGradients: allAvailableGradients
        };
        // Limit to show the custom indicator to the first available palette
        const enableCustomColor = paletteKey === 0;
        return /*#__PURE__*/_jsx(ColorPalette, {
          enableCustomColor: enableCustomColor,
          label: palette.name,
          setColor: setColor,
          activeColor: currentValue,
          isGradientColor: isGradientColor,
          currentSegment: currentSegment,
          onCustomPress: onCustomPress,
          shouldEnableBottomSheetScroll: shouldEnableBottomSheetScroll,
          defaultSettings: paletteSettings
        }, paletteKey);
      })
    }), isCustomGadientShown && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(View, {
        style: horizontalSeparatorStyle
      }), /*#__PURE__*/_jsx(PanelBody, {
        children: /*#__PURE__*/_jsx(ColorControl, {
          label: __('Customize Gradient'),
          onPress: onCustomPress,
          withColorIndicator: false
        })
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: horizontalSeparatorStyle
    }), getFooter()]
  });
};
export default PaletteScreen;
//# sourceMappingURL=palette.screen.native.js.map
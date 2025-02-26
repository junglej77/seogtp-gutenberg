/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BorderControlStylePicker from '../border-control-style-picker';
import Button from '../../button';
import ColorIndicator from '../../color-indicator';
import ColorPalette from '../../color-palette';
import Dropdown from '../../dropdown';
import { HStack } from '../../h-stack';
import { VStack } from '../../v-stack';
import { contextConnect } from '../../context';
import { useBorderControlDropdown } from './hook';
import { StyledLabel } from '../../base-control/styles/base-control-styles';
import DropdownContentWrapper from '../../dropdown/dropdown-content-wrapper';
import { isMultiplePaletteArray } from '../../color-palette/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const getAriaLabelColorValue = colorValue => {
  // Leave hex values as-is. Remove the `var()` wrapper from CSS vars.
  return colorValue.replace(/^var\((.+)\)$/, '$1');
};
const getColorObject = (colorValue, colors) => {
  if (!colorValue || !colors) {
    return;
  }
  if (isMultiplePaletteArray(colors)) {
    // Multiple origins
    let matchedColor;
    colors.some(origin => origin.colors.some(color => {
      if (color.color === colorValue) {
        matchedColor = color;
        return true;
      }
      return false;
    }));
    return matchedColor;
  }

  // Single origin
  return colors.find(color => color.color === colorValue);
};
const getToggleAriaLabel = (colorValue, colorObject, style, isStyleEnabled) => {
  if (isStyleEnabled) {
    if (colorObject) {
      const ariaLabelValue = getAriaLabelColorValue(colorObject.color);
      return style ? sprintf(
      // translators: %1$s: The name of the color e.g. "vivid red". %2$s: The color's hex code e.g.: "#f00:". %3$s: The current border style selection e.g. "solid".
      'Border color and style picker. The currently selected color is called "%1$s" and has a value of "%2$s". The currently selected style is "%3$s".', colorObject.name, ariaLabelValue, style) : sprintf(
      // translators: %1$s: The name of the color e.g. "vivid red". %2$s: The color's hex code e.g.: "#f00:".
      'Border color and style picker. The currently selected color is called "%1$s" and has a value of "%2$s".', colorObject.name, ariaLabelValue);
    }
    if (colorValue) {
      const ariaLabelValue = getAriaLabelColorValue(colorValue);
      return style ? sprintf(
      // translators: %1$s: The color's hex code e.g.: "#f00:". %2$s: The current border style selection e.g. "solid".
      'Border color and style picker. The currently selected color has a value of "%1$s". The currently selected style is "%2$s".', ariaLabelValue, style) : sprintf(
      // translators: %1$s: The color's hex code e.g: "#f00".
      'Border color and style picker. The currently selected color has a value of "%1$s".', ariaLabelValue);
    }
    return __('Border color and style picker.');
  }
  if (colorObject) {
    return sprintf(
    // translators: %1$s: The name of the color e.g. "vivid red". %2$s: The color's hex code e.g: "#f00".
    'Border color picker. The currently selected color is called "%1$s" and has a value of "%2$s".', colorObject.name, getAriaLabelColorValue(colorObject.color));
  }
  if (colorValue) {
    return sprintf(
    // translators: %1$s: The color's hex code e.g: "#f00".
    'Border color picker. The currently selected color has a value of "%1$s".', getAriaLabelColorValue(colorValue));
  }
  return __('Border color picker.');
};
const BorderControlDropdown = (props, forwardedRef) => {
  const {
    __experimentalIsRenderedInSidebar,
    border,
    colors,
    disableCustomColors,
    enableAlpha,
    enableStyle,
    indicatorClassName,
    indicatorWrapperClassName,
    isStyleSettable,
    onReset,
    onColorChange,
    onStyleChange,
    popoverContentClassName,
    popoverControlsClassName,
    resetButtonClassName,
    showDropdownHeader,
    size,
    __unstablePopoverProps,
    ...otherProps
  } = useBorderControlDropdown(props);
  const {
    color,
    style
  } = border || {};
  const colorObject = getColorObject(color, colors);
  const toggleAriaLabel = getToggleAriaLabel(color, colorObject, style, enableStyle);
  const showResetButton = color || style && style !== 'none';
  const dropdownPosition = __experimentalIsRenderedInSidebar ? 'bottom left' : undefined;
  const renderToggle = ({
    onToggle
  }) => /*#__PURE__*/_jsx(Button, {
    onClick: onToggle,
    variant: "tertiary",
    "aria-label": toggleAriaLabel,
    tooltipPosition: dropdownPosition,
    label: __('Border color and style picker'),
    showTooltip: true,
    __next40pxDefaultSize: size === '__unstable-large' ? true : false,
    children: /*#__PURE__*/_jsx("span", {
      className: indicatorWrapperClassName,
      children: /*#__PURE__*/_jsx(ColorIndicator, {
        className: indicatorClassName,
        colorValue: color
      })
    })
  });
  const renderContent = ({
    onClose
  }) => /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(DropdownContentWrapper, {
      paddingSize: "medium",
      children: /*#__PURE__*/_jsxs(VStack, {
        className: popoverControlsClassName,
        spacing: 6,
        children: [showDropdownHeader ? /*#__PURE__*/_jsxs(HStack, {
          children: [/*#__PURE__*/_jsx(StyledLabel, {
            children: __('Border color')
          }), /*#__PURE__*/_jsx(Button, {
            size: "small",
            label: __('Close border color'),
            icon: closeSmall,
            onClick: onClose
          })]
        }) : undefined, /*#__PURE__*/_jsx(ColorPalette, {
          className: popoverContentClassName,
          value: color,
          onChange: onColorChange,
          colors,
          disableCustomColors,
          __experimentalIsRenderedInSidebar: __experimentalIsRenderedInSidebar,
          clearable: false,
          enableAlpha: enableAlpha
        }), enableStyle && isStyleSettable && /*#__PURE__*/_jsx(BorderControlStylePicker, {
          label: __('Style'),
          value: style,
          onChange: onStyleChange
        })]
      })
    }), showResetButton && /*#__PURE__*/_jsx(DropdownContentWrapper, {
      paddingSize: "none",
      children: /*#__PURE__*/_jsx(Button, {
        className: resetButtonClassName,
        variant: "tertiary",
        onClick: () => {
          onReset();
          onClose();
        },
        children: __('Reset')
      })
    })]
  });
  return /*#__PURE__*/_jsx(Dropdown, {
    renderToggle: renderToggle,
    renderContent: renderContent,
    popoverProps: {
      ...__unstablePopoverProps
    },
    ...otherProps,
    ref: forwardedRef
  });
};
const ConnectedBorderControlDropdown = contextConnect(BorderControlDropdown, 'BorderControlDropdown');
export default ConnectedBorderControlDropdown;
//# sourceMappingURL=component.js.map
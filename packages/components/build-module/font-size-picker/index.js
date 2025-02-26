/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { settings } from '@wordpress/icons';
import { useState, useMemo, forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Button } from '../button';
import RangeControl from '../range-control';
import { Flex, FlexItem } from '../flex';
import { default as UnitControl, parseQuantityAndUnitFromRawValue, useCustomUnits } from '../unit-control';
import { VisuallyHidden } from '../visually-hidden';
import { getCommonSizeUnit } from './utils';
import { Container, Header, HeaderHint, HeaderLabel, HeaderToggle } from './styles';
import { Spacer } from '../spacer';
import FontSizePickerSelect from './font-size-picker-select';
import FontSizePickerToggleGroup from './font-size-picker-toggle-group';
import { T_SHIRT_NAMES } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_UNITS = ['px', 'em', 'rem', 'vw', 'vh'];
const MAX_TOGGLE_GROUP_SIZES = 5;
const UnforwardedFontSizePicker = (props, ref) => {
  const {
    __next40pxDefaultSize = false,
    fallbackFontSize,
    fontSizes = [],
    disableCustomFontSizes = false,
    onChange,
    size = 'default',
    units: unitsProp = DEFAULT_UNITS,
    value,
    withSlider = false,
    withReset = true
  } = props;
  const units = useCustomUnits({
    availableUnits: unitsProp
  });
  const selectedFontSize = fontSizes.find(fontSize => fontSize.size === value);
  const isCustomValue = !!value && !selectedFontSize;

  // Initially request a custom picker if the value is not from the predef list.
  const [userRequestedCustom, setUserRequestedCustom] = useState(isCustomValue);
  let currentPickerType;
  if (!disableCustomFontSizes && userRequestedCustom) {
    // While showing the custom value picker, switch back to predef only if
    // `disableCustomFontSizes` is set to `true`.
    currentPickerType = 'custom';
  } else {
    currentPickerType = fontSizes.length > MAX_TOGGLE_GROUP_SIZES ? 'select' : 'togglegroup';
  }
  const headerHint = useMemo(() => {
    switch (currentPickerType) {
      case 'custom':
        return __('Custom');
      case 'togglegroup':
        if (selectedFontSize) {
          return selectedFontSize.name || T_SHIRT_NAMES[fontSizes.indexOf(selectedFontSize)];
        }
        break;
      case 'select':
        const commonUnit = getCommonSizeUnit(fontSizes);
        if (commonUnit) {
          return `(${commonUnit})`;
        }
        break;
    }
    return '';
  }, [currentPickerType, selectedFontSize, fontSizes]);
  if (fontSizes.length === 0 && disableCustomFontSizes) {
    return null;
  }

  // If neither the value or first font size is a string, then FontSizePicker
  // operates in a legacy "unitless" mode where UnitControl can only be used
  // to select px values and onChange() is always called with number values.
  const hasUnits = typeof value === 'string' || typeof fontSizes[0]?.size === 'string';
  const [valueQuantity, valueUnit] = parseQuantityAndUnitFromRawValue(value, units);
  const isValueUnitRelative = !!valueUnit && ['em', 'rem', 'vw', 'vh'].includes(valueUnit);
  const isDisabled = value === undefined;
  return /*#__PURE__*/_jsxs(Container, {
    ref: ref,
    className: "components-font-size-picker",
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      as: "legend",
      children: __('Font size')
    }), /*#__PURE__*/_jsx(Spacer, {
      children: /*#__PURE__*/_jsxs(Header, {
        className: "components-font-size-picker__header",
        children: [/*#__PURE__*/_jsxs(HeaderLabel, {
          "aria-label": `${__('Size')} ${headerHint || ''}`,
          children: [__('Size'), headerHint && /*#__PURE__*/_jsx(HeaderHint, {
            className: "components-font-size-picker__header__hint",
            children: headerHint
          })]
        }), !disableCustomFontSizes && /*#__PURE__*/_jsx(HeaderToggle, {
          label: currentPickerType === 'custom' ? __('Use size preset') : __('Set custom size'),
          icon: settings,
          onClick: () => setUserRequestedCustom(!userRequestedCustom),
          isPressed: currentPickerType === 'custom',
          size: "small"
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      children: [currentPickerType === 'select' && /*#__PURE__*/_jsx(FontSizePickerSelect, {
        __next40pxDefaultSize: __next40pxDefaultSize,
        fontSizes: fontSizes,
        value: value,
        disableCustomFontSizes: disableCustomFontSizes,
        size: size,
        onChange: newValue => {
          if (newValue === undefined) {
            onChange?.(undefined);
          } else {
            onChange?.(hasUnits ? newValue : Number(newValue), fontSizes.find(fontSize => fontSize.size === newValue));
          }
        },
        onSelectCustom: () => setUserRequestedCustom(true)
      }), currentPickerType === 'togglegroup' && /*#__PURE__*/_jsx(FontSizePickerToggleGroup, {
        fontSizes: fontSizes,
        value: value,
        __next40pxDefaultSize: __next40pxDefaultSize,
        size: size,
        onChange: newValue => {
          if (newValue === undefined) {
            onChange?.(undefined);
          } else {
            onChange?.(hasUnits ? newValue : Number(newValue), fontSizes.find(fontSize => fontSize.size === newValue));
          }
        }
      }), currentPickerType === 'custom' && /*#__PURE__*/_jsxs(Flex, {
        className: "components-font-size-picker__custom-size-control",
        children: [/*#__PURE__*/_jsx(FlexItem, {
          isBlock: true,
          children: /*#__PURE__*/_jsx(UnitControl, {
            __next40pxDefaultSize: __next40pxDefaultSize,
            label: __('Custom'),
            labelPosition: "top",
            hideLabelFromVision: true,
            value: value,
            onChange: newValue => {
              setUserRequestedCustom(true);
              if (newValue === undefined) {
                onChange?.(undefined);
              } else {
                onChange?.(hasUnits ? newValue : parseInt(newValue, 10));
              }
            },
            size: size,
            units: hasUnits ? units : [],
            min: 0
          })
        }), withSlider && /*#__PURE__*/_jsx(FlexItem, {
          isBlock: true,
          children: /*#__PURE__*/_jsx(Spacer, {
            marginX: 2,
            marginBottom: 0,
            children: /*#__PURE__*/_jsx(RangeControl, {
              __nextHasNoMarginBottom: true,
              __next40pxDefaultSize: __next40pxDefaultSize,
              className: "components-font-size-picker__custom-input",
              label: __('Custom Size'),
              hideLabelFromVision: true,
              value: valueQuantity,
              initialPosition: fallbackFontSize,
              withInputField: false,
              onChange: newValue => {
                setUserRequestedCustom(true);
                if (newValue === undefined) {
                  onChange?.(undefined);
                } else if (hasUnits) {
                  onChange?.(newValue + (valueUnit !== null && valueUnit !== void 0 ? valueUnit : 'px'));
                } else {
                  onChange?.(newValue);
                }
              },
              min: 0,
              max: isValueUnitRelative ? 10 : 100,
              step: isValueUnitRelative ? 0.1 : 1
            })
          })
        }), withReset && /*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Button, {
            disabled: isDisabled,
            accessibleWhenDisabled: true,
            onClick: () => {
              onChange?.(undefined);
            },
            variant: "secondary",
            __next40pxDefaultSize: true,
            size: size === '__unstable-large' || props.__next40pxDefaultSize ? 'default' : 'small',
            children: __('Reset')
          })
        })]
      })]
    })]
  });
};
export const FontSizePicker = forwardRef(UnforwardedFontSizePicker);
export default FontSizePicker;
//# sourceMappingURL=index.js.map
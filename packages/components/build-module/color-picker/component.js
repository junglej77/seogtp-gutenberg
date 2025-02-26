/**
 * External dependencies
 */

import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

/**
 * WordPress dependencies
 */
import { useCallback, useState, useMemo } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useContextSystem, contextConnect } from '../context';
import { ColorfulWrapper, SelectControl, AuxiliaryColorArtefactWrapper, AuxiliaryColorArtefactHStackHeader, ColorInputWrapper } from './styles';
import { ColorCopyButton } from './color-copy-button';
import { ColorInput } from './color-input';
import { Picker } from './picker';
import { useControlledValue } from '../utils/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
extend([namesPlugin]);
const options = [{
  label: 'RGB',
  value: 'rgb'
}, {
  label: 'HSL',
  value: 'hsl'
}, {
  label: 'Hex',
  value: 'hex'
}];
const UnconnectedColorPicker = (props, forwardedRef) => {
  const {
    enableAlpha = false,
    color: colorProp,
    onChange,
    defaultValue = '#fff',
    copyFormat,
    ...divProps
  } = useContextSystem(props, 'ColorPicker');

  // Use a safe default value for the color and remove the possibility of `undefined`.
  const [color, setColor] = useControlledValue({
    onChange,
    value: colorProp,
    defaultValue
  });
  const safeColordColor = useMemo(() => {
    return colord(color || '');
  }, [color]);
  const debouncedSetColor = useDebounce(setColor);
  const handleChange = useCallback(nextValue => {
    debouncedSetColor(nextValue.toHex());
  }, [debouncedSetColor]);
  const [colorType, setColorType] = useState(copyFormat || 'hex');
  return /*#__PURE__*/_jsxs(ColorfulWrapper, {
    ref: forwardedRef,
    ...divProps,
    children: [/*#__PURE__*/_jsx(Picker, {
      onChange: handleChange,
      color: safeColordColor,
      enableAlpha: enableAlpha
    }), /*#__PURE__*/_jsxs(AuxiliaryColorArtefactWrapper, {
      children: [/*#__PURE__*/_jsxs(AuxiliaryColorArtefactHStackHeader, {
        justify: "space-between",
        children: [/*#__PURE__*/_jsx(SelectControl, {
          __nextHasNoMarginBottom: true,
          options: options,
          value: colorType,
          onChange: nextColorType => setColorType(nextColorType),
          label: __('Color format'),
          hideLabelFromVision: true,
          variant: "minimal"
        }), /*#__PURE__*/_jsx(ColorCopyButton, {
          color: safeColordColor,
          colorType: copyFormat || colorType
        })]
      }), /*#__PURE__*/_jsx(ColorInputWrapper, {
        direction: "column",
        gap: 2,
        children: /*#__PURE__*/_jsx(ColorInput, {
          colorType: colorType,
          color: safeColordColor,
          onChange: handleChange,
          enableAlpha: enableAlpha
        })
      })]
    })]
  });
};
export const ColorPicker = contextConnect(UnconnectedColorPicker, 'ColorPicker');
export default ColorPicker;
//# sourceMappingURL=component.js.map
/**
 * Internal dependencies
 */
import { HStack } from '../h-stack';
import { Text } from '../text';
import { RangeControl, NumberControlWrapper } from './styles';
import { COLORS } from '../utils/colors-values';
import InputControlPrefixWrapper from '../input-control/input-prefix-wrapper';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const InputWithSlider = ({
  min,
  max,
  label,
  abbreviation,
  onChange,
  value
}) => {
  const onNumberControlChange = newValue => {
    if (!newValue) {
      onChange(0);
      return;
    }
    if (typeof newValue === 'string') {
      onChange(parseInt(newValue, 10));
      return;
    }
    onChange(newValue);
  };
  return /*#__PURE__*/_jsxs(HStack, {
    spacing: 4,
    children: [/*#__PURE__*/_jsx(NumberControlWrapper, {
      min: min,
      max: max,
      label: label,
      hideLabelFromVision: true,
      value: value,
      onChange: onNumberControlChange,
      prefix: /*#__PURE__*/_jsx(InputControlPrefixWrapper, {
        children: /*#__PURE__*/_jsx(Text, {
          color: COLORS.theme.accent,
          lineHeight: 1,
          children: abbreviation
        })
      }),
      spinControls: "none",
      size: "__unstable-large"
    }), /*#__PURE__*/_jsx(RangeControl, {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: label,
      hideLabelFromVision: true,
      min: min,
      max: max,
      value: value
      // @ts-expect-error
      // See: https://github.com/WordPress/gutenberg/pull/40535#issuecomment-1172418185
      ,
      onChange: onChange,
      withInputField: false
    })]
  });
};
//# sourceMappingURL=input-with-slider.js.map
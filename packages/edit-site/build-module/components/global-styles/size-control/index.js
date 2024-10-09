/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { BaseControl, RangeControl, Flex, FlexItem, useBaseControlProps, __experimentalUseCustomUnits as useCustomUnits, __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue, __experimentalUnitControl as UnitControl, __experimentalSpacer as Spacer } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_UNITS = ['px', 'em', 'rem', 'vw', 'vh'];
function SizeControl({
  // Do not allow manipulation of margin bottom
  __nextHasNoMarginBottom,
  ...props
}) {
  const {
    baseControlProps
  } = useBaseControlProps(props);
  const {
    value,
    onChange,
    fallbackValue,
    disabled,
    label
  } = props;
  const units = useCustomUnits({
    availableUnits: DEFAULT_UNITS
  });
  const [valueQuantity, valueUnit = 'px'] = parseQuantityAndUnitFromRawValue(value, units);
  const isValueUnitRelative = !!valueUnit && ['em', 'rem', 'vw', 'vh'].includes(valueUnit);

  // Receives the new value from the UnitControl component as a string containing the value and unit.
  const handleUnitControlChange = newValue => {
    onChange(newValue);
  };

  // Receives the new value from the RangeControl component as a number.
  const handleRangeControlChange = newValue => {
    onChange?.(newValue + valueUnit);
  };
  return /*#__PURE__*/_jsx(BaseControl, {
    ...baseControlProps,
    __nextHasNoMarginBottom: true,
    children: /*#__PURE__*/_jsxs(Flex, {
      children: [/*#__PURE__*/_jsx(FlexItem, {
        isBlock: true,
        children: /*#__PURE__*/_jsx(UnitControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: label,
          hideLabelFromVision: true,
          value: value,
          onChange: handleUnitControlChange,
          units: units,
          min: 0,
          disabled: disabled
        })
      }), /*#__PURE__*/_jsx(FlexItem, {
        isBlock: true,
        children: /*#__PURE__*/_jsx(Spacer, {
          marginX: 2,
          marginBottom: 0,
          children: /*#__PURE__*/_jsx(RangeControl, {
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true,
            label: label,
            hideLabelFromVision: true,
            value: valueQuantity,
            initialPosition: fallbackValue,
            withInputField: false,
            onChange: handleRangeControlChange,
            min: 0,
            max: isValueUnitRelative ? 10 : 100,
            step: isValueUnitRelative ? 0.1 : 1,
            disabled: disabled
          })
        })
      })]
    })
  });
}
export default SizeControl;
//# sourceMappingURL=index.js.map
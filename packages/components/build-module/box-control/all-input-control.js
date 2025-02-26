/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { FlexedRangeControl, StyledUnitControl } from './styles/box-control-styles';
import { HStack } from '../h-stack';
import { parseQuantityAndUnitFromRawValue } from '../unit-control';
import { LABELS, applyValueToSides, getAllValue, isValuesMixed, isValuesDefined, CUSTOM_VALUE_SETTINGS } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};
export default function AllInputControl({
  __next40pxDefaultSize,
  onChange = noop,
  onFocus = noop,
  values,
  sides,
  selectedUnits,
  setSelectedUnits,
  ...props
}) {
  var _CUSTOM_VALUE_SETTING, _CUSTOM_VALUE_SETTING2;
  const inputId = useInstanceId(AllInputControl, 'box-control-input-all');
  const allValue = getAllValue(values, selectedUnits, sides);
  const hasValues = isValuesDefined(values);
  const isMixed = hasValues && isValuesMixed(values, selectedUnits, sides);
  const allPlaceholder = isMixed ? LABELS.mixed : undefined;
  const [parsedQuantity, parsedUnit] = parseQuantityAndUnitFromRawValue(allValue);
  const handleOnFocus = event => {
    onFocus(event, {
      side: 'all'
    });
  };
  const onValueChange = next => {
    const isNumeric = next !== undefined && !isNaN(parseFloat(next));
    const nextValue = isNumeric ? next : undefined;
    const nextValues = applyValueToSides(values, nextValue, sides);
    onChange(nextValues);
  };
  const sliderOnChange = next => {
    onValueChange(next !== undefined ? [next, parsedUnit].join('') : undefined);
  };

  // Set selected unit so it can be used as fallback by unlinked controls
  // when individual sides do not have a value containing a unit.
  const handleOnUnitChange = unit => {
    const newUnits = applyValueToSides(selectedUnits, unit, sides);
    setSelectedUnits(newUnits);
  };
  return /*#__PURE__*/_jsxs(HStack, {
    children: [/*#__PURE__*/_jsx(StyledUnitControl, {
      ...props,
      __next40pxDefaultSize: __next40pxDefaultSize,
      className: "component-box-control__unit-control",
      disableUnits: isMixed,
      id: inputId,
      isPressEnterToChange: true,
      value: allValue,
      onChange: onValueChange,
      onUnitChange: handleOnUnitChange,
      onFocus: handleOnFocus,
      placeholder: allPlaceholder,
      label: LABELS.all,
      hideLabelFromVision: true
    }), /*#__PURE__*/_jsx(FlexedRangeControl, {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: __next40pxDefaultSize,
      "aria-controls": inputId,
      label: LABELS.all,
      hideLabelFromVision: true,
      onChange: sliderOnChange,
      min: 0,
      max: (_CUSTOM_VALUE_SETTING = CUSTOM_VALUE_SETTINGS[parsedUnit !== null && parsedUnit !== void 0 ? parsedUnit : 'px']?.max) !== null && _CUSTOM_VALUE_SETTING !== void 0 ? _CUSTOM_VALUE_SETTING : 10,
      step: (_CUSTOM_VALUE_SETTING2 = CUSTOM_VALUE_SETTINGS[parsedUnit !== null && parsedUnit !== void 0 ? parsedUnit : 'px']?.step) !== null && _CUSTOM_VALUE_SETTING2 !== void 0 ? _CUSTOM_VALUE_SETTING2 : 0.1,
      value: parsedQuantity !== null && parsedQuantity !== void 0 ? parsedQuantity : 0,
      withInputField: false
    })]
  });
}
//# sourceMappingURL=all-input-control.js.map
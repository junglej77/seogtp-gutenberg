/**
 * Internal dependencies
 */
import SpacingInputControl from './spacing-input-control';
import { ALL_SIDES, LABELS, ICONS, getPresetValueFromCustomValue } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function SeparatedInputControls({
  minimumCustomValue,
  onChange,
  onMouseOut,
  onMouseOver,
  sides,
  spacingSizes,
  type,
  values
}) {
  // Filter sides if custom configuration provided, maintaining default order.
  const filteredSides = sides?.length ? ALL_SIDES.filter(side => sides.includes(side)) : ALL_SIDES;
  const createHandleOnChange = side => next => {
    // Encode the existing value into the preset value if the passed in value matches the value of one of the spacingSizes.
    const nextValues = {
      ...Object.keys(values).reduce((acc, key) => {
        acc[key] = getPresetValueFromCustomValue(values[key], spacingSizes);
        return acc;
      }, {})
    };
    nextValues[side] = next;
    onChange(nextValues);
  };
  return /*#__PURE__*/_jsx(_Fragment, {
    children: filteredSides.map(side => {
      return /*#__PURE__*/_jsx(SpacingInputControl, {
        icon: ICONS[side],
        label: LABELS[side],
        minimumCustomValue: minimumCustomValue,
        onChange: createHandleOnChange(side),
        onMouseOut: onMouseOut,
        onMouseOver: onMouseOver,
        side: side,
        spacingSizes: spacingSizes,
        type: type,
        value: values[side],
        withInputField: false
      }, `spacing-sizes-control-${side}`);
    })
  });
}
//# sourceMappingURL=separated.js.map
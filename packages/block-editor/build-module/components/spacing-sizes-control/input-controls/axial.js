/**
 * Internal dependencies
 */
import SpacingInputControl from './spacing-input-control';
import { LABELS, ICONS, getPresetValueFromCustomValue, hasAxisSupport } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const groupedSides = ['vertical', 'horizontal'];
export default function AxialInputControls({
  minimumCustomValue,
  onChange,
  onMouseOut,
  onMouseOver,
  sides,
  spacingSizes,
  type,
  values
}) {
  const createHandleOnChange = side => next => {
    if (!onChange) {
      return;
    }

    // Encode the existing value into the preset value if the passed in value matches the value of one of the spacingSizes.
    const nextValues = {
      ...Object.keys(values).reduce((acc, key) => {
        acc[key] = getPresetValueFromCustomValue(values[key], spacingSizes);
        return acc;
      }, {})
    };
    if (side === 'vertical') {
      nextValues.top = next;
      nextValues.bottom = next;
    }
    if (side === 'horizontal') {
      nextValues.left = next;
      nextValues.right = next;
    }
    onChange(nextValues);
  };

  // Filter sides if custom configuration provided, maintaining default order.
  const filteredSides = sides?.length ? groupedSides.filter(side => hasAxisSupport(sides, side)) : groupedSides;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: filteredSides.map(side => {
      const axisValue = side === 'vertical' ? values.top : values.left;
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
        value: axisValue,
        withInputField: false
      }, `spacing-sizes-control-${side}`);
    })
  });
}
//# sourceMappingURL=axial.js.map
/**
 * Internal dependencies
 */
import SpacingInputControl from './spacing-input-control';
import { LABELS, getPresetValueFromCustomValue } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
export default function SingleInputControl({
  minimumCustomValue,
  onChange,
  onMouseOut,
  onMouseOver,
  showSideInLabel,
  side,
  spacingSizes,
  type,
  values
}) {
  const createHandleOnChange = currentSide => next => {
    // Encode the existing value into the preset value if the passed in value matches the value of one of the spacingSizes.
    const nextValues = {
      ...Object.keys(values).reduce((acc, key) => {
        acc[key] = getPresetValueFromCustomValue(values[key], spacingSizes);
        return acc;
      }, {})
    };
    nextValues[currentSide] = next;
    onChange(nextValues);
  };
  return /*#__PURE__*/_jsx(SpacingInputControl, {
    label: LABELS[side],
    minimumCustomValue: minimumCustomValue,
    onChange: createHandleOnChange(side),
    onMouseOut: onMouseOut,
    onMouseOver: onMouseOver,
    showSideInLabel: showSideInLabel,
    side: side,
    spacingSizes: spacingSizes,
    type: type,
    value: values[side],
    withInputField: false
  });
}
//# sourceMappingURL=single.js.map
/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';
/**
 * Internal dependencies
 */
import RangeCell from '../mobile/bottom-sheet/range-cell';
import StepperCell from '../mobile/bottom-sheet/stepper-cell';
import { jsx as _jsx } from "react/jsx-runtime";
const RangeControl = memo(({
  className,
  currentInput,
  label,
  value,
  instanceId,
  onChange,
  beforeIcon,
  afterIcon,
  help,
  allowReset,
  initialPosition,
  min,
  max,
  type,
  separatorType,
  disabled,
  ...props
}) => {
  if (type === 'stepper') {
    return /*#__PURE__*/_jsx(StepperCell, {
      label: label,
      max: max,
      min: min,
      onChange: onChange,
      separatorType: separatorType,
      value: value,
      disabled: disabled
    });
  }
  const id = `inspector-range-control-${instanceId}`;
  const currentInputValue = currentInput === null ? value : currentInput;
  const initialSliderValue = isFinite(currentInputValue) ? currentInputValue : initialPosition;
  return /*#__PURE__*/_jsx(RangeCell, {
    label: label,
    id: id,
    help: help,
    className: className,
    onChange: onChange,
    "aria-describedby": !!help ? `${id}__help` : undefined,
    minimumValue: min,
    maximumValue: max,
    value: value,
    beforeIcon: beforeIcon,
    afterIcon: afterIcon,
    allowReset: allowReset,
    defaultValue: initialSliderValue,
    separatorType: separatorType,
    disabled: disabled,
    ...props
  });
});
export default RangeControl;
//# sourceMappingURL=index.native.js.map
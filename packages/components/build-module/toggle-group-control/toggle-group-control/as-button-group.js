/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { forwardRef, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { View } from '../../view';
import { useControlledValue } from '../../utils';
import ToggleGroupControlContext from '../context';
import { useComputeControlledOrUncontrolledValue } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedToggleGroupControlAsButtonGroup({
  children,
  isAdaptiveWidth,
  label,
  onChange,
  size,
  value: valueProp,
  id: idProp,
  ...otherProps
}, forwardedRef) {
  const generatedId = useInstanceId(ToggleGroupControlAsButtonGroup, 'toggle-group-control-as-button-group');
  const baseId = idProp || generatedId;

  // Use a heuristic to understand if the component is being used in controlled
  // or uncontrolled mode, and consequently:
  // - when controlled, convert `undefined` values to `''` (ie. "no value")
  // - use the `value` prop as the `defaultValue` when uncontrolled
  const {
    value,
    defaultValue
  } = useComputeControlledOrUncontrolledValue(valueProp);
  const [selectedValue, setSelectedValue] = useControlledValue({
    defaultValue,
    value,
    onChange
  });
  const groupContextValue = useMemo(() => ({
    baseId,
    value: selectedValue,
    setValue: setSelectedValue,
    isBlock: !isAdaptiveWidth,
    isDeselectable: true,
    size
  }), [baseId, selectedValue, setSelectedValue, isAdaptiveWidth, size]);
  return /*#__PURE__*/_jsx(ToggleGroupControlContext.Provider, {
    value: groupContextValue,
    children: /*#__PURE__*/_jsx(View, {
      "aria-label": label,
      ...otherProps,
      ref: forwardedRef,
      role: "group",
      children: children
    })
  });
}
export const ToggleGroupControlAsButtonGroup = forwardRef(UnforwardedToggleGroupControlAsButtonGroup);
//# sourceMappingURL=as-button-group.js.map
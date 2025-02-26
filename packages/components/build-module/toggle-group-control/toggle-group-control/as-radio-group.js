/**
 * External dependencies
 */

import * as Ariakit from '@ariakit/react';
import { useStoreState } from '@ariakit/react';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { forwardRef, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { View } from '../../view';
import ToggleGroupControlContext from '../context';
import { useComputeControlledOrUncontrolledValue } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedToggleGroupControlAsRadioGroup({
  children,
  isAdaptiveWidth,
  label,
  onChange: onChangeProp,
  size,
  value: valueProp,
  id: idProp,
  ...otherProps
}, forwardedRef) {
  const generatedId = useInstanceId(ToggleGroupControlAsRadioGroup, 'toggle-group-control-as-radio-group');
  const baseId = idProp || generatedId;

  // Use a heuristic to understand if the component is being used in controlled
  // or uncontrolled mode, and consequently:
  // - when controlled, convert `undefined` values to `''` (ie. "no value")
  // - use the `value` prop as the `defaultValue` when uncontrolled
  const {
    value,
    defaultValue
  } = useComputeControlledOrUncontrolledValue(valueProp);

  // `useRadioStore`'s `setValue` prop can be called with `null`, while
  // the component's `onChange` prop only expects `undefined`
  const wrappedOnChangeProp = onChangeProp ? v => {
    onChangeProp(v !== null && v !== void 0 ? v : undefined);
  } : undefined;
  const radio = Ariakit.useRadioStore({
    defaultValue,
    value,
    setValue: wrappedOnChangeProp
  });
  const selectedValue = useStoreState(radio, 'value');
  const setValue = radio.setValue;
  const groupContextValue = useMemo(() => ({
    baseId,
    isBlock: !isAdaptiveWidth,
    size,
    value: selectedValue,
    setValue
  }), [baseId, isAdaptiveWidth, size, selectedValue, setValue]);
  return /*#__PURE__*/_jsx(ToggleGroupControlContext.Provider, {
    value: groupContextValue,
    children: /*#__PURE__*/_jsx(Ariakit.RadioGroup, {
      store: radio,
      "aria-label": label,
      render: /*#__PURE__*/_jsx(View, {}),
      ...otherProps,
      id: baseId,
      ref: forwardedRef,
      children: children
    })
  });
}
export const ToggleGroupControlAsRadioGroup = forwardRef(UnforwardedToggleGroupControlAsRadioGroup);
//# sourceMappingURL=as-radio-group.js.map
/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';

/**
 * WordPress dependencies
 */
import { useMemo, forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ButtonGroup from '../button-group';
import { RadioGroupContext } from './context';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedRadioGroup({
  label,
  checked,
  defaultChecked,
  disabled,
  onChange,
  children,
  ...props
}, ref) {
  const radioStore = Ariakit.useRadioStore({
    value: checked,
    defaultValue: defaultChecked,
    setValue: newValue => {
      onChange?.(newValue !== null && newValue !== void 0 ? newValue : undefined);
    }
  });
  const contextValue = useMemo(() => ({
    store: radioStore,
    disabled
  }), [radioStore, disabled]);
  return /*#__PURE__*/_jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(Ariakit.RadioGroup, {
      store: radioStore,
      render: /*#__PURE__*/_jsx(ButtonGroup, {
        children: children
      }),
      "aria-label": label,
      ref: ref,
      ...props
    })
  });
}

/**
 * @deprecated Use `RadioControl` or `ToggleGroupControl` instead.
 */
export const RadioGroup = forwardRef(UnforwardedRadioGroup);
export default RadioGroup;
//# sourceMappingURL=index.js.map
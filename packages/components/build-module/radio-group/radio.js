/**
 * WordPress dependencies
 */
import { forwardRef, useContext } from '@wordpress/element';

/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';
import { useStoreState } from '@ariakit/react';

/**
 * Internal dependencies
 */
import Button from '../button';
import { RadioGroupContext } from './context';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedRadio({
  value,
  children,
  ...props
}, ref) {
  const {
    store,
    disabled
  } = useContext(RadioGroupContext);
  const selectedValue = useStoreState(store, 'value');
  const isChecked = selectedValue !== undefined && selectedValue === value;
  return /*#__PURE__*/_jsx(Ariakit.Radio, {
    disabled: disabled,
    store: store,
    ref: ref,
    value: value,
    render: /*#__PURE__*/_jsx(Button, {
      variant: isChecked ? 'primary' : 'secondary',
      ...props
    }),
    children: children || value
  });
}

/**
 * @deprecated Use `RadioControl` or `ToggleGroupControl` instead.
 */
export const Radio = forwardRef(UnforwardedRadio);
export default Radio;
//# sourceMappingURL=radio.js.map
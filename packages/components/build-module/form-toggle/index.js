/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const noop = () => {};
function UnforwardedFormToggle(props, ref) {
  const {
    className,
    checked,
    id,
    disabled,
    onChange = noop,
    ...additionalProps
  } = props;
  const wrapperClasses = clsx('components-form-toggle', className, {
    'is-checked': checked,
    'is-disabled': disabled
  });
  return /*#__PURE__*/_jsxs("span", {
    className: wrapperClasses,
    children: [/*#__PURE__*/_jsx("input", {
      className: "components-form-toggle__input",
      id: id,
      type: "checkbox",
      checked: checked,
      onChange: onChange,
      disabled: disabled,
      ...additionalProps,
      ref: ref
    }), /*#__PURE__*/_jsx("span", {
      className: "components-form-toggle__track"
    }), /*#__PURE__*/_jsx("span", {
      className: "components-form-toggle__thumb"
    })]
  });
}

/**
 * FormToggle switches a single setting on or off.
 *
 * ```jsx
 * import { FormToggle } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyFormToggle = () => {
 *   const [ isChecked, setChecked ] = useState( true );
 *
 *   return (
 *     <FormToggle
 *       checked={ isChecked }
 *       onChange={ () => setChecked( ( state ) => ! state ) }
 *     />
 *   );
 * };
 * ```
 */
export const FormToggle = forwardRef(UnforwardedFormToggle);
export default FormToggle;
//# sourceMappingURL=index.js.map
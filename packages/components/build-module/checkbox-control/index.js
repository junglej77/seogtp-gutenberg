/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useInstanceId, useRefEffect } from '@wordpress/compose';
import deprecated from '@wordpress/deprecated';
import { Icon, check, reset } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BaseControl from '../base-control';
import { HStack } from '../h-stack';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Checkboxes allow the user to select one or more items from a set.
 *
 * ```jsx
 * import { CheckboxControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyCheckboxControl = () => {
 *   const [ isChecked, setChecked ] = useState( true );
 *   return (
 *     <CheckboxControl
 *       __nextHasNoMarginBottom
 *       label="Is author"
 *       help="Is the user a author or not?"
 *       checked={ isChecked }
 *       onChange={ setChecked }
 *     />
 *   );
 * };
 * ```
 */
export function CheckboxControl(props) {
  const {
    __nextHasNoMarginBottom,
    label,
    className,
    heading,
    checked,
    indeterminate,
    help,
    id: idProp,
    onChange,
    ...additionalProps
  } = props;
  if (heading) {
    deprecated('`heading` prop in `CheckboxControl`', {
      alternative: 'a separate element to implement a heading',
      since: '5.8'
    });
  }
  const [showCheckedIcon, setShowCheckedIcon] = useState(false);
  const [showIndeterminateIcon, setShowIndeterminateIcon] = useState(false);

  // Run the following callback every time the `ref` (and the additional
  // dependencies) change.
  const ref = useRefEffect(node => {
    if (!node) {
      return;
    }

    // It cannot be set using an HTML attribute.
    node.indeterminate = !!indeterminate;
    setShowCheckedIcon(node.matches(':checked'));
    setShowIndeterminateIcon(node.matches(':indeterminate'));
  }, [checked, indeterminate]);
  const id = useInstanceId(CheckboxControl, 'inspector-checkbox-control', idProp);
  const onChangeValue = event => onChange(event.target.checked);
  return /*#__PURE__*/_jsx(BaseControl, {
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    __associatedWPComponentName: "CheckboxControl",
    label: heading,
    id: id,
    help: help && /*#__PURE__*/_jsx("span", {
      className: "components-checkbox-control__help",
      children: help
    }),
    className: clsx('components-checkbox-control', className),
    children: /*#__PURE__*/_jsxs(HStack, {
      spacing: 0,
      justify: "start",
      alignment: "top",
      children: [/*#__PURE__*/_jsxs("span", {
        className: "components-checkbox-control__input-container",
        children: [/*#__PURE__*/_jsx("input", {
          ref: ref,
          id: id,
          className: "components-checkbox-control__input",
          type: "checkbox",
          value: "1",
          onChange: onChangeValue,
          checked: checked,
          "aria-describedby": !!help ? id + '__help' : undefined,
          ...additionalProps
        }), showIndeterminateIcon ? /*#__PURE__*/_jsx(Icon, {
          icon: reset,
          className: "components-checkbox-control__indeterminate",
          role: "presentation"
        }) : null, showCheckedIcon ? /*#__PURE__*/_jsx(Icon, {
          icon: check,
          className: "components-checkbox-control__checked",
          role: "presentation"
        }) : null]
      }), label && /*#__PURE__*/_jsx("label", {
        className: "components-checkbox-control__label",
        htmlFor: id,
        children: label
      })]
    })
  });
}
export default CheckboxControl;
//# sourceMappingURL=index.js.map
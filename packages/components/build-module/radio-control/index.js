/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BaseControl from '../base-control';
import { VStack } from '../v-stack';
import { StyledHelp } from '../base-control/styles/base-control-styles';
import { VisuallyHidden } from '../visually-hidden';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function generateOptionDescriptionId(radioGroupId, index) {
  return `${radioGroupId}-${index}-option-description`;
}
function generateOptionId(radioGroupId, index) {
  return `${radioGroupId}-${index}`;
}
function generateHelpId(radioGroupId) {
  return `${radioGroupId}__help`;
}

/**
 * Render a user interface to select the user type using radio inputs.
 *
 * ```jsx
 * import { RadioControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyRadioControl = () => {
 *   const [ option, setOption ] = useState( 'a' );
 *
 *   return (
 *     <RadioControl
 *       label="User type"
 *       help="The type of the current user"
 *       selected={ option }
 *       options={ [
 *         { label: 'Author', value: 'a' },
 *         { label: 'Editor', value: 'e' },
 *       ] }
 *       onChange={ ( value ) => setOption( value ) }
 *     />
 *   );
 * };
 * ```
 */
export function RadioControl(props) {
  const {
    label,
    className,
    selected,
    help,
    onChange,
    hideLabelFromVision,
    options = [],
    id: preferredId,
    ...additionalProps
  } = props;
  const id = useInstanceId(RadioControl, 'inspector-radio-control', preferredId);
  const onChangeValue = event => onChange(event.target.value);
  if (!options?.length) {
    return null;
  }
  return /*#__PURE__*/_jsxs("fieldset", {
    id: id,
    className: clsx(className, 'components-radio-control'),
    "aria-describedby": !!help ? generateHelpId(id) : undefined,
    children: [hideLabelFromVision ? /*#__PURE__*/_jsx(VisuallyHidden, {
      as: "legend",
      children: label
    }) : /*#__PURE__*/_jsx(BaseControl.VisualLabel, {
      as: "legend",
      children: label
    }), /*#__PURE__*/_jsx(VStack, {
      spacing: 3,
      className: clsx('components-radio-control__group-wrapper', {
        'has-help': !!help
      }),
      children: options.map((option, index) => /*#__PURE__*/_jsxs("div", {
        className: "components-radio-control__option",
        children: [/*#__PURE__*/_jsx("input", {
          id: generateOptionId(id, index),
          className: "components-radio-control__input",
          type: "radio",
          name: id,
          value: option.value,
          onChange: onChangeValue,
          checked: option.value === selected,
          "aria-describedby": !!option.description ? generateOptionDescriptionId(id, index) : undefined,
          ...additionalProps
        }), /*#__PURE__*/_jsx("label", {
          className: "components-radio-control__label",
          htmlFor: generateOptionId(id, index),
          children: option.label
        }), !!option.description ? /*#__PURE__*/_jsx(StyledHelp, {
          __nextHasNoMarginBottom: true,
          id: generateOptionDescriptionId(id, index),
          className: "components-radio-control__option-description",
          children: option.description
        }) : null]
      }, generateOptionId(id, index)))
    }), !!help && /*#__PURE__*/_jsx(StyledHelp, {
      __nextHasNoMarginBottom: true,
      id: generateHelpId(id),
      className: "components-base-control__help",
      children: help
    })]
  });
}
export default RadioControl;
//# sourceMappingURL=index.js.map
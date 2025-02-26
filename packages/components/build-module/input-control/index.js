/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import InputBase from './input-base';
import InputField from './input-field';
import { space } from '../utils/space';
import { useDraft } from './utils';
import BaseControl from '../base-control';
import { useDeprecated36pxDefaultSizeProp } from '../utils/use-deprecated-props';
import { jsx as _jsx } from "react/jsx-runtime";
const noop = () => {};
function useUniqueId(idProp) {
  const instanceId = useInstanceId(InputControl);
  const id = `inspector-input-control-${instanceId}`;
  return idProp || id;
}
export function UnforwardedInputControl(props, ref) {
  const {
    __next40pxDefaultSize,
    __unstableStateReducer: stateReducer = state => state,
    __unstableInputWidth,
    className,
    disabled = false,
    help,
    hideLabelFromVision = false,
    id: idProp,
    isPressEnterToChange = false,
    label,
    labelPosition = 'top',
    onChange = noop,
    onValidate = noop,
    onKeyDown = noop,
    prefix,
    size = 'default',
    style,
    suffix,
    value,
    ...restProps
  } = useDeprecated36pxDefaultSizeProp(props);
  const id = useUniqueId(idProp);
  const classes = clsx('components-input-control', className);
  const draftHookProps = useDraft({
    value,
    onBlur: restProps.onBlur,
    onChange
  });
  const helpProp = !!help ? {
    'aria-describedby': `${id}__help`
  } : {};
  return /*#__PURE__*/_jsx(BaseControl, {
    className: classes,
    help: help,
    id: id,
    __nextHasNoMarginBottom: true,
    children: /*#__PURE__*/_jsx(InputBase, {
      __next40pxDefaultSize: __next40pxDefaultSize,
      __unstableInputWidth: __unstableInputWidth,
      disabled: disabled,
      gap: 3,
      hideLabelFromVision: hideLabelFromVision,
      id: id,
      justify: "left",
      label: label,
      labelPosition: labelPosition,
      prefix: prefix,
      size: size,
      style: style,
      suffix: suffix,
      children: /*#__PURE__*/_jsx(InputField, {
        ...restProps,
        ...helpProp,
        __next40pxDefaultSize: __next40pxDefaultSize,
        className: "components-input-control__input",
        disabled: disabled,
        id: id,
        isPressEnterToChange: isPressEnterToChange,
        onKeyDown: onKeyDown,
        onValidate: onValidate,
        paddingInlineStart: prefix ? space(1) : undefined,
        paddingInlineEnd: suffix ? space(1) : undefined,
        ref: ref,
        size: size,
        stateReducer: stateReducer,
        ...draftHookProps
      })
    })
  });
}

/**
 * InputControl components let users enter and edit text. This is an experimental component
 * intended to (in time) merge with or replace `TextControl`.
 *
 * ```jsx
 * import { __experimentalInputControl as InputControl } from '@wordpress/components';
 * import { useState } from 'react';
 *
 * const Example = () => {
 *   const [ value, setValue ] = useState( '' );
 *
 *   return (
 *  	<InputControl
 *  		value={ value }
 *  		onChange={ ( nextValue ) => setValue( nextValue ?? '' ) }
 *  	/>
 *   );
 * };
 * ```
 */
export const InputControl = forwardRef(UnforwardedInputControl);
export default InputControl;
//# sourceMappingURL=index.js.map
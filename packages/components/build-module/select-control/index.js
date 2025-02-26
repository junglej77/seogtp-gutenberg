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
import BaseControl from '../base-control';
import { Select, StyledInputBase } from './styles/select-control-styles';
import SelectControlChevronDown from './chevron-down';
import { useDeprecated36pxDefaultSizeProp } from '../utils/use-deprecated-props';
import { jsx as _jsx } from "react/jsx-runtime";
function useUniqueId(idProp) {
  const instanceId = useInstanceId(SelectControl);
  const id = `inspector-select-control-${instanceId}`;
  return idProp || id;
}
function SelectOptions({
  options
}) {
  return options.map(({
    id,
    label,
    value,
    ...optionProps
  }, index) => {
    const key = id || `${label}-${value}-${index}`;
    return /*#__PURE__*/_jsx("option", {
      value: value,
      ...optionProps,
      children: label
    }, key);
  });
}
function UnforwardedSelectControl(props, ref) {
  const {
    className,
    disabled = false,
    help,
    hideLabelFromVision,
    id: idProp,
    label,
    multiple = false,
    onChange,
    options = [],
    size = 'default',
    value: valueProp,
    labelPosition = 'top',
    children,
    prefix,
    suffix,
    variant = 'default',
    __next40pxDefaultSize = false,
    __nextHasNoMarginBottom = false,
    ...restProps
  } = useDeprecated36pxDefaultSizeProp(props);
  const id = useUniqueId(idProp);
  const helpId = help ? `${id}__help` : undefined;

  // Disable reason: A select with an onchange throws a warning.
  if (!options?.length && !children) {
    return null;
  }
  const handleOnChange = event => {
    if (props.multiple) {
      const selectedOptions = Array.from(event.target.options).filter(({
        selected
      }) => selected);
      const newValues = selectedOptions.map(({
        value
      }) => value);
      props.onChange?.(newValues, {
        event
      });
      return;
    }
    props.onChange?.(event.target.value, {
      event
    });
  };
  const classes = clsx('components-select-control', className);
  return /*#__PURE__*/_jsx(BaseControl, {
    help: help,
    id: id,
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    __associatedWPComponentName: "SelectControl",
    children: /*#__PURE__*/_jsx(StyledInputBase, {
      className: classes,
      disabled: disabled,
      hideLabelFromVision: hideLabelFromVision,
      id: id,
      isBorderless: variant === 'minimal',
      label: label,
      size: size,
      suffix: suffix || !multiple && /*#__PURE__*/_jsx(SelectControlChevronDown, {}),
      prefix: prefix,
      labelPosition: labelPosition,
      __unstableInputWidth: variant === 'minimal' ? 'auto' : undefined,
      variant: variant,
      __next40pxDefaultSize: __next40pxDefaultSize,
      children: /*#__PURE__*/_jsx(Select, {
        ...restProps,
        __next40pxDefaultSize: __next40pxDefaultSize,
        "aria-describedby": helpId,
        className: "components-select-control__input",
        disabled: disabled,
        id: id,
        multiple: multiple,
        onChange: handleOnChange,
        ref: ref,
        selectSize: size,
        value: valueProp,
        variant: variant,
        children: children || /*#__PURE__*/_jsx(SelectOptions, {
          options: options
        })
      })
    })
  });
}

/**
 * `SelectControl` allows users to select from a single or multiple option menu.
 * It functions as a wrapper around the browser's native `<select>` element.
 *
 * ```jsx
 * import { SelectControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MySelectControl = () => {
 *   const [ size, setSize ] = useState( '50%' );
 *
 *   return (
 *     <SelectControl
 *       __nextHasNoMarginBottom
 *       label="Size"
 *       value={ size }
 *       options={ [
 *         { label: 'Big', value: '100%' },
 *         { label: 'Medium', value: '50%' },
 *         { label: 'Small', value: '25%' },
 *       ] }
 *       onChange={ setSize }
 *     />
 *   );
 * };
 * ```
 */
export const SelectControl = forwardRef(UnforwardedSelectControl);
export default SelectControl;
//# sourceMappingURL=index.js.map
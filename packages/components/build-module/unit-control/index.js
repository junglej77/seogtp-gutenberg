/**
 * External dependencies
 */

import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';
import { forwardRef, useMemo, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import { ValueInput } from './styles/unit-control-styles';
import UnitSelectControl from './unit-select-control';
import { CSS_UNITS, getParsedQuantityAndUnit, getUnitsWithCurrentUnit, getValidParsedQuantityAndUnit } from './utils';
import { useControlledState } from '../utils/hooks';
import { escapeRegExp } from '../utils/strings';
import { useDeprecated36pxDefaultSizeProp } from '../utils/use-deprecated-props';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedUnitControl(unitControlProps, forwardedRef) {
  const {
    __unstableStateReducer,
    autoComplete = 'off',
    // @ts-expect-error Ensure that children is omitted from restProps
    children,
    className,
    disabled = false,
    disableUnits = false,
    isPressEnterToChange = false,
    isResetValueOnUnitChange = false,
    isUnitSelectTabbable = true,
    label,
    onChange: onChangeProp,
    onUnitChange,
    size = 'default',
    unit: unitProp,
    units: unitsProp = CSS_UNITS,
    value: valueProp,
    onFocus: onFocusProp,
    ...props
  } = useDeprecated36pxDefaultSizeProp(unitControlProps);
  if ('unit' in unitControlProps) {
    deprecated('UnitControl unit prop', {
      since: '5.6',
      hint: 'The unit should be provided within the `value` prop.',
      version: '6.2'
    });
  }

  // The `value` prop, in theory, should not be `null`, but the following line
  // ensures it fallback to `undefined` in case a consumer of `UnitControl`
  // still passes `null` as a `value`.
  const nonNullValueProp = valueProp !== null && valueProp !== void 0 ? valueProp : undefined;
  const [units, reFirstCharacterOfUnits] = useMemo(() => {
    const list = getUnitsWithCurrentUnit(nonNullValueProp, unitProp, unitsProp);
    const [{
      value: firstUnitValue = ''
    } = {}, ...rest] = list;
    const firstCharacters = rest.reduce((carry, {
      value
    }) => {
      const first = escapeRegExp(value?.substring(0, 1) || '');
      return carry.includes(first) ? carry : `${carry}|${first}`;
    }, escapeRegExp(firstUnitValue.substring(0, 1)));
    return [list, new RegExp(`^(?:${firstCharacters})$`, 'i')];
  }, [nonNullValueProp, unitProp, unitsProp]);
  const [parsedQuantity, parsedUnit] = getParsedQuantityAndUnit(nonNullValueProp, unitProp, units);
  const [unit, setUnit] = useControlledState(units.length === 1 ? units[0].value : unitProp, {
    initial: parsedUnit,
    fallback: ''
  });
  useEffect(() => {
    if (parsedUnit !== undefined) {
      setUnit(parsedUnit);
    }
  }, [parsedUnit, setUnit]);
  const classes = clsx('components-unit-control',
  // This class is added for legacy purposes to maintain it on the outer
  // wrapper. See: https://github.com/WordPress/gutenberg/pull/45139
  'components-unit-control-wrapper', className);
  const handleOnQuantityChange = (nextQuantityValue, changeProps) => {
    if (nextQuantityValue === '' || typeof nextQuantityValue === 'undefined' || nextQuantityValue === null) {
      onChangeProp?.('', changeProps);
      return;
    }

    /*
     * Customizing the onChange callback.
     * This allows as to broadcast a combined value+unit to onChange.
     */
    const onChangeValue = getValidParsedQuantityAndUnit(nextQuantityValue, units, parsedQuantity, unit).join('');
    onChangeProp?.(onChangeValue, changeProps);
  };
  const handleOnUnitChange = (nextUnitValue, changeProps) => {
    const {
      data
    } = changeProps;
    let nextValue = `${parsedQuantity !== null && parsedQuantity !== void 0 ? parsedQuantity : ''}${nextUnitValue}`;
    if (isResetValueOnUnitChange && data?.default !== undefined) {
      nextValue = `${data.default}${nextUnitValue}`;
    }
    onChangeProp?.(nextValue, changeProps);
    onUnitChange?.(nextUnitValue, changeProps);
    setUnit(nextUnitValue);
  };
  let handleOnKeyDown;
  if (!disableUnits && isUnitSelectTabbable && units.length) {
    handleOnKeyDown = event => {
      props.onKeyDown?.(event);
      // Unless the meta or ctrl key was pressed (to avoid interfering with
      // shortcuts, e.g. pastes), move focus to the unit select if a key
      // matches the first character of a unit.
      if (!event.metaKey && !event.ctrlKey && reFirstCharacterOfUnits.test(event.key)) {
        refInputSuffix.current?.focus();
      }
    };
  }
  const refInputSuffix = useRef(null);
  const inputSuffix = !disableUnits ? /*#__PURE__*/_jsx(UnitSelectControl, {
    ref: refInputSuffix,
    "aria-label": __('Select unit'),
    disabled: disabled,
    isUnitSelectTabbable: isUnitSelectTabbable,
    onChange: handleOnUnitChange,
    size: ['small', 'compact'].includes(size) || size === 'default' && !props.__next40pxDefaultSize ? 'small' : 'default',
    unit: unit,
    units: units,
    onFocus: onFocusProp,
    onBlur: unitControlProps.onBlur
  }) : null;
  let step = props.step;

  /*
   * If no step prop has been passed, lookup the active unit and
   * try to get step from `units`, or default to a value of `1`
   */
  if (!step && units) {
    var _activeUnit$step;
    const activeUnit = units.find(option => option.value === unit);
    step = (_activeUnit$step = activeUnit?.step) !== null && _activeUnit$step !== void 0 ? _activeUnit$step : 1;
  }
  return /*#__PURE__*/_jsx(ValueInput, {
    ...props,
    autoComplete: autoComplete,
    className: classes,
    disabled: disabled,
    spinControls: "none",
    isPressEnterToChange: isPressEnterToChange,
    label: label,
    onKeyDown: handleOnKeyDown,
    onChange: handleOnQuantityChange,
    ref: forwardedRef,
    size: size,
    suffix: inputSuffix,
    type: isPressEnterToChange ? 'text' : 'number',
    value: parsedQuantity !== null && parsedQuantity !== void 0 ? parsedQuantity : '',
    step: step,
    onFocus: onFocusProp,
    __unstableStateReducer: __unstableStateReducer
  });
}

/**
 * `UnitControl` allows the user to set a numeric quantity as well as a unit (e.g. `px`).
 *
 *
 * ```jsx
 * import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const Example = () => {
 *   const [ value, setValue ] = useState( '10px' );
 *
 *   return <UnitControl onChange={ setValue } value={ value } />;
 * };
 * ```
 */
export const UnitControl = forwardRef(UnforwardedUnitControl);
export { parseQuantityAndUnitFromRawValue, useCustomUnits } from './utils';
export default UnitControl;
//# sourceMappingURL=index.js.map
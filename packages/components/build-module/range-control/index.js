/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { useRef, useState, forwardRef } from '@wordpress/element';
import { useInstanceId, useMergeRefs } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BaseControl from '../base-control';
import Button from '../button';
import Icon from '../icon';
import { COLORS } from '../utils';
import { floatClamp, useControlledRangeValue } from './utils';
import { clamp } from '../utils/math';
import InputRange from './input-range';
import RangeRail from './rail';
import SimpleTooltip from './tooltip';
import { ActionRightWrapper, AfterIconWrapper, BeforeIconWrapper, InputNumber, Root, Track, ThumbWrapper, Thumb, Wrapper } from './styles/range-control-styles';
import { space } from '../utils/space';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};

/**
 * Computes the value that `RangeControl` should reset to when pressing
 * the reset button.
 */
function computeResetValue({
  resetFallbackValue,
  initialPosition
}) {
  if (resetFallbackValue !== undefined) {
    return !Number.isNaN(resetFallbackValue) ? resetFallbackValue : null;
  }
  if (initialPosition !== undefined) {
    return !Number.isNaN(initialPosition) ? initialPosition : null;
  }
  return null;
}
function UnforwardedRangeControl(props, forwardedRef) {
  const {
    __nextHasNoMarginBottom = false,
    afterIcon,
    allowReset = false,
    beforeIcon,
    className,
    color: colorProp = COLORS.theme.accent,
    currentInput,
    disabled = false,
    help,
    hideLabelFromVision = false,
    initialPosition,
    isShiftStepEnabled = true,
    label,
    marks = false,
    max = 100,
    min = 0,
    onBlur = noop,
    onChange = noop,
    onFocus = noop,
    onMouseLeave = noop,
    onMouseMove = noop,
    railColor,
    renderTooltipContent = v => v,
    resetFallbackValue,
    __next40pxDefaultSize = false,
    shiftStep = 10,
    showTooltip: showTooltipProp,
    step = 1,
    trackColor,
    value: valueProp,
    withInputField = true,
    ...otherProps
  } = props;
  const [value, setValue] = useControlledRangeValue({
    min,
    max,
    value: valueProp !== null && valueProp !== void 0 ? valueProp : null,
    initial: initialPosition
  });
  const isResetPendent = useRef(false);
  let hasTooltip = showTooltipProp;
  let hasInputField = withInputField;
  if (step === 'any') {
    // The tooltip and number input field are hidden when the step is "any"
    // because the decimals get too lengthy to fit well.
    hasTooltip = false;
    hasInputField = false;
  }
  const [showTooltip, setShowTooltip] = useState(hasTooltip);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();
  const isCurrentlyFocused = inputRef.current?.matches(':focus');
  const isThumbFocused = !disabled && isFocused;
  const isValueReset = value === null;
  const currentValue = value !== undefined ? value : currentInput;
  const inputSliderValue = isValueReset ? '' : currentValue;
  const rangeFillValue = isValueReset ? (max - min) / 2 + min : value;
  const fillValue = isValueReset ? 50 : (value - min) / (max - min) * 100;
  const fillValueOffset = `${clamp(fillValue, 0, 100)}%`;
  const classes = clsx('components-range-control', className);
  const wrapperClasses = clsx('components-range-control__wrapper', !!marks && 'is-marked');
  const id = useInstanceId(UnforwardedRangeControl, 'inspector-range-control');
  const describedBy = !!help ? `${id}__help` : undefined;
  const enableTooltip = hasTooltip !== false && Number.isFinite(value);
  const handleOnRangeChange = event => {
    const nextValue = parseFloat(event.target.value);
    setValue(nextValue);
    onChange(nextValue);
  };
  const handleOnChange = next => {
    // @ts-expect-error TODO: Investigate if it's problematic for setValue() to
    // potentially receive a NaN when next is undefined.
    let nextValue = parseFloat(next);
    setValue(nextValue);

    /*
     * Calls onChange only when nextValue is numeric
     * otherwise may queue a reset for the blur event.
     */
    if (!isNaN(nextValue)) {
      if (nextValue < min || nextValue > max) {
        nextValue = floatClamp(nextValue, min, max);
      }
      onChange(nextValue);
      isResetPendent.current = false;
    } else if (allowReset) {
      isResetPendent.current = true;
    }
  };
  const handleOnInputNumberBlur = () => {
    if (isResetPendent.current) {
      handleOnReset();
      isResetPendent.current = false;
    }
  };
  const handleOnReset = () => {
    // Reset to `resetFallbackValue` if defined, otherwise set internal value
    // to `null` — which, if propagated to the `value` prop, will cause
    // the value to be reset to the `initialPosition` prop if defined.
    const resetValue = Number.isNaN(resetFallbackValue) ? null : resetFallbackValue !== null && resetFallbackValue !== void 0 ? resetFallbackValue : null;
    setValue(resetValue);

    /**
     * Previously, this callback would always receive undefined as
     * an argument. This behavior is unexpected, specifically
     * when resetFallbackValue is defined.
     *
     * The value of undefined is not ideal. Passing it through
     * to internal <input /> elements would change it from a
     * controlled component to an uncontrolled component.
     *
     * For now, to minimize unexpected regressions, we're going to
     * preserve the undefined callback argument, except when a
     * resetFallbackValue is defined.
     */
    onChange(resetValue !== null && resetValue !== void 0 ? resetValue : undefined);
  };
  const handleShowTooltip = () => setShowTooltip(true);
  const handleHideTooltip = () => setShowTooltip(false);
  const handleOnBlur = event => {
    onBlur(event);
    setIsFocused(false);
    handleHideTooltip();
  };
  const handleOnFocus = event => {
    onFocus(event);
    setIsFocused(true);
    handleShowTooltip();
  };
  const offsetStyle = {
    [isRTL() ? 'right' : 'left']: fillValueOffset
  };
  return /*#__PURE__*/_jsx(BaseControl, {
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    __associatedWPComponentName: "RangeControl",
    className: classes,
    label: label,
    hideLabelFromVision: hideLabelFromVision,
    id: `${id}`,
    help: help,
    children: /*#__PURE__*/_jsxs(Root, {
      className: "components-range-control__root",
      __next40pxDefaultSize: __next40pxDefaultSize,
      children: [beforeIcon && /*#__PURE__*/_jsx(BeforeIconWrapper, {
        children: /*#__PURE__*/_jsx(Icon, {
          icon: beforeIcon
        })
      }), /*#__PURE__*/_jsxs(Wrapper, {
        __nextHasNoMarginBottom: __nextHasNoMarginBottom,
        className: wrapperClasses,
        color: colorProp,
        marks: !!marks,
        children: [/*#__PURE__*/_jsx(InputRange, {
          ...otherProps,
          className: "components-range-control__slider",
          describedBy: describedBy,
          disabled: disabled,
          id: `${id}`,
          label: label,
          max: max,
          min: min,
          onBlur: handleOnBlur,
          onChange: handleOnRangeChange,
          onFocus: handleOnFocus,
          onMouseMove: onMouseMove,
          onMouseLeave: onMouseLeave,
          ref: useMergeRefs([inputRef, forwardedRef]),
          step: step,
          value: inputSliderValue !== null && inputSliderValue !== void 0 ? inputSliderValue : undefined
        }), /*#__PURE__*/_jsx(RangeRail, {
          "aria-hidden": true,
          disabled: disabled,
          marks: marks,
          max: max,
          min: min,
          railColor: railColor,
          step: step,
          value: rangeFillValue
        }), /*#__PURE__*/_jsx(Track, {
          "aria-hidden": true,
          className: "components-range-control__track",
          disabled: disabled,
          style: {
            width: fillValueOffset
          },
          trackColor: trackColor
        }), /*#__PURE__*/_jsx(ThumbWrapper, {
          className: "components-range-control__thumb-wrapper",
          style: offsetStyle,
          disabled: disabled,
          children: /*#__PURE__*/_jsx(Thumb, {
            "aria-hidden": true,
            isFocused: isThumbFocused,
            disabled: disabled
          })
        }), enableTooltip && /*#__PURE__*/_jsx(SimpleTooltip, {
          className: "components-range-control__tooltip",
          inputRef: inputRef,
          tooltipPosition: "bottom",
          renderTooltipContent: renderTooltipContent,
          show: isCurrentlyFocused || showTooltip,
          style: offsetStyle,
          value: value
        })]
      }), afterIcon && /*#__PURE__*/_jsx(AfterIconWrapper, {
        children: /*#__PURE__*/_jsx(Icon, {
          icon: afterIcon
        })
      }), hasInputField && /*#__PURE__*/_jsx(InputNumber, {
        "aria-label": label,
        className: "components-range-control__number",
        disabled: disabled,
        inputMode: "decimal",
        isShiftStepEnabled: isShiftStepEnabled,
        max: max,
        min: min,
        onBlur: handleOnInputNumberBlur,
        onChange: handleOnChange,
        shiftStep: shiftStep,
        size: __next40pxDefaultSize ? '__unstable-large' : 'default',
        __unstableInputWidth: __next40pxDefaultSize ? space(20) : space(16),
        step: step
        // @ts-expect-error TODO: Investigate if the `null` value is necessary
        ,
        value: inputSliderValue
      }), allowReset && /*#__PURE__*/_jsx(ActionRightWrapper, {
        children: /*#__PURE__*/_jsx(Button, {
          className: "components-range-control__reset"
          // If the RangeControl itself is disabled, the reset button shouldn't be in the tab sequence.
          ,
          accessibleWhenDisabled: !disabled
          // The reset button should be disabled if RangeControl itself is disabled,
          // or if the current `value` is equal to the value that would be currently
          // assigned when clicking the button.
          ,
          disabled: disabled || value === computeResetValue({
            resetFallbackValue,
            initialPosition
          }),
          variant: "secondary",
          size: "small",
          onClick: handleOnReset,
          children: __('Reset')
        })
      })]
    })
  });
}

/**
 * RangeControls are used to make selections from a range of incremental values.
 *
 * ```jsx
 * import { RangeControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyRangeControl = () => {
 *   const [ isChecked, setChecked ] = useState( true );
 *   return (
 *     <RangeControl
 *       __nextHasNoMarginBottom
 *       help="Please select how transparent you would like this."
 *       initialPosition={50}
 *       label="Opacity"
 *       max={100}
 *       min={0}
 *       onChange={() => {}}
 *     />
 *   );
 * };
 * ```
 */
export const RangeControl = forwardRef(UnforwardedRangeControl);
export default RangeControl;
//# sourceMappingURL=index.js.map
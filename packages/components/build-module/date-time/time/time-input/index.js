/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { TimeWrapper, TimeSeparator, HoursInput, MinutesInput, Fieldset } from '../styles';
import { HStack } from '../../../h-stack';
import { from12hTo24h, from24hTo12h, buildPadInputStateReducer, validateInputElementTarget } from '../../utils';
import { useControlledValue } from '../../../utils';
import BaseControl from '../../../base-control';
import { ToggleGroupControl, ToggleGroupControlOption } from '../../../toggle-group-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function TimeInput({
  value: valueProp,
  defaultValue,
  is12Hour,
  label,
  minutesProps,
  onChange
}) {
  const [value = {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes()
  }, setValue] = useControlledValue({
    value: valueProp,
    onChange,
    defaultValue
  });
  const dayPeriod = parseDayPeriod(value.hours);
  const hours12Format = from24hTo12h(value.hours);
  const buildNumberControlChangeCallback = method => {
    return (_value, {
      event
    }) => {
      if (!validateInputElementTarget(event)) {
        return;
      }

      // We can safely assume value is a number if target is valid.
      const numberValue = Number(_value);
      setValue({
        ...value,
        [method]: method === 'hours' && is12Hour ? from12hTo24h(numberValue, dayPeriod === 'PM') : numberValue
      });
    };
  };
  const buildAmPmChangeCallback = _value => {
    return () => {
      if (dayPeriod === _value) {
        return;
      }
      setValue({
        ...value,
        hours: from12hTo24h(hours12Format, _value === 'PM')
      });
    };
  };
  function parseDayPeriod(_hours) {
    return _hours < 12 ? 'AM' : 'PM';
  }
  const Wrapper = label ? Fieldset : Fragment;
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [label && /*#__PURE__*/_jsx(BaseControl.VisualLabel, {
      as: "legend",
      children: label
    }), /*#__PURE__*/_jsxs(HStack, {
      alignment: "left",
      expanded: false,
      children: [/*#__PURE__*/_jsxs(TimeWrapper, {
        className: "components-datetime__time-field components-datetime__time-field-time" // Unused, for backwards compatibility.
        ,
        children: [/*#__PURE__*/_jsx(HoursInput, {
          className: "components-datetime__time-field-hours-input" // Unused, for backwards compatibility.
          ,
          label: __('Hours'),
          hideLabelFromVision: true,
          __next40pxDefaultSize: true,
          value: String(is12Hour ? hours12Format : value.hours).padStart(2, '0'),
          step: 1,
          min: is12Hour ? 1 : 0,
          max: is12Hour ? 12 : 23,
          required: true,
          spinControls: "none",
          isPressEnterToChange: true,
          isDragEnabled: false,
          isShiftStepEnabled: false,
          onChange: buildNumberControlChangeCallback('hours'),
          __unstableStateReducer: buildPadInputStateReducer(2)
        }), /*#__PURE__*/_jsx(TimeSeparator, {
          className: "components-datetime__time-separator" // Unused, for backwards compatibility.
          ,
          "aria-hidden": "true",
          children: ":"
        }), /*#__PURE__*/_jsx(MinutesInput, {
          className: clsx('components-datetime__time-field-minutes-input',
          // Unused, for backwards compatibility.
          minutesProps?.className),
          label: __('Minutes'),
          hideLabelFromVision: true,
          __next40pxDefaultSize: true,
          value: String(value.minutes).padStart(2, '0'),
          step: 1,
          min: 0,
          max: 59,
          required: true,
          spinControls: "none",
          isPressEnterToChange: true,
          isDragEnabled: false,
          isShiftStepEnabled: false,
          onChange: (...args) => {
            buildNumberControlChangeCallback('minutes')(...args);
            minutesProps?.onChange?.(...args);
          },
          __unstableStateReducer: buildPadInputStateReducer(2),
          ...minutesProps
        })]
      }), is12Hour && /*#__PURE__*/_jsxs(ToggleGroupControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        isBlock: true,
        label: __('Select AM or PM'),
        hideLabelFromVision: true,
        value: dayPeriod,
        onChange: newValue => {
          buildAmPmChangeCallback(newValue)();
        },
        children: [/*#__PURE__*/_jsx(ToggleGroupControlOption, {
          value: "AM",
          label: __('AM')
        }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
          value: "PM",
          label: __('PM')
        })]
      })]
    })]
  });
}
export default TimeInput;
//# sourceMappingURL=index.js.map
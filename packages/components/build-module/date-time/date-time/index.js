/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { default as DatePicker } from '../date';
import { default as TimePicker } from '../time';
import { Wrapper } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { DatePicker, TimePicker };
const noop = () => {};
function UnforwardedDateTimePicker({
  currentDate,
  is12Hour,
  dateOrder,
  isInvalidDate,
  onMonthPreviewed = noop,
  onChange,
  events,
  startOfWeek
}, ref) {
  return /*#__PURE__*/_jsx(Wrapper, {
    ref: ref,
    className: "components-datetime",
    spacing: 4,
    children: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TimePicker, {
        currentTime: currentDate,
        onChange: onChange,
        is12Hour: is12Hour,
        dateOrder: dateOrder
      }), /*#__PURE__*/_jsx(DatePicker, {
        currentDate: currentDate,
        onChange: onChange,
        isInvalidDate: isInvalidDate,
        events: events,
        onMonthPreviewed: onMonthPreviewed,
        startOfWeek: startOfWeek
      })]
    })
  });
}

/**
 * DateTimePicker is a React component that renders a calendar and clock for
 * date and time selection. The calendar and clock components can be accessed
 * individually using the `DatePicker` and `TimePicker` components respectively.
 *
 * ```jsx
 * import { DateTimePicker } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyDateTimePicker = () => {
 *   const [ date, setDate ] = useState( new Date() );
 *
 *   return (
 *     <DateTimePicker
 *       currentDate={ date }
 *       onChange={ ( newDate ) => setDate( newDate ) }
 *       is12Hour
 *     />
 *   );
 * };
 * ```
 */
export const DateTimePicker = forwardRef(UnforwardedDateTimePicker);
export default DateTimePicker;
//# sourceMappingURL=index.js.map
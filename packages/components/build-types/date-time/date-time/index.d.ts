/**
 * Internal dependencies
 */
import { default as DatePicker } from '../date';
import { default as TimePicker } from '../time';
export { DatePicker, TimePicker };
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
export declare const DateTimePicker: import("react").ForwardRefExoticComponent<Omit<import("../types").DatePickerProps, "onChange"> & Omit<import("../types").TimePickerProps, "onChange" | "hideLabelFromVision" | "currentTime"> & {
    onChange?: (date: string | null) => void;
} & import("react").RefAttributes<any>>;
export default DateTimePicker;
//# sourceMappingURL=index.d.ts.map
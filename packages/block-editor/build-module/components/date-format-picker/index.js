/**
 * WordPress dependencies
 */
import { _x, __ } from '@wordpress/i18n';
import { dateI18n, humanTimeDiff } from '@wordpress/date';
import { useState, createInterpolateElement } from '@wordpress/element';
import { TextControl, ExternalLink, VisuallyHidden, ToggleControl, __experimentalVStack as VStack, CustomSelectControl } from '@wordpress/components';

// So that we illustrate the different formats in the dropdown properly, show a date that is
// somwhat recent, has a day greater than 12, and a month with more than three letters.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const exampleDate = new Date();
exampleDate.setDate(20);
exampleDate.setMonth(exampleDate.getMonth() - 3);
if (exampleDate.getMonth() === 4) {
  // May has three letters, so use March.
  exampleDate.setMonth(3);
}

/**
 * The `DateFormatPicker` component renders controls that let the user choose a
 * _date format_. That is, how they want their dates to be formatted.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/date-format-picker/README.md
 *
 * @param {Object}                          props
 * @param {string|null}                     props.format        The selected date
 *                                                              format. If
 *                                                              `null`,
 *                                                              _Default_ is
 *                                                              selected.
 * @param {string}                          props.defaultFormat The date format that
 *                                                              will be used if the
 *                                                              user selects
 *                                                              'Default'.
 * @param {( format: string|null ) => void} props.onChange      Called when a
 *                                                              selection is
 *                                                              made. If `null`,
 *                                                              _Default_ is
 *                                                              selected.
 */
export default function DateFormatPicker({
  format,
  defaultFormat,
  onChange
}) {
  return /*#__PURE__*/_jsxs("fieldset", {
    className: "block-editor-date-format-picker",
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      as: "legend",
      children: __('Date format')
    }), /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Default format'),
      help: `${__('Example:')}  ${dateI18n(defaultFormat, exampleDate)}`,
      checked: !format,
      onChange: checked => onChange(checked ? null : defaultFormat)
    }), format && /*#__PURE__*/_jsx(NonDefaultControls, {
      format: format,
      onChange: onChange
    })]
  });
}
function NonDefaultControls({
  format,
  onChange
}) {
  var _suggestedOptions$fin;
  // Suggest a short format, medium format, long format, and a standardised
  // (YYYY-MM-DD) format. The short, medium, and long formats are localised as
  // different languages have different ways of writing these. For example, 'F
  // j, Y' (April 20, 2022) in American English (en_US) is 'j. F Y' (20. April
  // 2022) in German (de). The resultant array is de-duplicated as some
  // languages will use the same format string for short, medium, and long
  // formats.
  const suggestedFormats = [...new Set([/* translators: See https://www.php.net/manual/datetime.format.php */
  'Y-m-d', /* translators: See https://www.php.net/manual/datetime.format.php */
  _x('n/j/Y', 'short date format'), /* translators: See https://www.php.net/manual/datetime.format.php */
  _x('n/j/Y g:i A', 'short date format with time'), /* translators: See https://www.php.net/manual/datetime.format.php */
  _x('M j, Y', 'medium date format'), /* translators: See https://www.php.net/manual/datetime.format.php */
  _x('M j, Y g:i A', 'medium date format with time'), /* translators: See https://www.php.net/manual/datetime.format.php */
  _x('F j, Y', 'long date format'), /* translators: See https://www.php.net/manual/datetime.format.php */
  _x('M j', 'short date format without the year')])];
  const suggestedOptions = [...suggestedFormats.map((suggestedFormat, index) => ({
    key: `suggested-${index}`,
    name: dateI18n(suggestedFormat, exampleDate),
    format: suggestedFormat
  })), {
    key: 'human-diff',
    name: humanTimeDiff(exampleDate),
    format: 'human-diff'
  }];
  const customOption = {
    key: 'custom',
    name: __('Custom'),
    className: 'block-editor-date-format-picker__custom-format-select-control__custom-option',
    hint: __('Enter your own date format')
  };
  const [isCustom, setIsCustom] = useState(() => !!format && !suggestedOptions.some(option => option.format === format));
  return /*#__PURE__*/_jsxs(VStack, {
    children: [/*#__PURE__*/_jsx(CustomSelectControl, {
      __next40pxDefaultSize: true,
      label: __('Choose a format'),
      options: [...suggestedOptions, customOption],
      value: isCustom ? customOption : (_suggestedOptions$fin = suggestedOptions.find(option => option.format === format)) !== null && _suggestedOptions$fin !== void 0 ? _suggestedOptions$fin : customOption,
      onChange: ({
        selectedItem
      }) => {
        if (selectedItem === customOption) {
          setIsCustom(true);
        } else {
          setIsCustom(false);
          onChange(selectedItem.format);
        }
      }
    }), isCustom && /*#__PURE__*/_jsx(TextControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: __('Custom format'),
      hideLabelFromVision: true,
      help: createInterpolateElement(__('Enter a date or time <Link>format string</Link>.'), {
        Link: /*#__PURE__*/_jsx(ExternalLink, {
          href: __('https://wordpress.org/documentation/article/customize-date-and-time-format/')
        })
      }),
      value: format,
      onChange: value => onChange(value)
    })]
  });
}
//# sourceMappingURL=index.js.map
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const OrderedListSettings = ({
  setAttributes,
  reversed,
  start,
  type
}) => /*#__PURE__*/_jsx(InspectorControls, {
  children: /*#__PURE__*/_jsxs(PanelBody, {
    title: __('Settings'),
    children: [/*#__PURE__*/_jsx(SelectControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: __('List style'),
      options: [{
        label: __('Numbers'),
        value: 'decimal'
      }, {
        label: __('Uppercase letters'),
        value: 'upper-alpha'
      }, {
        label: __('Lowercase letters'),
        value: 'lower-alpha'
      }, {
        label: __('Uppercase Roman numerals'),
        value: 'upper-roman'
      }, {
        label: __('Lowercase Roman numerals'),
        value: 'lower-roman'
      }],
      value: type,
      onChange: newValue => setAttributes({
        type: newValue
      })
    }), /*#__PURE__*/_jsx(TextControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: __('Start value'),
      type: "number",
      onChange: value => {
        const int = parseInt(value, 10);
        setAttributes({
          // It should be possible to unset the value,
          // e.g. with an empty string.
          start: isNaN(int) ? undefined : int
        });
      },
      value: Number.isInteger(start) ? start.toString(10) : '',
      step: "1"
    }), /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Reverse order'),
      checked: reversed || false,
      onChange: value => {
        setAttributes({
          // Unset the attribute if not reversed.
          reversed: value || undefined
        });
      }
    })]
  })
});
export default OrderedListSettings;
//# sourceMappingURL=ordered-list-settings.js.map
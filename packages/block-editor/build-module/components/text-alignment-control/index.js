/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { alignLeft, alignCenter, alignRight, alignJustify } from '@wordpress/icons';
import { useMemo } from '@wordpress/element';
import { __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
const TEXT_ALIGNMENT_OPTIONS = [{
  label: __('Align text left'),
  value: 'left',
  icon: alignLeft
}, {
  label: __('Align text center'),
  value: 'center',
  icon: alignCenter
}, {
  label: __('Align text right'),
  value: 'right',
  icon: alignRight
}, {
  label: __('Justify text'),
  value: 'justify',
  icon: alignJustify
}];
const DEFAULT_OPTIONS = ['left', 'center', 'right'];

/**
 * Control to facilitate text alignment selections.
 *
 * @param {Object}   props           Component props.
 * @param {string}   props.className Class name to add to the control.
 * @param {string}   props.value     Currently selected text alignment.
 * @param {Function} props.onChange  Handles change in text alignment selection.
 * @param {string[]} props.options   Array of text alignment options to display.
 *
 * @return {Element} Text alignment control.
 */
export default function TextAlignmentControl({
  className,
  value,
  onChange,
  options = DEFAULT_OPTIONS
}) {
  const validOptions = useMemo(() => TEXT_ALIGNMENT_OPTIONS.filter(option => options.includes(option.value)), [options]);
  if (!validOptions.length) {
    return null;
  }
  return /*#__PURE__*/_jsx(ToggleGroupControl, {
    isDeselectable: true,
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: __('Text alignment'),
    className: clsx('block-editor-text-alignment-control', className),
    value: value,
    onChange: newValue => {
      onChange(newValue === value ? undefined : newValue);
    },
    children: validOptions.map(option => {
      return /*#__PURE__*/_jsx(ToggleGroupControlOptionIcon, {
        value: option.value,
        icon: option.icon,
        label: option.label
      }, option.value);
    })
  });
}
//# sourceMappingURL=index.js.map
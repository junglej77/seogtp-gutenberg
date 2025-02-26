/**
 * WordPress dependencies
 */
import { DateTimePicker, TimePicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { forwardRef } from '@wordpress/element';
import { getSettings } from '@wordpress/date';

/**
 * Internal dependencies
 */
import InspectorPopoverHeader from '../inspector-popover-header';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PublishDateTimePicker({
  onClose,
  onChange,
  showPopoverHeaderActions,
  isCompact,
  currentDate,
  ...additionalProps
}, ref) {
  const datePickerProps = {
    startOfWeek: getSettings().l10n.startOfWeek,
    onChange,
    currentDate: isCompact ? undefined : currentDate,
    currentTime: isCompact ? currentDate : undefined,
    ...additionalProps
  };
  const DatePickerComponent = isCompact ? TimePicker : DateTimePicker;
  return /*#__PURE__*/_jsxs("div", {
    ref: ref,
    className: "block-editor-publish-date-time-picker",
    children: [/*#__PURE__*/_jsx(InspectorPopoverHeader, {
      title: __('Publish'),
      actions: showPopoverHeaderActions ? [{
        label: __('Now'),
        onClick: () => onChange?.(null)
      }] : undefined,
      onClose: onClose
    }), /*#__PURE__*/_jsx(DatePickerComponent, {
      ...datePickerProps
    })]
  });
}
export const PrivatePublishDateTimePicker = forwardRef(PublishDateTimePicker);
function PublicPublishDateTimePicker(props, ref) {
  return /*#__PURE__*/_jsx(PrivatePublishDateTimePicker, {
    ...props,
    showPopoverHeaderActions: true,
    isCompact: false,
    ref: ref
  });
}
export default forwardRef(PublicPublishDateTimePicker);
//# sourceMappingURL=index.js.map
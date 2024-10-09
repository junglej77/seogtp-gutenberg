/**
 * External dependencies
 */

import { css } from '@emotion/react';
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { FlexBlock } from '../flex';
import FormToggle from '../form-toggle';
import BaseControl from '../base-control';
import { HStack } from '../h-stack';
import { useCx } from '../utils';
import { space } from '../utils/space';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedToggleControl({
  __nextHasNoMarginBottom,
  label,
  checked,
  help,
  className,
  onChange,
  disabled
}, ref) {
  function onChangeToggle(event) {
    onChange(event.target.checked);
  }
  const instanceId = useInstanceId(ToggleControl);
  const id = `inspector-toggle-control-${instanceId}`;
  const cx = useCx();
  const classes = cx('components-toggle-control', className, !__nextHasNoMarginBottom && /*#__PURE__*/css({
    marginBottom: space(3)
  }, process.env.NODE_ENV === "production" ? "" : ";label:classes;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdG9nZ2xlLWNvbnRyb2wvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEK0IiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy90b2dnbGUtY29udHJvbC9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgdHlwZSB7IENoYW5nZUV2ZW50LCBGb3J3YXJkZWRSZWYgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IGNsc3ggZnJvbSAnY2xzeCc7XHJcblxyXG4vKipcclxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XHJcbmltcG9ydCB7IHVzZUluc3RhbmNlSWQgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xyXG5pbXBvcnQgZGVwcmVjYXRlZCBmcm9tICdAd29yZHByZXNzL2RlcHJlY2F0ZWQnO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgRmxleEJsb2NrIH0gZnJvbSAnLi4vZmxleCc7XHJcbmltcG9ydCBGb3JtVG9nZ2xlIGZyb20gJy4uL2Zvcm0tdG9nZ2xlJztcclxuaW1wb3J0IEJhc2VDb250cm9sIGZyb20gJy4uL2Jhc2UtY29udHJvbCc7XHJcbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0L3dvcmRwcmVzcy1jb21wb25lbnQnO1xyXG5pbXBvcnQgdHlwZSB7IFRvZ2dsZUNvbnRyb2xQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xyXG5pbXBvcnQgeyBIU3RhY2sgfSBmcm9tICcuLi9oLXN0YWNrJztcclxuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vdXRpbHMvc3BhY2UnO1xyXG5cclxuZnVuY3Rpb24gVW5mb3J3YXJkZWRUb2dnbGVDb250cm9sKFxyXG5cdHtcclxuXHRcdF9fbmV4dEhhc05vTWFyZ2luQm90dG9tLFxyXG5cdFx0bGFiZWwsXHJcblx0XHRjaGVja2VkLFxyXG5cdFx0aGVscCxcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdG9uQ2hhbmdlLFxyXG5cdFx0ZGlzYWJsZWQsXHJcblx0fTogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IFRvZ2dsZUNvbnRyb2xQcm9wcywgJ2lucHV0JywgZmFsc2UgPixcclxuXHRyZWY6IEZvcndhcmRlZFJlZjwgSFRNTElucHV0RWxlbWVudCA+XHJcbikge1xyXG5cdGZ1bmN0aW9uIG9uQ2hhbmdlVG9nZ2xlKCBldmVudDogQ2hhbmdlRXZlbnQ8IEhUTUxJbnB1dEVsZW1lbnQgPiApIHtcclxuXHRcdG9uQ2hhbmdlKCBldmVudC50YXJnZXQuY2hlY2tlZCApO1xyXG5cdH1cclxuXHRjb25zdCBpbnN0YW5jZUlkID0gdXNlSW5zdGFuY2VJZCggVG9nZ2xlQ29udHJvbCApO1xyXG5cdGNvbnN0IGlkID0gYGluc3BlY3Rvci10b2dnbGUtY29udHJvbC0keyBpbnN0YW5jZUlkIH1gO1xyXG5cclxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XHJcblx0Y29uc3QgY2xhc3NlcyA9IGN4KFxyXG5cdFx0J2NvbXBvbmVudHMtdG9nZ2xlLWNvbnRyb2wnLFxyXG5cdFx0Y2xhc3NOYW1lLFxyXG5cdFx0ISBfX25leHRIYXNOb01hcmdpbkJvdHRvbSAmJiBjc3MoIHsgbWFyZ2luQm90dG9tOiBzcGFjZSggMyApIH0gKVxyXG5cdCk7XHJcblxyXG5cdGlmICggISBfX25leHRIYXNOb01hcmdpbkJvdHRvbSApIHtcclxuXHRcdGRlcHJlY2F0ZWQoICdCb3R0b20gbWFyZ2luIHN0eWxlcyBmb3Igd3AuY29tcG9uZW50cy5Ub2dnbGVDb250cm9sJywge1xyXG5cdFx0XHRzaW5jZTogJzYuNycsXHJcblx0XHRcdHZlcnNpb246ICc3LjAnLFxyXG5cdFx0XHRoaW50OiAnU2V0IHRoZSBgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b21gIHByb3AgdG8gdHJ1ZSB0byBzdGFydCBvcHRpbmcgaW50byB0aGUgbmV3IHN0eWxlcywgd2hpY2ggd2lsbCBiZWNvbWUgdGhlIGRlZmF1bHQgaW4gYSBmdXR1cmUgdmVyc2lvbi4nLFxyXG5cdFx0fSApO1xyXG5cdH1cclxuXHJcblx0bGV0IGRlc2NyaWJlZEJ5LCBoZWxwTGFiZWw7XHJcblx0aWYgKCBoZWxwICkge1xyXG5cdFx0aWYgKCB0eXBlb2YgaGVscCA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuXHRcdFx0Ly8gYGhlbHBgIGFzIGEgZnVuY3Rpb24gd29ya3Mgb25seSBmb3IgY29udHJvbGxlZCBjb21wb25lbnRzIHdoZXJlXHJcblx0XHRcdC8vIGBjaGVja2VkYCBpcyBwYXNzZWQgZG93biBmcm9tIHBhcmVudCBjb21wb25lbnQuIFVuY29udHJvbGxlZFxyXG5cdFx0XHQvLyBjb21wb25lbnQgY2FuIHNob3cgb25seSBhIHN0YXRpYyBoZWxwIGxhYmVsLlxyXG5cdFx0XHRpZiAoIGNoZWNrZWQgIT09IHVuZGVmaW5lZCApIHtcclxuXHRcdFx0XHRoZWxwTGFiZWwgPSBoZWxwKCBjaGVja2VkICk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlbHBMYWJlbCA9IGhlbHA7XHJcblx0XHR9XHJcblx0XHRpZiAoIGhlbHBMYWJlbCApIHtcclxuXHRcdFx0ZGVzY3JpYmVkQnkgPSBpZCArICdfX2hlbHAnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxCYXNlQ29udHJvbFxyXG5cdFx0XHRpZD17IGlkIH1cclxuXHRcdFx0aGVscD17XHJcblx0XHRcdFx0aGVscExhYmVsICYmIChcclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNvbXBvbmVudHMtdG9nZ2xlLWNvbnRyb2xfX2hlbHBcIj5cclxuXHRcdFx0XHRcdFx0eyBoZWxwTGFiZWwgfVxyXG5cdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0XHRjbGFzc05hbWU9eyBjbGFzc2VzIH1cclxuXHRcdFx0X19uZXh0SGFzTm9NYXJnaW5Cb3R0b21cclxuXHRcdD5cclxuXHRcdFx0PEhTdGFjayBqdXN0aWZ5PVwiZmxleC1zdGFydFwiIHNwYWNpbmc9eyAyIH0+XHJcblx0XHRcdFx0PEZvcm1Ub2dnbGVcclxuXHRcdFx0XHRcdGlkPXsgaWQgfVxyXG5cdFx0XHRcdFx0Y2hlY2tlZD17IGNoZWNrZWQgfVxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9eyBvbkNoYW5nZVRvZ2dsZSB9XHJcblx0XHRcdFx0XHRhcmlhLWRlc2NyaWJlZGJ5PXsgZGVzY3JpYmVkQnkgfVxyXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyBkaXNhYmxlZCB9XHJcblx0XHRcdFx0XHRyZWY9eyByZWYgfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdFx0PEZsZXhCbG9ja1xyXG5cdFx0XHRcdFx0YXM9XCJsYWJlbFwiXHJcblx0XHRcdFx0XHRodG1sRm9yPXsgaWQgfVxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXsgY2xzeCggJ2NvbXBvbmVudHMtdG9nZ2xlLWNvbnRyb2xfX2xhYmVsJywge1xyXG5cdFx0XHRcdFx0XHQnaXMtZGlzYWJsZWQnOiBkaXNhYmxlZCxcclxuXHRcdFx0XHRcdH0gKSB9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0eyBsYWJlbCB9XHJcblx0XHRcdFx0PC9GbGV4QmxvY2s+XHJcblx0XHRcdDwvSFN0YWNrPlxyXG5cdFx0PC9CYXNlQ29udHJvbD5cclxuXHQpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlQ29udHJvbCBpcyB1c2VkIHRvIGdlbmVyYXRlIGEgdG9nZ2xlIHVzZXIgaW50ZXJmYWNlLlxyXG4gKlxyXG4gKiBgYGBqc3hcclxuICogaW1wb3J0IHsgVG9nZ2xlQ29udHJvbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XHJcbiAqIGltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcclxuICpcclxuICogY29uc3QgTXlUb2dnbGVDb250cm9sID0gKCkgPT4ge1xyXG4gKiAgIGNvbnN0IFsgdmFsdWUsIHNldFZhbHVlIF0gPSB1c2VTdGF0ZSggZmFsc2UgKTtcclxuICpcclxuICogICByZXR1cm4gKFxyXG4gKiAgICAgPFRvZ2dsZUNvbnRyb2xcclxuICogICAgICAgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b21cclxuICogICAgICAgbGFiZWw9XCJGaXhlZCBCYWNrZ3JvdW5kXCJcclxuICogICAgICAgY2hlY2tlZD17IHZhbHVlIH1cclxuICogICAgICAgb25DaGFuZ2U9eyAoKSA9PiBzZXRWYWx1ZSggKCBzdGF0ZSApID0+ICEgc3RhdGUgKSB9XHJcbiAqICAgICAvPlxyXG4gKiAgICk7XHJcbiAqIH07XHJcbiAqIGBgYFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRvZ2dsZUNvbnRyb2wgPSBmb3J3YXJkUmVmKCBVbmZvcndhcmRlZFRvZ2dsZUNvbnRyb2wgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZUNvbnRyb2w7XHJcbiJdfQ== */"));
  if (!__nextHasNoMarginBottom) {
    deprecated('Bottom margin styles for wp.components.ToggleControl', {
      since: '6.7',
      version: '7.0',
      hint: 'Set the `__nextHasNoMarginBottom` prop to true to start opting into the new styles, which will become the default in a future version.'
    });
  }
  let describedBy, helpLabel;
  if (help) {
    if (typeof help === 'function') {
      // `help` as a function works only for controlled components where
      // `checked` is passed down from parent component. Uncontrolled
      // component can show only a static help label.
      if (checked !== undefined) {
        helpLabel = help(checked);
      }
    } else {
      helpLabel = help;
    }
    if (helpLabel) {
      describedBy = id + '__help';
    }
  }
  return /*#__PURE__*/_jsx(BaseControl, {
    id: id,
    help: helpLabel && /*#__PURE__*/_jsx("span", {
      className: "components-toggle-control__help",
      children: helpLabel
    }),
    className: classes,
    __nextHasNoMarginBottom: true,
    children: /*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      spacing: 2,
      children: [/*#__PURE__*/_jsx(FormToggle, {
        id: id,
        checked: checked,
        onChange: onChangeToggle,
        "aria-describedby": describedBy,
        disabled: disabled,
        ref: ref
      }), /*#__PURE__*/_jsx(FlexBlock, {
        as: "label",
        htmlFor: id,
        className: clsx('components-toggle-control__label', {
          'is-disabled': disabled
        }),
        children: label
      })]
    })
  });
}

/**
 * ToggleControl is used to generate a toggle user interface.
 *
 * ```jsx
 * import { ToggleControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyToggleControl = () => {
 *   const [ value, setValue ] = useState( false );
 *
 *   return (
 *     <ToggleControl
 *       __nextHasNoMarginBottom
 *       label="Fixed Background"
 *       checked={ value }
 *       onChange={ () => setValue( ( state ) => ! state ) }
 *     />
 *   );
 * };
 * ```
 */
export const ToggleControl = forwardRef(UnforwardedToggleControl);
export default ToggleControl;
//# sourceMappingURL=index.js.map
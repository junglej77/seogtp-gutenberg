/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { keyboardReturn } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import URLInput from '../url-input';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function LinkEditor({
  autocompleteRef,
  className,
  onChangeInputValue,
  value,
  ...props
}) {
  return /*#__PURE__*/_jsxs("form", {
    className: clsx('block-editor-url-popover__link-editor', className),
    ...props,
    children: [/*#__PURE__*/_jsx(URLInput, {
      value: value,
      onChange: onChangeInputValue,
      autocompleteRef: autocompleteRef
    }), /*#__PURE__*/_jsx(Button, {
      icon: keyboardReturn,
      label: __('Apply'),
      type: "submit",
      size: "compact"
    })]
  });
}
//# sourceMappingURL=link-editor.js.map
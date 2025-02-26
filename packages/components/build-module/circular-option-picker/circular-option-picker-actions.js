/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import Button from '../button';
import Dropdown from '../dropdown';
import { jsx as _jsx } from "react/jsx-runtime";
export function DropdownLinkAction({
  buttonProps,
  className,
  dropdownProps,
  linkText
}) {
  return /*#__PURE__*/_jsx(Dropdown, {
    className: clsx('components-circular-option-picker__dropdown-link-action', className),
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(Button, {
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
      onClick: onToggle,
      variant: "link",
      ...buttonProps,
      children: linkText
    }),
    ...dropdownProps
  });
}
export function ButtonAction({
  className,
  children,
  ...additionalProps
}) {
  return /*#__PURE__*/_jsx(Button, {
    className: clsx('components-circular-option-picker__clear', className),
    variant: "tertiary",
    ...additionalProps,
    children: children
  });
}
//# sourceMappingURL=circular-option-picker-actions.js.map
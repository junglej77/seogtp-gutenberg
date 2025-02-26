/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Button from '../button';
import { VisuallyHidden } from '../visually-hidden';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};
export default function Token({
  value,
  status,
  title,
  displayTransform,
  isBorderless = false,
  disabled = false,
  onClickRemove = noop,
  onMouseEnter,
  onMouseLeave,
  messages,
  termPosition,
  termsCount
}) {
  const instanceId = useInstanceId(Token);
  const tokenClasses = clsx('components-form-token-field__token', {
    'is-error': 'error' === status,
    'is-success': 'success' === status,
    'is-validating': 'validating' === status,
    'is-borderless': isBorderless,
    'is-disabled': disabled
  });
  const onClick = () => onClickRemove({
    value
  });
  const transformedValue = displayTransform(value);
  const termPositionAndCount = sprintf( /* translators: 1: term name, 2: term position in a set of terms, 3: total term set count. */
  __('%1$s (%2$s of %3$s)'), transformedValue, termPosition, termsCount);
  return /*#__PURE__*/_jsxs("span", {
    className: tokenClasses,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    title: title,
    children: [/*#__PURE__*/_jsxs("span", {
      className: "components-form-token-field__token-text",
      id: `components-form-token-field__token-text-${instanceId}`,
      children: [/*#__PURE__*/_jsx(VisuallyHidden, {
        as: "span",
        children: termPositionAndCount
      }), /*#__PURE__*/_jsx("span", {
        "aria-hidden": "true",
        children: transformedValue
      })]
    }), /*#__PURE__*/_jsx(Button, {
      className: "components-form-token-field__remove-token",
      icon: closeSmall,
      onClick: !disabled ? onClick : undefined
      // Disable reason: Even when FormTokenField itself is accessibly disabled, token reset buttons shouldn't be in the tab sequence.
      // eslint-disable-next-line no-restricted-syntax
      ,
      disabled: disabled,
      label: messages.remove,
      "aria-describedby": `components-form-token-field__token-text-${instanceId}`
    })]
  });
}
//# sourceMappingURL=token.js.map
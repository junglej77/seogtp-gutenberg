/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RawHTML, useEffect, renderToString } from '@wordpress/element';
import { speak } from '@wordpress/a11y';
import { close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Button from '../button';
import { VisuallyHidden } from '../visually-hidden';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};

/**
 * Custom hook which announces the message with the given politeness, if a
 * valid message is provided.
 */
function useSpokenMessage(message, politeness) {
  const spokenMessage = typeof message === 'string' ? message : renderToString(message);
  useEffect(() => {
    if (spokenMessage) {
      speak(spokenMessage, politeness);
    }
  }, [spokenMessage, politeness]);
}
function getDefaultPoliteness(status) {
  switch (status) {
    case 'success':
    case 'warning':
    case 'info':
      return 'polite';
    // The default will also catch the 'error' status.
    default:
      return 'assertive';
  }
}
function getStatusLabel(status) {
  switch (status) {
    case 'warning':
      return __('Warning notice');
    case 'info':
      return __('Information notice');
    case 'error':
      return __('Error notice');
    // The default will also catch the 'success' status.
    default:
      return __('Notice');
  }
}

/**
 * `Notice` is a component used to communicate feedback to the user.
 *
 *```jsx
 * import { Notice } from `@wordpress/components`;
 *
 * const MyNotice = () => (
 *   <Notice status="error">An unknown error occurred.</Notice>
 * );
 * ```
 */
function Notice({
  className,
  status = 'info',
  children,
  spokenMessage = children,
  onRemove = noop,
  isDismissible = true,
  actions = [],
  politeness = getDefaultPoliteness(status),
  __unstableHTML,
  // onDismiss is a callback executed when the notice is dismissed.
  // It is distinct from onRemove, which _looks_ like a callback but is
  // actually the function to call to remove the notice from the UI.
  onDismiss = noop
}) {
  useSpokenMessage(spokenMessage, politeness);
  const classes = clsx(className, 'components-notice', 'is-' + status, {
    'is-dismissible': isDismissible
  });
  if (__unstableHTML && typeof children === 'string') {
    children = /*#__PURE__*/_jsx(RawHTML, {
      children: children
    });
  }
  const onDismissNotice = () => {
    onDismiss();
    onRemove();
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      children: getStatusLabel(status)
    }), /*#__PURE__*/_jsxs("div", {
      className: "components-notice__content",
      children: [children, /*#__PURE__*/_jsx("div", {
        className: "components-notice__actions",
        children: actions.map(({
          className: buttonCustomClasses,
          label,
          isPrimary,
          variant,
          noDefaultClasses = false,
          onClick,
          url
        }, index) => {
          let computedVariant = variant;
          if (variant !== 'primary' && !noDefaultClasses) {
            computedVariant = !url ? 'secondary' : 'link';
          }
          if (typeof computedVariant === 'undefined' && isPrimary) {
            computedVariant = 'primary';
          }
          return /*#__PURE__*/_jsx(Button, {
            href: url,
            variant: computedVariant,
            onClick: url ? undefined : onClick,
            className: clsx('components-notice__action', buttonCustomClasses),
            children: label
          }, index);
        })
      })]
    }), isDismissible && /*#__PURE__*/_jsx(Button, {
      className: "components-notice__dismiss",
      icon: close,
      label: __('Close'),
      onClick: onDismissNotice
    })]
  });
}
export default Notice;
//# sourceMappingURL=index.js.map
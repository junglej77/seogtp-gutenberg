/**
 * External dependencies
 */

import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { speak } from '@wordpress/a11y';
import { useEffect, useLayoutEffect, useRef, forwardRef, renderToString } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import warning from '@wordpress/warning';

/**
 * Internal dependencies
 */
import Button from '../button';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const NOTICE_TIMEOUT = 10000;

/**
 * Custom hook which announces the message with the given politeness, if a
 * valid message is provided.
 *
 * @param message    Message to announce.
 * @param politeness Politeness to announce.
 */
function useSpokenMessage(message, politeness) {
  const spokenMessage = typeof message === 'string' ? message : renderToString(message);
  useEffect(() => {
    if (spokenMessage) {
      speak(spokenMessage, politeness);
    }
  }, [spokenMessage, politeness]);
}
function UnforwardedSnackbar({
  className,
  children,
  spokenMessage = children,
  politeness = 'polite',
  actions = [],
  onRemove,
  icon = null,
  explicitDismiss = false,
  // onDismiss is a callback executed when the snackbar is dismissed.
  // It is distinct from onRemove, which _looks_ like a callback but is
  // actually the function to call to remove the snackbar from the UI.
  onDismiss,
  listRef
}, ref) {
  function dismissMe(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    // Prevent focus loss by moving it to the list element.
    listRef?.current?.focus();
    onDismiss?.();
    onRemove?.();
  }
  function onActionClick(event, onClick) {
    event.stopPropagation();
    onRemove?.();
    if (onClick) {
      onClick(event);
    }
  }
  useSpokenMessage(spokenMessage, politeness);

  // The `onDismiss/onRemove` can have unstable references,
  // trigger side-effect cleanup, and reset timers.
  const callbacksRef = useRef({
    onDismiss,
    onRemove
  });
  useLayoutEffect(() => {
    callbacksRef.current = {
      onDismiss,
      onRemove
    };
  });
  useEffect(() => {
    // Only set up the timeout dismiss if we're not explicitly dismissing.
    const timeoutHandle = setTimeout(() => {
      if (!explicitDismiss) {
        callbacksRef.current.onDismiss?.();
        callbacksRef.current.onRemove?.();
      }
    }, NOTICE_TIMEOUT);
    return () => clearTimeout(timeoutHandle);
  }, [explicitDismiss]);
  const classes = clsx(className, 'components-snackbar', {
    'components-snackbar-explicit-dismiss': !!explicitDismiss
  });
  if (actions && actions.length > 1) {
    // We need to inform developers that snackbar only accepts 1 action.
    globalThis.SCRIPT_DEBUG === true ? warning('Snackbar can only have one action. Use Notice if your message requires many actions.') : void 0;
    // return first element only while keeping it inside an array
    actions = [actions[0]];
  }
  const snackbarContentClassnames = clsx('components-snackbar__content', {
    'components-snackbar__content-with-icon': !!icon
  });
  return /*#__PURE__*/_jsx("div", {
    ref: ref,
    className: classes,
    onClick: !explicitDismiss ? dismissMe : undefined,
    tabIndex: 0,
    role: !explicitDismiss ? 'button' : undefined,
    onKeyPress: !explicitDismiss ? dismissMe : undefined,
    "aria-label": !explicitDismiss ? __('Dismiss this notice') : undefined,
    "data-testid": "snackbar",
    children: /*#__PURE__*/_jsxs("div", {
      className: snackbarContentClassnames,
      children: [icon && /*#__PURE__*/_jsx("div", {
        className: "components-snackbar__icon",
        children: icon
      }), children, actions.map(({
        label,
        onClick,
        url
      }, index) => {
        return /*#__PURE__*/_jsx(Button, {
          href: url,
          variant: "tertiary",
          onClick: event => onActionClick(event, onClick),
          className: "components-snackbar__action",
          children: label
        }, index);
      }), explicitDismiss && /*#__PURE__*/_jsx("span", {
        role: "button",
        "aria-label": __('Dismiss this notice'),
        tabIndex: 0,
        className: "components-snackbar__dismiss-button",
        onClick: dismissMe,
        onKeyPress: dismissMe,
        children: "\u2715"
      })]
    })
  });
}

/**
 * A Snackbar displays a succinct message that is cleared out after a small delay.
 *
 * It can also offer the user options, like viewing a published post.
 * But these options should also be available elsewhere in the UI.
 *
 * ```jsx
 * const MySnackbarNotice = () => (
 *   <Snackbar>Post published successfully.</Snackbar>
 * );
 * ```
 */
export const Snackbar = forwardRef(UnforwardedSnackbar);
export default Snackbar;
//# sourceMappingURL=index.js.map
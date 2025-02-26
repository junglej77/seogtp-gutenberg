/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';
import { useCopyToClipboard } from '@wordpress/compose';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import Button from '../button';
import { jsx as _jsx } from "react/jsx-runtime";
const TIMEOUT = 4000;
export default function ClipboardButton({
  className,
  children,
  onCopy,
  onFinishCopy,
  text,
  ...buttonProps
}) {
  deprecated('wp.components.ClipboardButton', {
    since: '5.8',
    alternative: 'wp.compose.useCopyToClipboard'
  });
  const timeoutIdRef = useRef();
  const ref = useCopyToClipboard(text, () => {
    onCopy();
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    if (onFinishCopy) {
      timeoutIdRef.current = setTimeout(() => onFinishCopy(), TIMEOUT);
    }
  });
  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  }, []);
  const classes = clsx('components-clipboard-button', className);

  // Workaround for inconsistent behavior in Safari, where <textarea> is not
  // the document.activeElement at the moment when the copy event fires.
  // This causes documentHasSelection() in the copy-handler component to
  // mistakenly override the ClipboardButton, and copy a serialized string
  // of the current block instead.
  const focusOnCopyEventTarget = event => {
    // @ts-expect-error: Should be currentTarget, but not changing because this component is deprecated.
    event.target.focus();
  };
  return /*#__PURE__*/_jsx(Button, {
    ...buttonProps,
    className: classes,
    ref: ref,
    onCopy: focusOnCopyEventTarget,
    children: children
  });
}
//# sourceMappingURL=index.js.map
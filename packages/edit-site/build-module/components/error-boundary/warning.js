/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Warning } from '@wordpress/block-editor';
import { useCopyToClipboard } from '@wordpress/compose';
import { jsx as _jsx } from "react/jsx-runtime";
function CopyButton({
  text,
  children
}) {
  const ref = useCopyToClipboard(text);
  return /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    variant: "secondary",
    ref: ref,
    children: children
  });
}
export default function ErrorBoundaryWarning({
  message,
  error
}) {
  const actions = [/*#__PURE__*/_jsx(CopyButton, {
    text: error.stack,
    children: __('Copy Error')
  }, "copy-error")];
  return /*#__PURE__*/_jsx(Warning, {
    className: "editor-error-boundary",
    actions: actions,
    children: message
  });
}
//# sourceMappingURL=warning.js.map
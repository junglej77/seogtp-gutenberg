/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Warning } from '@wordpress/block-editor';
import { useCopyToClipboard } from '@wordpress/compose';
import { doAction } from '@wordpress/hooks';
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
function ErrorBoundaryWarning({
  message,
  error
}) {
  const actions = [/*#__PURE__*/_jsx(CopyButton, {
    text: error.stack,
    children: __('Copy Error')
  }, "copy-error")];
  return /*#__PURE__*/_jsx(Warning, {
    className: "edit-widgets-error-boundary",
    actions: actions,
    children: message
  });
}
export default class ErrorBoundary extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      error: null
    };
  }
  componentDidCatch(error) {
    doAction('editor.ErrorBoundary.errorLogged', error);
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  render() {
    if (!this.state.error) {
      return this.props.children;
    }
    return /*#__PURE__*/_jsx(ErrorBoundaryWarning, {
      message: __('The editor has encountered an unexpected error.'),
      error: this.state.error
    });
  }
}
//# sourceMappingURL=index.js.map
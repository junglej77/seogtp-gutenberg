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
export default class ErrorBoundary extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      error: null
    };
  }
  componentDidCatch(error) {
    this.setState({
      error
    });
    doAction('editor.ErrorBoundary.errorLogged', error);
  }
  render() {
    const {
      error
    } = this.state;
    if (!error) {
      return this.props.children;
    }
    return /*#__PURE__*/_jsx(Warning, {
      className: "customize-widgets-error-boundary",
      actions: [/*#__PURE__*/_jsx(CopyButton, {
        text: error.stack,
        children: __('Copy Error')
      }, "copy-error")],
      children: __('The editor has encountered an unexpected error.')
    });
  }
}
//# sourceMappingURL=index.js.map
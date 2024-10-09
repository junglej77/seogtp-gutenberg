/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { select } from '@wordpress/data';
import { Warning } from '@wordpress/block-editor';
import { useCopyToClipboard } from '@wordpress/compose';
import { doAction } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
function getContent() {
  try {
    // While `select` in a component is generally discouraged, it is
    // used here because it (a) reduces the chance of data loss in the
    // case of additional errors by performing a direct retrieval and
    // (b) avoids the performance cost associated with unnecessary
    // content serialization throughout the lifetime of a non-erroring
    // application.
    return select(editorStore).getEditedPostContent();
  } catch (error) {}
}
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
class ErrorBoundary extends Component {
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
    const {
      error
    } = this.state;
    if (!error) {
      return this.props.children;
    }
    const actions = [/*#__PURE__*/_jsx(CopyButton, {
      text: getContent,
      children: __('Copy Post Text')
    }, "copy-post"), /*#__PURE__*/_jsx(CopyButton, {
      text: error.stack,
      children: __('Copy Error')
    }, "copy-error")];
    return /*#__PURE__*/_jsx(Warning, {
      className: "editor-error-boundary",
      actions: actions,
      children: __('The editor has encountered an unexpected error.')
    });
  }
}

/**
 * ErrorBoundary is used to catch JavaScript errors anywhere in a child component tree, log those errors, and display a fallback UI.
 *
 * It uses the lifecycle methods getDerivedStateFromError and componentDidCatch to catch errors in a child component tree.
 *
 * getDerivedStateFromError is used to render a fallback UI after an error has been thrown, and componentDidCatch is used to log error information.
 *
 * @class ErrorBoundary
 * @augments Component
 */
export default ErrorBoundary;
//# sourceMappingURL=index.js.map
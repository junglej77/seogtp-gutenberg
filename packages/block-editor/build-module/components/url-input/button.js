/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { link, keyboardReturn, arrowLeft } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import URLInput from './';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
class URLInputButton extends Component {
  constructor() {
    super(...arguments);
    this.toggle = this.toggle.bind(this);
    this.submitLink = this.submitLink.bind(this);
    this.state = {
      expanded: false
    };
  }
  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }
  submitLink(event) {
    event.preventDefault();
    this.toggle();
  }
  render() {
    const {
      url,
      onChange
    } = this.props;
    const {
      expanded
    } = this.state;
    const buttonLabel = url ? __('Edit link') : __('Insert link');
    return /*#__PURE__*/_jsxs("div", {
      className: "block-editor-url-input__button",
      children: [/*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        icon: link,
        label: buttonLabel,
        onClick: this.toggle,
        className: "components-toolbar__control",
        isPressed: !!url
      }), expanded && /*#__PURE__*/_jsx("form", {
        className: "block-editor-url-input__button-modal",
        onSubmit: this.submitLink,
        children: /*#__PURE__*/_jsxs("div", {
          className: "block-editor-url-input__button-modal-line",
          children: [/*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            className: "block-editor-url-input__back",
            icon: arrowLeft,
            label: __('Close'),
            onClick: this.toggle
          }), /*#__PURE__*/_jsx(URLInput, {
            value: url || '',
            onChange: onChange
          }), /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            icon: keyboardReturn,
            label: __('Submit'),
            type: "submit"
          })]
        })
      })]
    });
  }
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/url-input/README.md
 */
export default URLInputButton;
//# sourceMappingURL=button.js.map
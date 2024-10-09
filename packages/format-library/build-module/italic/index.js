/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut, __unstableRichTextInputEvent } from '@wordpress/block-editor';
import { formatItalic } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const name = 'core/italic';
const title = __('Italic');
export const italic = {
  name,
  title,
  tagName: 'em',
  className: null,
  edit({
    isActive,
    value,
    onChange,
    onFocus
  }) {
    function onToggle() {
      onChange(toggleFormat(value, {
        type: name,
        title
      }));
    }
    function onClick() {
      onChange(toggleFormat(value, {
        type: name
      }));
      onFocus();
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(RichTextShortcut, {
        type: "primary",
        character: "i",
        onUse: onToggle
      }), /*#__PURE__*/_jsx(RichTextToolbarButton, {
        name: "italic",
        icon: formatItalic,
        title: title,
        onClick: onClick,
        isActive: isActive,
        shortcutType: "primary",
        shortcutCharacter: "i"
      }), /*#__PURE__*/_jsx(__unstableRichTextInputEvent, {
        inputType: "formatItalic",
        onInput: onToggle
      })]
    });
  }
};
//# sourceMappingURL=index.js.map
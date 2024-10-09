/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut, __unstableRichTextInputEvent } from '@wordpress/block-editor';
import { formatBold } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const name = 'core/bold';
const title = __('Bold');
export const bold = {
  name,
  title,
  tagName: 'strong',
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
        character: "b",
        onUse: onToggle
      }), /*#__PURE__*/_jsx(RichTextToolbarButton, {
        name: "bold",
        icon: formatBold,
        title: title,
        onClick: onClick,
        isActive: isActive,
        shortcutType: "primary",
        shortcutCharacter: "b"
      }), /*#__PURE__*/_jsx(__unstableRichTextInputEvent, {
        inputType: "formatBold",
        onInput: onToggle
      })]
    });
  }
};
//# sourceMappingURL=index.js.map
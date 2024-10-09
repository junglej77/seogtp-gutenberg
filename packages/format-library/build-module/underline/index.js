/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextShortcut, __unstableRichTextInputEvent } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const name = 'core/underline';
const title = __('Underline');
export const underline = {
  name,
  title,
  tagName: 'span',
  className: null,
  attributes: {
    style: 'style'
  },
  edit({
    value,
    onChange
  }) {
    const onToggle = () => {
      onChange(toggleFormat(value, {
        type: name,
        attributes: {
          style: 'text-decoration: underline;'
        },
        title
      }));
    };
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(RichTextShortcut, {
        type: "primary",
        character: "u",
        onUse: onToggle
      }), /*#__PURE__*/_jsx(__unstableRichTextInputEvent, {
        inputType: "formatUnderline",
        onInput: onToggle
      })]
    });
  }
};
//# sourceMappingURL=index.js.map
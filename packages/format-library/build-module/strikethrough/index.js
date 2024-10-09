/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/block-editor';
import { formatStrikethrough } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const name = 'core/strikethrough';
const title = __('Strikethrough');
export const strikethrough = {
  name,
  title,
  tagName: 's',
  className: null,
  edit({
    isActive,
    value,
    onChange,
    onFocus
  }) {
    function onClick() {
      onChange(toggleFormat(value, {
        type: name,
        title
      }));
      onFocus();
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(RichTextShortcut, {
        type: "access",
        character: "d",
        onUse: onClick
      }), /*#__PURE__*/_jsx(RichTextToolbarButton, {
        icon: formatStrikethrough,
        title: title,
        onClick: onClick,
        isActive: isActive,
        role: "menuitemcheckbox"
      })]
    });
  }
};
//# sourceMappingURL=index.js.map
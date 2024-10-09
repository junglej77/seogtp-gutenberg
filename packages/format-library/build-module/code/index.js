/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat, remove, applyFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/block-editor';
import { code as codeIcon } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const name = 'core/code';
const title = __('Inline code');
export const code = {
  name,
  title,
  tagName: 'code',
  className: null,
  __unstableInputRule(value) {
    const BACKTICK = '`';
    const {
      start,
      text
    } = value;
    const characterBefore = text[start - 1];

    // Quick check the text for the necessary character.
    if (characterBefore !== BACKTICK) {
      return value;
    }
    if (start - 2 < 0) {
      return value;
    }
    const indexBefore = text.lastIndexOf(BACKTICK, start - 2);
    if (indexBefore === -1) {
      return value;
    }
    const startIndex = indexBefore;
    const endIndex = start - 2;
    if (startIndex === endIndex) {
      return value;
    }
    value = remove(value, startIndex, startIndex + 1);
    value = remove(value, endIndex, endIndex + 1);
    value = applyFormat(value, {
      type: name
    }, startIndex, endIndex);
    return value;
  },
  edit({
    value,
    onChange,
    onFocus,
    isActive
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
        character: "x",
        onUse: onClick
      }), /*#__PURE__*/_jsx(RichTextToolbarButton, {
        icon: codeIcon,
        title: title,
        onClick: onClick,
        isActive: isActive,
        role: "menuitemcheckbox"
      })]
    });
  }
};
//# sourceMappingURL=index.js.map
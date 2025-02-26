/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { superscript as superscriptIcon } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
const name = 'core/superscript';
const title = __('Superscript');
export const superscript = {
  name,
  title,
  tagName: 'sup',
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
      onToggle();
      onFocus();
    }
    return /*#__PURE__*/_jsx(RichTextToolbarButton, {
      icon: superscriptIcon,
      title: title,
      onClick: onClick,
      isActive: isActive,
      role: "menuitemcheckbox"
    });
  }
};
//# sourceMappingURL=index.js.map
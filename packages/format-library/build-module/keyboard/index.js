/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { button } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
const name = 'core/keyboard';
const title = __('Keyboard input');
export const keyboard = {
  name,
  title,
  tagName: 'kbd',
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
      icon: button,
      title: title,
      onClick: onClick,
      isActive: isActive,
      role: "menuitemcheckbox"
    });
  }
};
//# sourceMappingURL=index.js.map
/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { MenuItem } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';
import { plus } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
export const LinkControlSearchCreate = ({
  searchTerm,
  onClick,
  itemProps,
  buttonText
}) => {
  if (!searchTerm) {
    return null;
  }
  let text;
  if (buttonText) {
    text = typeof buttonText === 'function' ? buttonText(searchTerm) : buttonText;
  } else {
    text = createInterpolateElement(sprintf( /* translators: %s: search term. */
    __('Create: <mark>%s</mark>'), searchTerm), {
      mark: /*#__PURE__*/_jsx("mark", {})
    });
  }
  return /*#__PURE__*/_jsx(MenuItem, {
    ...itemProps,
    iconPosition: "left",
    icon: plus,
    className: "block-editor-link-control__search-item",
    onClick: onClick,
    children: text
  });
};
export default LinkControlSearchCreate;
//# sourceMappingURL=search-create-button.js.map
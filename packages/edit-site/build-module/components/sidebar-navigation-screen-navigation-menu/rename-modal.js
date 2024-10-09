/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __experimentalVStack as VStack, Button, TextControl, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const notEmptyString = testString => testString?.trim()?.length > 0;
export default function RenameModal({
  menuTitle,
  onClose,
  onSave
}) {
  const [editedMenuTitle, setEditedMenuTitle] = useState(menuTitle);
  const titleHasChanged = editedMenuTitle !== menuTitle;
  const isEditedMenuTitleValid = titleHasChanged && notEmptyString(editedMenuTitle);
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Rename'),
    onRequestClose: onClose,
    focusOnMount: "firstContentElement",
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      className: "sidebar-navigation__rename-modal-form",
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "3",
        children: [/*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          value: editedMenuTitle,
          placeholder: __('Navigation title'),
          onChange: setEditedMenuTitle,
          label: __('Name')
        }), /*#__PURE__*/_jsxs(HStack, {
          justify: "right",
          children: [/*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: onClose,
            children: __('Cancel')
          }), /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            accessibleWhenDisabled: true,
            disabled: !isEditedMenuTitleValid,
            variant: "primary",
            type: "submit",
            onClick: e => {
              e.preventDefault();
              if (!isEditedMenuTitleValid) {
                return;
              }
              onSave({
                title: editedMenuTitle
              });

              // Immediate close avoids ability to hit save multiple times.
              onClose();
            },
            children: __('Save')
          })]
        })]
      })
    })
  });
}
//# sourceMappingURL=rename-modal.js.map
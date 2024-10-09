/**
 * WordPress dependencies
 */
import { __experimentalInputControl as InputControl, __experimentalVStack as VStack, __experimentalHStack as HStack, Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function RenameFontSizeDialog({
  fontSize,
  toggleOpen,
  handleRename
}) {
  const [newName, setNewName] = useState(fontSize.name);
  const handleConfirm = () => {
    // If the new name is not empty, call the handleRename function
    if (newName.trim()) {
      handleRename(newName);
    }
    toggleOpen();
  };
  return /*#__PURE__*/_jsx(Modal, {
    onRequestClose: toggleOpen,
    focusOnMount: "firstContentElement",
    title: __('Rename'),
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: event => {
        event.preventDefault();
        handleConfirm();
        toggleOpen();
      },
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "3",
        children: [/*#__PURE__*/_jsx(InputControl, {
          __next40pxDefaultSize: true,
          autoComplete: "off",
          value: newName,
          onChange: setNewName,
          label: __('Name'),
          placeholder: __('Font size preset name')
        }), /*#__PURE__*/_jsxs(HStack, {
          justify: "right",
          children: [/*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: toggleOpen,
            children: __('Cancel')
          }), /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "primary",
            type: "submit",
            children: __('Save')
          })]
        })]
      })
    })
  });
}
export default RenameFontSizeDialog;
//# sourceMappingURL=rename-font-size-dialog.js.map
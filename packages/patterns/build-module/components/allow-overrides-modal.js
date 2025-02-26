/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __experimentalVStack as VStack, Button, __experimentalText as Text, TextControl, Modal } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useState, useId } from '@wordpress/element';
import { speak } from '@wordpress/a11y';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function AllowOverridesModal({
  placeholder,
  initialName = '',
  onClose,
  onSave
}) {
  const [editedBlockName, setEditedBlockName] = useState(initialName);
  const descriptionId = useId();
  const isNameValid = !!editedBlockName.trim();
  const handleSubmit = () => {
    if (editedBlockName !== initialName) {
      const message = sprintf( /* translators: %s: new name/label for the block */
      __('Block name changed to: "%s".'), editedBlockName);

      // Must be assertive to immediately announce change.
      speak(message, 'assertive');
    }
    onSave(editedBlockName);

    // Immediate close avoids ability to hit save multiple times.
    onClose();
  };
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Enable overrides'),
    onRequestClose: onClose,
    focusOnMount: "firstContentElement",
    aria: {
      describedby: descriptionId
    },
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: event => {
        event.preventDefault();
        if (!isNameValid) {
          return;
        }
        handleSubmit();
      },
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "6",
        children: [/*#__PURE__*/_jsx(Text, {
          id: descriptionId,
          children: __('Overrides are changes you make to a block within a synced pattern instance. Use overrides to customize a synced pattern instance to suit its new context. Name this block to specify an override.')
        }), /*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          value: editedBlockName,
          label: __('Name'),
          help: __('For example, if you are creating a recipe pattern, you use "Recipe Title", "Recipe Description", etc.'),
          placeholder: placeholder,
          onChange: setEditedBlockName
        }), /*#__PURE__*/_jsxs(HStack, {
          justify: "right",
          children: [/*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: onClose,
            children: __('Cancel')
          }), /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            "aria-disabled": !isNameValid,
            variant: "primary",
            type: "submit",
            children: __('Enable')
          })]
        })]
      })
    })
  });
}
export function DisallowOverridesModal({
  onClose,
  onSave
}) {
  const descriptionId = useId();
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Disable overrides'),
    onRequestClose: onClose,
    aria: {
      describedby: descriptionId
    },
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: event => {
        event.preventDefault();
        onSave();
        onClose();
      },
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "6",
        children: [/*#__PURE__*/_jsx(Text, {
          id: descriptionId,
          children: __('Are you sure you want to disable overrides? Disabling overrides will revert all applied overrides for this block throughout instances of this pattern.')
        }), /*#__PURE__*/_jsxs(HStack, {
          justify: "right",
          children: [/*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: onClose,
            children: __('Cancel')
          }), /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "primary",
            type: "submit",
            children: __('Disable')
          })]
        })]
      })
    })
  });
}
//# sourceMappingURL=allow-overrides-modal.js.map
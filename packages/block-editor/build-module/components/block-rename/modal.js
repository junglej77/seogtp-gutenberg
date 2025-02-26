/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __experimentalVStack as VStack, Button, TextControl, Modal } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import isEmptyString from './is-empty-string';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BlockRenameModal({
  blockName,
  originalBlockName,
  onClose,
  onSave,
  // Pattern Overrides is a WordPress-only feature but it also uses the Block Binding API.
  // Ideally this should not be inside the block editor package, but we keep it here for simplicity.
  hasOverridesWarning
}) {
  const [editedBlockName, setEditedBlockName] = useState(blockName);
  const nameHasChanged = editedBlockName !== blockName;
  const nameIsOriginal = editedBlockName === originalBlockName;
  const nameIsEmpty = isEmptyString(editedBlockName);
  const isNameValid = nameHasChanged || nameIsOriginal;
  const autoSelectInputText = event => event.target.select();
  const handleSubmit = () => {
    const message = nameIsOriginal || nameIsEmpty ? sprintf( /* translators: %s: new name/label for the block */
    __('Block name reset to: "%s".'), editedBlockName) : sprintf( /* translators: %s: new name/label for the block */
    __('Block name changed to: "%s".'), editedBlockName);

    // Must be assertive to immediately announce change.
    speak(message, 'assertive');
    onSave(editedBlockName);

    // Immediate close avoids ability to hit save multiple times.
    onClose();
  };
  return /*#__PURE__*/_jsx(Modal, {
    title: __('Rename'),
    onRequestClose: onClose,
    overlayClassName: "block-editor-block-rename-modal",
    focusOnMount: "firstContentElement",
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: e => {
        e.preventDefault();
        if (!isNameValid) {
          return;
        }
        handleSubmit();
      },
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "3",
        children: [/*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          value: editedBlockName,
          label: __('Name'),
          help: hasOverridesWarning ? __('This block allows overrides. Changing the name can cause problems with content entered into instances of this pattern.') : undefined,
          placeholder: originalBlockName,
          onChange: setEditedBlockName,
          onFocus: autoSelectInputText
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
            children: __('Save')
          })]
        })]
      })
    })
  });
}
//# sourceMappingURL=modal.js.map
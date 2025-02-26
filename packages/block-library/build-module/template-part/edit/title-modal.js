/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { TextControl, Button, Modal, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TitleModal({
  areaLabel,
  onClose,
  onSubmit
}) {
  // Restructure onCreate to set the blocks on local state.
  // Add modal to confirm title and trigger onCreate.
  const [title, setTitle] = useState('');
  const submitForCreation = event => {
    event.preventDefault();
    onSubmit(title);
  };
  return /*#__PURE__*/_jsx(Modal, {
    title: sprintf(
    // Translators: %s as template part area title ("Header", "Footer", etc.).
    __('Create new %s'), areaLabel.toLowerCase()),
    onRequestClose: onClose,
    focusOnMount: "firstContentElement",
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: submitForCreation,
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "5",
        children: [/*#__PURE__*/_jsx(TextControl, {
          label: __('Name'),
          value: title,
          onChange: setTitle,
          placeholder: __('Custom Template Part'),
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true
        }), /*#__PURE__*/_jsxs(HStack, {
          justify: "right",
          children: [/*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: () => {
              onClose();
              setTitle('');
            },
            children: __('Cancel')
          }), /*#__PURE__*/_jsx(Button, {
            variant: "primary",
            type: "submit",
            accessibleWhenDisabled: true,
            disabled: !title.length,
            __next40pxDefaultSize: true,
            children: __('Create')
          })]
        })]
      })
    })
  });
}
//# sourceMappingURL=title-modal.js.map
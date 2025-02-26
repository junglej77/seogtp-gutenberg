/**
 * WordPress dependencies
 */
import { Button, Modal } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const convertDescription = __("This Navigation Menu displays your website's pages. Editing it will enable you to add, delete, or reorder pages. However, new pages will no longer be added automatically.");
export function ConvertToLinksModal({
  onClick,
  onClose,
  disabled
}) {
  return /*#__PURE__*/_jsxs(Modal, {
    onRequestClose: onClose,
    title: __('Edit Page List'),
    className: "wp-block-page-list-modal",
    aria: {
      describedby: useInstanceId(ConvertToLinksModal, 'wp-block-page-list-modal__description')
    },
    children: [/*#__PURE__*/_jsx("p", {
      id: useInstanceId(ConvertToLinksModal, 'wp-block-page-list-modal__description'),
      children: convertDescription
    }), /*#__PURE__*/_jsxs("div", {
      className: "wp-block-page-list-modal-buttons",
      children: [/*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        variant: "tertiary",
        onClick: onClose,
        children: __('Cancel')
      }), /*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        variant: "primary",
        accessibleWhenDisabled: true,
        disabled: disabled,
        onClick: onClick,
        children: __('Edit')
      })]
    })]
  });
}
//# sourceMappingURL=convert-to-links-modal.js.map
/**
 * WordPress dependencies
 */
import { __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export default function DeleteConfirmDialog({
  onClose,
  onConfirm
}) {
  return /*#__PURE__*/_jsx(ConfirmDialog, {
    isOpen: true,
    onConfirm: () => {
      onConfirm();

      // Immediate close avoids ability to hit delete multiple times.
      onClose();
    },
    onCancel: onClose,
    confirmButtonText: __('Delete'),
    size: "medium",
    children: __('Are you sure you want to delete this Navigation Menu?')
  });
}
//# sourceMappingURL=delete-confirm-dialog.js.map
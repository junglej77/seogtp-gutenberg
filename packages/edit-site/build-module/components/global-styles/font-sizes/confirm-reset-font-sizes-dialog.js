/**
 * WordPress dependencies
 */
import { __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
function ConfirmResetFontSizesDialog({
  text,
  confirmButtonText,
  isOpen,
  toggleOpen,
  onConfirm
}) {
  const handleConfirm = async () => {
    toggleOpen();
    onConfirm();
  };
  const handleCancel = () => {
    toggleOpen();
  };
  return /*#__PURE__*/_jsx(ConfirmDialog, {
    isOpen: isOpen,
    cancelButtonText: __('Cancel'),
    confirmButtonText: confirmButtonText,
    onCancel: handleCancel,
    onConfirm: handleConfirm,
    size: "medium",
    children: text
  });
}
export default ConfirmResetFontSizesDialog;
//# sourceMappingURL=confirm-reset-font-sizes-dialog.js.map
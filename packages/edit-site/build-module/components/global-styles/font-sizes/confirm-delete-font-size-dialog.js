/**
 * WordPress dependencies
 */
import { __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
function ConfirmDeleteFontSizeDialog({
  fontSize,
  isOpen,
  toggleOpen,
  handleRemoveFontSize
}) {
  const handleConfirm = async () => {
    toggleOpen();
    handleRemoveFontSize(fontSize);
  };
  const handleCancel = () => {
    toggleOpen();
  };
  return /*#__PURE__*/_jsx(ConfirmDialog, {
    isOpen: isOpen,
    cancelButtonText: __('Cancel'),
    confirmButtonText: __('Delete'),
    onCancel: handleCancel,
    onConfirm: handleConfirm,
    size: "medium",
    children: fontSize && sprintf( /* translators: %s: Name of the font size preset. */
    __('Are you sure you want to delete "%s" font size preset?'), fontSize.name)
  });
}
export default ConfirmDeleteFontSizeDialog;
//# sourceMappingURL=confirm-delete-font-size-dialog.js.map
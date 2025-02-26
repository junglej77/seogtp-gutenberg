/**
 * WordPress dependencies
 */
import { Notice, __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TemplateValidationNotice() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const isValid = useSelect(select => {
    return select(blockEditorStore).isValidTemplate();
  }, []);
  const {
    setTemplateValidity,
    synchronizeTemplate
  } = useDispatch(blockEditorStore);
  if (isValid) {
    return null;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Notice, {
      className: "editor-template-validation-notice",
      isDismissible: false,
      status: "warning",
      actions: [{
        label: __('Keep it as is'),
        onClick: () => setTemplateValidity(true)
      }, {
        label: __('Reset the template'),
        onClick: () => setShowConfirmDialog(true)
      }],
      children: __('The content of your post doesn’t match the template assigned to your post type.')
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: showConfirmDialog,
      confirmButtonText: __('Reset'),
      onConfirm: () => {
        setShowConfirmDialog(false);
        synchronizeTemplate();
      },
      onCancel: () => setShowConfirmDialog(false),
      size: "medium",
      children: __('Resetting the template may result in loss of content, do you want to continue?')
    })]
  });
}
//# sourceMappingURL=index.js.map
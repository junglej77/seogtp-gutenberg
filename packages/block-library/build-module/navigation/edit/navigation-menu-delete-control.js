/**
 * WordPress dependencies
 */
import { Button, __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { store as coreStore, useEntityId } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function NavigationMenuDeleteControl({
  onDelete
}) {
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const id = useEntityId('postType', 'wp_navigation');
  const {
    deleteEntityRecord
  } = useDispatch(coreStore);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      __next40pxDefaultSize: true,
      className: "wp-block-navigation-delete-menu-button",
      variant: "secondary",
      isDestructive: true,
      onClick: () => {
        setIsConfirmDialogVisible(true);
      },
      children: __('Delete menu')
    }), isConfirmDialogVisible && /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: true,
      onConfirm: () => {
        deleteEntityRecord('postType', 'wp_navigation', id, {
          force: true
        });
        onDelete();
      },
      onCancel: () => {
        setIsConfirmDialogVisible(false);
      },
      confirmButtonText: __('Delete'),
      size: "medium",
      children: __('Are you sure you want to delete this Navigation Menu?')
    })]
  });
}
//# sourceMappingURL=navigation-menu-delete-control.js.map
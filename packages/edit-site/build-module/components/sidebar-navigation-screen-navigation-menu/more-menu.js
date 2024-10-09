/**
 * WordPress dependencies
 */
import { DropdownMenu, MenuItem, MenuGroup } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import RenameModal from './rename-modal';
import DeleteConfirmDialog from './delete-confirm-dialog';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useHistory
} = unlock(routerPrivateApis);
const POPOVER_PROPS = {
  position: 'bottom right'
};
export default function ScreenNavigationMoreMenu(props) {
  const {
    onDelete,
    onSave,
    onDuplicate,
    menuTitle,
    menuId
  } = props;
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const history = useHistory();
  const closeModals = () => {
    setRenameModalOpen(false);
    setDeleteConfirmDialogOpen(false);
  };
  const openRenameModal = () => setRenameModalOpen(true);
  const openDeleteConfirmDialog = () => setDeleteConfirmDialogOpen(true);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(DropdownMenu, {
      className: "sidebar-navigation__more-menu",
      label: __('Actions'),
      icon: moreVertical,
      popoverProps: POPOVER_PROPS,
      children: ({
        onClose
      }) => /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsxs(MenuGroup, {
          children: [/*#__PURE__*/_jsx(MenuItem, {
            onClick: () => {
              openRenameModal();
              // Close the dropdown after opening the modal.
              onClose();
            },
            children: __('Rename')
          }), /*#__PURE__*/_jsx(MenuItem, {
            onClick: () => {
              history.push({
                postId: menuId,
                postType: 'wp_navigation',
                canvas: 'edit'
              });
            },
            children: __('Edit')
          }), /*#__PURE__*/_jsx(MenuItem, {
            onClick: () => {
              onDuplicate();
              onClose();
            },
            children: __('Duplicate')
          }), /*#__PURE__*/_jsx(MenuItem, {
            isDestructive: true,
            onClick: () => {
              openDeleteConfirmDialog();

              // Close the dropdown after opening the modal.
              onClose();
            },
            children: __('Delete')
          })]
        })
      })
    }), deleteConfirmDialogOpen && /*#__PURE__*/_jsx(DeleteConfirmDialog, {
      onClose: closeModals,
      onConfirm: onDelete
    }), renameModalOpen && /*#__PURE__*/_jsx(RenameModal, {
      onClose: closeModals,
      menuTitle: menuTitle,
      onSave: onSave
    })]
  });
}
//# sourceMappingURL=more-menu.js.map
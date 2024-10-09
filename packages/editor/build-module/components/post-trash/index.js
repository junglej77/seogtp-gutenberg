/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostTrashCheck from './check';

/**
 * Displays the Post Trash Button and Confirm Dialog in the Editor.
 *
 * @return {JSX.Element|null} The rendered PostTrash component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostTrash() {
  const {
    isNew,
    isDeleting,
    postId,
    title
  } = useSelect(select => {
    const store = select(editorStore);
    return {
      isNew: store.isEditedPostNew(),
      isDeleting: store.isDeletingPost(),
      postId: store.getCurrentPostId(),
      title: store.getCurrentPostAttribute('title')
    };
  }, []);
  const {
    trashPost
  } = useDispatch(editorStore);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  if (isNew || !postId) {
    return null;
  }
  const handleConfirm = () => {
    setShowConfirmDialog(false);
    trashPost();
  };
  return /*#__PURE__*/_jsxs(PostTrashCheck, {
    children: [/*#__PURE__*/_jsx(Button, {
      __next40pxDefaultSize: true,
      className: "editor-post-trash",
      isDestructive: true,
      variant: "secondary",
      isBusy: isDeleting,
      "aria-disabled": isDeleting,
      onClick: isDeleting ? undefined : () => setShowConfirmDialog(true),
      children: __('Move to trash')
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: showConfirmDialog,
      onConfirm: handleConfirm,
      onCancel: () => setShowConfirmDialog(false),
      confirmButtonText: __('Move to trash'),
      size: "small",
      children: sprintf(
      // translators: %s: The item's title.
      __('Are you sure you want to move "%s" to the trash?'), title)
    })]
  });
}
//# sourceMappingURL=index.js.map
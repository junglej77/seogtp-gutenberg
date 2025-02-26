/**
 * WordPress dependencies
 */
import { Button, __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

/**
 * Renders a button component that allows the user to switch a post to draft status.
 *
 * @return {JSX.Element} The rendered component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostSwitchToDraftButton() {
  deprecated('wp.editor.PostSwitchToDraftButton', {
    since: '6.7',
    version: '6.9'
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const {
    editPost,
    savePost
  } = useDispatch(editorStore);
  const {
    isSaving,
    isPublished,
    isScheduled
  } = useSelect(select => {
    const {
      isSavingPost,
      isCurrentPostPublished,
      isCurrentPostScheduled
    } = select(editorStore);
    return {
      isSaving: isSavingPost(),
      isPublished: isCurrentPostPublished(),
      isScheduled: isCurrentPostScheduled()
    };
  }, []);
  const isDisabled = isSaving || !isPublished && !isScheduled;
  let alertMessage;
  let confirmButtonText;
  if (isPublished) {
    alertMessage = __('Are you sure you want to unpublish this post?');
    confirmButtonText = __('Unpublish');
  } else if (isScheduled) {
    alertMessage = __('Are you sure you want to unschedule this post?');
    confirmButtonText = __('Unschedule');
  }
  const handleConfirm = () => {
    setShowConfirmDialog(false);
    editPost({
      status: 'draft'
    });
    savePost();
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      __next40pxDefaultSize: true,
      className: "editor-post-switch-to-draft",
      onClick: () => {
        if (!isDisabled) {
          setShowConfirmDialog(true);
        }
      },
      "aria-disabled": isDisabled,
      variant: "secondary",
      style: {
        flexGrow: '1',
        justifyContent: 'center'
      },
      children: __('Switch to draft')
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: showConfirmDialog,
      onConfirm: handleConfirm,
      onCancel: () => setShowConfirmDialog(false),
      confirmButtonText: confirmButtonText,
      children: alertMessage
    })]
  });
}
//# sourceMappingURL=index.js.map
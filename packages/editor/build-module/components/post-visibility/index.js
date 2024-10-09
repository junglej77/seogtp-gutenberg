/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { VisuallyHidden, __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { visibilityOptions } from './utils';
import { store as editorStore } from '../../store';

/**
 * Allows users to set the visibility of a post.
 *
 * @param {Object}   props         The component props.
 * @param {Function} props.onClose Function to call when the popover is closed.
 * @return {JSX.Element} The rendered component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostVisibility({
  onClose
}) {
  const instanceId = useInstanceId(PostVisibility);
  const {
    status,
    visibility,
    password
  } = useSelect(select => ({
    status: select(editorStore).getEditedPostAttribute('status'),
    visibility: select(editorStore).getEditedPostVisibility(),
    password: select(editorStore).getEditedPostAttribute('password')
  }));
  const {
    editPost,
    savePost
  } = useDispatch(editorStore);
  const [hasPassword, setHasPassword] = useState(!!password);
  const [showPrivateConfirmDialog, setShowPrivateConfirmDialog] = useState(false);
  const setPublic = () => {
    editPost({
      status: visibility === 'private' ? 'draft' : status,
      password: ''
    });
    setHasPassword(false);
  };
  const setPrivate = () => {
    setShowPrivateConfirmDialog(true);
  };
  const confirmPrivate = () => {
    editPost({
      status: 'private',
      password: ''
    });
    setHasPassword(false);
    setShowPrivateConfirmDialog(false);
    savePost();
  };
  const handleDialogCancel = () => {
    setShowPrivateConfirmDialog(false);
  };
  const setPasswordProtected = () => {
    editPost({
      status: visibility === 'private' ? 'draft' : status,
      password: password || ''
    });
    setHasPassword(true);
  };
  const updatePassword = event => {
    editPost({
      password: event.target.value
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-post-visibility",
    children: [/*#__PURE__*/_jsx(InspectorPopoverHeader, {
      title: __('Visibility'),
      help: __('Control how this post is viewed.'),
      onClose: onClose
    }), /*#__PURE__*/_jsxs("fieldset", {
      className: "editor-post-visibility__fieldset",
      children: [/*#__PURE__*/_jsx(VisuallyHidden, {
        as: "legend",
        children: __('Visibility')
      }), /*#__PURE__*/_jsx(PostVisibilityChoice, {
        instanceId: instanceId,
        value: "public",
        label: visibilityOptions.public.label,
        info: visibilityOptions.public.info,
        checked: visibility === 'public' && !hasPassword,
        onChange: setPublic
      }), /*#__PURE__*/_jsx(PostVisibilityChoice, {
        instanceId: instanceId,
        value: "private",
        label: visibilityOptions.private.label,
        info: visibilityOptions.private.info,
        checked: visibility === 'private',
        onChange: setPrivate
      }), /*#__PURE__*/_jsx(PostVisibilityChoice, {
        instanceId: instanceId,
        value: "password",
        label: visibilityOptions.password.label,
        info: visibilityOptions.password.info,
        checked: hasPassword,
        onChange: setPasswordProtected
      }), hasPassword && /*#__PURE__*/_jsxs("div", {
        className: "editor-post-visibility__password",
        children: [/*#__PURE__*/_jsx(VisuallyHidden, {
          as: "label",
          htmlFor: `editor-post-visibility__password-input-${instanceId}`,
          children: __('Create password')
        }), /*#__PURE__*/_jsx("input", {
          className: "editor-post-visibility__password-input",
          id: `editor-post-visibility__password-input-${instanceId}`,
          type: "text",
          onChange: updatePassword,
          value: password,
          placeholder: __('Use a secure password')
        })]
      })]
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: showPrivateConfirmDialog,
      onConfirm: confirmPrivate,
      onCancel: handleDialogCancel,
      confirmButtonText: __('Publish'),
      size: "medium",
      children: __('Would you like to privately publish this post now?')
    })]
  });
}
function PostVisibilityChoice({
  instanceId,
  value,
  label,
  info,
  ...props
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-post-visibility__choice",
    children: [/*#__PURE__*/_jsx("input", {
      type: "radio",
      name: `editor-post-visibility__setting-${instanceId}`,
      value: value,
      id: `editor-post-${value}-${instanceId}`,
      "aria-describedby": `editor-post-${value}-${instanceId}-description`,
      className: "editor-post-visibility__radio",
      ...props
    }), /*#__PURE__*/_jsx("label", {
      htmlFor: `editor-post-${value}-${instanceId}`,
      className: "editor-post-visibility__label",
      children: label
    }), /*#__PURE__*/_jsx("p", {
      id: `editor-post-${value}-${instanceId}-description`,
      className: "editor-post-visibility__info",
      children: info
    })]
  });
}
//# sourceMappingURL=index.js.map
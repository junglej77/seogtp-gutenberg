/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Modal, Button, ExternalLink, __experimentalHStack as HStack } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, createInterpolateElement } from '@wordpress/element';
import { addAction, removeAction } from '@wordpress/hooks';
import { useInstanceId } from '@wordpress/compose';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

/**
 * A modal component that is displayed when a post is locked for editing by another user.
 * The modal provides information about the lock status and options to take over or exit the editor.
 *
 * @return {JSX.Element|null} The rendered PostLockedModal component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostLockedModal() {
  const instanceId = useInstanceId(PostLockedModal);
  const hookName = 'core/editor/post-locked-modal-' + instanceId;
  const {
    autosave,
    updatePostLock
  } = useDispatch(editorStore);
  const {
    isLocked,
    isTakeover,
    user,
    postId,
    postLockUtils,
    activePostLock,
    postType,
    previewLink
  } = useSelect(select => {
    const {
      isPostLocked,
      isPostLockTakeover,
      getPostLockUser,
      getCurrentPostId,
      getActivePostLock,
      getEditedPostAttribute,
      getEditedPostPreviewLink,
      getEditorSettings
    } = select(editorStore);
    const {
      getPostType
    } = select(coreStore);
    return {
      isLocked: isPostLocked(),
      isTakeover: isPostLockTakeover(),
      user: getPostLockUser(),
      postId: getCurrentPostId(),
      postLockUtils: getEditorSettings().postLockUtils,
      activePostLock: getActivePostLock(),
      postType: getPostType(getEditedPostAttribute('type')),
      previewLink: getEditedPostPreviewLink()
    };
  }, []);
  useEffect(() => {
    /**
     * Keep the lock refreshed.
     *
     * When the user does not send a heartbeat in a heartbeat-tick
     * the user is no longer editing and another user can start editing.
     *
     * @param {Object} data Data to send in the heartbeat request.
     */
    function sendPostLock(data) {
      if (isLocked) {
        return;
      }
      data['wp-refresh-post-lock'] = {
        lock: activePostLock,
        post_id: postId
      };
    }

    /**
     * Refresh post locks: update the lock string or show the dialog if somebody has taken over editing.
     *
     * @param {Object} data Data received in the heartbeat request
     */
    function receivePostLock(data) {
      if (!data['wp-refresh-post-lock']) {
        return;
      }
      const received = data['wp-refresh-post-lock'];
      if (received.lock_error) {
        // Auto save and display the takeover modal.
        autosave();
        updatePostLock({
          isLocked: true,
          isTakeover: true,
          user: {
            name: received.lock_error.name,
            avatar: received.lock_error.avatar_src_2x
          }
        });
      } else if (received.new_lock) {
        updatePostLock({
          isLocked: false,
          activePostLock: received.new_lock
        });
      }
    }

    /**
     * Unlock the post before the window is exited.
     */
    function releasePostLock() {
      if (isLocked || !activePostLock) {
        return;
      }
      const data = new window.FormData();
      data.append('action', 'wp-remove-post-lock');
      data.append('_wpnonce', postLockUtils.unlockNonce);
      data.append('post_ID', postId);
      data.append('active_post_lock', activePostLock);
      if (window.navigator.sendBeacon) {
        window.navigator.sendBeacon(postLockUtils.ajaxUrl, data);
      } else {
        const xhr = new window.XMLHttpRequest();
        xhr.open('POST', postLockUtils.ajaxUrl, false);
        xhr.send(data);
      }
    }

    // Details on these events on the Heartbeat API docs
    // https://developer.wordpress.org/plugins/javascript/heartbeat-api/
    addAction('heartbeat.send', hookName, sendPostLock);
    addAction('heartbeat.tick', hookName, receivePostLock);
    window.addEventListener('beforeunload', releasePostLock);
    return () => {
      removeAction('heartbeat.send', hookName);
      removeAction('heartbeat.tick', hookName);
      window.removeEventListener('beforeunload', releasePostLock);
    };
  }, []);
  if (!isLocked) {
    return null;
  }
  const userDisplayName = user.name;
  const userAvatar = user.avatar;
  const unlockUrl = addQueryArgs('post.php', {
    'get-post-lock': '1',
    lockKey: true,
    post: postId,
    action: 'edit',
    _wpnonce: postLockUtils.nonce
  });
  const allPostsUrl = addQueryArgs('edit.php', {
    post_type: postType?.slug
  });
  const allPostsLabel = __('Exit editor');
  return /*#__PURE__*/_jsx(Modal, {
    title: isTakeover ? __('Someone else has taken over this post') : __('This post is already being edited'),
    focusOnMount: true,
    shouldCloseOnClickOutside: false,
    shouldCloseOnEsc: false,
    isDismissible: false
    // Do not remove this class, as this class is used by third party plugins.
    ,
    className: "editor-post-locked-modal",
    size: "medium",
    children: /*#__PURE__*/_jsxs(HStack, {
      alignment: "top",
      spacing: 6,
      children: [!!userAvatar && /*#__PURE__*/_jsx("img", {
        src: userAvatar,
        alt: __('Avatar'),
        className: "editor-post-locked-modal__avatar",
        width: 64,
        height: 64
      }), /*#__PURE__*/_jsxs("div", {
        children: [!!isTakeover && /*#__PURE__*/_jsx("p", {
          children: createInterpolateElement(userDisplayName ? sprintf( /* translators: %s: user's display name */
          __('<strong>%s</strong> now has editing control of this post (<PreviewLink />). Don’t worry, your changes up to this moment have been saved.'), userDisplayName) : __('Another user now has editing control of this post (<PreviewLink />). Don’t worry, your changes up to this moment have been saved.'), {
            strong: /*#__PURE__*/_jsx("strong", {}),
            PreviewLink: /*#__PURE__*/_jsx(ExternalLink, {
              href: previewLink,
              children: __('preview')
            })
          })
        }), !isTakeover && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("p", {
            children: createInterpolateElement(userDisplayName ? sprintf( /* translators: %s: user's display name */
            __('<strong>%s</strong> is currently working on this post (<PreviewLink />), which means you cannot make changes, unless you take over.'), userDisplayName) : __('Another user is currently working on this post (<PreviewLink />), which means you cannot make changes, unless you take over.'), {
              strong: /*#__PURE__*/_jsx("strong", {}),
              PreviewLink: /*#__PURE__*/_jsx(ExternalLink, {
                href: previewLink,
                children: __('preview')
              })
            })
          }), /*#__PURE__*/_jsx("p", {
            children: __('If you take over, the other user will lose editing control to the post, but their changes will be saved.')
          })]
        }), /*#__PURE__*/_jsxs(HStack, {
          className: "editor-post-locked-modal__buttons",
          justify: "flex-end",
          children: [!isTakeover && /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            variant: "tertiary",
            href: unlockUrl,
            children: __('Take over')
          }), /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            variant: "primary",
            href: allPostsUrl,
            children: allPostsLabel
          })]
        })]
      })]
    })
  });
}
//# sourceMappingURL=index.js.map
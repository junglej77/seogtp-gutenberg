/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
import { Warning, store as blockEditorStore, __experimentalGetElementClassName } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const CommentsFormPlaceholder = () => {
  const instanceId = useInstanceId(CommentsFormPlaceholder);
  return /*#__PURE__*/_jsxs("div", {
    className: "comment-respond",
    children: [/*#__PURE__*/_jsx("h3", {
      className: "comment-reply-title",
      children: __('Leave a Reply')
    }), /*#__PURE__*/_jsxs("form", {
      noValidate: true,
      className: "comment-form",
      onSubmit: event => event.preventDefault(),
      children: [/*#__PURE__*/_jsxs("p", {
        children: [/*#__PURE__*/_jsx("label", {
          htmlFor: `comment-${instanceId}`,
          children: __('Comment')
        }), /*#__PURE__*/_jsx("textarea", {
          id: `comment-${instanceId}`,
          name: "comment",
          cols: "45",
          rows: "8",
          readOnly: true
        })]
      }), /*#__PURE__*/_jsx("p", {
        className: "form-submit wp-block-button",
        children: /*#__PURE__*/_jsx("input", {
          name: "submit",
          type: "submit",
          className: clsx('wp-block-button__link', __experimentalGetElementClassName('button')),
          label: __('Post Comment'),
          value: __('Post Comment'),
          "aria-disabled": "true"
        })
      })]
    })]
  });
};
const CommentsForm = ({
  postId,
  postType
}) => {
  const [commentStatus, setCommentStatus] = useEntityProp('postType', postType, 'comment_status', postId);
  const isSiteEditor = postType === undefined || postId === undefined;
  const {
    defaultCommentStatus
  } = useSelect(select => select(blockEditorStore).getSettings().__experimentalDiscussionSettings);
  const postTypeSupportsComments = useSelect(select => postType ? !!select(coreStore).getPostType(postType)?.supports.comments : false);
  if (!isSiteEditor && 'open' !== commentStatus) {
    if ('closed' === commentStatus) {
      const actions = [/*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        onClick: () => setCommentStatus('open'),
        variant: "primary",
        children: _x('Enable comments', 'action that affects the current post')
      }, "enableComments")];
      return /*#__PURE__*/_jsx(Warning, {
        actions: actions,
        children: __('Post Comments Form block: Comments are not enabled for this item.')
      });
    } else if (!postTypeSupportsComments) {
      return /*#__PURE__*/_jsx(Warning, {
        children: sprintf( /* translators: 1: Post type (i.e. "post", "page") */
        __('Post Comments Form block: Comments are not enabled for this post type (%s).'), postType)
      });
    } else if ('open' !== defaultCommentStatus) {
      return /*#__PURE__*/_jsx(Warning, {
        children: __('Post Comments Form block: Comments are not enabled.')
      });
    }
  }
  return /*#__PURE__*/_jsx(CommentsFormPlaceholder, {});
};
export default CommentsForm;
//# sourceMappingURL=form.js.map
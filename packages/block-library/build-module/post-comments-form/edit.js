/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { VisuallyHidden } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CommentsForm from './form';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function PostCommentsFormEdit({
  attributes,
  context,
  setAttributes
}) {
  const {
    textAlign
  } = attributes;
  const {
    postId,
    postType
  } = context;
  const instanceId = useInstanceId(PostCommentsFormEdit);
  const instanceIdDesc = sprintf('comments-form-edit-%d-desc', instanceId);
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    }),
    'aria-describedby': instanceIdDesc
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      group: "block",
      children: /*#__PURE__*/_jsx(AlignmentControl, {
        value: textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      })
    }), /*#__PURE__*/_jsxs("div", {
      ...blockProps,
      children: [/*#__PURE__*/_jsx(CommentsForm, {
        postId: postId,
        postType: postType
      }), /*#__PURE__*/_jsx(VisuallyHidden, {
        id: instanceIdDesc,
        children: __('Comments form disabled in editor.')
      })]
    })]
  });
}
//# sourceMappingURL=edit.js.map
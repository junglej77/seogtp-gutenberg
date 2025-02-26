/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Placeholder, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { blockDefault } from '@wordpress/icons';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TEMPLATE = [['core/avatar'], ['core/comment-author-name'], ['core/comment-date'], ['core/comment-content'], ['core/comment-reply-link'], ['core/comment-edit-link']];
export default function Edit({
  attributes: {
    commentId
  },
  setAttributes
}) {
  const [commentIdInput, setCommentIdInput] = useState(commentId);
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: TEMPLATE
  });
  if (!commentId) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsxs(Placeholder, {
        icon: blockDefault,
        label: _x('Post Comment', 'block title'),
        instructions: __('To show a comment, input the comment ID.'),
        children: [/*#__PURE__*/_jsx(TextControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          value: commentId,
          onChange: val => setCommentIdInput(parseInt(val))
        }), /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          onClick: () => {
            setAttributes({
              commentId: commentIdInput
            });
          },
          children: __('Save')
        })]
      })
    });
  }
  return /*#__PURE__*/_jsx("div", {
    ...innerBlocksProps
  });
}
//# sourceMappingURL=edit.js.map
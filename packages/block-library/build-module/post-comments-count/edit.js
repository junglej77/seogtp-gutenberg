/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, Warning, useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostCommentsCountEdit({
  attributes,
  context,
  setAttributes
}) {
  const {
    textAlign
  } = attributes;
  const {
    postId
  } = context;
  const [commentsCount, setCommentsCount] = useState();
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  useEffect(() => {
    if (!postId) {
      return;
    }
    const currentPostId = postId;
    apiFetch({
      path: addQueryArgs('/wp/v2/comments', {
        post: postId
      }),
      parse: false
    }).then(res => {
      // Stale requests will have the `currentPostId` of an older closure.
      if (currentPostId === postId) {
        setCommentsCount(res.headers.get('X-WP-Total'));
      }
    });
  }, [postId]);
  const hasPostAndComments = postId && commentsCount !== undefined;
  const blockStyles = {
    ...blockProps.style,
    textDecoration: hasPostAndComments ? blockProps.style?.textDecoration : undefined
  };
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
    }), /*#__PURE__*/_jsx("div", {
      ...blockProps,
      style: blockStyles,
      children: hasPostAndComments ? commentsCount : /*#__PURE__*/_jsx(Warning, {
        children: __('Post Comments Count block: post not found.')
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map
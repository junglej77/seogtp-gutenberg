/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { Disabled } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { AlignmentControl, BlockControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Renders the `core/comment-content` block on the editor.
 *
 * @param {Object} props                      React props.
 * @param {Object} props.setAttributes        Callback for updating block attributes.
 * @param {Object} props.attributes           Block attributes.
 * @param {string} props.attributes.textAlign The `textAlign` attribute.
 * @param {Object} props.context              Inherited context.
 * @param {string} props.context.commentId    The comment ID.
 *
 * @return {JSX.Element} React element.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Edit({
  setAttributes,
  attributes: {
    textAlign
  },
  context: {
    commentId
  }
}) {
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const [content] = useEntityProp('root', 'comment', 'content', commentId);
  const blockControls = /*#__PURE__*/_jsx(BlockControls, {
    group: "block",
    children: /*#__PURE__*/_jsx(AlignmentControl, {
      value: textAlign,
      onChange: newAlign => setAttributes({
        textAlign: newAlign
      })
    })
  });
  if (!commentId || !content) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [blockControls, /*#__PURE__*/_jsx("div", {
        ...blockProps,
        children: /*#__PURE__*/_jsx("p", {
          children: _x('Comment Content', 'block title')
        })
      })]
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [blockControls, /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Disabled, {
        children: /*#__PURE__*/_jsx(RawHTML, {
          children: content.rendered
        }, "html")
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map
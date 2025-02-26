/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function PostAuthorBiographyEdit({
  context: {
    postType,
    postId
  },
  attributes: {
    textAlign
  },
  setAttributes
}) {
  const {
    authorDetails
  } = useSelect(select => {
    const {
      getEditedEntityRecord,
      getUser
    } = select(coreStore);
    const _authorId = getEditedEntityRecord('postType', postType, postId)?.author;
    return {
      authorDetails: _authorId ? getUser(_authorId) : null
    };
  }, [postType, postId]);
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const displayAuthorBiography = authorDetails?.description || __('Author Biography');
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
      dangerouslySetInnerHTML: {
        __html: displayAuthorBiography
      }
    })]
  });
}
export default PostAuthorBiographyEdit;
//# sourceMappingURL=edit.js.map
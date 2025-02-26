/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function PostAuthorNameEdit({
  context: {
    postType,
    postId
  },
  attributes: {
    textAlign,
    isLink,
    linkTarget
  },
  setAttributes
}) {
  const {
    authorName
  } = useSelect(select => {
    const {
      getEditedEntityRecord,
      getUser
    } = select(coreStore);
    const _authorId = getEditedEntityRecord('postType', postType, postId)?.author;
    return {
      authorName: _authorId ? getUser(_authorId) : null
    };
  }, [postType, postId]);
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const displayName = authorName?.name || __('Author Name');
  const displayAuthor = isLink ? /*#__PURE__*/_jsx("a", {
    href: "#author-pseudo-link",
    onClick: event => event.preventDefault(),
    className: "wp-block-post-author-name__link",
    children: displayName
  }) : displayName;
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
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Link to author archive'),
          onChange: () => setAttributes({
            isLink: !isLink
          }),
          checked: isLink
        }), isLink && /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Open in new tab'),
          onChange: value => setAttributes({
            linkTarget: value ? '_blank' : '_self'
          }),
          checked: linkTarget === '_blank'
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      ...blockProps,
      children: [" ", displayAuthor, " "]
    })]
  });
}
export default PostAuthorNameEdit;
//# sourceMappingURL=edit.js.map
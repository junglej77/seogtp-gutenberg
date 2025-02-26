/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { AlignmentControl, BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Renders the `core/comment-author-name` block on the editor.
 *
 * @param {Object} props                       React props.
 * @param {Object} props.setAttributes         Callback for updating block attributes.
 * @param {Object} props.attributes            Block attributes.
 * @param {string} props.attributes.isLink     Whether the author name should be linked.
 * @param {string} props.attributes.linkTarget Target of the link.
 * @param {string} props.attributes.textAlign  Text alignment.
 * @param {Object} props.context               Inherited context.
 * @param {string} props.context.commentId     The comment ID.
 *
 * @return {JSX.Element} React element.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function Edit({
  attributes: {
    isLink,
    linkTarget,
    textAlign
  },
  context: {
    commentId
  },
  setAttributes
}) {
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  let displayName = useSelect(select => {
    const {
      getEntityRecord
    } = select(coreStore);
    const comment = getEntityRecord('root', 'comment', commentId);
    const authorName = comment?.author_name; // eslint-disable-line camelcase

    if (comment && !authorName) {
      var _user$name;
      const user = getEntityRecord('root', 'user', comment.author);
      return (_user$name = user?.name) !== null && _user$name !== void 0 ? _user$name : __('Anonymous');
    }
    return authorName !== null && authorName !== void 0 ? authorName : '';
  }, [commentId]);
  const blockControls = /*#__PURE__*/_jsx(BlockControls, {
    group: "block",
    children: /*#__PURE__*/_jsx(AlignmentControl, {
      value: textAlign,
      onChange: newAlign => setAttributes({
        textAlign: newAlign
      })
    })
  });
  const inspectorControls = /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsxs(PanelBody, {
      title: __('Settings'),
      children: [/*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Link to authors URL'),
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
  });
  if (!commentId || !displayName) {
    displayName = _x('Comment Author', 'block title');
  }
  const displayAuthor = isLink ? /*#__PURE__*/_jsx("a", {
    href: "#comment-author-pseudo-link",
    onClick: event => event.preventDefault(),
    children: displayName
  }) : displayName;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [inspectorControls, blockControls, /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: displayAuthor
    })]
  });
}
//# sourceMappingURL=edit.js.map
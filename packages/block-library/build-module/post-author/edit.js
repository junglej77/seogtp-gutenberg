/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ComboboxControl, PanelBody, SelectControl, ToggleControl, __experimentalVStack as VStack } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const minimumUsersForCombobox = 25;
const AUTHORS_QUERY = {
  who: 'authors',
  per_page: 100
};
function PostAuthorEdit({
  isSelected,
  context: {
    postType,
    postId,
    queryId
  },
  attributes,
  setAttributes
}) {
  const isDescendentOfQueryLoop = Number.isFinite(queryId);
  const {
    authorId,
    authorDetails,
    authors
  } = useSelect(select => {
    const {
      getEditedEntityRecord,
      getUser,
      getUsers
    } = select(coreStore);
    const _authorId = getEditedEntityRecord('postType', postType, postId)?.author;
    return {
      authorId: _authorId,
      authorDetails: _authorId ? getUser(_authorId) : null,
      authors: getUsers(AUTHORS_QUERY)
    };
  }, [postType, postId]);
  const {
    editEntityRecord
  } = useDispatch(coreStore);
  const {
    textAlign,
    showAvatar,
    showBio,
    byline,
    isLink,
    linkTarget
  } = attributes;
  const avatarSizes = [];
  const authorName = authorDetails?.name || __('Post Author');
  if (authorDetails?.avatar_urls) {
    Object.keys(authorDetails.avatar_urls).forEach(size => {
      avatarSizes.push({
        value: size,
        label: `${size} x ${size}`
      });
    });
  }
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const authorOptions = authors?.length ? authors.map(({
    id,
    name
  }) => {
    return {
      value: id,
      label: name
    };
  }) : [];
  const handleSelect = nextAuthorId => {
    editEntityRecord('postType', postType, postId, {
      author: nextAuthorId
    });
  };
  const showCombobox = authorOptions.length >= minimumUsersForCombobox;
  const showAuthorControl = !!postId && !isDescendentOfQueryLoop && authorOptions.length > 0;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/_jsxs(VStack, {
          spacing: 4,
          className: "wp-block-post-author__inspector-settings",
          children: [showAuthorControl && (showCombobox && /*#__PURE__*/_jsx(ComboboxControl, {
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true,
            label: __('Author'),
            options: authorOptions,
            value: authorId,
            onChange: handleSelect,
            allowReset: false
          }) || /*#__PURE__*/_jsx(SelectControl, {
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true,
            label: __('Author'),
            value: authorId,
            options: authorOptions,
            onChange: handleSelect
          })), /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Show avatar'),
            checked: showAvatar,
            onChange: () => setAttributes({
              showAvatar: !showAvatar
            })
          }), showAvatar && /*#__PURE__*/_jsx(SelectControl, {
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true,
            label: __('Avatar size'),
            value: attributes.avatarSize,
            options: avatarSizes,
            onChange: size => {
              setAttributes({
                avatarSize: Number(size)
              });
            }
          }), /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Show bio'),
            checked: showBio,
            onChange: () => setAttributes({
              showBio: !showBio
            })
          }), /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Link author name to author page'),
            checked: isLink,
            onChange: () => setAttributes({
              isLink: !isLink
            })
          }), isLink && /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Open in new tab'),
            onChange: value => setAttributes({
              linkTarget: value ? '_blank' : '_self'
            }),
            checked: linkTarget === '_blank'
          })]
        })
      })
    }), /*#__PURE__*/_jsx(BlockControls, {
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
      children: [showAvatar && authorDetails?.avatar_urls && /*#__PURE__*/_jsx("div", {
        className: "wp-block-post-author__avatar",
        children: /*#__PURE__*/_jsx("img", {
          width: attributes.avatarSize,
          src: authorDetails.avatar_urls[attributes.avatarSize],
          alt: authorDetails.name
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "wp-block-post-author__content",
        children: [(!RichText.isEmpty(byline) || isSelected) && /*#__PURE__*/_jsx(RichText, {
          identifier: "byline",
          className: "wp-block-post-author__byline",
          "aria-label": __('Post author byline text'),
          placeholder: __('Write byline…'),
          value: byline,
          onChange: value => setAttributes({
            byline: value
          })
        }), /*#__PURE__*/_jsx("p", {
          className: "wp-block-post-author__name",
          children: isLink ? /*#__PURE__*/_jsx("a", {
            href: "#post-author-pseudo-link",
            onClick: event => event.preventDefault(),
            children: authorName
          }) : authorName
        }), showBio && /*#__PURE__*/_jsx("p", {
          className: "wp-block-post-author__bio",
          dangerouslySetInnerHTML: {
            __html: authorDetails?.description
          }
        })]
      })]
    })]
  });
}
export default PostAuthorEdit;
//# sourceMappingURL=edit.js.map
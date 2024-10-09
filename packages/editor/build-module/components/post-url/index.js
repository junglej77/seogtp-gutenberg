/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { safeDecodeURIComponent, cleanForSlug } from '@wordpress/url';
import { useState, createInterpolateElement } from '@wordpress/element';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ExternalLink, Button, __experimentalInputControl as InputControl, __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper, __experimentalVStack as VStack } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { copySmall } from '@wordpress/icons';
import { store as coreStore } from '@wordpress/core-data';
import { useCopyToClipboard } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

/**
 * Renders the `PostURL` component.
 *
 * @example
 * ```jsx
 * <PostURL />
 * ```
 *
 * @param {Function} onClose Callback function to be executed when the popover is closed.
 *
 * @return {Component} The rendered PostURL component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostURL({
  onClose
}) {
  const {
    isEditable,
    postSlug,
    postLink,
    permalinkPrefix,
    permalinkSuffix,
    permalink
  } = useSelect(select => {
    var _post$_links$wpActio;
    const post = select(editorStore).getCurrentPost();
    const postTypeSlug = select(editorStore).getCurrentPostType();
    const postType = select(coreStore).getPostType(postTypeSlug);
    const permalinkParts = select(editorStore).getPermalinkParts();
    const hasPublishAction = (_post$_links$wpActio = post?._links?.['wp:action-publish']) !== null && _post$_links$wpActio !== void 0 ? _post$_links$wpActio : false;
    return {
      isEditable: select(editorStore).isPermalinkEditable() && hasPublishAction,
      postSlug: safeDecodeURIComponent(select(editorStore).getEditedPostSlug()),
      viewPostLabel: postType?.labels.view_item,
      postLink: post.link,
      permalinkPrefix: permalinkParts?.prefix,
      permalinkSuffix: permalinkParts?.suffix,
      permalink: safeDecodeURIComponent(select(editorStore).getPermalink())
    };
  }, []);
  const {
    editPost
  } = useDispatch(editorStore);
  const {
    createNotice
  } = useDispatch(noticesStore);
  const [forceEmptyField, setForceEmptyField] = useState(false);
  const copyButtonRef = useCopyToClipboard(permalink, () => {
    createNotice('info', __('Copied URL to clipboard.'), {
      isDismissible: true,
      type: 'snackbar'
    });
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-post-url",
    children: [/*#__PURE__*/_jsx(InspectorPopoverHeader, {
      title: __('Link'),
      onClose: onClose
    }), /*#__PURE__*/_jsxs(VStack, {
      spacing: 3,
      children: [isEditable && /*#__PURE__*/_jsx("div", {
        children: createInterpolateElement(__('Customize the last part of the URL. <a>Learn more.</a>'), {
          a: /*#__PURE__*/_jsx(ExternalLink, {
            href: __('https://wordpress.org/documentation/article/page-post-settings-sidebar/#permalink')
          })
        })
      }), /*#__PURE__*/_jsxs("div", {
        children: [isEditable && /*#__PURE__*/_jsx(InputControl, {
          __next40pxDefaultSize: true,
          prefix: /*#__PURE__*/_jsx(InputControlPrefixWrapper, {
            children: "/"
          }),
          suffix: /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            icon: copySmall,
            ref: copyButtonRef,
            label: __('Copy')
          }),
          label: __('Link'),
          hideLabelFromVision: true,
          value: forceEmptyField ? '' : postSlug,
          autoComplete: "off",
          spellCheck: "false",
          type: "text",
          className: "editor-post-url__input",
          onChange: newValue => {
            editPost({
              slug: newValue
            });
            // When we delete the field the permalink gets
            // reverted to the original value.
            // The forceEmptyField logic allows the user to have
            // the field temporarily empty while typing.
            if (!newValue) {
              if (!forceEmptyField) {
                setForceEmptyField(true);
              }
              return;
            }
            if (forceEmptyField) {
              setForceEmptyField(false);
            }
          },
          onBlur: event => {
            editPost({
              slug: cleanForSlug(event.target.value)
            });
            if (forceEmptyField) {
              setForceEmptyField(false);
            }
          },
          help: /*#__PURE__*/_jsxs(ExternalLink, {
            className: "editor-post-url__link",
            href: postLink,
            target: "_blank",
            children: [/*#__PURE__*/_jsx("span", {
              className: "editor-post-url__link-prefix",
              children: permalinkPrefix
            }), /*#__PURE__*/_jsx("span", {
              className: "editor-post-url__link-slug",
              children: postSlug
            }), /*#__PURE__*/_jsx("span", {
              className: "editor-post-url__link-suffix",
              children: permalinkSuffix
            })]
          })
        }), !isEditable && /*#__PURE__*/_jsx(ExternalLink, {
          className: "editor-post-url__link",
          href: postLink,
          target: "_blank",
          children: postLink
        })]
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map
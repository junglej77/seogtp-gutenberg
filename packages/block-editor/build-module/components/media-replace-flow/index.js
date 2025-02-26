/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import { FormFileUpload, NavigableMenu, MenuItem, ToolbarButton, Dropdown, withFilters } from '@wordpress/components';
import { useSelect, withDispatch } from '@wordpress/data';
import { DOWN } from '@wordpress/keycodes';
import { postFeaturedImage, upload, media as mediaIcon } from '@wordpress/icons';
import { compose } from '@wordpress/compose';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import MediaUpload from '../media-upload';
import MediaUploadCheck from '../media-upload/check';
import LinkControl from '../link-control';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const noop = () => {};
let uniqueId = 0;
const MediaReplaceFlow = ({
  mediaURL,
  mediaId,
  mediaIds,
  allowedTypes,
  accept,
  onError,
  onSelect,
  onSelectURL,
  onReset,
  onToggleFeaturedImage,
  useFeaturedImage,
  onFilesUpload = noop,
  name = __('Replace'),
  createNotice,
  removeNotice,
  children,
  multiple = false,
  addToGallery,
  handleUpload = true,
  popoverProps
}) => {
  const mediaUpload = useSelect(select => {
    return select(blockEditorStore).getSettings().mediaUpload;
  }, []);
  const canUpload = !!mediaUpload;
  const editMediaButtonRef = useRef();
  const errorNoticeID = `block-editor/media-replace-flow/error-notice/${++uniqueId}`;
  const onUploadError = message => {
    const safeMessage = stripHTML(message);
    if (onError) {
      onError(safeMessage);
      return;
    }
    // We need to set a timeout for showing the notice
    // so that VoiceOver and possibly other screen readers
    // can announce the error after the toolbar button
    // regains focus once the upload dialog closes.
    // Otherwise VO simply skips over the notice and announces
    // the focused element and the open menu.
    setTimeout(() => {
      createNotice('error', safeMessage, {
        speak: true,
        id: errorNoticeID,
        isDismissible: true
      });
    }, 1000);
  };
  const selectMedia = (media, closeMenu) => {
    if (useFeaturedImage && onToggleFeaturedImage) {
      onToggleFeaturedImage();
    }
    closeMenu();
    // Calling `onSelect` after the state update since it might unmount the component.
    onSelect(media);
    speak(__('The media file has been replaced'));
    removeNotice(errorNoticeID);
  };
  const uploadFiles = (event, closeMenu) => {
    const files = event.target.files;
    if (!handleUpload) {
      closeMenu();
      return onSelect(files);
    }
    onFilesUpload(files);
    mediaUpload({
      allowedTypes,
      filesList: files,
      onFileChange: ([media]) => {
        selectMedia(media, closeMenu);
      },
      onError: onUploadError
    });
  };
  const openOnArrowDown = event => {
    if (event.keyCode === DOWN) {
      event.preventDefault();
      event.target.click();
    }
  };
  const onlyAllowsImages = () => {
    if (!allowedTypes || allowedTypes.length === 0) {
      return false;
    }
    return allowedTypes.every(allowedType => allowedType === 'image' || allowedType.startsWith('image/'));
  };
  const gallery = multiple && onlyAllowsImages();
  return /*#__PURE__*/_jsx(Dropdown, {
    popoverProps: popoverProps,
    contentClassName: "block-editor-media-replace-flow__options",
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(ToolbarButton, {
      ref: editMediaButtonRef,
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
      onClick: onToggle,
      onKeyDown: openOnArrowDown,
      children: name
    }),
    renderContent: ({
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(NavigableMenu, {
        className: "block-editor-media-replace-flow__media-upload-menu",
        children: [/*#__PURE__*/_jsxs(MediaUploadCheck, {
          children: [/*#__PURE__*/_jsx(MediaUpload, {
            gallery: gallery,
            addToGallery: addToGallery,
            multiple: multiple,
            value: multiple ? mediaIds : mediaId,
            onSelect: media => selectMedia(media, onClose),
            allowedTypes: allowedTypes,
            render: ({
              open
            }) => /*#__PURE__*/_jsx(MenuItem, {
              icon: mediaIcon,
              onClick: open,
              children: __('Open Media Library')
            })
          }), /*#__PURE__*/_jsx(FormFileUpload, {
            onChange: event => {
              uploadFiles(event, onClose);
            },
            accept: accept,
            multiple: !!multiple,
            render: ({
              openFileDialog
            }) => {
              return /*#__PURE__*/_jsx(MenuItem, {
                icon: upload,
                onClick: () => {
                  openFileDialog();
                },
                children: __('Upload')
              });
            }
          })]
        }), onToggleFeaturedImage && /*#__PURE__*/_jsx(MenuItem, {
          icon: postFeaturedImage,
          onClick: onToggleFeaturedImage,
          isPressed: useFeaturedImage,
          children: __('Use featured image')
        }), mediaURL && onReset && /*#__PURE__*/_jsx(MenuItem, {
          onClick: () => {
            onReset();
            onClose();
          },
          children: __('Reset')
        }), typeof children === 'function' ? children({
          onClose
        }) : children]
      }), onSelectURL &&
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      _jsxs("form", {
        className: clsx('block-editor-media-flow__url-input', {
          'has-siblings': canUpload || onToggleFeaturedImage
        }),
        children: [/*#__PURE__*/_jsx("span", {
          className: "block-editor-media-replace-flow__image-url-label",
          children: __('Current media URL:')
        }), /*#__PURE__*/_jsx(LinkControl, {
          value: {
            url: mediaURL
          },
          settings: [],
          showSuggestions: false,
          onChange: ({
            url
          }) => {
            onSelectURL(url);
            editMediaButtonRef.current.focus();
          }
        })]
      })]
    })
  });
};

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-replace-flow/README.md
 */
export default compose([withDispatch(dispatch => {
  const {
    createNotice,
    removeNotice
  } = dispatch(noticesStore);
  return {
    createNotice,
    removeNotice
  };
}), withFilters('editor.MediaReplaceFlow')])(MediaReplaceFlow);
//# sourceMappingURL=index.js.map
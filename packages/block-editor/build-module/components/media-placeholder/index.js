/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Button, FormFileUpload, Placeholder, DropZone, withFilters } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { keyboardReturn } from '@wordpress/icons';
import { pasteHandler } from '@wordpress/blocks';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import MediaUpload from '../media-upload';
import MediaUploadCheck from '../media-upload/check';
import URLPopover from '../url-popover';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const noop = () => {};
const InsertFromURLPopover = ({
  src,
  onChange,
  onSubmit,
  onClose,
  popoverAnchor
}) => /*#__PURE__*/_jsx(URLPopover, {
  anchor: popoverAnchor,
  onClose: onClose,
  children: /*#__PURE__*/_jsxs("form", {
    className: "block-editor-media-placeholder__url-input-form",
    onSubmit: onSubmit,
    children: [/*#__PURE__*/_jsx("input", {
      className: "block-editor-media-placeholder__url-input-field",
      type: "text",
      "aria-label": __('URL'),
      placeholder: __('Paste or type URL'),
      onChange: onChange,
      value: src
    }), /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "block-editor-media-placeholder__url-input-submit-button",
      icon: keyboardReturn,
      label: __('Apply'),
      type: "submit"
    })]
  })
});
const URLSelectionUI = ({
  src,
  onChangeSrc,
  onSelectURL
}) => {
  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [isURLInputVisible, setIsURLInputVisible] = useState(false);
  const openURLInput = () => {
    setIsURLInputVisible(true);
  };
  const closeURLInput = () => {
    setIsURLInputVisible(false);
    popoverAnchor?.focus();
  };
  const onSubmitSrc = event => {
    event.preventDefault();
    if (src && onSelectURL) {
      onSelectURL(src);
      closeURLInput();
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-media-placeholder__url-input-container",
    children: [/*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "block-editor-media-placeholder__button",
      onClick: openURLInput,
      isPressed: isURLInputVisible,
      variant: "secondary",
      "aria-haspopup": "dialog",
      ref: setPopoverAnchor,
      children: __('Insert from URL')
    }), isURLInputVisible && /*#__PURE__*/_jsx(InsertFromURLPopover, {
      src: src,
      onChange: onChangeSrc,
      onSubmit: onSubmitSrc,
      onClose: closeURLInput,
      popoverAnchor: popoverAnchor
    })]
  });
};
export function MediaPlaceholder({
  value = {},
  allowedTypes,
  className,
  icon,
  labels = {},
  mediaPreview,
  notices,
  isAppender,
  accept,
  addToGallery,
  multiple = false,
  handleUpload = true,
  disableDropZone,
  disableMediaButtons,
  onError,
  onSelect,
  onCancel,
  onSelectURL,
  onToggleFeaturedImage,
  onDoubleClick,
  onFilesPreUpload = noop,
  onHTMLDrop: deprecatedOnHTMLDrop,
  children,
  mediaLibraryButton,
  placeholder,
  style
}) {
  if (deprecatedOnHTMLDrop) {
    deprecated('wp.blockEditor.MediaPlaceholder onHTMLDrop prop', {
      since: '6.2',
      version: '6.4'
    });
  }
  const mediaUpload = useSelect(select => {
    const {
      getSettings
    } = select(blockEditorStore);
    return getSettings().mediaUpload;
  }, []);
  const [src, setSrc] = useState('');
  useEffect(() => {
    var _value$src;
    setSrc((_value$src = value?.src) !== null && _value$src !== void 0 ? _value$src : '');
  }, [value?.src]);
  const onlyAllowsImages = () => {
    if (!allowedTypes || allowedTypes.length === 0) {
      return false;
    }
    return allowedTypes.every(allowedType => allowedType === 'image' || allowedType.startsWith('image/'));
  };
  const onChangeSrc = event => {
    setSrc(event.target.value);
  };
  const onFilesUpload = files => {
    if (!handleUpload || typeof handleUpload === 'function' && !handleUpload(files)) {
      return onSelect(files);
    }
    onFilesPreUpload(files);
    let setMedia;
    if (multiple) {
      if (addToGallery) {
        // Since the setMedia function runs multiple times per upload group
        // and is passed newMedia containing every item in its group each time, we must
        // filter out whatever this upload group had previously returned to the
        // gallery before adding and returning the image array with replacement newMedia
        // values.

        // Define an array to store urls from newMedia between subsequent function calls.
        let lastMediaPassed = [];
        setMedia = newMedia => {
          // Remove any images this upload group is responsible for (lastMediaPassed).
          // Their replacements are contained in newMedia.
          const filteredMedia = (value !== null && value !== void 0 ? value : []).filter(item => {
            // If Item has id, only remove it if lastMediaPassed has an item with that id.
            if (item.id) {
              return !lastMediaPassed.some(
              // Be sure to convert to number for comparison.
              ({
                id
              }) => Number(id) === Number(item.id));
            }
            // Compare transient images via .includes since gallery may append extra info onto the url.
            return !lastMediaPassed.some(({
              urlSlug
            }) => item.url.includes(urlSlug));
          });
          // Return the filtered media array along with newMedia.
          onSelect(filteredMedia.concat(newMedia));
          // Reset lastMediaPassed and set it with ids and urls from newMedia.
          lastMediaPassed = newMedia.map(media => {
            // Add everything up to '.fileType' to compare via .includes.
            const cutOffIndex = media.url.lastIndexOf('.');
            const urlSlug = media.url.slice(0, cutOffIndex);
            return {
              id: media.id,
              urlSlug
            };
          });
        };
      } else {
        setMedia = onSelect;
      }
    } else {
      setMedia = ([media]) => onSelect(media);
    }
    mediaUpload({
      allowedTypes,
      filesList: files,
      onFileChange: setMedia,
      onError
    });
  };
  async function handleBlocksDrop(blocks) {
    if (!blocks || !Array.isArray(blocks)) {
      return;
    }
    function recursivelyFindMediaFromBlocks(_blocks) {
      return _blocks.flatMap(block => (block.name === 'core/image' || block.name === 'core/audio' || block.name === 'core/video') && block.attributes.url ? [block] : recursivelyFindMediaFromBlocks(block.innerBlocks));
    }
    const mediaBlocks = recursivelyFindMediaFromBlocks(blocks);
    if (!mediaBlocks.length) {
      return;
    }
    const uploadedMediaList = await Promise.all(mediaBlocks.map(block => block.attributes.id ? block.attributes : new Promise((resolve, reject) => {
      window.fetch(block.attributes.url).then(response => response.blob()).then(blob => mediaUpload({
        filesList: [blob],
        additionalData: {
          title: block.attributes.title,
          alt_text: block.attributes.alt,
          caption: block.attributes.caption
        },
        onFileChange: ([media]) => {
          if (media.id) {
            resolve(media);
          }
        },
        allowedTypes,
        onError: reject
      })).catch(() => resolve(block.attributes.url));
    }))).catch(err => onError(err));
    if (multiple) {
      onSelect(uploadedMediaList);
    } else {
      onSelect(uploadedMediaList[0]);
    }
  }
  async function onHTMLDrop(HTML) {
    const blocks = pasteHandler({
      HTML
    });
    return await handleBlocksDrop(blocks);
  }
  const onUpload = event => {
    onFilesUpload(event.target.files);
  };
  const defaultRenderPlaceholder = content => {
    let {
      instructions,
      title
    } = labels;
    if (!mediaUpload && !onSelectURL) {
      instructions = __('To edit this block, you need permission to upload media.');
    }
    if (instructions === undefined || title === undefined) {
      const typesAllowed = allowedTypes !== null && allowedTypes !== void 0 ? allowedTypes : [];
      const [firstAllowedType] = typesAllowed;
      const isOneType = 1 === typesAllowed.length;
      const isAudio = isOneType && 'audio' === firstAllowedType;
      const isImage = isOneType && 'image' === firstAllowedType;
      const isVideo = isOneType && 'video' === firstAllowedType;
      if (instructions === undefined && mediaUpload) {
        instructions = __('Upload a media file or pick one from your media library.');
        if (isAudio) {
          instructions = __('Upload or drag an audio file here, or pick one from your library.');
        } else if (isImage) {
          instructions = __('Upload or drag an image file here, or pick one from your library.');
        } else if (isVideo) {
          instructions = __('Upload or drag a video file here, or pick one from your library.');
        }
      }
      if (title === undefined) {
        title = __('Media');
        if (isAudio) {
          title = __('Audio');
        } else if (isImage) {
          title = __('Image');
        } else if (isVideo) {
          title = __('Video');
        }
      }
    }
    const placeholderClassName = clsx('block-editor-media-placeholder', className, {
      'is-appender': isAppender
    });
    return /*#__PURE__*/_jsxs(Placeholder, {
      icon: icon,
      label: title,
      instructions: instructions,
      className: placeholderClassName,
      notices: notices,
      onDoubleClick: onDoubleClick,
      preview: mediaPreview,
      style: style,
      children: [content, children]
    });
  };
  const renderPlaceholder = placeholder !== null && placeholder !== void 0 ? placeholder : defaultRenderPlaceholder;
  const renderDropZone = () => {
    if (disableDropZone) {
      return null;
    }
    return /*#__PURE__*/_jsx(DropZone, {
      onFilesDrop: onFilesUpload,
      onHTMLDrop: onHTMLDrop
    });
  };
  const renderCancelLink = () => {
    return onCancel && /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: "block-editor-media-placeholder__cancel-button",
      title: __('Cancel'),
      variant: "link",
      onClick: onCancel,
      children: __('Cancel')
    });
  };
  const renderUrlSelectionUI = () => {
    return onSelectURL && /*#__PURE__*/_jsx(URLSelectionUI, {
      src: src,
      onChangeSrc: onChangeSrc,
      onSelectURL: onSelectURL
    });
  };
  const renderFeaturedImageToggle = () => {
    return onToggleFeaturedImage && /*#__PURE__*/_jsx("div", {
      className: "block-editor-media-placeholder__url-input-container",
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "block-editor-media-placeholder__button",
        onClick: onToggleFeaturedImage,
        variant: "secondary",
        children: __('Use featured image')
      })
    });
  };
  const renderMediaUploadChecked = () => {
    const defaultButton = ({
      open
    }) => {
      return /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "secondary",
        onClick: () => {
          open();
        },
        children: __('Media Library')
      });
    };
    const libraryButton = mediaLibraryButton !== null && mediaLibraryButton !== void 0 ? mediaLibraryButton : defaultButton;
    const uploadMediaLibraryButton = /*#__PURE__*/_jsx(MediaUpload, {
      addToGallery: addToGallery,
      gallery: multiple && onlyAllowsImages(),
      multiple: multiple,
      onSelect: onSelect,
      allowedTypes: allowedTypes,
      mode: "browse",
      value: Array.isArray(value) ? value.map(({
        id
      }) => id) : value.id,
      render: libraryButton
    });
    if (mediaUpload && isAppender) {
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [renderDropZone(), /*#__PURE__*/_jsx(FormFileUpload, {
          onChange: onUpload,
          accept: accept,
          multiple: !!multiple,
          render: ({
            openFileDialog
          }) => {
            const content = /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(Button
              // TODO: Switch to `true` (40px size) if possible
              , {
                __next40pxDefaultSize: false,
                variant: "primary",
                className: clsx('block-editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
                onClick: openFileDialog,
                children: __('Upload')
              }), uploadMediaLibraryButton, renderUrlSelectionUI(), renderFeaturedImageToggle(), renderCancelLink()]
            });
            return renderPlaceholder(content);
          }
        })]
      });
    }
    if (mediaUpload) {
      const content = /*#__PURE__*/_jsxs(_Fragment, {
        children: [renderDropZone(), /*#__PURE__*/_jsx(FormFileUpload, {
          render: ({
            openFileDialog
          }) => /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            onClick: openFileDialog,
            variant: "primary",
            className: clsx('block-editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
            children: __('Upload')
          }),
          onChange: onUpload,
          accept: accept,
          multiple: !!multiple
        }), uploadMediaLibraryButton, renderUrlSelectionUI(), renderFeaturedImageToggle(), renderCancelLink()]
      });
      return renderPlaceholder(content);
    }
    return renderPlaceholder(uploadMediaLibraryButton);
  };
  if (disableMediaButtons) {
    return /*#__PURE__*/_jsx(MediaUploadCheck, {
      children: renderDropZone()
    });
  }
  return /*#__PURE__*/_jsx(MediaUploadCheck, {
    fallback: renderPlaceholder(renderUrlSelectionUI()),
    children: renderMediaUploadChecked()
  });
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-placeholder/README.md
 */
export default withFilters('editor.MediaPlaceholder')(MediaPlaceholder);
//# sourceMappingURL=index.js.map
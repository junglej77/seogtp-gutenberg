/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { ResizableBox, Spinner, Placeholder } from '@wordpress/components';
import { BlockControls, BlockIcon, MediaPlaceholder, MediaReplaceFlow, store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { forwardRef } from '@wordpress/element';
import { isBlobURL } from '@wordpress/blob';
import { store as noticesStore } from '@wordpress/notices';
import { media as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { imageFillStyles } from './image-fill';

/**
 * Constants
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['image', 'video'];
const noop = () => {};
const ResizableBoxContainer = forwardRef(({
  isSelected,
  isStackedOnMobile,
  ...props
}, ref) => {
  const isMobile = useViewportMatch('small', '<');
  return /*#__PURE__*/_jsx(ResizableBox, {
    ref: ref,
    showHandle: isSelected && (!isMobile || !isStackedOnMobile),
    ...props
  });
});
function ToolbarEditButton({
  mediaId,
  mediaUrl,
  onSelectMedia,
  toggleUseFeaturedImage,
  useFeaturedImage
}) {
  return /*#__PURE__*/_jsx(BlockControls, {
    group: "other",
    children: /*#__PURE__*/_jsx(MediaReplaceFlow, {
      mediaId: mediaId,
      mediaURL: mediaUrl,
      allowedTypes: ALLOWED_MEDIA_TYPES,
      accept: "image/*,video/*",
      onSelect: onSelectMedia,
      onToggleFeaturedImage: toggleUseFeaturedImage,
      useFeaturedImage: useFeaturedImage,
      onReset: () => onSelectMedia(undefined)
    })
  });
}
function PlaceholderContainer({
  className,
  mediaUrl,
  onSelectMedia,
  toggleUseFeaturedImage
}) {
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  const onUploadError = message => {
    createErrorNotice(message, {
      type: 'snackbar'
    });
  };
  return /*#__PURE__*/_jsx(MediaPlaceholder, {
    icon: /*#__PURE__*/_jsx(BlockIcon, {
      icon: icon
    }),
    labels: {
      title: __('Media area')
    },
    className: className,
    onSelect: onSelectMedia,
    accept: "image/*,video/*",
    onToggleFeaturedImage: toggleUseFeaturedImage,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    onError: onUploadError,
    disableMediaButtons: mediaUrl
  });
}
function MediaContainer(props, ref) {
  const {
    className,
    commitWidthChange,
    focalPoint,
    imageFill,
    isSelected,
    isStackedOnMobile,
    mediaAlt,
    mediaId,
    mediaPosition,
    mediaType,
    mediaUrl,
    mediaWidth,
    onSelectMedia,
    onWidthChange,
    enableResize,
    toggleUseFeaturedImage,
    useFeaturedImage,
    featuredImageURL,
    featuredImageAlt,
    refMedia
  } = props;
  const isTemporaryMedia = !mediaId && isBlobURL(mediaUrl);
  const {
    toggleSelection
  } = useDispatch(blockEditorStore);
  if (mediaUrl || featuredImageURL || useFeaturedImage) {
    const onResizeStart = () => {
      toggleSelection(false);
    };
    const onResize = (event, direction, elt) => {
      onWidthChange(parseInt(elt.style.width));
    };
    const onResizeStop = (event, direction, elt) => {
      toggleSelection(true);
      commitWidthChange(parseInt(elt.style.width));
    };
    const enablePositions = {
      right: enableResize && mediaPosition === 'left',
      left: enableResize && mediaPosition === 'right'
    };
    const positionStyles = mediaType === 'image' && imageFill ? imageFillStyles(mediaUrl || featuredImageURL, focalPoint) : {};
    const mediaTypeRenderers = {
      image: () => useFeaturedImage && featuredImageURL ? /*#__PURE__*/_jsx("img", {
        ref: refMedia,
        src: featuredImageURL,
        alt: featuredImageAlt,
        style: positionStyles
      }) : mediaUrl && /*#__PURE__*/_jsx("img", {
        ref: refMedia,
        src: mediaUrl,
        alt: mediaAlt,
        style: positionStyles
      }),
      video: () => /*#__PURE__*/_jsx("video", {
        controls: true,
        ref: refMedia,
        src: mediaUrl
      })
    };
    return /*#__PURE__*/_jsxs(ResizableBoxContainer, {
      as: "figure",
      className: clsx(className, 'editor-media-container__resizer', {
        'is-transient': isTemporaryMedia
      }),
      size: {
        width: mediaWidth + '%'
      },
      minWidth: "10%",
      maxWidth: "100%",
      enable: enablePositions,
      onResizeStart: onResizeStart,
      onResize: onResize,
      onResizeStop: onResizeStop,
      axis: "x",
      isSelected: isSelected,
      isStackedOnMobile: isStackedOnMobile,
      ref: ref,
      children: [/*#__PURE__*/_jsx(ToolbarEditButton, {
        onSelectMedia: onSelectMedia,
        mediaUrl: useFeaturedImage && featuredImageURL ? featuredImageURL : mediaUrl,
        mediaId: mediaId,
        toggleUseFeaturedImage: toggleUseFeaturedImage
      }), (mediaTypeRenderers[mediaType] || noop)(), isTemporaryMedia && /*#__PURE__*/_jsx(Spinner, {}), !useFeaturedImage && /*#__PURE__*/_jsx(PlaceholderContainer, {
        ...props
      }), !featuredImageURL && useFeaturedImage && /*#__PURE__*/_jsx(Placeholder, {
        className: "wp-block-media-text--placeholder-image",
        style: positionStyles,
        withIllustration: true
      })]
    });
  }
  return /*#__PURE__*/_jsx(PlaceholderContainer, {
    ...props
  });
}
export default forwardRef(MediaContainer);
//# sourceMappingURL=media-container.js.map
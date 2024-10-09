/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { DropZone, Button, Spinner, withNotices, withFilters, __experimentalHStack as HStack } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import { useState, useRef } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { useSelect, withDispatch, withSelect } from '@wordpress/data';
import { MediaUpload, MediaUploadCheck, store as blockEditorStore } from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import PostFeaturedImageCheck from './check';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['image'];

// Used when labels from post type were not yet loaded or when they are not present.
const DEFAULT_FEATURE_IMAGE_LABEL = __('Featured image');
const DEFAULT_SET_FEATURE_IMAGE_LABEL = __('Add a featured image');
const instructions = /*#__PURE__*/_jsx("p", {
  children: __('To edit the featured image, you need permission to upload media.')
});
function getMediaDetails(media, postId) {
  var _media$media_details$, _media$media_details$2;
  if (!media) {
    return {};
  }
  const defaultSize = applyFilters('editor.PostFeaturedImage.imageSize', 'large', media.id, postId);
  if (defaultSize in ((_media$media_details$ = media?.media_details?.sizes) !== null && _media$media_details$ !== void 0 ? _media$media_details$ : {})) {
    return {
      mediaWidth: media.media_details.sizes[defaultSize].width,
      mediaHeight: media.media_details.sizes[defaultSize].height,
      mediaSourceUrl: media.media_details.sizes[defaultSize].source_url
    };
  }

  // Use fallbackSize when defaultSize is not available.
  const fallbackSize = applyFilters('editor.PostFeaturedImage.imageSize', 'thumbnail', media.id, postId);
  if (fallbackSize in ((_media$media_details$2 = media?.media_details?.sizes) !== null && _media$media_details$2 !== void 0 ? _media$media_details$2 : {})) {
    return {
      mediaWidth: media.media_details.sizes[fallbackSize].width,
      mediaHeight: media.media_details.sizes[fallbackSize].height,
      mediaSourceUrl: media.media_details.sizes[fallbackSize].source_url
    };
  }

  // Use full image size when fallbackSize and defaultSize are not available.
  return {
    mediaWidth: media.media_details.width,
    mediaHeight: media.media_details.height,
    mediaSourceUrl: media.source_url
  };
}
function PostFeaturedImage({
  currentPostId,
  featuredImageId,
  onUpdateImage,
  onRemoveImage,
  media,
  postType,
  noticeUI,
  noticeOperations
}) {
  const toggleRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const {
    getSettings
  } = useSelect(blockEditorStore);
  const {
    mediaSourceUrl
  } = getMediaDetails(media, currentPostId);
  function onDropFiles(filesList) {
    getSettings().mediaUpload({
      allowedTypes: ALLOWED_MEDIA_TYPES,
      filesList,
      onFileChange([image]) {
        if (isBlobURL(image?.url)) {
          setIsLoading(true);
          return;
        }
        if (image) {
          onUpdateImage(image);
        }
        setIsLoading(false);
      },
      onError(message) {
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice(message);
      }
    });
  }
  return /*#__PURE__*/_jsxs(PostFeaturedImageCheck, {
    children: [noticeUI, /*#__PURE__*/_jsxs("div", {
      className: "editor-post-featured-image",
      children: [media && /*#__PURE__*/_jsxs("div", {
        id: `editor-post-featured-image-${featuredImageId}-describedby`,
        className: "hidden",
        children: [media.alt_text && sprintf(
        // Translators: %s: The selected image alt text.
        __('Current image: %s'), media.alt_text), !media.alt_text && sprintf(
        // Translators: %s: The selected image filename.
        __('The current image has no alternative text. The file name is: %s'), media.media_details.sizes?.full?.file || media.slug)]
      }), /*#__PURE__*/_jsx(MediaUploadCheck, {
        fallback: instructions,
        children: /*#__PURE__*/_jsx(MediaUpload, {
          title: postType?.labels?.featured_image || DEFAULT_FEATURE_IMAGE_LABEL,
          onSelect: onUpdateImage,
          unstableFeaturedImageFlow: true,
          allowedTypes: ALLOWED_MEDIA_TYPES,
          modalClass: "editor-post-featured-image__media-modal",
          render: ({
            open
          }) => /*#__PURE__*/_jsxs("div", {
            className: "editor-post-featured-image__container",
            children: [/*#__PURE__*/_jsxs(Button
            // TODO: Switch to `true` (40px size) if possible
            , {
              __next40pxDefaultSize: false,
              ref: toggleRef,
              className: !featuredImageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview',
              onClick: open,
              "aria-label": !featuredImageId ? null : __('Edit or replace the featured image'),
              "aria-describedby": !featuredImageId ? null : `editor-post-featured-image-${featuredImageId}-describedby`,
              "aria-haspopup": "dialog",
              disabled: isLoading,
              accessibleWhenDisabled: true,
              children: [!!featuredImageId && media && /*#__PURE__*/_jsx("img", {
                className: "editor-post-featured-image__preview-image",
                src: mediaSourceUrl,
                alt: ""
              }), isLoading && /*#__PURE__*/_jsx(Spinner, {}), !featuredImageId && !isLoading && (postType?.labels?.set_featured_image || DEFAULT_SET_FEATURE_IMAGE_LABEL)]
            }), !!featuredImageId && /*#__PURE__*/_jsxs(HStack, {
              className: "editor-post-featured-image__actions",
              children: [/*#__PURE__*/_jsx(Button
              // TODO: Switch to `true` (40px size) if possible
              , {
                __next40pxDefaultSize: false,
                className: "editor-post-featured-image__action",
                onClick: open,
                "aria-haspopup": "dialog",
                children: __('Replace')
              }), /*#__PURE__*/_jsx(Button
              // TODO: Switch to `true` (40px size) if possible
              , {
                __next40pxDefaultSize: false,
                className: "editor-post-featured-image__action",
                onClick: () => {
                  onRemoveImage();
                  toggleRef.current.focus();
                },
                children: __('Remove')
              })]
            }), /*#__PURE__*/_jsx(DropZone, {
              onFilesDrop: onDropFiles
            })]
          }),
          value: featuredImageId
        })
      })]
    })]
  });
}
const applyWithSelect = withSelect(select => {
  const {
    getMedia,
    getPostType
  } = select(coreStore);
  const {
    getCurrentPostId,
    getEditedPostAttribute
  } = select(editorStore);
  const featuredImageId = getEditedPostAttribute('featured_media');
  return {
    media: featuredImageId ? getMedia(featuredImageId, {
      context: 'view'
    }) : null,
    currentPostId: getCurrentPostId(),
    postType: getPostType(getEditedPostAttribute('type')),
    featuredImageId
  };
});
const applyWithDispatch = withDispatch((dispatch, {
  noticeOperations
}, {
  select
}) => {
  const {
    editPost
  } = dispatch(editorStore);
  return {
    onUpdateImage(image) {
      editPost({
        featured_media: image.id
      });
    },
    onDropImage(filesList) {
      select(blockEditorStore).getSettings().mediaUpload({
        allowedTypes: ['image'],
        filesList,
        onFileChange([image]) {
          editPost({
            featured_media: image.id
          });
        },
        onError(message) {
          noticeOperations.removeAllNotices();
          noticeOperations.createErrorNotice(message);
        }
      });
    },
    onRemoveImage() {
      editPost({
        featured_media: 0
      });
    }
  };
});

/**
 * Renders the component for managing the featured image of a post.
 *
 * @param {Object}   props                  Props.
 * @param {number}   props.currentPostId    ID of the current post.
 * @param {number}   props.featuredImageId  ID of the featured image.
 * @param {Function} props.onUpdateImage    Function to call when the image is updated.
 * @param {Function} props.onRemoveImage    Function to call when the image is removed.
 * @param {Object}   props.media            The media object representing the featured image.
 * @param {string}   props.postType         Post type.
 * @param {Element}  props.noticeUI         UI for displaying notices.
 * @param {Object}   props.noticeOperations Operations for managing notices.
 *
 * @return {Element} Component to be rendered .
 */
export default compose(withNotices, applyWithSelect, applyWithDispatch, withFilters('editor.PostFeaturedImage'))(PostFeaturedImage);
//# sourceMappingURL=index.js.map
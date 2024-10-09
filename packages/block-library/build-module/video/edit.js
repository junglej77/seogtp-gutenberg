/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { BaseControl, Button, Disabled, PanelBody, Spinner, Placeholder } from '@wordpress/components';
import { BlockControls, BlockIcon, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, MediaReplaceFlow, useBlockProps } from '@wordpress/block-editor';
import { useRef, useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { video as icon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { createUpgradedEmbedBlock } from '../embed/util';
import { useUploadMediaFromBlobURL } from '../utils/hooks';
import VideoCommonSettings from './edit-common-settings';
import TracksEditor from './tracks-editor';
import Tracks from './tracks';
import { Caption } from '../utils/caption';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['video'];
const VIDEO_POSTER_ALLOWED_MEDIA_TYPES = ['image'];
function VideoEdit({
  isSelected: isSingleSelected,
  attributes,
  className,
  setAttributes,
  insertBlocksAfter,
  onReplace
}) {
  const instanceId = useInstanceId(VideoEdit);
  const videoPlayer = useRef();
  const posterImageButton = useRef();
  const {
    id,
    controls,
    poster,
    src,
    tracks
  } = attributes;
  const [temporaryURL, setTemporaryURL] = useState(attributes.blob);
  useUploadMediaFromBlobURL({
    url: temporaryURL,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    onChange: onSelectVideo,
    onError: onUploadError
  });
  useEffect(() => {
    // Placeholder may be rendered.
    if (videoPlayer.current) {
      videoPlayer.current.load();
    }
  }, [poster]);
  function onSelectVideo(media) {
    if (!media || !media.url) {
      // In this case there was an error
      // previous attributes should be removed
      // because they may be temporary blob urls.
      setAttributes({
        src: undefined,
        id: undefined,
        poster: undefined,
        caption: undefined,
        blob: undefined
      });
      setTemporaryURL();
      return;
    }
    if (isBlobURL(media.url)) {
      setTemporaryURL(media.url);
      return;
    }

    // Sets the block's attribute and updates the edit component from the
    // selected media.
    setAttributes({
      blob: undefined,
      src: media.url,
      id: media.id,
      poster: media.image?.src !== media.icon ? media.image?.src : undefined,
      caption: media.caption
    });
    setTemporaryURL();
  }
  function onSelectURL(newSrc) {
    if (newSrc !== src) {
      // Check if there's an embed block that handles this URL.
      const embedBlock = createUpgradedEmbedBlock({
        attributes: {
          url: newSrc
        }
      });
      if (undefined !== embedBlock && onReplace) {
        onReplace(embedBlock);
        return;
      }
      setAttributes({
        blob: undefined,
        src: newSrc,
        id: undefined,
        poster: undefined
      });
      setTemporaryURL();
    }
  }
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  function onUploadError(message) {
    createErrorNotice(message, {
      type: 'snackbar'
    });
  }

  // Much of this description is duplicated from MediaPlaceholder.
  const placeholder = content => {
    return /*#__PURE__*/_jsx(Placeholder, {
      className: "block-editor-media-placeholder",
      withIllustration: !isSingleSelected,
      icon: icon,
      label: __('Video'),
      instructions: __('Upload a video file, pick one from your media library, or add one with a URL.'),
      children: content
    });
  };
  const classes = clsx(className, {
    'is-transient': !!temporaryURL
  });
  const blockProps = useBlockProps({
    className: classes
  });
  if (!src && !temporaryURL) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(MediaPlaceholder, {
        icon: /*#__PURE__*/_jsx(BlockIcon, {
          icon: icon
        }),
        onSelect: onSelectVideo,
        onSelectURL: onSelectURL,
        accept: "video/*",
        allowedTypes: ALLOWED_MEDIA_TYPES,
        value: attributes,
        onError: onUploadError,
        placeholder: placeholder
      })
    });
  }
  function onSelectPoster(image) {
    setAttributes({
      poster: image.url
    });
  }
  function onRemovePoster() {
    setAttributes({
      poster: undefined
    });

    // Move focus back to the Media Upload button.
    posterImageButton.current.focus();
  }
  const videoPosterDescription = `video-block__poster-image-description-${instanceId}`;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isSingleSelected && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(BlockControls, {
        children: /*#__PURE__*/_jsx(TracksEditor, {
          tracks: tracks,
          onChange: newTracks => {
            setAttributes({
              tracks: newTracks
            });
          }
        })
      }), /*#__PURE__*/_jsx(BlockControls, {
        group: "other",
        children: /*#__PURE__*/_jsx(MediaReplaceFlow, {
          mediaId: id,
          mediaURL: src,
          allowedTypes: ALLOWED_MEDIA_TYPES,
          accept: "video/*",
          onSelect: onSelectVideo,
          onSelectURL: onSelectURL,
          onError: onUploadError,
          onReset: () => onSelectVideo(undefined)
        })
      })]
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(VideoCommonSettings, {
          setAttributes: setAttributes,
          attributes: attributes
        }), /*#__PURE__*/_jsx(MediaUploadCheck, {
          children: /*#__PURE__*/_jsxs("div", {
            className: "editor-video-poster-control",
            children: [/*#__PURE__*/_jsx(BaseControl.VisualLabel, {
              children: __('Poster image')
            }), /*#__PURE__*/_jsx(MediaUpload, {
              title: __('Select poster image'),
              onSelect: onSelectPoster,
              allowedTypes: VIDEO_POSTER_ALLOWED_MEDIA_TYPES,
              render: ({
                open
              }) => /*#__PURE__*/_jsx(Button
              // TODO: Switch to `true` (40px size) if possible
              , {
                __next40pxDefaultSize: false,
                variant: "primary",
                onClick: open,
                ref: posterImageButton,
                "aria-describedby": videoPosterDescription,
                children: !poster ? __('Select') : __('Replace')
              })
            }), /*#__PURE__*/_jsx("p", {
              id: videoPosterDescription,
              hidden: true,
              children: poster ? sprintf( /* translators: %s: poster image URL. */
              __('The current poster image url is %s'), poster) : __('There is no poster image currently selected')
            }), !!poster && /*#__PURE__*/_jsx(Button
            // TODO: Switch to `true` (40px size) if possible
            , {
              __next40pxDefaultSize: false,
              onClick: onRemovePoster,
              variant: "tertiary",
              children: __('Remove')
            })]
          })
        })]
      })
    }), /*#__PURE__*/_jsxs("figure", {
      ...blockProps,
      children: [/*#__PURE__*/_jsx(Disabled, {
        isDisabled: !isSingleSelected,
        children: /*#__PURE__*/_jsx("video", {
          controls: controls,
          poster: poster,
          src: src || temporaryURL,
          ref: videoPlayer,
          children: /*#__PURE__*/_jsx(Tracks, {
            tracks: tracks
          })
        })
      }), !!temporaryURL && /*#__PURE__*/_jsx(Spinner, {}), /*#__PURE__*/_jsx(Caption, {
        attributes: attributes,
        setAttributes: setAttributes,
        isSelected: isSingleSelected,
        insertBlocksAfter: insertBlocksAfter,
        label: __('Video caption text'),
        showToolbarButton: isSingleSelected
      })]
    })]
  });
}
export default VideoEdit;
//# sourceMappingURL=edit.js.map
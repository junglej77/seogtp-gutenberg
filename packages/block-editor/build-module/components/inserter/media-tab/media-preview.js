/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Tooltip, DropdownMenu, MenuGroup, MenuItem, Spinner, Modal, Flex, FlexItem, Button, Composite, __experimentalVStack as VStack } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useMemo, useCallback, useState } from '@wordpress/element';
import { cloneBlock } from '@wordpress/blocks';
import { moreVertical, external } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { isBlobURL } from '@wordpress/blob';

/**
 * Internal dependencies
 */
import InserterDraggableBlocks from '../../inserter-draggable-blocks';
import { getBlockAndPreviewFromMedia } from './utils';
import { store as blockEditorStore } from '../../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['image'];
const MAXIMUM_TITLE_LENGTH = 25;
const MEDIA_OPTIONS_POPOVER_PROPS = {
  position: 'bottom left',
  className: 'block-editor-inserter__media-list__item-preview-options__popover'
};
function MediaPreviewOptions({
  category,
  media
}) {
  if (!category.getReportUrl) {
    return null;
  }
  const reportUrl = category.getReportUrl(media);
  return /*#__PURE__*/_jsx(DropdownMenu, {
    className: "block-editor-inserter__media-list__item-preview-options",
    label: __('Options'),
    popoverProps: MEDIA_OPTIONS_POPOVER_PROPS,
    icon: moreVertical,
    children: () => /*#__PURE__*/_jsx(MenuGroup, {
      children: /*#__PURE__*/_jsx(MenuItem, {
        onClick: () => window.open(reportUrl, '_blank').focus(),
        icon: external,
        children: sprintf( /* translators: %s: The media type to report e.g: "image", "video", "audio" */
        __('Report %s'), category.mediaType)
      })
    })
  });
}
function InsertExternalImageModal({
  onClose,
  onSubmit
}) {
  return /*#__PURE__*/_jsxs(Modal, {
    title: __('Insert external image'),
    onRequestClose: onClose,
    className: "block-editor-inserter-media-tab-media-preview-inserter-external-image-modal",
    children: [/*#__PURE__*/_jsxs(VStack, {
      spacing: 3,
      children: [/*#__PURE__*/_jsx("p", {
        children: __('This image cannot be uploaded to your Media Library, but it can still be inserted as an external image.')
      }), /*#__PURE__*/_jsx("p", {
        children: __('External images can be removed by the external provider without warning and could even have legal compliance issues related to privacy legislation.')
      })]
    }), /*#__PURE__*/_jsxs(Flex, {
      className: "block-editor-block-lock-modal__actions",
      justify: "flex-end",
      expanded: false,
      children: [/*#__PURE__*/_jsx(FlexItem, {
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: onClose,
          children: __('Cancel')
        })
      }), /*#__PURE__*/_jsx(FlexItem, {
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "primary",
          onClick: onSubmit,
          children: __('Insert')
        })
      })]
    })]
  });
}
export function MediaPreview({
  media,
  onClick,
  category
}) {
  const [showExternalUploadModal, setShowExternalUploadModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [block, preview] = useMemo(() => getBlockAndPreviewFromMedia(media, category.mediaType), [media, category.mediaType]);
  const {
    createErrorNotice,
    createSuccessNotice
  } = useDispatch(noticesStore);
  const {
    getSettings
  } = useSelect(blockEditorStore);
  const onMediaInsert = useCallback(previewBlock => {
    // Prevent multiple uploads when we're in the process of inserting.
    if (isInserting) {
      return;
    }
    const settings = getSettings();
    const clonedBlock = cloneBlock(previewBlock);
    const {
      id,
      url,
      caption
    } = clonedBlock.attributes;

    // User has no permission to upload media.
    if (!id && !settings.mediaUpload) {
      setShowExternalUploadModal(true);
      return;
    }

    // Media item already exists in library, so just insert it.
    if (!!id) {
      onClick(clonedBlock);
      return;
    }
    setIsInserting(true);
    // Media item does not exist in library, so try to upload it.
    // Fist fetch the image data. This may fail if the image host
    // doesn't allow CORS with the domain.
    // If this happens, we insert the image block using the external
    // URL and let the user know about the possible implications.
    window.fetch(url).then(response => response.blob()).then(blob => {
      settings.mediaUpload({
        filesList: [blob],
        additionalData: {
          caption
        },
        onFileChange([img]) {
          if (isBlobURL(img.url)) {
            return;
          }
          onClick({
            ...clonedBlock,
            attributes: {
              ...clonedBlock.attributes,
              id: img.id,
              url: img.url
            }
          });
          createSuccessNotice(__('Image uploaded and inserted.'), {
            type: 'snackbar'
          });
          setIsInserting(false);
        },
        allowedTypes: ALLOWED_MEDIA_TYPES,
        onError(message) {
          createErrorNotice(message, {
            type: 'snackbar'
          });
          setIsInserting(false);
        }
      });
    }).catch(() => {
      setShowExternalUploadModal(true);
      setIsInserting(false);
    });
  }, [isInserting, getSettings, onClick, createSuccessNotice, createErrorNotice]);
  const title = typeof media.title === 'string' ? media.title : media.title?.rendered || __('no title');
  let truncatedTitle;
  if (title.length > MAXIMUM_TITLE_LENGTH) {
    const omission = '...';
    truncatedTitle = title.slice(0, MAXIMUM_TITLE_LENGTH - omission.length) + omission;
  }
  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InserterDraggableBlocks, {
      isEnabled: true,
      blocks: [block],
      children: ({
        draggable,
        onDragStart,
        onDragEnd
      }) => /*#__PURE__*/_jsx("div", {
        className: clsx('block-editor-inserter__media-list__list-item', {
          'is-hovered': isHovered
        }),
        draggable: draggable,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
        children: /*#__PURE__*/_jsxs("div", {
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          children: [/*#__PURE__*/_jsx(Tooltip, {
            text: truncatedTitle || title,
            children: /*#__PURE__*/_jsx(Composite.Item, {
              render: /*#__PURE__*/_jsx("div", {
                "aria-label": title,
                role: "option",
                className: "block-editor-inserter__media-list__item"
              }),
              onClick: () => onMediaInsert(block),
              children: /*#__PURE__*/_jsxs("div", {
                className: "block-editor-inserter__media-list__item-preview",
                children: [preview, isInserting && /*#__PURE__*/_jsx("div", {
                  className: "block-editor-inserter__media-list__item-preview-spinner",
                  children: /*#__PURE__*/_jsx(Spinner, {})
                })]
              })
            })
          }), !isInserting && /*#__PURE__*/_jsx(MediaPreviewOptions, {
            category: category,
            media: media
          })]
        })
      })
    }), showExternalUploadModal && /*#__PURE__*/_jsx(InsertExternalImageModal, {
      onClose: () => setShowExternalUploadModal(false),
      onSubmit: () => {
        onClick(cloneBlock(block));
        createSuccessNotice(__('Image inserted.'), {
          type: 'snackbar'
        });
        setShowExternalUploadModal(false);
      }
    })]
  });
}
//# sourceMappingURL=media-preview.js.map
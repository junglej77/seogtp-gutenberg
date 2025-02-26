/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState, useRef } from '@wordpress/element';
import { BlockControls, BlockVerticalAlignmentControl, useInnerBlocksProps, InspectorControls, useBlockProps, __experimentalImageURLInputUI as ImageURLInputUI, store as blockEditorStore, useBlockEditingMode, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { RangeControl, TextareaControl, ToggleControl, ToolbarButton, ExternalLink, FocalPointPicker, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { isBlobURL, getBlobTypeByURL } from '@wordpress/blob';
import { pullLeft, pullRight } from '@wordpress/icons';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import MediaContainer from './media-container';
import { DEFAULT_MEDIA_SIZE_SLUG, WIDTH_CONSTRAINT_PERCENTAGE, LINK_DESTINATION_MEDIA, LINK_DESTINATION_ATTACHMENT, TEMPLATE } from './constants';
import { unlock } from '../lock-unlock';
import { useToolsPanelDropdownMenuProps } from '../utils/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  ResolutionTool
} = unlock(blockEditorPrivateApis);

// this limits the resize to a safe zone to avoid making broken layouts
const applyWidthConstraints = width => Math.max(WIDTH_CONSTRAINT_PERCENTAGE, Math.min(width, 100 - WIDTH_CONSTRAINT_PERCENTAGE));
function getImageSourceUrlBySizeSlug(image, slug) {
  // eslint-disable-next-line camelcase
  return image?.media_details?.sizes?.[slug]?.source_url;
}
function attributesFromMedia({
  attributes: {
    linkDestination,
    href
  },
  setAttributes
}) {
  return media => {
    if (!media || !media.url) {
      setAttributes({
        mediaAlt: undefined,
        mediaId: undefined,
        mediaType: undefined,
        mediaUrl: undefined,
        mediaLink: undefined,
        href: undefined,
        focalPoint: undefined
      });
      return;
    }
    if (isBlobURL(media.url)) {
      media.type = getBlobTypeByURL(media.url);
    }
    let mediaType;
    let src;
    // For media selections originated from a file upload.
    if (media.media_type) {
      if (media.media_type === 'image') {
        mediaType = 'image';
      } else {
        // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
        // video contain the media type of 'file' in the object returned from the rest api.
        mediaType = 'video';
      }
    } else {
      // For media selections originated from existing files in the media library.
      mediaType = media.type;
    }
    if (mediaType === 'image') {
      // Try the "large" size URL, falling back to the "full" size URL below.
      src = media.sizes?.large?.url ||
      // eslint-disable-next-line camelcase
      media.media_details?.sizes?.large?.source_url;
    }
    let newHref = href;
    if (linkDestination === LINK_DESTINATION_MEDIA) {
      // Update the media link.
      newHref = media.url;
    }

    // Check if the image is linked to the attachment page.
    if (linkDestination === LINK_DESTINATION_ATTACHMENT) {
      // Update the media link.
      newHref = media.link;
    }
    setAttributes({
      mediaAlt: media.alt,
      mediaId: media.id,
      mediaType,
      mediaUrl: src || media.url,
      mediaLink: media.link || undefined,
      href: newHref,
      focalPoint: undefined
    });
  };
}
function MediaTextEdit({
  attributes,
  isSelected,
  setAttributes,
  context: {
    postId,
    postType
  }
}) {
  const {
    focalPoint,
    href,
    imageFill,
    isStackedOnMobile,
    linkClass,
    linkDestination,
    linkTarget,
    mediaAlt,
    mediaId,
    mediaPosition,
    mediaType,
    mediaUrl,
    mediaWidth,
    rel,
    verticalAlignment,
    allowedBlocks,
    useFeaturedImage
  } = attributes;
  const mediaSizeSlug = attributes.mediaSizeSlug || DEFAULT_MEDIA_SIZE_SLUG;
  const [featuredImage] = useEntityProp('postType', postType, 'featured_media', postId);
  const featuredImageMedia = useSelect(select => featuredImage && select(coreStore).getMedia(featuredImage, {
    context: 'view'
  }), [featuredImage]);
  const featuredImageURL = useFeaturedImage ? featuredImageMedia?.source_url : '';
  const featuredImageAlt = useFeaturedImage ? featuredImageMedia?.alt_text : '';
  const toggleUseFeaturedImage = () => {
    setAttributes({
      imageFill: false,
      mediaType: 'image',
      mediaId: undefined,
      mediaUrl: undefined,
      mediaAlt: undefined,
      mediaLink: undefined,
      linkDestination: undefined,
      linkTarget: undefined,
      linkClass: undefined,
      rel: undefined,
      href: undefined,
      useFeaturedImage: !useFeaturedImage
    });
  };
  const {
    imageSizes,
    image
  } = useSelect(select => {
    const {
      getSettings
    } = select(blockEditorStore);
    return {
      image: mediaId && isSelected ? select(coreStore).getMedia(mediaId, {
        context: 'view'
      }) : null,
      imageSizes: getSettings()?.imageSizes
    };
  }, [isSelected, mediaId]);
  const refMedia = useRef();
  const imperativeFocalPointPreview = value => {
    const {
      style
    } = refMedia.current;
    const {
      x,
      y
    } = value;
    style.objectPosition = `${x * 100}% ${y * 100}%`;
  };
  const [temporaryMediaWidth, setTemporaryMediaWidth] = useState(null);
  const onSelectMedia = attributesFromMedia({
    attributes,
    setAttributes
  });
  const onSetHref = props => {
    setAttributes(props);
  };
  const onWidthChange = width => {
    setTemporaryMediaWidth(applyWidthConstraints(width));
  };
  const commitWidthChange = width => {
    setAttributes({
      mediaWidth: applyWidthConstraints(width)
    });
    setTemporaryMediaWidth(null);
  };
  const classNames = clsx({
    'has-media-on-the-right': 'right' === mediaPosition,
    'is-selected': isSelected,
    'is-stacked-on-mobile': isStackedOnMobile,
    [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
    'is-image-fill-element': imageFill
  });
  const widthString = `${temporaryMediaWidth || mediaWidth}%`;
  const gridTemplateColumns = 'right' === mediaPosition ? `1fr ${widthString}` : `${widthString} 1fr`;
  const style = {
    gridTemplateColumns,
    msGridColumns: gridTemplateColumns
  };
  const onMediaAltChange = newMediaAlt => {
    setAttributes({
      mediaAlt: newMediaAlt
    });
  };
  const onVerticalAlignmentChange = alignment => {
    setAttributes({
      verticalAlignment: alignment
    });
  };
  const imageSizeOptions = imageSizes.filter(({
    slug
  }) => getImageSourceUrlBySizeSlug(image, slug)).map(({
    name,
    slug
  }) => ({
    value: slug,
    label: name
  }));
  const updateImage = newMediaSizeSlug => {
    const newUrl = getImageSourceUrlBySizeSlug(image, newMediaSizeSlug);
    if (!newUrl) {
      return null;
    }
    setAttributes({
      mediaUrl: newUrl,
      mediaSizeSlug: newMediaSizeSlug
    });
  };
  const dropdownMenuProps = useToolsPanelDropdownMenuProps();
  const mediaTextGeneralSettings = /*#__PURE__*/_jsxs(ToolsPanel, {
    label: __('Settings'),
    resetAll: () => {
      setAttributes({
        isStackedOnMobile: true,
        imageFill: false,
        mediaAlt: '',
        focalPoint: undefined,
        mediaWidth: 50,
        mediaSizeSlug: undefined
      });
    },
    dropdownMenuProps: dropdownMenuProps,
    children: [/*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Media width'),
      isShownByDefault: true,
      hasValue: () => mediaWidth !== 50,
      onDeselect: () => setAttributes({
        mediaWidth: 50
      }),
      children: /*#__PURE__*/_jsx(RangeControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        label: __('Media width'),
        value: temporaryMediaWidth || mediaWidth,
        onChange: commitWidthChange,
        min: WIDTH_CONSTRAINT_PERCENTAGE,
        max: 100 - WIDTH_CONSTRAINT_PERCENTAGE
      })
    }), /*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Stack on mobile'),
      isShownByDefault: true,
      hasValue: () => !isStackedOnMobile,
      onDeselect: () => setAttributes({
        isStackedOnMobile: true
      }),
      children: /*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Stack on mobile'),
        checked: isStackedOnMobile,
        onChange: () => setAttributes({
          isStackedOnMobile: !isStackedOnMobile
        })
      })
    }), mediaType === 'image' && /*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Crop image to fill'),
      isShownByDefault: true,
      hasValue: () => !!imageFill,
      onDeselect: () => setAttributes({
        imageFill: false
      }),
      children: /*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Crop image to fill'),
        checked: !!imageFill,
        onChange: () => setAttributes({
          imageFill: !imageFill
        })
      })
    }), imageFill && (mediaUrl || featuredImageURL) && mediaType === 'image' && /*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Focal point'),
      isShownByDefault: true,
      hasValue: () => !!focalPoint,
      onDeselect: () => setAttributes({
        focalPoint: undefined
      }),
      children: /*#__PURE__*/_jsx(FocalPointPicker, {
        __nextHasNoMarginBottom: true,
        label: __('Focal point'),
        url: useFeaturedImage && featuredImageURL ? featuredImageURL : mediaUrl,
        value: focalPoint,
        onChange: value => setAttributes({
          focalPoint: value
        }),
        onDragStart: imperativeFocalPointPreview,
        onDrag: imperativeFocalPointPreview
      })
    }), mediaType === 'image' && mediaUrl && !useFeaturedImage && /*#__PURE__*/_jsx(ToolsPanelItem, {
      label: __('Alternative text'),
      isShownByDefault: true,
      hasValue: () => !!mediaAlt,
      onDeselect: () => setAttributes({
        mediaAlt: ''
      }),
      children: /*#__PURE__*/_jsx(TextareaControl, {
        __nextHasNoMarginBottom: true,
        label: __('Alternative text'),
        value: mediaAlt,
        onChange: onMediaAltChange,
        help: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(ExternalLink, {
            href:
            // translators: Localized tutorial, if one exists. W3C Web Accessibility Initiative link has list of existing translations.
            __('https://www.w3.org/WAI/tutorials/images/decision-tree/'),
            children: __('Describe the purpose of the image.')
          }), /*#__PURE__*/_jsx("br", {}), __('Leave empty if decorative.')]
        })
      })
    }), mediaType === 'image' && !useFeaturedImage && /*#__PURE__*/_jsx(ResolutionTool, {
      value: mediaSizeSlug,
      options: imageSizeOptions,
      onChange: updateImage
    })]
  });
  const blockProps = useBlockProps({
    className: classNames,
    style
  });
  const innerBlocksProps = useInnerBlocksProps({
    className: 'wp-block-media-text__content'
  }, {
    template: TEMPLATE,
    allowedBlocks
  });
  const blockEditingMode = useBlockEditingMode();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: mediaTextGeneralSettings
    }), /*#__PURE__*/_jsxs(BlockControls, {
      group: "block",
      children: [blockEditingMode === 'default' && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(BlockVerticalAlignmentControl, {
          onChange: onVerticalAlignmentChange,
          value: verticalAlignment
        }), /*#__PURE__*/_jsx(ToolbarButton, {
          icon: pullLeft,
          title: __('Show media on left'),
          isActive: mediaPosition === 'left',
          onClick: () => setAttributes({
            mediaPosition: 'left'
          })
        }), /*#__PURE__*/_jsx(ToolbarButton, {
          icon: pullRight,
          title: __('Show media on right'),
          isActive: mediaPosition === 'right',
          onClick: () => setAttributes({
            mediaPosition: 'right'
          })
        })]
      }), mediaType === 'image' && !useFeaturedImage && /*#__PURE__*/_jsx(ImageURLInputUI, {
        url: href || '',
        onChangeUrl: onSetHref,
        linkDestination: linkDestination,
        mediaType: mediaType,
        mediaUrl: image && image.source_url,
        mediaLink: image && image.link,
        linkTarget: linkTarget,
        linkClass: linkClass,
        rel: rel
      })]
    }), /*#__PURE__*/_jsxs("div", {
      ...blockProps,
      children: [mediaPosition === 'right' && /*#__PURE__*/_jsx("div", {
        ...innerBlocksProps
      }), /*#__PURE__*/_jsx(MediaContainer, {
        className: "wp-block-media-text__media",
        onSelectMedia: onSelectMedia,
        onWidthChange: onWidthChange,
        commitWidthChange: commitWidthChange,
        refMedia: refMedia,
        enableResize: blockEditingMode === 'default',
        toggleUseFeaturedImage: toggleUseFeaturedImage,
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
        useFeaturedImage,
        featuredImageURL,
        featuredImageAlt
      }), mediaPosition !== 'right' && /*#__PURE__*/_jsx("div", {
        ...innerBlocksProps
      })]
    })]
  });
}
export default MediaTextEdit;
//# sourceMappingURL=edit.js.map
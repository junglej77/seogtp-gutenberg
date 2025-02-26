/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { ToggleControl, PanelBody, Placeholder, Button, Spinner, TextControl } from '@wordpress/components';
import { InspectorControls, BlockControls, MediaPlaceholder, MediaReplaceFlow, useBlockProps, __experimentalUseBorderProps as useBorderProps, __experimentalGetShadowClassesAndStyles as getShadowClassesAndStyles, useBlockEditingMode } from '@wordpress/block-editor';
import { useMemo, useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { upload } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import DimensionControls from './dimension-controls';
import OverlayControls from './overlay-controls';
import Overlay from './overlay';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['image'];
function getMediaSourceUrlBySizeSlug(media, slug) {
  return media?.media_details?.sizes?.[slug]?.source_url || media?.source_url;
}
const disabledClickProps = {
  onClick: event => event.preventDefault(),
  'aria-disabled': true
};
export default function PostFeaturedImageEdit({
  clientId,
  attributes,
  setAttributes,
  context: {
    postId,
    postType: postTypeSlug,
    queryId
  }
}) {
  const isDescendentOfQueryLoop = Number.isFinite(queryId);
  const {
    isLink,
    aspectRatio,
    height,
    width,
    scale,
    sizeSlug,
    rel,
    linkTarget,
    useFirstImageFromPost
  } = attributes;
  const [temporaryURL, setTemporaryURL] = useState();
  const [storedFeaturedImage, setFeaturedImage] = useEntityProp('postType', postTypeSlug, 'featured_media', postId);

  // Fallback to post content if no featured image is set.
  // This is needed for the "Use first image from post" option.
  const [postContent] = useEntityProp('postType', postTypeSlug, 'content', postId);
  const featuredImage = useMemo(() => {
    if (storedFeaturedImage) {
      return storedFeaturedImage;
    }
    if (!useFirstImageFromPost) {
      return;
    }
    const imageOpener = /<!--\s+wp:(?:core\/)?image\s+(?<attrs>{(?:(?:[^}]+|}+(?=})|(?!}\s+\/?-->).)*)?}\s+)?-->/.exec(postContent);
    const imageId = imageOpener?.groups?.attrs && JSON.parse(imageOpener.groups.attrs)?.id;
    return imageId;
  }, [storedFeaturedImage, useFirstImageFromPost, postContent]);
  const {
    media,
    postType,
    postPermalink
  } = useSelect(select => {
    const {
      getMedia,
      getPostType,
      getEditedEntityRecord
    } = select(coreStore);
    return {
      media: featuredImage && getMedia(featuredImage, {
        context: 'view'
      }),
      postType: postTypeSlug && getPostType(postTypeSlug),
      postPermalink: getEditedEntityRecord('postType', postTypeSlug, postId)?.link
    };
  }, [featuredImage, postTypeSlug, postId]);
  const mediaUrl = getMediaSourceUrlBySizeSlug(media, sizeSlug);
  const blockProps = useBlockProps({
    style: {
      width,
      height,
      aspectRatio
    },
    className: clsx({
      'is-transient': temporaryURL
    })
  });
  const borderProps = useBorderProps(attributes);
  const shadowProps = getShadowClassesAndStyles(attributes);
  const blockEditingMode = useBlockEditingMode();
  const placeholder = content => {
    return /*#__PURE__*/_jsx(Placeholder, {
      className: clsx('block-editor-media-placeholder', borderProps.className),
      withIllustration: true,
      style: {
        height: !!aspectRatio && '100%',
        width: !!aspectRatio && '100%',
        ...borderProps.style,
        ...shadowProps.style
      },
      children: content
    });
  };
  const onSelectImage = value => {
    if (value?.id) {
      setFeaturedImage(value.id);
    }
    if (value?.url && isBlobURL(value.url)) {
      setTemporaryURL(value.url);
    }
  };

  // Reset temporary url when media is available.
  useEffect(() => {
    if (mediaUrl && temporaryURL) {
      setTemporaryURL();
    }
  }, [mediaUrl, temporaryURL]);
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  const onUploadError = message => {
    createErrorNotice(message, {
      type: 'snackbar'
    });
    setTemporaryURL();
  };
  const controls = blockEditingMode === 'default' && /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      group: "color",
      children: /*#__PURE__*/_jsx(OverlayControls, {
        attributes: attributes,
        setAttributes: setAttributes,
        clientId: clientId
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      group: "dimensions",
      children: /*#__PURE__*/_jsx(DimensionControls, {
        clientId: clientId,
        attributes: attributes,
        setAttributes: setAttributes,
        media: media
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: postType?.labels.singular_name ? sprintf(
          // translators: %s: Name of the post type e.g: "Page".
          __('Link to %s'), postType.labels.singular_name) : __('Link to post'),
          onChange: () => setAttributes({
            isLink: !isLink
          }),
          checked: isLink
        }), isLink && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Open in new tab'),
            onChange: value => setAttributes({
              linkTarget: value ? '_blank' : '_self'
            }),
            checked: linkTarget === '_blank'
          }), /*#__PURE__*/_jsx(TextControl, {
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true,
            label: __('Link rel'),
            value: rel,
            onChange: newRel => setAttributes({
              rel: newRel
            })
          })]
        })]
      })
    })]
  });
  let image;

  /**
   * A Post Featured Image block should not have image replacement
   * or upload options in the following cases:
   * - Is placed in a Query Loop. This is a conscious decision to
   * prevent content editing of different posts in Query Loop, and
   * this could change in the future.
   * - Is in a context where it does not have a postId (for example
   * in a template or template part).
   */
  if (!featuredImage && (isDescendentOfQueryLoop || !postId)) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [controls, /*#__PURE__*/_jsxs("div", {
        ...blockProps,
        children: [!!isLink ? /*#__PURE__*/_jsx("a", {
          href: postPermalink,
          target: linkTarget,
          ...disabledClickProps,
          children: placeholder()
        }) : placeholder(), /*#__PURE__*/_jsx(Overlay, {
          attributes: attributes,
          setAttributes: setAttributes,
          clientId: clientId
        })]
      })]
    });
  }
  const label = __('Add a featured image');
  const imageStyles = {
    ...borderProps.style,
    ...shadowProps.style,
    height: aspectRatio ? '100%' : height,
    width: !!aspectRatio && '100%',
    objectFit: !!(height || aspectRatio) && scale
  };

  /**
   * When the post featured image block is placed in a context where:
   * - It has a postId (for example in a single post)
   * - It is not inside a query loop
   * - It has no image assigned yet
   * Then display the placeholder with the image upload option.
   */
  if (!featuredImage && !temporaryURL) {
    image = /*#__PURE__*/_jsx(MediaPlaceholder, {
      onSelect: onSelectImage,
      accept: "image/*",
      allowedTypes: ALLOWED_MEDIA_TYPES,
      onError: onUploadError,
      placeholder: placeholder,
      mediaLibraryButton: ({
        open
      }) => {
        return /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          icon: upload,
          variant: "primary",
          label: label,
          showTooltip: true,
          tooltipPosition: "top center",
          onClick: () => {
            open();
          }
        });
      }
    });
  } else {
    // We have a Featured image so show a Placeholder if is loading.
    image = !media && !temporaryURL ? placeholder() : /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("img", {
        className: borderProps.className,
        src: temporaryURL || mediaUrl,
        alt: media && media?.alt_text ? sprintf(
        // translators: %s: The image's alt text.
        __('Featured image: %s'), media.alt_text) : __('Featured image'),
        style: imageStyles
      }), temporaryURL && /*#__PURE__*/_jsx(Spinner, {})]
    });
  }

  /**
   * When the post featured image block:
   * - Has an image assigned
   * - Is not inside a query loop
   * Then display the image and the image replacement option.
   */
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!temporaryURL && controls, !!media && !isDescendentOfQueryLoop && /*#__PURE__*/_jsx(BlockControls, {
      group: "other",
      children: /*#__PURE__*/_jsx(MediaReplaceFlow, {
        mediaId: featuredImage,
        mediaURL: mediaUrl,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        accept: "image/*",
        onSelect: onSelectImage,
        onError: onUploadError,
        onReset: () => setFeaturedImage(0)
      })
    }), /*#__PURE__*/_jsxs("figure", {
      ...blockProps,
      children: [!!isLink ? /*#__PURE__*/_jsx("a", {
        href: postPermalink,
        target: linkTarget,
        ...disabledClickProps,
        children: image
      }) : image, /*#__PURE__*/_jsx(Overlay, {
        attributes: attributes,
        setAttributes: setAttributes,
        clientId: clientId
      })]
    })]
  });
}
//# sourceMappingURL=edit.js.map
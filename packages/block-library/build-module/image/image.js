/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { ExternalLink, ResizableBox, Spinner, TextareaControl, TextControl, ToolbarButton, ToolbarGroup, Dropdown, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem, __experimentalUseCustomUnits as useCustomUnits, Placeholder } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockControls, InspectorControls, __experimentalImageURLInputUI as ImageURLInputUI, MediaReplaceFlow, store as blockEditorStore, useSettings, __experimentalImageEditor as ImageEditor, __experimentalUseBorderProps as useBorderProps, __experimentalGetShadowClassesAndStyles as getShadowClassesAndStyles, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { useEffect, useMemo, useState, useRef } from '@wordpress/element';
import { __, _x, sprintf, isRTL } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { getFilename } from '@wordpress/url';
import { switchToBlockType, store as blocksStore } from '@wordpress/blocks';
import { crop, overlayText, upload } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { unlock } from '../lock-unlock';
import { createUpgradedEmbedBlock } from '../embed/util';
import { isExternalImage } from './edit';
import { Caption } from '../utils/caption';

/**
 * Module constants
 */
import { useToolsPanelDropdownMenuProps } from '../utils/hooks';
import { MIN_SIZE, ALLOWED_MEDIA_TYPES } from './constants';
import { evalAspectRatio } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  DimensionsTool,
  ResolutionTool
} = unlock(blockEditorPrivateApis);
const scaleOptions = [{
  value: 'cover',
  label: _x('Cover', 'Scale option for dimensions control'),
  help: __('Image covers the space evenly.')
}, {
  value: 'contain',
  label: _x('Contain', 'Scale option for dimensions control'),
  help: __('Image is contained without distortion.')
}];

// If the image has a href, wrap in an <a /> tag to trigger any inherited link element styles.
const ImageWrapper = ({
  href,
  children
}) => {
  if (!href) {
    return children;
  }
  return /*#__PURE__*/_jsx("a", {
    href: href,
    onClick: event => event.preventDefault(),
    "aria-disabled": true,
    style: {
      // When the Image block is linked,
      // it's wrapped with a disabled <a /> tag.
      // Restore cursor style so it doesn't appear 'clickable'
      // and remove pointer events. Safari needs the display property.
      pointerEvents: 'none',
      cursor: 'default',
      display: 'inline'
    },
    children: children
  });
};
export default function Image({
  temporaryURL,
  attributes,
  setAttributes,
  isSingleSelected,
  insertBlocksAfter,
  onReplace,
  onSelectImage,
  onSelectURL,
  onUploadError,
  context,
  clientId,
  blockEditingMode,
  parentLayoutType,
  containerWidth
}) {
  const {
    url = '',
    alt,
    align,
    id,
    href,
    rel,
    linkClass,
    linkDestination,
    title,
    width,
    height,
    aspectRatio,
    scale,
    linkTarget,
    sizeSlug,
    lightbox,
    metadata
  } = attributes;

  // The only supported unit is px, so we can parseInt to strip the px here.
  const numericWidth = width ? parseInt(width, 10) : undefined;
  const numericHeight = height ? parseInt(height, 10) : undefined;
  const imageRef = useRef();
  const {
    allowResize = true
  } = context;
  const {
    getBlock,
    getSettings
  } = useSelect(blockEditorStore);
  const image = useSelect(select => id && isSingleSelected ? select(coreStore).getMedia(id, {
    context: 'view'
  }) : null, [id, isSingleSelected]);
  const {
    canInsertCover,
    imageEditing,
    imageSizes,
    maxWidth
  } = useSelect(select => {
    const {
      getBlockRootClientId,
      canInsertBlockType
    } = select(blockEditorStore);
    const rootClientId = getBlockRootClientId(clientId);
    const settings = getSettings();
    return {
      imageEditing: settings.imageEditing,
      imageSizes: settings.imageSizes,
      maxWidth: settings.maxWidth,
      canInsertCover: canInsertBlockType('core/cover', rootClientId)
    };
  }, [clientId]);
  const {
    replaceBlocks,
    toggleSelection
  } = useDispatch(blockEditorStore);
  const {
    createErrorNotice,
    createSuccessNotice
  } = useDispatch(noticesStore);
  const isLargeViewport = useViewportMatch('medium');
  const isWideAligned = ['wide', 'full'].includes(align);
  const [{
    loadedNaturalWidth,
    loadedNaturalHeight
  }, setLoadedNaturalSize] = useState({});
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [externalBlob, setExternalBlob] = useState();
  const [hasImageErrored, setHasImageErrored] = useState(false);
  const hasNonContentControls = blockEditingMode === 'default';
  const isContentOnlyMode = blockEditingMode === 'contentOnly';
  const isResizable = allowResize && hasNonContentControls && !isWideAligned && isLargeViewport;
  const imageSizeOptions = imageSizes.filter(({
    slug
  }) => image?.media_details?.sizes?.[slug]?.source_url).map(({
    name,
    slug
  }) => ({
    value: slug,
    label: name
  }));

  // If an image is externally hosted, try to fetch the image data. This may
  // fail if the image host doesn't allow CORS with the domain. If it works,
  // we can enable a button in the toolbar to upload the image.
  useEffect(() => {
    if (!isExternalImage(id, url) || !isSingleSelected || !getSettings().mediaUpload) {
      setExternalBlob();
      return;
    }
    if (externalBlob) {
      return;
    }
    window
    // Avoid cache, which seems to help avoid CORS problems.
    .fetch(url.includes('?') ? url : url + '?').then(response => response.blob()).then(blob => setExternalBlob(blob))
    // Do nothing, cannot upload.
    .catch(() => {});
  }, [id, url, isSingleSelected, externalBlob]);

  // Get naturalWidth and naturalHeight from image ref, and fall back to loaded natural
  // width and height. This resolves an issue in Safari where the loaded natural
  // width and height is otherwise lost when switching between alignments.
  // See: https://github.com/WordPress/gutenberg/pull/37210.
  const {
    naturalWidth,
    naturalHeight
  } = useMemo(() => {
    return {
      naturalWidth: imageRef.current?.naturalWidth || loadedNaturalWidth || undefined,
      naturalHeight: imageRef.current?.naturalHeight || loadedNaturalHeight || undefined
    };
  }, [loadedNaturalWidth, loadedNaturalHeight, imageRef.current?.complete]);
  function onResizeStart() {
    toggleSelection(false);
  }
  function onResizeStop() {
    toggleSelection(true);
  }
  function onImageError() {
    setHasImageErrored(true);

    // Check if there's an embed block that handles this URL, e.g., instagram URL.
    // See: https://github.com/WordPress/gutenberg/pull/11472
    const embedBlock = createUpgradedEmbedBlock({
      attributes: {
        url
      }
    });
    if (undefined !== embedBlock) {
      onReplace(embedBlock);
    }
  }
  function onImageLoad(event) {
    setHasImageErrored(false);
    setLoadedNaturalSize({
      loadedNaturalWidth: event.target?.naturalWidth,
      loadedNaturalHeight: event.target?.naturalHeight
    });
  }
  function onSetHref(props) {
    setAttributes(props);
  }
  function onSetLightbox(enable) {
    if (enable && !lightboxSetting?.enabled) {
      setAttributes({
        lightbox: {
          enabled: true
        }
      });
    } else if (!enable && lightboxSetting?.enabled) {
      setAttributes({
        lightbox: {
          enabled: false
        }
      });
    } else {
      setAttributes({
        lightbox: undefined
      });
    }
  }
  function resetLightbox() {
    // When deleting a link from an image while lightbox settings
    // are enabled by default, we should disable the lightbox,
    // otherwise the resulting UX looks like a mistake.
    // See https://github.com/WordPress/gutenberg/pull/59890/files#r1532286123.
    if (lightboxSetting?.enabled && lightboxSetting?.allowEditing) {
      setAttributes({
        lightbox: {
          enabled: false
        }
      });
    } else {
      setAttributes({
        lightbox: undefined
      });
    }
  }
  function onSetTitle(value) {
    // This is the HTML title attribute, separate from the media object
    // title.
    setAttributes({
      title: value
    });
  }
  function updateAlt(newAlt) {
    setAttributes({
      alt: newAlt
    });
  }
  function updateImage(newSizeSlug) {
    const newUrl = image?.media_details?.sizes?.[newSizeSlug]?.source_url;
    if (!newUrl) {
      return null;
    }
    setAttributes({
      url: newUrl,
      sizeSlug: newSizeSlug
    });
  }
  function uploadExternal() {
    const {
      mediaUpload
    } = getSettings();
    if (!mediaUpload) {
      return;
    }
    mediaUpload({
      filesList: [externalBlob],
      onFileChange([img]) {
        onSelectImage(img);
        if (isBlobURL(img.url)) {
          return;
        }
        setExternalBlob();
        createSuccessNotice(__('Image uploaded.'), {
          type: 'snackbar'
        });
      },
      allowedTypes: ALLOWED_MEDIA_TYPES,
      onError(message) {
        createErrorNotice(message, {
          type: 'snackbar'
        });
      }
    });
  }
  useEffect(() => {
    if (!isSingleSelected) {
      setIsEditingImage(false);
    }
  }, [isSingleSelected]);
  const canEditImage = id && naturalWidth && naturalHeight && imageEditing;
  const allowCrop = isSingleSelected && canEditImage && !isEditingImage && !isContentOnlyMode;
  function switchToCover() {
    replaceBlocks(clientId, switchToBlockType(getBlock(clientId), 'core/cover'));
  }

  // TODO: Can allow more units after figuring out how they should interact
  // with the ResizableBox and ImageEditor components. Calculations later on
  // for those components are currently assuming px units.
  const dimensionsUnitsOptions = useCustomUnits({
    availableUnits: ['px']
  });
  const [lightboxSetting] = useSettings('lightbox');
  const showLightboxSetting =
  // If a block-level override is set, we should give users the option to
  // remove that override, even if the lightbox UI is disabled in the settings.
  !!lightbox && lightbox?.enabled !== lightboxSetting?.enabled || lightboxSetting?.allowEditing;
  const lightboxChecked = !!lightbox?.enabled || !lightbox && !!lightboxSetting?.enabled;
  const dropdownMenuProps = useToolsPanelDropdownMenuProps();
  const dimensionsControl = /*#__PURE__*/_jsx(DimensionsTool, {
    value: {
      width,
      height,
      scale,
      aspectRatio
    },
    onChange: ({
      width: newWidth,
      height: newHeight,
      scale: newScale,
      aspectRatio: newAspectRatio
    }) => {
      // Rebuilding the object forces setting `undefined`
      // for values that are removed since setAttributes
      // doesn't do anything with keys that aren't set.
      setAttributes({
        // CSS includes `height: auto`, but we need
        // `width: auto` to fix the aspect ratio when
        // only height is set due to the width and
        // height attributes set via the server.
        width: !newWidth && newHeight ? 'auto' : newWidth,
        height: newHeight,
        scale: newScale,
        aspectRatio: newAspectRatio
      });
    },
    defaultScale: "cover",
    defaultAspectRatio: "auto",
    scaleOptions: scaleOptions,
    unitsOptions: dimensionsUnitsOptions
  });
  const aspectRatioControl = /*#__PURE__*/_jsx(DimensionsTool, {
    value: {
      aspectRatio
    },
    onChange: ({
      aspectRatio: newAspectRatio
    }) => {
      setAttributes({
        aspectRatio: newAspectRatio,
        scale: 'cover'
      });
    },
    defaultAspectRatio: "auto",
    tools: ['aspectRatio']
  });
  const resetAll = () => {
    setAttributes({
      alt: undefined,
      width: undefined,
      height: undefined,
      scale: undefined,
      aspectRatio: undefined,
      lightbox: undefined
    });
  };
  const sizeControls = /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsx(ToolsPanel, {
      label: __('Settings'),
      resetAll: resetAll,
      dropdownMenuProps: dropdownMenuProps,
      children: isResizable && (parentLayoutType === 'grid' ? aspectRatioControl : dimensionsControl)
    })
  });
  const arePatternOverridesEnabled = metadata?.bindings?.__default?.source === 'core/pattern-overrides';
  const {
    lockUrlControls = false,
    lockHrefControls = false,
    lockAltControls = false,
    lockAltControlsMessage,
    lockTitleControls = false,
    lockTitleControlsMessage,
    lockCaption = false
  } = useSelect(select => {
    if (!isSingleSelected) {
      return {};
    }
    const {
      getBlockBindingsSource
    } = unlock(select(blocksStore));
    const {
      url: urlBinding,
      alt: altBinding,
      title: titleBinding
    } = metadata?.bindings || {};
    const hasParentPattern = !!context['pattern/overrides'];
    const urlBindingSource = getBlockBindingsSource(urlBinding?.source);
    const altBindingSource = getBlockBindingsSource(altBinding?.source);
    const titleBindingSource = getBlockBindingsSource(titleBinding?.source);
    return {
      lockUrlControls: !!urlBinding && !urlBindingSource?.canUserEditValue?.({
        select,
        context,
        args: urlBinding?.args
      }),
      lockHrefControls:
      // Disable editing the link of the URL if the image is inside a pattern instance.
      // This is a temporary solution until we support overriding the link on the frontend.
      hasParentPattern || arePatternOverridesEnabled,
      lockCaption:
      // Disable editing the caption if the image is inside a pattern instance.
      // This is a temporary solution until we support overriding the caption on the frontend.
      hasParentPattern,
      lockAltControls: !!altBinding && !altBindingSource?.canUserEditValue?.({
        select,
        context,
        args: altBinding?.args
      }),
      lockAltControlsMessage: altBindingSource?.label ? sprintf( /* translators: %s: Label of the bindings source. */
      __('Connected to %s'), altBindingSource.label) : __('Connected to dynamic data'),
      lockTitleControls: !!titleBinding && !titleBindingSource?.canUserEditValue?.({
        select,
        context,
        args: titleBinding?.args
      }),
      lockTitleControlsMessage: titleBindingSource?.label ? sprintf( /* translators: %s: Label of the bindings source. */
      __('Connected to %s'), titleBindingSource.label) : __('Connected to dynamic data')
    };
  }, [arePatternOverridesEnabled, context, isSingleSelected, metadata?.bindings]);
  const showUrlInput = isSingleSelected && !isEditingImage && !lockHrefControls && !lockUrlControls;
  const showCoverControls = isSingleSelected && canInsertCover;
  const showBlockControls = showUrlInput || allowCrop || showCoverControls;
  const controls = /*#__PURE__*/_jsxs(_Fragment, {
    children: [showBlockControls && /*#__PURE__*/_jsxs(BlockControls, {
      group: "block",
      children: [showUrlInput && /*#__PURE__*/_jsx(ImageURLInputUI, {
        url: href || '',
        onChangeUrl: onSetHref,
        linkDestination: linkDestination,
        mediaUrl: image && image.source_url || url,
        mediaLink: image && image.link,
        linkTarget: linkTarget,
        linkClass: linkClass,
        rel: rel,
        showLightboxSetting: showLightboxSetting,
        lightboxEnabled: lightboxChecked,
        onSetLightbox: onSetLightbox,
        resetLightbox: resetLightbox
      }), allowCrop && /*#__PURE__*/_jsx(ToolbarButton, {
        onClick: () => setIsEditingImage(true),
        icon: crop,
        label: __('Crop')
      }), showCoverControls && /*#__PURE__*/_jsx(ToolbarButton, {
        icon: overlayText,
        label: __('Add text over image'),
        onClick: switchToCover
      })]
    }), isSingleSelected && !isEditingImage && !lockUrlControls && /*#__PURE__*/_jsx(BlockControls, {
      group: "other",
      children: /*#__PURE__*/_jsx(MediaReplaceFlow, {
        mediaId: id,
        mediaURL: url,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        accept: "image/*",
        onSelect: onSelectImage,
        onSelectURL: onSelectURL,
        onError: onUploadError,
        onReset: () => onSelectImage(undefined)
      })
    }), isSingleSelected && externalBlob && /*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(ToolbarGroup, {
        children: /*#__PURE__*/_jsx(ToolbarButton, {
          onClick: uploadExternal,
          icon: upload,
          label: __('Upload to Media Library')
        })
      })
    }), isContentOnlyMode &&
    /*#__PURE__*/
    // Add some extra controls for content attributes when content only mode is active.
    // With content only mode active, the inspector is hidden, so users need another way
    // to edit these attributes.
    _jsxs(BlockControls, {
      group: "other",
      children: [/*#__PURE__*/_jsx(Dropdown, {
        popoverProps: {
          position: 'bottom right'
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/_jsx(ToolbarButton, {
          onClick: onToggle,
          "aria-haspopup": "true",
          "aria-expanded": isOpen,
          onKeyDown: event => {
            if (!isOpen && event.keyCode === DOWN) {
              event.preventDefault();
              onToggle();
            }
          },
          children: _x('Alternative text', 'Alternative text for an image. Block toolbar label, a low character count is preferred.')
        }),
        renderContent: () => /*#__PURE__*/_jsx(TextareaControl, {
          className: "wp-block-image__toolbar_content_textarea",
          label: __('Alternative text'),
          value: alt || '',
          onChange: updateAlt,
          disabled: lockAltControls,
          help: lockAltControls ? /*#__PURE__*/_jsx(_Fragment, {
            children: lockAltControlsMessage
          }) : /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(ExternalLink, {
              href:
              // translators: Localized tutorial, if one exists. W3C Web Accessibility Initiative link has list of existing translations.
              __('https://www.w3.org/WAI/tutorials/images/decision-tree/'),
              children: __('Describe the purpose of the image.')
            }), /*#__PURE__*/_jsx("br", {}), __('Leave empty if decorative.')]
          }),
          __nextHasNoMarginBottom: true
        })
      }), title && /*#__PURE__*/_jsx(Dropdown, {
        popoverProps: {
          position: 'bottom right'
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/_jsx(ToolbarButton, {
          onClick: onToggle,
          "aria-haspopup": "true",
          "aria-expanded": isOpen,
          onKeyDown: event => {
            if (!isOpen && event.keyCode === DOWN) {
              event.preventDefault();
              onToggle();
            }
          },
          children: __('Title')
        }),
        renderContent: () => /*#__PURE__*/_jsx(TextControl, {
          __next40pxDefaultSize: true,
          className: "wp-block-image__toolbar_content_textarea",
          __nextHasNoMarginBottom: true,
          label: __('Title attribute'),
          value: title || '',
          onChange: onSetTitle,
          disabled: lockTitleControls,
          help: lockTitleControls ? /*#__PURE__*/_jsx(_Fragment, {
            children: lockTitleControlsMessage
          }) : /*#__PURE__*/_jsxs(_Fragment, {
            children: [__('Describe the role of this image on the page.'), /*#__PURE__*/_jsx(ExternalLink, {
              href: "https://www.w3.org/TR/html52/dom.html#the-title-attribute",
              children: __('(Note: many devices and browsers do not display this text.)')
            })]
          })
        })
      })]
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(ToolsPanel, {
        label: __('Settings'),
        resetAll: resetAll,
        dropdownMenuProps: dropdownMenuProps,
        children: [isSingleSelected && /*#__PURE__*/_jsx(ToolsPanelItem, {
          label: __('Alternative text'),
          isShownByDefault: true,
          hasValue: () => !!alt,
          onDeselect: () => setAttributes({
            alt: undefined
          }),
          children: /*#__PURE__*/_jsx(TextareaControl, {
            label: __('Alternative text'),
            value: alt || '',
            onChange: updateAlt,
            readOnly: lockAltControls,
            help: lockAltControls ? /*#__PURE__*/_jsx(_Fragment, {
              children: lockAltControlsMessage
            }) : /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(ExternalLink, {
                href:
                // translators: Localized tutorial, if one exists. W3C Web Accessibility Initiative link has list of existing translations.
                __('https://www.w3.org/WAI/tutorials/images/decision-tree/'),
                children: __('Describe the purpose of the image.')
              }), /*#__PURE__*/_jsx("br", {}), __('Leave empty if decorative.')]
            }),
            __nextHasNoMarginBottom: true
          })
        }), isResizable && (parentLayoutType === 'grid' ? aspectRatioControl : dimensionsControl), !!imageSizeOptions.length && /*#__PURE__*/_jsx(ResolutionTool, {
          value: sizeSlug,
          onChange: updateImage,
          options: imageSizeOptions
        })]
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      group: "advanced",
      children: /*#__PURE__*/_jsx(TextControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        label: __('Title attribute'),
        value: title || '',
        onChange: onSetTitle,
        readOnly: lockTitleControls,
        help: lockTitleControls ? /*#__PURE__*/_jsx(_Fragment, {
          children: lockTitleControlsMessage
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [__('Describe the role of this image on the page.'), /*#__PURE__*/_jsx(ExternalLink, {
            href: "https://www.w3.org/TR/html52/dom.html#the-title-attribute",
            children: __('(Note: many devices and browsers do not display this text.)')
          })]
        })
      })
    })]
  });
  const filename = getFilename(url);
  let defaultedAlt;
  if (alt) {
    defaultedAlt = alt;
  } else if (filename) {
    defaultedAlt = sprintf( /* translators: %s: file name */
    __('This image has an empty alt attribute; its file name is %s'), filename);
  } else {
    defaultedAlt = __('This image has an empty alt attribute');
  }
  const borderProps = useBorderProps(attributes);
  const shadowProps = getShadowClassesAndStyles(attributes);
  const isRounded = attributes.className?.includes('is-style-rounded');
  let img = temporaryURL && hasImageErrored ?
  /*#__PURE__*/
  // Show a placeholder during upload when the blob URL can't be loaded. This can
  // happen when the user uploads a HEIC image in a browser that doesn't support them.
  _jsx(Placeholder, {
    className: "wp-block-image__placeholder",
    withIllustration: true,
    children: /*#__PURE__*/_jsx(Spinner, {})
  }) :
  /*#__PURE__*/
  // Disable reason: Image itself is not meant to be interactive, but
  // should direct focus to block.
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  _jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("img", {
      src: temporaryURL || url,
      alt: defaultedAlt,
      onError: onImageError,
      onLoad: onImageLoad,
      ref: imageRef,
      className: borderProps.className,
      style: {
        width: width && height || aspectRatio ? '100%' : undefined,
        height: width && height || aspectRatio ? '100%' : undefined,
        objectFit: scale,
        ...borderProps.style,
        ...shadowProps.style
      }
    }), temporaryURL && /*#__PURE__*/_jsx(Spinner, {})]
  })
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */;
  if (canEditImage && isEditingImage) {
    img = /*#__PURE__*/_jsx(ImageWrapper, {
      href: href,
      children: /*#__PURE__*/_jsx(ImageEditor, {
        id: id,
        url: url,
        width: numericWidth,
        height: numericHeight,
        naturalHeight: naturalHeight,
        naturalWidth: naturalWidth,
        onSaveImage: imageAttributes => setAttributes(imageAttributes),
        onFinishEditing: () => {
          setIsEditingImage(false);
        },
        borderProps: isRounded ? undefined : borderProps
      })
    });
  } else if (!isResizable || parentLayoutType === 'grid') {
    img = /*#__PURE__*/_jsx("div", {
      style: {
        width,
        height,
        aspectRatio
      },
      children: /*#__PURE__*/_jsx(ImageWrapper, {
        href: href,
        children: img
      })
    });
  } else {
    const numericRatio = aspectRatio && evalAspectRatio(aspectRatio);
    const customRatio = numericWidth / numericHeight;
    const naturalRatio = naturalWidth / naturalHeight;
    const ratio = numericRatio || customRatio || naturalRatio || 1;
    const currentWidth = !numericWidth && numericHeight ? numericHeight * ratio : numericWidth;
    const currentHeight = !numericHeight && numericWidth ? numericWidth / ratio : numericHeight;
    const minWidth = naturalWidth < naturalHeight ? MIN_SIZE : MIN_SIZE * ratio;
    const minHeight = naturalHeight < naturalWidth ? MIN_SIZE : MIN_SIZE / ratio;

    // With the current implementation of ResizableBox, an image needs an
    // explicit pixel value for the max-width. In absence of being able to
    // set the content-width, this max-width is currently dictated by the
    // vanilla editor style. The following variable adds a buffer to this
    // vanilla style, so 3rd party themes have some wiggleroom. This does,
    // in most cases, allow you to scale the image beyond the width of the
    // main column, though not infinitely.
    // @todo It would be good to revisit this once a content-width variable
    // becomes available.
    const maxWidthBuffer = maxWidth * 2.5;
    const maxContentWidth = containerWidth || maxWidthBuffer;
    let showRightHandle = false;
    let showLeftHandle = false;

    /* eslint-disable no-lonely-if */
    // See https://github.com/WordPress/gutenberg/issues/7584.
    if (align === 'center') {
      // When the image is centered, show both handles.
      showRightHandle = true;
      showLeftHandle = true;
    } else if (isRTL()) {
      // In RTL mode the image is on the right by default.
      // Show the right handle and hide the left handle only when it is
      // aligned left. Otherwise always show the left handle.
      if (align === 'left') {
        showRightHandle = true;
      } else {
        showLeftHandle = true;
      }
    } else {
      // Show the left handle and hide the right handle only when the
      // image is aligned right. Otherwise always show the right handle.
      if (align === 'right') {
        showLeftHandle = true;
      } else {
        showRightHandle = true;
      }
    }
    /* eslint-enable no-lonely-if */
    img = /*#__PURE__*/_jsx(ResizableBox, {
      style: {
        display: 'block',
        objectFit: scale,
        aspectRatio: !width && !height && aspectRatio ? aspectRatio : undefined
      },
      size: {
        width: currentWidth !== null && currentWidth !== void 0 ? currentWidth : 'auto',
        height: currentHeight !== null && currentHeight !== void 0 ? currentHeight : 'auto'
      },
      showHandle: isSingleSelected,
      minWidth: minWidth,
      maxWidth: maxContentWidth,
      minHeight: minHeight,
      maxHeight: maxContentWidth / ratio,
      lockAspectRatio: ratio,
      enable: {
        top: false,
        right: showRightHandle,
        bottom: true,
        left: showLeftHandle
      },
      onResizeStart: onResizeStart,
      onResizeStop: (event, direction, elt) => {
        onResizeStop();

        // Clear hardcoded width if the resized width is close to the max-content width.
        if (
        // Only do this if the image is bigger than the container to prevent it from being squished.
        // TODO: Remove this check if the image support setting 100% width.
        naturalWidth >= maxContentWidth && Math.abs(elt.offsetWidth - maxContentWidth) < 10) {
          setAttributes({
            width: undefined,
            height: undefined
          });
          return;
        }

        // Since the aspect ratio is locked when resizing, we can
        // use the width of the resized element to calculate the
        // height in CSS to prevent stretching when the max-width
        // is reached.
        setAttributes({
          width: `${elt.offsetWidth}px`,
          height: 'auto',
          aspectRatio: ratio === naturalRatio ? undefined : String(ratio)
        });
      },
      resizeRatio: align === 'center' ? 2 : 1,
      children: /*#__PURE__*/_jsx(ImageWrapper, {
        href: href,
        children: img
      })
    });
  }
  if (!url && !temporaryURL) {
    // Add all controls if the image attributes are connected.
    return metadata?.bindings ? controls : sizeControls;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [controls, img, /*#__PURE__*/_jsx(Caption, {
      attributes: attributes,
      setAttributes: setAttributes,
      isSelected: isSingleSelected,
      insertBlocksAfter: insertBlocksAfter,
      label: __('Image caption text'),
      showToolbarButton: isSingleSelected && hasNonContentControls && !arePatternOverridesEnabled,
      readOnly: lockCaption
    })]
  });
}
//# sourceMappingURL=image.js.map
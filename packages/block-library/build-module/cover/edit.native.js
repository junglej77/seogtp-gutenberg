/**
 * External dependencies
 */
import { View, TouchableWithoutFeedback, InteractionManager, AccessibilityInfo, Text, Platform } from 'react-native';
import Video from 'react-native-video';
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { requestImageFailedRetryDialog, requestImageUploadCancelDialog, requestImageFullscreenPreview, mediaUploadSync } from '@wordpress/react-native-bridge';
import { __ } from '@wordpress/i18n';
import { Icon, Image, ImageEditingButton, IMAGE_DEFAULT_FOCAL_POINT, ToolbarButton, Gradient, ColorPalette, ColorPicker, BottomSheetConsumer, useConvertUnitToMobile } from '@wordpress/components';
import { BlockControls, InnerBlocks, InspectorControls, MEDIA_TYPE_IMAGE, MediaPlaceholder, MediaUpload, MediaUploadProgress, getColorObjectByColorValue, getColorObjectByAttributeValues, getGradientValueBySlug, store as blockEditorStore, useGlobalStyles, useMobileGlobalStylesColors } from '@wordpress/block-editor';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { useDispatch, withSelect, withDispatch } from '@wordpress/data';
import { useEffect, useState, useRef, useCallback, useMemo } from '@wordpress/element';
import { cover as icon, replace, image, warning } from '@wordpress/icons';
import { getProtocol } from '@wordpress/url';
// eslint-disable-next-line no-restricted-imports
import { store as editPostStore } from '@wordpress/edit-post';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { attributesFromMedia, ALLOWED_MEDIA_TYPES, IMAGE_BACKGROUND_TYPE, VIDEO_BACKGROUND_TYPE, COVER_DEFAULT_HEIGHT } from './shared';
import Controls from './controls';
import useCoverIsDark from './use-cover-is-dark';

/**
 * Constants
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const INNER_BLOCKS_TEMPLATE = [['core/paragraph', {
  align: 'center',
  placeholder: __('Write title…')
}]];
function useIsScreenReaderEnabled() {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  useEffect(() => {
    let mounted = true;
    const changeListener = AccessibilityInfo.addEventListener('screenReaderChanged', enabled => setIsScreenReaderEnabled(enabled));
    AccessibilityInfo.isScreenReaderEnabled().then(screenReaderEnabled => {
      if (mounted && screenReaderEnabled) {
        setIsScreenReaderEnabled(screenReaderEnabled);
      }
    });
    return () => {
      mounted = false;
      changeListener.remove();
    };
  }, []);
  return isScreenReaderEnabled;
}
const Cover = ({
  attributes,
  getStylesFromColorScheme,
  isParentSelected,
  onFocus,
  setAttributes,
  openGeneralSidebar,
  closeSettingsBottomSheet,
  isSelected,
  selectBlock,
  blockWidth,
  hasInnerBlocks
}) => {
  const {
    backgroundType,
    dimRatio,
    focalPoint,
    minHeight,
    url,
    id,
    style,
    customOverlayColor,
    minHeightUnit = 'px',
    allowedBlocks,
    templateLock,
    customGradient,
    gradient,
    overlayColor,
    isDark
  } = attributes;
  const isScreenReaderEnabled = useIsScreenReaderEnabled();
  useEffect(() => {
    // Sync with local media store.
    mediaUploadSync();
  }, []);
  const globalStyles = useGlobalStyles();
  const convertedMinHeight = useConvertUnitToMobile(minHeight || COVER_DEFAULT_HEIGHT, minHeightUnit, globalStyles);
  const isImage = backgroundType === MEDIA_TYPE_IMAGE;
  const THEME_COLORS_COUNT = 4;
  const colorsDefault = useMobileGlobalStylesColors();
  const coverDefaultPalette = useMemo(() => {
    return {
      colors: colorsDefault.slice(0, THEME_COLORS_COUNT)
    };
  }, [colorsDefault]);
  const gradients = useMobileGlobalStylesColors('gradients');
  const gradientValue = customGradient || getGradientValueBySlug(gradients, gradient);
  const overlayColorValue = getColorObjectByAttributeValues(colorsDefault, overlayColor);
  const hasBackground = !!(url || style && style.color && style.color.background || attributes.overlayColor || overlayColorValue.color || customOverlayColor || gradientValue);
  const hasOnlyColorBackground = !url && (hasBackground || hasInnerBlocks);
  const [isCustomColorPickerShowing, setCustomColorPickerShowing] = useState(false);
  const openMediaOptionsRef = useRef();

  // Initialize uploading flag to false, awaiting sync.
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

  // Initialize upload failure flag to true if url is local.
  const [didUploadFail, setDidUploadFail] = useState(id && getProtocol(url) === 'file:');

  // Don't show failure if upload is in progress.
  const shouldShowFailure = didUploadFail && !isUploadInProgress;
  const onSelectMedia = media => {
    setDidUploadFail(false);
    const mediaAttributes = attributesFromMedia(media);
    setAttributes({
      ...mediaAttributes,
      focalPoint: undefined,
      useFeaturedImage: undefined,
      dimRatio: dimRatio === 100 ? 50 : dimRatio,
      isDark: undefined
    });
  };
  const onUpdateMediaProgress = useCallback(payload => {
    const {
      mediaUrl,
      state
    } = payload;
    setIsUploadInProgress(true);
    if (isUploadInProgress && isImage && mediaUrl && !state) {
      setAttributes({
        url: mediaUrl
      });
    }
  }, [isImage, isUploadInProgress, setAttributes]);
  const onMediaPressed = () => {
    if (isUploadInProgress) {
      requestImageUploadCancelDialog(id);
    } else if (shouldShowFailure) {
      requestImageFailedRetryDialog(id);
    } else if (isImage && url) {
      requestImageFullscreenPreview(url);
    }
  };
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const onVideoLoadStart = () => {
    setIsVideoLoading(true);
  };
  const onVideoLoad = () => {
    setIsVideoLoading(false);
  };
  const onClearMedia = useCallback(() => {
    setAttributes({
      focalPoint: undefined,
      hasParallax: undefined,
      id: undefined,
      url: undefined
    });
    closeSettingsBottomSheet();
  }, [closeSettingsBottomSheet]);
  const onAddMediaButtonPress = useCallback(() => {
    if (openMediaOptionsRef?.current) {
      openMediaOptionsRef.current();
    }
  }, []);
  function setColor(color) {
    var _colorValue$slug, _ref;
    const colorValue = getColorObjectByColorValue(colorsDefault, color);
    setAttributes({
      // Clear all related attributes (only one should be set).
      overlayColor: (_colorValue$slug = colorValue?.slug) !== null && _colorValue$slug !== void 0 ? _colorValue$slug : undefined,
      customOverlayColor: (_ref = !colorValue?.slug && color) !== null && _ref !== void 0 ? _ref : undefined,
      gradient: undefined,
      customGradient: undefined
    });
  }
  function openColorPicker() {
    selectBlock();
    setCustomColorPickerShowing(true);
    openGeneralSidebar();
  }
  const {
    __unstableMarkNextChangeAsNotPersistent
  } = useDispatch(blockEditorStore);
  const isCoverDark = useCoverIsDark(isDark, url, dimRatio, overlayColorValue?.color);
  useEffect(() => {
    // This side-effect should not create an undo level.
    __unstableMarkNextChangeAsNotPersistent();
    // Used to set a default color for its InnerBlocks
    // since there's no system to inherit styles yet
    // the RichText component will check if there are
    // parent styles for the current block. If there are,
    // it will use that color instead.
    setAttributes({
      isDark: isCoverDark,
      childrenStyles: isCoverDark ? styles.defaultColor : styles.defaultColorLightMode
    });

    // Ensure that "is-light" is removed from "className" attribute if cover background is dark.
    if (isCoverDark && attributes.className?.includes('is-light')) {
      const className = clsx(attributes.className, {
        'is-light': false
      });
      setAttributes({
        className: className !== '' ? className : undefined
      });
    }
  }, [isCoverDark]);
  const backgroundColor = getStylesFromColorScheme(styles.backgroundSolid, styles.backgroundSolidDark);
  const overlayStyles = [styles.overlay, url && {
    opacity: dimRatio / 100
  }, !gradientValue && {
    backgroundColor: customOverlayColor || overlayColorValue?.color || style?.color?.background || styles.overlay?.color
  },
  // While we don't support theme colors we add a default bg color.
  !overlayColorValue.color && !url ? backgroundColor : {}, isImage && isParentSelected && !isUploadInProgress && !didUploadFail && styles.overlaySelected];
  const placeholderIconStyle = getStylesFromColorScheme(styles.icon, styles.iconDark);
  const placeholderIcon = /*#__PURE__*/_jsx(Icon, {
    icon: icon,
    ...placeholderIconStyle
  });
  const toolbarControls = open => /*#__PURE__*/_jsx(BlockControls, {
    group: "other",
    children: /*#__PURE__*/_jsx(ToolbarButton, {
      title: __('Edit cover media'),
      icon: replace,
      onClick: open
    })
  });
  const accessibilityHint = Platform.OS === 'ios' ? __('Double tap to open Action Sheet to add image or video') : __('Double tap to open Bottom Sheet to add image or video');
  const addMediaButton = () => /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    accessibilityHint: accessibilityHint,
    accessibilityLabel: __('Add image or video'),
    accessibilityRole: "button",
    onPress: onAddMediaButtonPress,
    children: /*#__PURE__*/_jsx(View, {
      style: styles.selectImageContainer,
      children: /*#__PURE__*/_jsx(View, {
        style: styles.selectImage,
        children: /*#__PURE__*/_jsx(Icon, {
          size: 16,
          icon: image,
          ...styles.selectImageIcon
        })
      })
    })
  });
  const onBottomSheetClosed = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      setCustomColorPickerShowing(false);
    });
  }, []);
  const selectedColorText = getStylesFromColorScheme(styles.selectedColorText, styles.selectedColorTextDark);
  const bottomLabelText = customOverlayColor ? /*#__PURE__*/_jsx(Text, {
    style: selectedColorText,
    children: customOverlayColor.toUpperCase()
  }) : __('Select a color');
  const colorPickerControls = /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsx(BottomSheetConsumer, {
      children: ({
        shouldEnableBottomSheetScroll,
        shouldEnableBottomSheetMaxHeight,
        onHandleClosingBottomSheet,
        onHandleHardwareButtonPress,
        isBottomSheetContentScrolling
      }) => /*#__PURE__*/_jsx(ColorPicker, {
        shouldEnableBottomSheetScroll: shouldEnableBottomSheetScroll,
        shouldEnableBottomSheetMaxHeight: shouldEnableBottomSheetMaxHeight,
        setColor: setColor,
        onNavigationBack: closeSettingsBottomSheet,
        onHandleClosingBottomSheet: onHandleClosingBottomSheet,
        onHandleHardwareButtonPress: onHandleHardwareButtonPress,
        onBottomSheetClosed: onBottomSheetClosed,
        isBottomSheetContentScrolling: isBottomSheetContentScrolling,
        bottomLabelText: bottomLabelText
      })
    })
  });
  const renderContent = getMediaOptions => /*#__PURE__*/_jsxs(_Fragment, {
    children: [renderBackground(getMediaOptions), isParentSelected && hasOnlyColorBackground && addMediaButton()]
  });
  const renderBackground = getMediaOptions => /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    accessible: !isParentSelected,
    onPress: onMediaPressed,
    disabled: !isParentSelected,
    children: /*#__PURE__*/_jsxs(View, {
      style: [styles.background, backgroundColor],
      children: [getMediaOptions(), isParentSelected && backgroundType === VIDEO_BACKGROUND_TYPE && toolbarControls(openMediaOptionsRef.current), /*#__PURE__*/_jsx(MediaUploadProgress, {
        mediaId: id,
        onUpdateMediaProgress: onUpdateMediaProgress,
        onFinishMediaUploadWithSuccess: ({
          mediaServerId,
          mediaUrl
        }) => {
          setIsUploadInProgress(false);
          setDidUploadFail(false);
          setAttributes({
            id: mediaServerId,
            url: mediaUrl,
            backgroundType
          });
        },
        onFinishMediaUploadWithFailure: () => {
          setIsUploadInProgress(false);
          setDidUploadFail(true);
        },
        onMediaUploadStateReset: () => {
          setIsUploadInProgress(false);
          setDidUploadFail(false);
          setAttributes({
            id: undefined,
            url: undefined
          });
        }
      }), IMAGE_BACKGROUND_TYPE === backgroundType && /*#__PURE__*/_jsx(View, {
        style: styles.imageContainer,
        children: /*#__PURE__*/_jsx(Image, {
          editButton: false,
          focalPoint: focalPoint || IMAGE_DEFAULT_FOCAL_POINT,
          isSelected: isParentSelected,
          isUploadFailed: didUploadFail,
          isUploadInProgress: isUploadInProgress,
          onSelectMediaUploadOption: onSelectMedia,
          openMediaOptions: openMediaOptionsRef.current,
          url: url,
          width: styles.image?.width
        })
      }), VIDEO_BACKGROUND_TYPE === backgroundType && /*#__PURE__*/_jsx(Video, {
        muted: true,
        disableFocus: true,
        repeat: true,
        resizeMode: "cover",
        source: {
          uri: url
        },
        onLoad: onVideoLoad,
        onLoadStart: onVideoLoadStart,
        style: [styles.background,
        // Hide Video component since it has black background while loading the source.
        {
          opacity: isVideoLoading ? 0 : 1
        }]
      })]
    })
  });
  if (!hasBackground && !hasInnerBlocks || isCustomColorPickerShowing) {
    return /*#__PURE__*/_jsxs(View, {
      children: [isCustomColorPickerShowing && colorPickerControls, /*#__PURE__*/_jsx(MediaPlaceholder, {
        height: styles.mediaPlaceholderEmptyStateContainer?.height,
        backgroundColor: customOverlayColor,
        hideContent: customOverlayColor !== '' && customOverlayColor !== undefined,
        icon: placeholderIcon,
        labels: {
          title: __('Cover')
        },
        onSelect: onSelectMedia,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        onFocus: onFocus,
        children: /*#__PURE__*/_jsx(View, {
          style: styles.colorPaletteWrapper,
          pointerEvents: isScreenReaderEnabled ? 'none' : 'auto',
          children: /*#__PURE__*/_jsx(BottomSheetConsumer, {
            children: ({
              shouldEnableBottomSheetScroll
            }) => /*#__PURE__*/_jsx(ColorPalette, {
              enableCustomColor: true,
              customColorIndicatorStyles: styles.paletteColorIndicator,
              customIndicatorWrapperStyles: styles.paletteCustomIndicatorWrapper,
              setColor: setColor,
              onCustomPress: openColorPicker,
              defaultSettings: coverDefaultPalette,
              shouldShowCustomLabel: false,
              shouldShowCustomVerticalSeparator: false,
              shouldEnableBottomSheetScroll: shouldEnableBottomSheetScroll
            })
          })
        })
      })]
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    style: styles.backgroundContainer,
    children: [isSelected && /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(Controls, {
        attributes: attributes,
        didUploadFail: didUploadFail,
        hasOnlyColorBackground: hasOnlyColorBackground,
        isUploadInProgress: isUploadInProgress,
        onClearMedia: onClearMedia,
        onSelectMedia: onSelectMedia,
        setAttributes: setAttributes
      })
    }), /*#__PURE__*/_jsx(View, {
      pointerEvents: "box-none",
      style: [styles.content, {
        minHeight: convertedMinHeight
      }],
      children: /*#__PURE__*/_jsx(InnerBlocks, {
        allowedBlocks: allowedBlocks,
        template: INNER_BLOCKS_TEMPLATE,
        templateLock: templateLock,
        templateInsertUpdatesSelection: true,
        blockWidth: blockWidth
      })
    }), /*#__PURE__*/_jsx(View, {
      pointerEvents: "none",
      style: styles.overlayContainer,
      children: /*#__PURE__*/_jsx(View, {
        style: overlayStyles,
        children: gradientValue && /*#__PURE__*/_jsx(Gradient, {
          gradientValue: gradientValue,
          style: styles.background
        })
      })
    }), /*#__PURE__*/_jsx(MediaUpload, {
      allowedTypes: ALLOWED_MEDIA_TYPES,
      isReplacingMedia: !hasOnlyColorBackground,
      onSelect: onSelectMedia,
      render: ({
        open,
        getMediaOptions
      }) => {
        openMediaOptionsRef.current = open;
        return renderContent(getMediaOptions);
      }
    }), isImage && url && openMediaOptionsRef.current && isParentSelected && !isUploadInProgress && !didUploadFail && /*#__PURE__*/_jsx(View, {
      style: styles.imageEditButton,
      children: /*#__PURE__*/_jsx(ImageEditingButton, {
        onSelectMediaUploadOption: onSelectMedia,
        openMediaOptions: openMediaOptionsRef.current,
        pickerOptions: [{
          destructiveButton: true,
          id: 'clearMedia',
          label: __('Clear Media'),
          onPress: onClearMedia,
          separated: true,
          value: 'clearMedia'
        }],
        url: url
      })
    }), shouldShowFailure && /*#__PURE__*/_jsx(View, {
      pointerEvents: "none",
      style: styles.uploadFailedContainer,
      children: /*#__PURE__*/_jsx(View, {
        style: styles.uploadFailed,
        children: /*#__PURE__*/_jsx(Icon, {
          icon: warning,
          ...styles.uploadFailedIcon
        })
      })
    })]
  });
};
export default compose([withSelect((select, {
  clientId
}) => {
  const {
    getSelectedBlockClientId,
    getBlock
  } = select(blockEditorStore);
  const selectedBlockClientId = getSelectedBlockClientId();
  const hasInnerBlocks = getBlock(clientId)?.innerBlocks.length > 0;
  return {
    isParentSelected: selectedBlockClientId === clientId,
    hasInnerBlocks
  };
}), withDispatch((dispatch, {
  clientId
}) => {
  const {
    openGeneralSidebar
  } = dispatch(editPostStore);
  const {
    selectBlock
  } = dispatch(blockEditorStore);
  return {
    openGeneralSidebar: () => openGeneralSidebar('edit-post/block'),
    closeSettingsBottomSheet() {
      dispatch(editPostStore).closeGeneralSidebar();
    },
    selectBlock: () => selectBlock(clientId)
  };
}), withPreferredColorScheme])(Cover);
//# sourceMappingURL=edit.native.js.map
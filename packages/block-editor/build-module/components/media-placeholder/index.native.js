/**
 * External dependencies
 */
import { View, Text, TouchableOpacity } from 'react-native';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
import { cloneElement, useCallback, useRef } from '@wordpress/element';
import { Icon, plusCircleFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import styles from './styles.scss';
import { useBlockEditContext } from '../block-edit/context';
import MediaUpload from '../media-upload';
import { MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, MEDIA_TYPE_AUDIO } from '../media-upload/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const isMediaEqual = (media1, media2) => media1.id === media2.id || media1.url === media2.url;

// Remove duplicates after gallery append.
const dedupMedia = media => media.reduce((dedupedMedia, mediaItem) => dedupedMedia.some(item => isMediaEqual(item, mediaItem)) ? dedupedMedia : [...dedupedMedia, mediaItem], []);
const hitSlop = {
  top: 22,
  bottom: 22,
  left: 22,
  right: 22
};
function MediaPlaceholder(props) {
  const {
    addToGallery,
    allowedTypes = [],
    className = '',
    labels = {},
    icon,
    onSelect,
    onFocus,
    __experimentalOnlyMediaLibrary,
    isAppender,
    disableMediaButtons,
    multiple,
    value = [],
    children,
    height,
    backgroundColor,
    hideContent,
    autoOpenMediaUpload,
    onSelectURL
  } = props;

  // Use ref to keep media array current for callbacks during rerenders.
  const mediaRef = useRef(value);
  mediaRef.current = value;
  const blockEditContext = useBlockEditContext();
  const onButtonPress = useCallback(open => event => {
    onFocus?.(event);
    open();
  }, [onFocus]);

  // Append and deduplicate media array for gallery use case.
  const setMedia = multiple && addToGallery ? selected => onSelect(dedupMedia([...mediaRef.current, ...selected])) : onSelect;
  const isOneType = allowedTypes.length === 1;
  const isImage = isOneType && allowedTypes.includes(MEDIA_TYPE_IMAGE);
  const isVideo = isOneType && allowedTypes.includes(MEDIA_TYPE_VIDEO);
  const isAudio = isOneType && allowedTypes.includes(MEDIA_TYPE_AUDIO);
  let placeholderTitle = labels.title;
  if (placeholderTitle === undefined) {
    placeholderTitle = __('Media');
    if (isImage) {
      placeholderTitle = __('Image');
    } else if (isVideo) {
      placeholderTitle = __('Video');
    } else if (isAudio) {
      placeholderTitle = __('Audio');
    }
  }
  let instructions = labels.instructions;
  if (instructions === undefined) {
    if (isImage) {
      instructions = __('Add image');
    } else if (isVideo) {
      instructions = __('Add video');
    } else if (isAudio) {
      instructions = __('Add audio');
    } else {
      instructions = __('Add image or video');
    }
  }
  let accessibilityHint = __('Double tap to select');
  if (isImage) {
    accessibilityHint = __('Double tap to select an image');
  } else if (isVideo) {
    accessibilityHint = __('Double tap to select a video');
  } else if (isAudio) {
    accessibilityHint = __('Double tap to select an audio file');
  }
  const titleStyles = usePreferredColorSchemeStyle(styles['media-placeholder__header-title'], styles['media-placeholder__header-title--dark']);
  const addMediaButtonStyle = usePreferredColorSchemeStyle(styles.addMediaButton, styles.addMediaButtonDark);
  const buttonStyles = usePreferredColorSchemeStyle(styles['media-placeholder__button'], styles['media-placeholder__button--dark']);
  const emptyStateDescriptionStyles = usePreferredColorSchemeStyle(styles.emptyStateDescription, styles.emptyStateDescriptionDark);
  const iconStyles = usePreferredColorSchemeStyle(styles['media-placeholder__header-icon'], styles['media-placeholder__header-icon--dark']);
  const placeholderIcon = cloneElement(icon, {
    fill: iconStyles.fill
  });
  const accessibilityLabel = sprintf( /* translators: accessibility text for the media block empty state. %s: media type */
  __('%s block. Empty'), placeholderTitle);
  const renderContent = open => {
    if (isAppender === undefined || !isAppender) {
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(View, {
          style: styles['media-placeholder__header'],
          children: [/*#__PURE__*/_jsx(View, {
            style: iconStyles,
            children: placeholderIcon
          }), /*#__PURE__*/_jsx(Text, {
            style: titleStyles,
            children: placeholderTitle
          })]
        }), children, /*#__PURE__*/_jsx(TouchableOpacity, {
          activeOpacity: 0.5,
          accessibilityLabel: accessibilityLabel,
          style: buttonStyles,
          accessibilityRole: "button",
          accessibilityHint: accessibilityHint,
          hitSlop: hitSlop,
          onPress: onButtonPress(open),
          children: /*#__PURE__*/_jsx(Text, {
            style: emptyStateDescriptionStyles,
            children: instructions
          })
        })]
      });
    } else if (isAppender && !disableMediaButtons) {
      return /*#__PURE__*/_jsx(TouchableOpacity, {
        activeOpacity: 0.5,
        accessibilityLabel: accessibilityLabel,
        style: styles['media-placeholder__appender'],
        accessibilityRole: "button",
        accessibilityHint: accessibilityHint,
        hitSlop: hitSlop,
        onPress: onButtonPress(open),
        children: /*#__PURE__*/_jsx(View, {
          testID: "media-placeholder-appender-icon",
          children: /*#__PURE__*/_jsx(Icon, {
            icon: plusCircleFilled,
            style: addMediaButtonStyle,
            color: addMediaButtonStyle.color,
            size: addMediaButtonStyle.size
          })
        })
      });
    }
  };
  const appenderStyle = usePreferredColorSchemeStyle(styles.appender, styles.appenderDark);
  const containerSelectedStyle = usePreferredColorSchemeStyle(styles['media-placeholder__container-selected'], styles['media-placeholder__container-selected--dark']);
  const containerStyle = [usePreferredColorSchemeStyle(styles['media-placeholder__container'], styles['media-placeholder__container--dark']), blockEditContext?.isSelected && !className.includes('no-block-outline') && containerSelectedStyle];
  if (isAppender && disableMediaButtons) {
    return null;
  }
  return /*#__PURE__*/_jsx(View, {
    style: {
      flex: 1
    },
    children: /*#__PURE__*/_jsx(MediaUpload, {
      allowedTypes: allowedTypes,
      onSelect: setMedia,
      onSelectURL: onSelectURL,
      __experimentalOnlyMediaLibrary: __experimentalOnlyMediaLibrary,
      multiple: multiple,
      isReplacingMedia: false,
      autoOpen: autoOpenMediaUpload,
      render: ({
        open,
        getMediaOptions
      }) => {
        return /*#__PURE__*/_jsxs(View, {
          style: [[containerStyle, height && {
            height
          }, backgroundColor && {
            backgroundColor
          }], isAppender && appenderStyle],
          children: [getMediaOptions(), !hideContent && renderContent(open)]
        });
      }
    })
  });
}
export default MediaPlaceholder;
//# sourceMappingURL=index.native.js.map
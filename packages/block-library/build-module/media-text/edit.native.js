/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, BlockVerticalAlignmentToolbar, InnerBlocks, InspectorControls, withColors, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, store as blockEditorStore } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { Button, ToolbarGroup, PanelBody, ToggleControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { pullLeft, pullRight, replace } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { WIDTH_CONSTRAINT_PERCENTAGE } from './constants';
import MediaContainer from './media-container';
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TEMPLATE = [['core/paragraph']];
// this limits the resize to a safe zone to avoid making broken layouts
const BREAKPOINTS = {
  mobile: 480
};
const applyWidthConstraints = width => Math.max(WIDTH_CONSTRAINT_PERCENTAGE, Math.min(width, 100 - WIDTH_CONSTRAINT_PERCENTAGE));
class MediaTextEdit extends Component {
  constructor() {
    super(...arguments);
    this.onSelectMedia = this.onSelectMedia.bind(this);
    this.onMediaUpdate = this.onMediaUpdate.bind(this);
    this.onMediaThumbnailUpdate = this.onMediaThumbnailUpdate.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
    this.commitWidthChange = this.commitWidthChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onMediaSelected = this.onMediaSelected.bind(this);
    this.onReplaceMedia = this.onReplaceMedia.bind(this);
    this.onSetOpenPickerRef = this.onSetOpenPickerRef.bind(this);
    this.onSetImageFill = this.onSetImageFill.bind(this);
    this.state = {
      mediaWidth: null,
      containerWidth: 0,
      isMediaSelected: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      isMediaSelected: state.isMediaSelected && props.isSelected && !props.isAncestorSelected
    };
  }
  onSelectMedia(media) {
    const {
      setAttributes
    } = this.props;
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
    if (mediaType === 'image' && media.sizes) {
      // Try the "large" size URL, falling back to the "full" size URL below.
      src = media.sizes.large?.url || media?.media_details?.sizes?.large?.source_url;
    }
    setAttributes({
      mediaAlt: media.alt,
      mediaId: media.id,
      mediaType,
      mediaUrl: src || media.url,
      imageFill: undefined,
      focalPoint: undefined
    });
  }
  onMediaUpdate(media) {
    const {
      setAttributes
    } = this.props;
    setAttributes({
      mediaId: media.id,
      mediaUrl: media.url
    });
  }
  onMediaThumbnailUpdate(mediaUrl) {
    const {
      setAttributes
    } = this.props;
    setAttributes({
      mediaUrl
    });
  }
  onWidthChange(width) {
    this.setState({
      mediaWidth: applyWidthConstraints(width)
    });
  }
  commitWidthChange(width) {
    const {
      setAttributes
    } = this.props;
    setAttributes({
      mediaWidth: applyWidthConstraints(width)
    });
    this.setState({
      mediaWidth: null
    });
  }
  onLayoutChange({
    nativeEvent
  }) {
    const {
      width
    } = nativeEvent.layout;
    const {
      containerWidth
    } = this.state;
    if (containerWidth === width) {
      return null;
    }
    this.setState({
      containerWidth: width
    });
  }
  onMediaSelected() {
    this.setState({
      isMediaSelected: true
    });
  }
  onReplaceMedia() {
    if (this.openPickerRef) {
      this.openPickerRef();
    }
  }
  onSetOpenPickerRef(openPicker) {
    this.openPickerRef = openPicker;
  }
  onSetImageFill() {
    const {
      attributes,
      setAttributes
    } = this.props;
    const {
      imageFill
    } = attributes;
    setAttributes({
      imageFill: !imageFill
    });
  }
  getControls() {
    const {
      attributes
    } = this.props;
    const {
      imageFill
    } = attributes;
    return /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/_jsx(ToggleControl, {
          label: __('Crop image to fill'),
          checked: imageFill,
          onChange: this.onSetImageFill
        })
      })
    });
  }
  renderMediaArea(shouldStack) {
    const {
      isMediaSelected,
      containerWidth
    } = this.state;
    const {
      attributes,
      isSelected
    } = this.props;
    const {
      mediaAlt,
      mediaId,
      mediaPosition,
      mediaType,
      mediaUrl,
      mediaWidth,
      imageFill,
      focalPoint,
      verticalAlignment
    } = attributes;
    const mediaAreaWidth = mediaWidth && !shouldStack ? containerWidth * mediaWidth / 100 - styles.mediaAreaPadding.width : containerWidth;
    const aligmentStyles = styles[`is-vertically-aligned-${verticalAlignment || 'center'}`];
    return /*#__PURE__*/_jsx(MediaContainer, {
      commitWidthChange: this.commitWidthChange,
      isMediaSelected: isMediaSelected,
      onFocus: this.props.onFocus,
      onMediaSelected: this.onMediaSelected,
      onMediaUpdate: this.onMediaUpdate,
      onMediaThumbnailUpdate: this.onMediaThumbnailUpdate,
      onSelectMedia: this.onSelectMedia,
      onSetOpenPickerRef: this.onSetOpenPickerRef,
      onWidthChange: this.onWidthChange,
      mediaWidth: mediaAreaWidth,
      mediaAlt,
      mediaId,
      mediaType,
      mediaUrl,
      mediaPosition,
      imageFill,
      focalPoint,
      isSelected,
      aligmentStyles,
      shouldStack
    });
  }
  render() {
    const {
      attributes,
      backgroundColor,
      setAttributes,
      isSelected,
      isRTL,
      style,
      blockWidth
    } = this.props;
    const {
      isStackedOnMobile,
      imageFill,
      mediaPosition,
      mediaWidth,
      mediaType,
      verticalAlignment
    } = attributes;
    const {
      containerWidth,
      isMediaSelected
    } = this.state;
    const isMobile = containerWidth < BREAKPOINTS.mobile;
    const shouldStack = isStackedOnMobile && isMobile;
    const temporaryMediaWidth = shouldStack ? 100 : this.state.mediaWidth || mediaWidth;
    const widthString = `${temporaryMediaWidth}%`;
    const innerBlockWidth = shouldStack ? 100 : 100 - temporaryMediaWidth;
    const innerBlockWidthString = `${innerBlockWidth}%`;
    const hasMedia = mediaType === MEDIA_TYPE_IMAGE || mediaType === MEDIA_TYPE_VIDEO;
    const innerBlockContainerStyle = [{
      width: innerBlockWidthString
    }, !shouldStack ? styles.innerBlock : {
      ...(mediaPosition === 'left' ? styles.innerBlockStackMediaLeft : styles.innerBlockStackMediaRight)
    }, (style?.backgroundColor || backgroundColor.color) && styles.innerBlockPaddings];
    const containerStyles = {
      ...styles['wp-block-media-text'],
      ...styles[`is-vertically-aligned-${verticalAlignment || 'center'}`],
      ...(mediaPosition === 'right' ? styles['has-media-on-the-right'] : {}),
      ...(shouldStack && styles['is-stacked-on-mobile']),
      ...(shouldStack && mediaPosition === 'right' ? styles['is-stacked-on-mobile.has-media-on-the-right'] : {}),
      ...(isSelected && styles['is-selected']),
      backgroundColor: style?.backgroundColor || backgroundColor.color,
      paddingBottom: 0
    };
    const mediaContainerStyle = [{
      flex: 1
    }, shouldStack ? {
      ...(mediaPosition === 'left' && styles.mediaStackLeft),
      ...(mediaPosition === 'right' && styles.mediaStackRight)
    } : {
      ...(mediaPosition === 'left' && styles.mediaLeft),
      ...(mediaPosition === 'right' && styles.mediaRight)
    }];
    const toolbarControls = [{
      icon: isRTL ? pullRight : pullLeft,
      title: __('Show media on left'),
      isActive: mediaPosition === 'left',
      onClick: () => setAttributes({
        mediaPosition: 'left'
      })
    }, {
      icon: isRTL ? pullLeft : pullRight,
      title: __('Show media on right'),
      isActive: mediaPosition === 'right',
      onClick: () => setAttributes({
        mediaPosition: 'right'
      })
    }];
    const onVerticalAlignmentChange = alignment => {
      setAttributes({
        verticalAlignment: alignment
      });
    };
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [mediaType === MEDIA_TYPE_IMAGE && this.getControls(), /*#__PURE__*/_jsxs(BlockControls, {
        children: [hasMedia && /*#__PURE__*/_jsx(ToolbarGroup, {
          children: /*#__PURE__*/_jsx(Button, {
            label: __('Edit media'),
            icon: replace,
            onClick: this.onReplaceMedia
          })
        }), (!isMediaSelected || mediaType === MEDIA_TYPE_VIDEO) && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(ToolbarGroup, {
            controls: toolbarControls
          }), /*#__PURE__*/_jsx(BlockVerticalAlignmentToolbar, {
            onChange: onVerticalAlignmentChange,
            value: verticalAlignment
          })]
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: containerStyles,
        onLayout: this.onLayoutChange,
        children: [/*#__PURE__*/_jsx(View, {
          style: [(shouldStack || !imageFill) && {
            width: widthString
          }, mediaContainerStyle],
          children: this.renderMediaArea(shouldStack)
        }), /*#__PURE__*/_jsx(View, {
          style: innerBlockContainerStyle,
          children: /*#__PURE__*/_jsx(InnerBlocks, {
            template: TEMPLATE,
            blockWidth: blockWidth
          })
        })]
      })]
    });
  }
}
export default compose(withColors('backgroundColor'), withSelect((select, {
  clientId
}) => {
  const {
    getSelectedBlockClientId,
    getBlockParents,
    getSettings
  } = select(blockEditorStore);
  const parents = getBlockParents(clientId, true);
  const selectedBlockClientId = getSelectedBlockClientId();
  const isAncestorSelected = selectedBlockClientId && parents.includes(selectedBlockClientId);
  return {
    isSelected: selectedBlockClientId === clientId,
    isAncestorSelected,
    isRTL: getSettings().isRTL
  };
}))(MediaTextEdit);
//# sourceMappingURL=edit.native.js.map
/**
 * External dependencies
 */
import { TouchableWithoutFeedback } from 'react-native';

/**
 * WordPress dependencies
 */
import { View } from '@wordpress/primitives';
import { PanelBody, SelectControl, ToggleControl, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { AudioPlayer, BlockCaption, BlockControls, BlockIcon, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadProgress, RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { __, _x, sprintf } from '@wordpress/i18n';
import { audio as icon, replace } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { isURL, getProtocol } from '@wordpress/url';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['audio'];
function AudioEdit({
  attributes,
  setAttributes,
  isSelected,
  insertBlocksAfter,
  onFocus,
  onBlur,
  clientId
}) {
  const {
    id,
    autoplay,
    loop,
    preload,
    src
  } = attributes;
  const [isCaptionSelected, setIsCaptionSelected] = useState(false);
  const onFileChange = ({
    mediaId,
    mediaUrl
  }) => {
    setAttributes({
      id: mediaId,
      src: mediaUrl
    });
  };
  const {
    wasBlockJustInserted
  } = useSelect(select => ({
    wasBlockJustInserted: select(blockEditorStore).wasBlockJustInserted(clientId, 'inserter_menu')
  }));
  const {
    createErrorNotice
  } = useDispatch(noticesStore);
  function toggleAttribute(attribute) {
    return newValue => {
      setAttributes({
        [attribute]: newValue
      });
    };
  }
  function onSelectURL(newSrc) {
    if (newSrc !== src) {
      if (isURL(newSrc) && /^https?:/.test(getProtocol(newSrc))) {
        setAttributes({
          src: newSrc,
          id: undefined
        });
      } else {
        createErrorNotice(__('Invalid URL. Audio file not found.'));
      }
    }
  }
  function onSelectAudio(media) {
    if (!media || !media.url) {
      // In this case there was an error and we should continue in the editing state
      // previous attributes should be removed because they may be temporary blob urls.
      setAttributes({
        src: undefined,
        id: undefined
      });
      return;
    }
    // Sets the block's attribute and updates the edit component from the
    // selected media, then switches off the editing UI.
    setAttributes({
      src: media.url,
      id: media.id
    });
  }
  function onAudioPress() {
    setIsCaptionSelected(false);
  }
  function onFocusCaption() {
    if (!isCaptionSelected) {
      setIsCaptionSelected(true);
    }
  }
  if (!src) {
    return /*#__PURE__*/_jsx(View, {
      children: /*#__PURE__*/_jsx(MediaPlaceholder, {
        icon: /*#__PURE__*/_jsx(BlockIcon, {
          icon: icon
        }),
        onSelect: onSelectAudio,
        onSelectURL: onSelectURL,
        accept: "audio/*",
        allowedTypes: ALLOWED_MEDIA_TYPES,
        value: attributes,
        onFocus: onFocus,
        autoOpenMediaUpload: isSelected && wasBlockJustInserted
      })
    });
  }
  function getBlockControls(open) {
    return /*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(ToolbarGroup, {
        children: /*#__PURE__*/_jsx(ToolbarButton, {
          title: __('Replace audio'),
          icon: replace,
          onClick: open
        })
      })
    });
  }
  function getBlockUI(open, getMediaOptions) {
    return /*#__PURE__*/_jsx(MediaUploadProgress, {
      mediaId: id,
      onFinishMediaUploadWithSuccess: onFileChange,
      onMediaUploadStateReset: onFileChange,
      containerStyle: styles.progressContainer,
      progressBarStyle: styles.progressBar,
      spinnerStyle: styles.spinner,
      renderContent: ({
        isUploadInProgress,
        isUploadFailed,
        retryMessage
      }) => {
        return /*#__PURE__*/_jsxs(_Fragment, {
          children: [!isCaptionSelected && !isUploadInProgress && getBlockControls(open), getMediaOptions(), /*#__PURE__*/_jsx(AudioPlayer, {
            isUploadInProgress: isUploadInProgress,
            isUploadFailed: isUploadFailed,
            retryMessage: retryMessage,
            attributes: attributes,
            isSelected: isSelected
          })]
        });
      }
    });
  }
  return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    accessible: !isSelected,
    onPress: onAudioPress,
    disabled: !isSelected,
    children: /*#__PURE__*/_jsxs(View, {
      children: [/*#__PURE__*/_jsx(InspectorControls, {
        children: /*#__PURE__*/_jsxs(PanelBody, {
          title: __('Settings'),
          children: [/*#__PURE__*/_jsx(ToggleControl, {
            label: __('Autoplay'),
            onChange: toggleAttribute('autoplay'),
            checked: autoplay,
            help: __('Autoplay may cause usability issues for some users.')
          }), /*#__PURE__*/_jsx(ToggleControl, {
            label: __('Loop'),
            onChange: toggleAttribute('loop'),
            checked: loop
          }), /*#__PURE__*/_jsx(SelectControl, {
            label: _x('Preload', 'noun; Audio block parameter'),
            value: preload || ''
            // `undefined` is required for the preload attribute to be unset.
            ,
            onChange: value => setAttributes({
              preload: value || undefined
            }),
            options: [{
              value: '',
              label: __('Browser default')
            }, {
              value: 'auto',
              label: __('Auto')
            }, {
              value: 'metadata',
              label: __('Metadata')
            }, {
              value: 'none',
              label: _x('None', '"Preload" value')
            }],
            hideCancelButton: true
          })]
        })
      }), /*#__PURE__*/_jsx(MediaUpload, {
        allowedTypes: ALLOWED_MEDIA_TYPES,
        isReplacingMedia: true,
        onSelect: onSelectAudio,
        onSelectURL: onSelectURL,
        render: ({
          open,
          getMediaOptions
        }) => {
          return getBlockUI(open, getMediaOptions);
        }
      }), /*#__PURE__*/_jsx(BlockCaption, {
        accessible: true,
        accessibilityLabelCreator: caption => RichText.isEmpty(caption) ? /* translators: accessibility text. Empty Audio caption. */
        __('Audio caption. Empty') : sprintf( /* translators: accessibility text. %s: Audio caption. */
        __('Audio caption. %s'), caption),
        clientId: clientId,
        isSelected: isCaptionSelected,
        onFocus: onFocusCaption,
        onBlur: onBlur,
        insertBlocksAfter: insertBlocksAfter
      })]
    })
  });
}
export default AudioEdit;
//# sourceMappingURL=edit.native.js.map
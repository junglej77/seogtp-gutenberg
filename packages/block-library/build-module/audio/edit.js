/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { Disabled, PanelBody, SelectControl, Spinner, ToggleControl } from '@wordpress/components';
import { BlockControls, BlockIcon, InspectorControls, MediaPlaceholder, MediaReplaceFlow, useBlockProps } from '@wordpress/block-editor';
import { __, _x } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { audio as icon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { createUpgradedEmbedBlock } from '../embed/util';
import { useUploadMediaFromBlobURL } from '../utils/hooks';
import { Caption } from '../utils/caption';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const ALLOWED_MEDIA_TYPES = ['audio'];
function AudioEdit({
  attributes,
  className,
  setAttributes,
  onReplace,
  isSelected: isSingleSelected,
  insertBlocksAfter
}) {
  const {
    id,
    autoplay,
    loop,
    preload,
    src
  } = attributes;
  const [temporaryURL, setTemporaryURL] = useState(attributes.blob);
  useUploadMediaFromBlobURL({
    url: temporaryURL,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    onChange: onSelectAudio,
    onError: onUploadError
  });
  function toggleAttribute(attribute) {
    return newValue => {
      setAttributes({
        [attribute]: newValue
      });
    };
  }
  function onSelectURL(newSrc) {
    // Set the block's src from the edit component's state, and switch off
    // the editing UI.
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
        src: newSrc,
        id: undefined,
        blob: undefined
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
  function getAutoplayHelp(checked) {
    return checked ? __('Autoplay may cause usability issues for some users.') : null;
  }
  function onSelectAudio(media) {
    if (!media || !media.url) {
      // In this case there was an error and we should continue in the editing state
      // previous attributes should be removed because they may be temporary blob urls.
      setAttributes({
        src: undefined,
        id: undefined,
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
    // selected media, then switches off the editing UI.
    setAttributes({
      blob: undefined,
      src: media.url,
      id: media.id,
      caption: media.caption
    });
    setTemporaryURL();
  }
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
        onSelect: onSelectAudio,
        onSelectURL: onSelectURL,
        accept: "audio/*",
        allowedTypes: ALLOWED_MEDIA_TYPES,
        value: attributes,
        onError: onUploadError
      })
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isSingleSelected && /*#__PURE__*/_jsx(BlockControls, {
      group: "other",
      children: /*#__PURE__*/_jsx(MediaReplaceFlow, {
        mediaId: id,
        mediaURL: src,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        accept: "audio/*",
        onSelect: onSelectAudio,
        onSelectURL: onSelectURL,
        onError: onUploadError,
        onReset: () => onSelectAudio(undefined)
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Autoplay'),
          onChange: toggleAttribute('autoplay'),
          checked: autoplay,
          help: getAutoplayHelp
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Loop'),
          onChange: toggleAttribute('loop'),
          checked: loop
        }), /*#__PURE__*/_jsx(SelectControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
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
            label: _x('None', 'Preload value')
          }]
        })]
      })
    }), /*#__PURE__*/_jsxs("figure", {
      ...blockProps,
      children: [/*#__PURE__*/_jsx(Disabled, {
        isDisabled: !isSingleSelected,
        children: /*#__PURE__*/_jsx("audio", {
          controls: "controls",
          src: src !== null && src !== void 0 ? src : temporaryURL
        })
      }), !!temporaryURL && /*#__PURE__*/_jsx(Spinner, {}), /*#__PURE__*/_jsx(Caption, {
        attributes: attributes,
        setAttributes: setAttributes,
        isSelected: isSingleSelected,
        insertBlocksAfter: insertBlocksAfter,
        label: __('Audio caption text'),
        showToolbarButton: isSingleSelected
      })]
    })]
  });
}
export default AudioEdit;
//# sourceMappingURL=edit.js.map
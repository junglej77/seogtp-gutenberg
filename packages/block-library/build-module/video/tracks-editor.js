/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { NavigableMenu, MenuItem, FormFileUpload, MenuGroup, ToolbarGroup, ToolbarButton, Dropdown, Button, TextControl, SelectControl, __experimentalGrid as Grid, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, store as blockEditorStore } from '@wordpress/block-editor';
import { upload, media } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { getFilename } from '@wordpress/url';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const ALLOWED_TYPES = ['text/vtt'];
const DEFAULT_KIND = 'subtitles';
const KIND_OPTIONS = [{
  label: __('Subtitles'),
  value: 'subtitles'
}, {
  label: __('Captions'),
  value: 'captions'
}, {
  label: __('Descriptions'),
  value: 'descriptions'
}, {
  label: __('Chapters'),
  value: 'chapters'
}, {
  label: __('Metadata'),
  value: 'metadata'
}];
function TrackList({
  tracks,
  onEditPress
}) {
  let content;
  if (tracks.length === 0) {
    content = /*#__PURE__*/_jsx("p", {
      className: "block-library-video-tracks-editor__tracks-informative-message",
      children: __('Tracks can be subtitles, captions, chapters, or descriptions. They help make your content more accessible to a wider range of users.')
    });
  } else {
    content = tracks.map((track, index) => {
      return /*#__PURE__*/_jsxs(HStack, {
        className: "block-library-video-tracks-editor__track-list-track",
        children: [/*#__PURE__*/_jsxs("span", {
          children: [track.label, " "]
        }), /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: () => onEditPress(index),
          "aria-label": sprintf( /* translators: %s: Label of the video text track e.g: "French subtitles" */
          __('Edit %s'), track.label),
          children: __('Edit')
        })]
      }, index);
    });
  }
  return /*#__PURE__*/_jsx(MenuGroup, {
    label: __('Text tracks'),
    className: "block-library-video-tracks-editor__track-list",
    children: content
  });
}
function SingleTrackEditor({
  track,
  onChange,
  onClose,
  onRemove
}) {
  const {
    src = '',
    label = '',
    srcLang = '',
    kind = DEFAULT_KIND
  } = track;
  const fileName = src.startsWith('blob:') ? '' : getFilename(src) || '';
  return /*#__PURE__*/_jsx(NavigableMenu, {
    children: /*#__PURE__*/_jsxs(VStack, {
      className: "block-library-video-tracks-editor__single-track-editor",
      spacing: "4",
      children: [/*#__PURE__*/_jsx("span", {
        className: "block-library-video-tracks-editor__single-track-editor-edit-track-label",
        children: __('Edit track')
      }), /*#__PURE__*/_jsxs("span", {
        children: [__('File'), ": ", /*#__PURE__*/_jsx("b", {
          children: fileName
        })]
      }), /*#__PURE__*/_jsxs(Grid, {
        columns: 2,
        gap: 4,
        children: [/*#__PURE__*/_jsx(TextControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
          /* eslint-disable jsx-a11y/no-autofocus */,
          autoFocus: true
          /* eslint-enable jsx-a11y/no-autofocus */,
          onChange: newLabel => onChange({
            ...track,
            label: newLabel
          }),
          label: __('Label'),
          value: label,
          help: __('Title of track')
        }), /*#__PURE__*/_jsx(TextControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          onChange: newSrcLang => onChange({
            ...track,
            srcLang: newSrcLang
          }),
          label: __('Source language'),
          value: srcLang,
          help: __('Language tag (en, fr, etc.)')
        })]
      }), /*#__PURE__*/_jsxs(VStack, {
        spacing: "8",
        children: [/*#__PURE__*/_jsx(SelectControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          className: "block-library-video-tracks-editor__single-track-editor-kind-select",
          options: KIND_OPTIONS,
          value: kind,
          label: __('Kind'),
          onChange: newKind => {
            onChange({
              ...track,
              kind: newKind
            });
          }
        }), /*#__PURE__*/_jsxs(HStack, {
          className: "block-library-video-tracks-editor__single-track-editor-buttons-container",
          children: [/*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            variant: "secondary",
            onClick: () => {
              const changes = {};
              let hasChanges = false;
              if (label === '') {
                changes.label = __('English');
                hasChanges = true;
              }
              if (srcLang === '') {
                changes.srcLang = 'en';
                hasChanges = true;
              }
              if (track.kind === undefined) {
                changes.kind = DEFAULT_KIND;
                hasChanges = true;
              }
              if (hasChanges) {
                onChange({
                  ...track,
                  ...changes
                });
              }
              onClose();
            },
            children: __('Close')
          }), /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            isDestructive: true,
            variant: "link",
            onClick: onRemove,
            children: __('Remove track')
          })]
        })]
      })]
    })
  });
}
export default function TracksEditor({
  tracks = [],
  onChange
}) {
  const mediaUpload = useSelect(select => {
    return select(blockEditorStore).getSettings().mediaUpload;
  }, []);
  const [trackBeingEdited, setTrackBeingEdited] = useState(null);
  if (!mediaUpload) {
    return null;
  }
  return /*#__PURE__*/_jsx(Dropdown, {
    contentClassName: "block-library-video-tracks-editor",
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(ToolbarGroup, {
      children: /*#__PURE__*/_jsx(ToolbarButton, {
        label: __('Text tracks'),
        showTooltip: true,
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
        onClick: onToggle,
        children: __('Text tracks')
      })
    }),
    renderContent: () => {
      if (trackBeingEdited !== null) {
        return /*#__PURE__*/_jsx(SingleTrackEditor, {
          track: tracks[trackBeingEdited],
          onChange: newTrack => {
            const newTracks = [...tracks];
            newTracks[trackBeingEdited] = newTrack;
            onChange(newTracks);
          },
          onClose: () => setTrackBeingEdited(null),
          onRemove: () => {
            onChange(tracks.filter((_track, index) => index !== trackBeingEdited));
            setTrackBeingEdited(null);
          }
        });
      }
      return /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsxs(NavigableMenu, {
          children: [/*#__PURE__*/_jsx(TrackList, {
            tracks: tracks,
            onEditPress: setTrackBeingEdited
          }), /*#__PURE__*/_jsxs(MenuGroup, {
            className: "block-library-video-tracks-editor__add-tracks-container",
            label: __('Add tracks'),
            children: [/*#__PURE__*/_jsx(MediaUpload, {
              onSelect: ({
                url
              }) => {
                const trackIndex = tracks.length;
                onChange([...tracks, {
                  src: url
                }]);
                setTrackBeingEdited(trackIndex);
              },
              allowedTypes: ALLOWED_TYPES,
              render: ({
                open
              }) => /*#__PURE__*/_jsx(MenuItem, {
                icon: media,
                onClick: open,
                children: __('Open Media Library')
              })
            }), /*#__PURE__*/_jsx(MediaUploadCheck, {
              children: /*#__PURE__*/_jsx(FormFileUpload, {
                onChange: event => {
                  const files = event.target.files;
                  const trackIndex = tracks.length;
                  mediaUpload({
                    allowedTypes: ALLOWED_TYPES,
                    filesList: files,
                    onFileChange: ([{
                      url
                    }]) => {
                      const newTracks = [...tracks];
                      if (!newTracks[trackIndex]) {
                        newTracks[trackIndex] = {};
                      }
                      newTracks[trackIndex] = {
                        ...tracks[trackIndex],
                        src: url
                      };
                      onChange(newTracks);
                      setTrackBeingEdited(trackIndex);
                    }
                  });
                },
                accept: ".vtt,text/vtt",
                render: ({
                  openFileDialog
                }) => {
                  return /*#__PURE__*/_jsx(MenuItem, {
                    icon: upload,
                    onClick: () => {
                      openFileDialog();
                    },
                    children: __('Upload')
                  });
                }
              })
            })]
          })]
        })
      });
    }
  });
}
//# sourceMappingURL=tracks-editor.js.map
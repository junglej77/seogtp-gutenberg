/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useMemo, createPortal } from '@wordpress/element';
import { BlockList, BlockToolbar, BlockInspector, privateApis as blockEditorPrivateApis, __unstableBlockSettingsMenuFirstItem } from '@wordpress/block-editor';
import { uploadMedia } from '@wordpress/media-utils';
import { store as preferencesStore } from '@wordpress/preferences';
import { privateApis as blockLibraryPrivateApis } from '@wordpress/block-library';

/**
 * Internal dependencies
 */
import BlockInspectorButton from '../block-inspector-button';
import Header from '../header';
import useInserter from '../inserter/use-inserter';
import SidebarEditorProvider from './sidebar-editor-provider';
import WelcomeGuide from '../welcome-guide';
import KeyboardShortcuts from '../keyboard-shortcuts';
import BlockAppender from '../block-appender';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  ExperimentalBlockCanvas: BlockCanvas
} = unlock(blockEditorPrivateApis);
const {
  BlockKeyboardShortcuts
} = unlock(blockLibraryPrivateApis);
export default function SidebarBlockEditor({
  blockEditorSettings,
  sidebar,
  inserter,
  inspector
}) {
  const [isInserterOpened, setIsInserterOpened] = useInserter(inserter);
  const isMediumViewport = useViewportMatch('small');
  const {
    hasUploadPermissions,
    isFixedToolbarActive,
    keepCaretInsideBlock,
    isWelcomeGuideActive
  } = useSelect(select => {
    var _select$canUser;
    const {
      get
    } = select(preferencesStore);
    return {
      hasUploadPermissions: (_select$canUser = select(coreStore).canUser('create', {
        kind: 'root',
        name: 'media'
      })) !== null && _select$canUser !== void 0 ? _select$canUser : true,
      isFixedToolbarActive: !!get('core/customize-widgets', 'fixedToolbar'),
      keepCaretInsideBlock: !!get('core/customize-widgets', 'keepCaretInsideBlock'),
      isWelcomeGuideActive: !!get('core/customize-widgets', 'welcomeGuide')
    };
  }, []);
  const settings = useMemo(() => {
    let mediaUploadBlockEditor;
    if (hasUploadPermissions) {
      mediaUploadBlockEditor = ({
        onError,
        ...argumentsObject
      }) => {
        uploadMedia({
          wpAllowedMimeTypes: blockEditorSettings.allowedMimeTypes,
          onError: ({
            message
          }) => onError(message),
          ...argumentsObject
        });
      };
    }
    return {
      ...blockEditorSettings,
      __experimentalSetIsInserterOpened: setIsInserterOpened,
      mediaUpload: mediaUploadBlockEditor,
      hasFixedToolbar: isFixedToolbarActive || !isMediumViewport,
      keepCaretInsideBlock,
      __unstableHasCustomAppender: true
    };
  }, [hasUploadPermissions, blockEditorSettings, isFixedToolbarActive, isMediumViewport, keepCaretInsideBlock, setIsInserterOpened]);
  if (isWelcomeGuideActive) {
    return /*#__PURE__*/_jsx(WelcomeGuide, {
      sidebar: sidebar
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(KeyboardShortcuts.Register, {}), /*#__PURE__*/_jsx(BlockKeyboardShortcuts, {}), /*#__PURE__*/_jsxs(SidebarEditorProvider, {
      sidebar: sidebar,
      settings: settings,
      children: [/*#__PURE__*/_jsx(KeyboardShortcuts, {
        undo: sidebar.undo,
        redo: sidebar.redo,
        save: sidebar.save
      }), /*#__PURE__*/_jsx(Header, {
        sidebar: sidebar,
        inserter: inserter,
        isInserterOpened: isInserterOpened,
        setIsInserterOpened: setIsInserterOpened,
        isFixedToolbarActive: isFixedToolbarActive || !isMediumViewport
      }), (isFixedToolbarActive || !isMediumViewport) && /*#__PURE__*/_jsx(BlockToolbar, {
        hideDragHandle: true
      }), /*#__PURE__*/_jsx(BlockCanvas, {
        shouldIframe: false,
        styles: settings.defaultEditorStyles,
        height: "100%",
        children: /*#__PURE__*/_jsx(BlockList, {
          renderAppender: BlockAppender
        })
      }), createPortal(
      /*#__PURE__*/
      // This is a temporary hack to prevent button component inside <BlockInspector>
      // from submitting form when type="button" is not specified.
      _jsx("form", {
        onSubmit: event => event.preventDefault(),
        children: /*#__PURE__*/_jsx(BlockInspector, {})
      }), inspector.contentContainer[0])]
    }), /*#__PURE__*/_jsx(__unstableBlockSettingsMenuFirstItem, {
      children: ({
        onClose
      }) => /*#__PURE__*/_jsx(BlockInspectorButton, {
        inspector: inspector,
        closeMenu: onClose
      })
    })]
  });
}
//# sourceMappingURL=index.js.map
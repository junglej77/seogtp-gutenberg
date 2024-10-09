/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { Button, __unstableMotion as motion } from '@wordpress/components';
import { useInstanceId, useReducedMotion } from '@wordpress/compose';
import { EditorKeyboardShortcutsRegister, privateApis as editorPrivateApis, store as editorStore } from '@wordpress/editor';
import { __, sprintf } from '@wordpress/i18n';
import { store as coreDataStore } from '@wordpress/core-data';
import { privateApis as blockLibraryPrivateApis } from '@wordpress/block-library';
import { useCallback, useMemo } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { store as preferencesStore } from '@wordpress/preferences';
import { decodeEntities } from '@wordpress/html-entities';
import { Icon, homeButton } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import WelcomeGuide from '../welcome-guide';
import { store as editSiteStore } from '../../store';
import { GlobalStylesRenderer } from '../global-styles-renderer';
import CanvasLoader from '../canvas-loader';
import { unlock } from '../../lock-unlock';
import { useSpecificEditorSettings } from '../block-editor/use-site-editor-settings';
import PluginTemplateSettingPanel from '../plugin-template-setting-panel';
import GlobalStylesSidebar from '../global-styles-sidebar';
import { isPreviewingTheme } from '../../utils/is-previewing-theme';
import { getEditorCanvasContainerTitleAndIcon, useHasEditorCanvasContainer } from '../editor-canvas-container';
import SaveButton from '../save-button';
import SavePanel from '../save-panel';
import SiteEditorMoreMenu from '../more-menu';
import SiteIcon from '../site-icon';
import useEditorIframeProps from '../block-editor/use-editor-iframe-props';
import useEditorTitle from './use-editor-title';
import { useIsSiteEditorLoading } from '../layout/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  Editor,
  BackButton
} = unlock(editorPrivateApis);
const {
  useHistory,
  useLocation
} = unlock(routerPrivateApis);
const {
  BlockKeyboardShortcuts
} = unlock(blockLibraryPrivateApis);
const toggleHomeIconVariants = {
  edit: {
    opacity: 0,
    scale: 0.2
  },
  hover: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset( 22% round 2px )'
  }
};
const siteIconVariants = {
  edit: {
    clipPath: 'inset(0% round 0px)'
  },
  hover: {
    clipPath: 'inset( 22% round 2px )'
  },
  tap: {
    clipPath: 'inset(0% round 0px)'
  }
};
export default function EditSiteEditor({
  isPostsList = false
}) {
  const disableMotion = useReducedMotion();
  const {
    params
  } = useLocation();
  const isLoading = useIsSiteEditorLoading();
  const {
    editedPostType,
    editedPostId,
    contextPostType,
    contextPostId,
    canvasMode,
    isEditingPage,
    supportsGlobalStyles,
    showIconLabels,
    editorCanvasView,
    currentPostIsTrashed,
    hasSiteIcon
  } = useSelect(select => {
    const {
      getEditorCanvasContainerView,
      getEditedPostContext,
      getCanvasMode,
      isPage,
      getEditedPostType,
      getEditedPostId
    } = unlock(select(editSiteStore));
    const {
      get
    } = select(preferencesStore);
    const {
      getCurrentTheme,
      getEntityRecord
    } = select(coreDataStore);
    const _context = getEditedPostContext();
    const siteData = getEntityRecord('root', '__unstableBase', undefined);

    // The currently selected entity to display.
    // Typically template or template part in the site editor.
    return {
      editedPostType: getEditedPostType(),
      editedPostId: getEditedPostId(),
      contextPostType: _context?.postId ? _context.postType : undefined,
      contextPostId: _context?.postId ? _context.postId : undefined,
      canvasMode: getCanvasMode(),
      isEditingPage: isPage(),
      supportsGlobalStyles: getCurrentTheme()?.is_block_theme,
      showIconLabels: get('core', 'showIconLabels'),
      editorCanvasView: getEditorCanvasContainerView(),
      currentPostIsTrashed: select(editorStore).getCurrentPostAttribute('status') === 'trash',
      hasSiteIcon: !!siteData?.site_icon_url
    };
  }, []);
  useEditorTitle();
  const _isPreviewingTheme = isPreviewingTheme();
  const hasDefaultEditorCanvasView = !useHasEditorCanvasContainer();
  const iframeProps = useEditorIframeProps();
  const isEditMode = canvasMode === 'edit';
  const postWithTemplate = !!contextPostId;
  const loadingProgressId = useInstanceId(CanvasLoader, 'edit-site-editor__loading-progress');
  const settings = useSpecificEditorSettings();
  const styles = useMemo(() => [...settings.styles, {
    // Forming a "block formatting context" to prevent margin collapsing.
    // @see https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
    css: canvasMode === 'view' ? `body{min-height: 100vh; ${currentPostIsTrashed ? '' : 'cursor: pointer;'}}` : undefined
  }], [settings.styles, canvasMode, currentPostIsTrashed]);
  const {
    setCanvasMode
  } = unlock(useDispatch(editSiteStore));
  const {
    createSuccessNotice
  } = useDispatch(noticesStore);
  const history = useHistory();
  const onActionPerformed = useCallback((actionId, items) => {
    switch (actionId) {
      case 'move-to-trash':
      case 'delete-post':
        {
          history.push({
            postType: items[0].type
          });
        }
        break;
      case 'duplicate-post':
        {
          const newItem = items[0];
          const _title = typeof newItem.title === 'string' ? newItem.title : newItem.title?.rendered;
          createSuccessNotice(sprintf(
          // translators: %s: Title of the created post e.g: "Post 1".
          __('"%s" successfully created.'), decodeEntities(_title)), {
            type: 'snackbar',
            id: 'duplicate-post-action',
            actions: [{
              label: __('Edit'),
              onClick: () => {
                history.push({
                  postId: newItem.id,
                  postType: newItem.type,
                  canvas: 'edit'
                });
              }
            }]
          });
        }
        break;
    }
  }, [history, createSuccessNotice]);

  // Replace the title and icon displayed in the DocumentBar when there's an overlay visible.
  const {
    title,
    icon
  } = getEditorCanvasContainerTitleAndIcon(editorCanvasView);
  const isReady = !isLoading;
  const transition = {
    duration: disableMotion ? 0 : 0.2
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(GlobalStylesRenderer, {}), /*#__PURE__*/_jsx(EditorKeyboardShortcutsRegister, {}), isEditMode && /*#__PURE__*/_jsx(BlockKeyboardShortcuts, {}), !isReady ? /*#__PURE__*/_jsx(CanvasLoader, {
      id: loadingProgressId
    }) : null, isEditMode && /*#__PURE__*/_jsx(WelcomeGuide, {}), isReady && /*#__PURE__*/_jsxs(Editor, {
      postType: postWithTemplate ? contextPostType : editedPostType,
      postId: postWithTemplate ? contextPostId : editedPostId,
      templateId: postWithTemplate ? editedPostId : undefined,
      settings: settings,
      className: clsx('edit-site-editor__editor-interface', {
        'show-icon-labels': showIconLabels
      }),
      styles: styles,
      enableRegionNavigation: false,
      customSaveButton: _isPreviewingTheme && /*#__PURE__*/_jsx(SaveButton, {
        size: "compact"
      }),
      customSavePanel: _isPreviewingTheme && /*#__PURE__*/_jsx(SavePanel, {}),
      forceDisableBlockTools: !hasDefaultEditorCanvasView,
      title: title,
      icon: icon,
      iframeProps: iframeProps,
      onActionPerformed: onActionPerformed,
      extraSidebarPanels: !isEditingPage && /*#__PURE__*/_jsx(PluginTemplateSettingPanel.Slot, {}),
      children: [isEditMode && /*#__PURE__*/_jsx(BackButton, {
        children: ({
          length
        }) => length <= 1 && /*#__PURE__*/_jsxs(motion.div, {
          className: "edit-site-editor__view-mode-toggle",
          transition: transition,
          animate: "edit",
          initial: "edit",
          whileHover: "hover",
          whileTap: "tap",
          children: [/*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            label: __('Open Navigation'),
            showTooltip: true,
            tooltipPosition: "middle right",
            onClick: () => {
              setCanvasMode('view');
              // TODO: this is a temporary solution to navigate to the posts list if we are
              // come here through `posts list` and are in focus mode editing a template, template part etc..
              if (isPostsList && params?.focusMode) {
                history.push({
                  page: 'gutenberg-posts-dashboard',
                  postType: 'post'
                });
              }
            },
            children: /*#__PURE__*/_jsx(motion.div, {
              variants: siteIconVariants,
              children: /*#__PURE__*/_jsx(SiteIcon, {
                className: "edit-site-editor__view-mode-toggle-icon"
              })
            })
          }), /*#__PURE__*/_jsx(motion.div, {
            className: clsx('edit-site-editor__back-icon', {
              'has-site-icon': hasSiteIcon
            }),
            variants: toggleHomeIconVariants,
            children: /*#__PURE__*/_jsx(Icon, {
              icon: homeButton
            })
          })]
        })
      }), /*#__PURE__*/_jsx(SiteEditorMoreMenu, {}), supportsGlobalStyles && /*#__PURE__*/_jsx(GlobalStylesSidebar, {})]
    })]
  });
}
//# sourceMappingURL=index.js.map
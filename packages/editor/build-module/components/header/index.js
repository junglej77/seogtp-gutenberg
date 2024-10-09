/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMediaQuery, useViewportMatch } from '@wordpress/compose';
import { __unstableMotion as motion } from '@wordpress/components';
import { store as preferencesStore } from '@wordpress/preferences';
import { useState } from '@wordpress/element';
import { PinnedItems } from '@wordpress/interface';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import BackButton, { useHasBackButton } from './back-button';
import CollapsibleBlockToolbar from '../collapsible-block-toolbar';
import DocumentBar from '../document-bar';
import DocumentTools from '../document-tools';
import MoreMenu from '../more-menu';
import PostPreviewButton from '../post-preview-button';
import PostPublishButtonOrToggle from '../post-publish-button/post-publish-button-or-toggle';
import PostSavedState from '../post-saved-state';
import PostViewLink from '../post-view-link';
import PreviewDropdown from '../preview-dropdown';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const toolbarVariations = {
  distractionFreeDisabled: {
    y: '-50px'
  },
  distractionFreeHover: {
    y: 0
  },
  distractionFreeHidden: {
    y: '-50px'
  },
  visible: {
    y: 0
  },
  hidden: {
    y: 0
  }
};
const backButtonVariations = {
  distractionFreeDisabled: {
    x: '-100%'
  },
  distractionFreeHover: {
    x: 0
  },
  distractionFreeHidden: {
    x: '-100%'
  },
  visible: {
    x: 0
  },
  hidden: {
    x: 0
  }
};
function Header({
  customSaveButton,
  forceIsDirty,
  forceDisableBlockTools,
  setEntitiesSavedStatesCallback,
  title,
  icon
}) {
  const isWideViewport = useViewportMatch('large');
  const isLargeViewport = useViewportMatch('medium');
  const isTooNarrowForDocumentBar = useMediaQuery('(max-width: 403px)');
  const {
    isTextEditor,
    isPublishSidebarOpened,
    showIconLabels,
    hasFixedToolbar,
    isNestedEntity
  } = useSelect(select => {
    const {
      get: getPreference
    } = select(preferencesStore);
    const {
      getEditorMode,
      getEditorSettings,
      isPublishSidebarOpened: _isPublishSidebarOpened
    } = select(editorStore);
    const {
      __unstableGetEditorMode
    } = select(blockEditorStore);
    return {
      isTextEditor: getEditorMode() === 'text',
      isPublishSidebarOpened: _isPublishSidebarOpened(),
      showIconLabels: getPreference('core', 'showIconLabels'),
      hasFixedToolbar: getPreference('core', 'fixedToolbar'),
      isNestedEntity: !!getEditorSettings().onNavigateToPreviousEntityRecord,
      isZoomedOutView: __unstableGetEditorMode() === 'zoom-out'
    };
  }, []);
  const [isBlockToolsCollapsed, setIsBlockToolsCollapsed] = useState(true);
  const hasCenter = isBlockToolsCollapsed && !isTooNarrowForDocumentBar;
  const hasBackButton = useHasBackButton();

  // The edit-post-header classname is only kept for backward compatibilty
  // as some plugins might be relying on its presence.
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-header edit-post-header",
    children: [hasBackButton && /*#__PURE__*/_jsx(motion.div, {
      className: "editor-header__back-button",
      variants: backButtonVariations,
      transition: {
        type: 'tween'
      },
      children: /*#__PURE__*/_jsx(BackButton.Slot, {})
    }), /*#__PURE__*/_jsxs(motion.div, {
      variants: toolbarVariations,
      className: "editor-header__toolbar",
      transition: {
        type: 'tween'
      },
      children: [/*#__PURE__*/_jsx(DocumentTools, {
        disableBlockTools: forceDisableBlockTools || isTextEditor
      }), hasFixedToolbar && isLargeViewport && /*#__PURE__*/_jsx(CollapsibleBlockToolbar, {
        isCollapsed: isBlockToolsCollapsed,
        onToggle: setIsBlockToolsCollapsed
      })]
    }), hasCenter && /*#__PURE__*/_jsx(motion.div, {
      className: "editor-header__center",
      variants: toolbarVariations,
      transition: {
        type: 'tween'
      },
      children: /*#__PURE__*/_jsx(DocumentBar, {
        title: title,
        icon: icon
      })
    }), /*#__PURE__*/_jsxs(motion.div, {
      variants: toolbarVariations,
      transition: {
        type: 'tween'
      },
      className: "editor-header__settings",
      children: [!customSaveButton && !isPublishSidebarOpened &&
      /*#__PURE__*/
      // This button isn't completely hidden by the publish sidebar.
      // We can't hide the whole toolbar when the publish sidebar is open because
      // we want to prevent mounting/unmounting the PostPublishButtonOrToggle DOM node.
      // We track that DOM node to return focus to the PostPublishButtonOrToggle
      // when the publish sidebar has been closed.
      _jsx(PostSavedState, {
        forceIsDirty: forceIsDirty
      }), /*#__PURE__*/_jsx(PreviewDropdown, {
        forceIsAutosaveable: forceIsDirty,
        disabled: isNestedEntity
      }), /*#__PURE__*/_jsx(PostPreviewButton, {
        className: "editor-header__post-preview-button",
        forceIsAutosaveable: forceIsDirty
      }), /*#__PURE__*/_jsx(PostViewLink, {}), (isWideViewport || !showIconLabels) && /*#__PURE__*/_jsx(PinnedItems.Slot, {
        scope: "core"
      }), !customSaveButton && /*#__PURE__*/_jsx(PostPublishButtonOrToggle, {
        forceIsDirty: forceIsDirty,
        setEntitiesSavedStatesCallback: setEntitiesSavedStatesCallback
      }), customSaveButton, /*#__PURE__*/_jsx(MoreMenu, {})]
    })]
  });
}
export default Header;
//# sourceMappingURL=index.js.map
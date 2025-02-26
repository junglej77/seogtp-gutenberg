/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import { useCallback, useRef } from '@wordpress/element';
import { store as preferencesStore } from '@wordpress/preferences';
import { ESCAPE } from '@wordpress/keycodes';
import { store as interfaceStore } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  PrivateInserterLibrary
} = unlock(blockEditorPrivateApis);
export default function InserterSidebar() {
  const {
    blockInsertionPoint,
    blockSectionRootClientId,
    inserterSidebarToggleRef,
    insertionPoint,
    showMostUsedBlocks,
    sidebarIsOpened
  } = useSelect(select => {
    const {
      getInserterSidebarToggleRef,
      getInsertionPoint,
      isPublishSidebarOpened
    } = unlock(select(editorStore));
    const {
      getBlockInsertionPoint,
      getBlockRootClientId,
      __unstableGetEditorMode,
      getSectionRootClientId
    } = unlock(select(blockEditorStore));
    const {
      get
    } = select(preferencesStore);
    const {
      getActiveComplementaryArea
    } = select(interfaceStore);
    const getBlockSectionRootClientId = () => {
      if (__unstableGetEditorMode() === 'zoom-out') {
        const sectionRootClientId = getSectionRootClientId();
        if (sectionRootClientId) {
          return sectionRootClientId;
        }
      }
      return getBlockRootClientId();
    };
    return {
      blockInsertionPoint: getBlockInsertionPoint(),
      inserterSidebarToggleRef: getInserterSidebarToggleRef(),
      insertionPoint: getInsertionPoint(),
      showMostUsedBlocks: get('core', 'mostUsedBlocks'),
      blockSectionRootClientId: getBlockSectionRootClientId(),
      sidebarIsOpened: !!(getActiveComplementaryArea('core') || isPublishSidebarOpened())
    };
  }, []);
  const {
    setIsInserterOpened
  } = useDispatch(editorStore);
  const {
    disableComplementaryArea
  } = useDispatch(interfaceStore);
  const isMobileViewport = useViewportMatch('medium', '<');
  const libraryRef = useRef();

  // When closing the inserter, focus should return to the toggle button.
  const closeInserterSidebar = useCallback(() => {
    setIsInserterOpened(false);
    inserterSidebarToggleRef.current?.focus();
  }, [inserterSidebarToggleRef, setIsInserterOpened]);
  const closeOnEscape = useCallback(event => {
    if (event.keyCode === ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      closeInserterSidebar();
    }
  }, [closeInserterSidebar]);
  const inserterContents = /*#__PURE__*/_jsx("div", {
    className: "editor-inserter-sidebar__content",
    children: /*#__PURE__*/_jsx(PrivateInserterLibrary, {
      showMostUsedBlocks: showMostUsedBlocks,
      showInserterHelpPanel: true,
      shouldFocusBlock: isMobileViewport,
      rootClientId: blockSectionRootClientId !== null && blockSectionRootClientId !== void 0 ? blockSectionRootClientId : blockInsertionPoint.rootClientId,
      __experimentalInsertionIndex: blockInsertionPoint.index,
      onSelect: insertionPoint.onSelect,
      __experimentalInitialTab: insertionPoint.tab,
      __experimentalInitialCategory: insertionPoint.category,
      __experimentalFilterValue: insertionPoint.filterValue,
      onPatternCategorySelection: sidebarIsOpened ? () => disableComplementaryArea('core') : undefined,
      ref: libraryRef,
      onClose: closeInserterSidebar
    })
  });
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    _jsx("div", {
      onKeyDown: closeOnEscape,
      className: "editor-inserter-sidebar",
      children: inserterContents
    })
  );
}
//# sourceMappingURL=index.js.map
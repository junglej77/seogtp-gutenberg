/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { BlockBreadcrumb } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { InterfaceSkeleton, ComplementaryArea, store as interfaceStore } from '@wordpress/interface';
import { __ } from '@wordpress/i18n';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import Header from '../header';
import WidgetAreasBlockEditorContent from '../widget-areas-block-editor-content';
import { store as editWidgetsStore } from '../../store';
import SecondarySidebar from '../secondary-sidebar';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const interfaceLabels = {
  /* translators: accessibility text for the widgets screen top bar landmark region. */
  header: __('Widgets top bar'),
  /* translators: accessibility text for the widgets screen content landmark region. */
  body: __('Widgets and blocks'),
  /* translators: accessibility text for the widgets screen settings landmark region. */
  sidebar: __('Widgets settings'),
  /* translators: accessibility text for the widgets screen footer landmark region. */
  footer: __('Widgets footer')
};
function Interface({
  blockEditorSettings
}) {
  const isMobileViewport = useViewportMatch('medium', '<');
  const isHugeViewport = useViewportMatch('huge', '>=');
  const {
    setIsInserterOpened,
    setIsListViewOpened,
    closeGeneralSidebar
  } = useDispatch(editWidgetsStore);
  const {
    hasBlockBreadCrumbsEnabled,
    hasSidebarEnabled,
    isInserterOpened,
    isListViewOpened,
    previousShortcut,
    nextShortcut
  } = useSelect(select => ({
    hasSidebarEnabled: !!select(interfaceStore).getActiveComplementaryArea(editWidgetsStore.name),
    isInserterOpened: !!select(editWidgetsStore).isInserterOpened(),
    isListViewOpened: !!select(editWidgetsStore).isListViewOpened(),
    hasBlockBreadCrumbsEnabled: !!select(preferencesStore).get('core/edit-widgets', 'showBlockBreadcrumbs'),
    previousShortcut: select(keyboardShortcutsStore).getAllShortcutKeyCombinations('core/edit-widgets/previous-region'),
    nextShortcut: select(keyboardShortcutsStore).getAllShortcutKeyCombinations('core/edit-widgets/next-region')
  }), []);

  // Inserter and Sidebars are mutually exclusive
  useEffect(() => {
    if (hasSidebarEnabled && !isHugeViewport) {
      setIsInserterOpened(false);
      setIsListViewOpened(false);
    }
  }, [hasSidebarEnabled, isHugeViewport]);
  useEffect(() => {
    if ((isInserterOpened || isListViewOpened) && !isHugeViewport) {
      closeGeneralSidebar();
    }
  }, [isInserterOpened, isListViewOpened, isHugeViewport]);
  const secondarySidebarLabel = isListViewOpened ? __('List View') : __('Block Library');
  const hasSecondarySidebar = isListViewOpened || isInserterOpened;
  return /*#__PURE__*/_jsx(InterfaceSkeleton, {
    labels: {
      ...interfaceLabels,
      secondarySidebar: secondarySidebarLabel
    },
    header: /*#__PURE__*/_jsx(Header, {}),
    secondarySidebar: hasSecondarySidebar && /*#__PURE__*/_jsx(SecondarySidebar, {}),
    sidebar: /*#__PURE__*/_jsx(ComplementaryArea.Slot, {
      scope: "core/edit-widgets"
    }),
    content: /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsx(WidgetAreasBlockEditorContent, {
        blockEditorSettings: blockEditorSettings
      })
    }),
    footer: hasBlockBreadCrumbsEnabled && !isMobileViewport && /*#__PURE__*/_jsx("div", {
      className: "edit-widgets-layout__footer",
      children: /*#__PURE__*/_jsx(BlockBreadcrumb, {
        rootLabelText: __('Widgets')
      })
    }),
    shortcuts: {
      previous: previousShortcut,
      next: nextShortcut
    }
  });
}
export default Interface;
//# sourceMappingURL=interface.js.map
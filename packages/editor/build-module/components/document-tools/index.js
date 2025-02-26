/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { NavigableToolbar, ToolSelector, store as blockEditorStore } from '@wordpress/block-editor';
import { Button, ToolbarItem } from '@wordpress/components';
import { listView, plus } from '@wordpress/icons';
import { useCallback } from '@wordpress/element';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editorStore } from '../../store';
import EditorHistoryRedo from '../editor-history/redo';
import EditorHistoryUndo from '../editor-history/undo';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function DocumentTools({
  className,
  disableBlockTools = false
}) {
  const {
    setIsInserterOpened,
    setIsListViewOpened
  } = useDispatch(editorStore);
  const {
    isDistractionFree,
    isInserterOpened,
    isListViewOpen,
    listViewShortcut,
    inserterSidebarToggleRef,
    listViewToggleRef,
    hasFixedToolbar,
    showIconLabels
  } = useSelect(select => {
    const {
      getSettings
    } = select(blockEditorStore);
    const {
      get
    } = select(preferencesStore);
    const {
      isListViewOpened,
      getEditorMode,
      getInserterSidebarToggleRef,
      getListViewToggleRef
    } = unlock(select(editorStore));
    const {
      getShortcutRepresentation
    } = select(keyboardShortcutsStore);
    const {
      __unstableGetEditorMode
    } = select(blockEditorStore);
    return {
      isInserterOpened: select(editorStore).isInserterOpened(),
      isListViewOpen: isListViewOpened(),
      listViewShortcut: getShortcutRepresentation('core/editor/toggle-list-view'),
      inserterSidebarToggleRef: getInserterSidebarToggleRef(),
      listViewToggleRef: getListViewToggleRef(),
      hasFixedToolbar: getSettings().hasFixedToolbar,
      showIconLabels: get('core', 'showIconLabels'),
      isDistractionFree: get('core', 'distractionFree'),
      isVisualMode: getEditorMode() === 'visual',
      isZoomedOutView: __unstableGetEditorMode() === 'zoom-out'
    };
  }, []);
  const preventDefault = event => {
    // Because the inserter behaves like a dialog,
    // if the inserter is opened already then when we click on the toggle button
    // then the initial click event will close the inserter and then be propagated
    // to the inserter toggle and it will open it again.
    // To prevent this we need to stop the propagation of the event.
    // This won't be necessary when the inserter no longer behaves like a dialog.

    if (isInserterOpened) {
      event.preventDefault();
    }
  };
  const isLargeViewport = useViewportMatch('medium');
  const isWideViewport = useViewportMatch('wide');

  /* translators: accessibility text for the editor toolbar */
  const toolbarAriaLabel = __('Document tools');
  const toggleListView = useCallback(() => setIsListViewOpened(!isListViewOpen), [setIsListViewOpened, isListViewOpen]);
  const toggleInserter = useCallback(() => setIsInserterOpened(!isInserterOpened), [isInserterOpened, setIsInserterOpened]);

  /* translators: button label text should, if possible, be under 16 characters. */
  const longLabel = _x('Toggle block inserter', 'Generic label for block inserter button');
  const shortLabel = !isInserterOpened ? __('Add') : __('Close');
  return (
    /*#__PURE__*/
    // Some plugins expect and use the `edit-post-header-toolbar` CSS class to
    // find the toolbar and inject UI elements into it. This is not officially
    // supported, but we're keeping it in the list of class names for backwards
    // compatibility.
    _jsx(NavigableToolbar, {
      className: clsx('editor-document-tools', 'edit-post-header-toolbar', className),
      "aria-label": toolbarAriaLabel,
      variant: "unstyled",
      children: /*#__PURE__*/_jsxs("div", {
        className: "editor-document-tools__left",
        children: [!isDistractionFree && /*#__PURE__*/_jsx(ToolbarItem, {
          ref: inserterSidebarToggleRef,
          as: Button,
          className: "editor-document-tools__inserter-toggle",
          variant: "primary",
          isPressed: isInserterOpened,
          onMouseDown: preventDefault,
          onClick: toggleInserter,
          disabled: disableBlockTools,
          icon: plus,
          label: showIconLabels ? shortLabel : longLabel,
          showTooltip: !showIconLabels,
          "aria-expanded": isInserterOpened
        }), (isWideViewport || !showIconLabels) && /*#__PURE__*/_jsxs(_Fragment, {
          children: [isLargeViewport && !hasFixedToolbar && /*#__PURE__*/_jsx(ToolbarItem, {
            as: ToolSelector,
            showTooltip: !showIconLabels,
            variant: showIconLabels ? 'tertiary' : undefined,
            disabled: disableBlockTools,
            size: "compact"
          }), /*#__PURE__*/_jsx(ToolbarItem, {
            as: EditorHistoryUndo,
            showTooltip: !showIconLabels,
            variant: showIconLabels ? 'tertiary' : undefined,
            size: "compact"
          }), /*#__PURE__*/_jsx(ToolbarItem, {
            as: EditorHistoryRedo,
            showTooltip: !showIconLabels,
            variant: showIconLabels ? 'tertiary' : undefined,
            size: "compact"
          }), !isDistractionFree && /*#__PURE__*/_jsx(ToolbarItem, {
            as: Button,
            className: "editor-document-tools__document-overview-toggle",
            icon: listView,
            disabled: disableBlockTools,
            isPressed: isListViewOpen
            /* translators: button label text should, if possible, be under 16 characters. */,
            label: __('Document Overview'),
            onClick: toggleListView,
            shortcut: listViewShortcut,
            showTooltip: !showIconLabels,
            variant: showIconLabels ? 'tertiary' : undefined,
            "aria-expanded": isListViewOpen,
            ref: listViewToggleRef,
            size: "compact"
          })]
        })]
      })
    })
  );
}
export default DocumentTools;
//# sourceMappingURL=index.js.map
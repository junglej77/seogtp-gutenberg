/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import EntitiesSavedStates from '../entities-saved-states';
import PostPublishPanel from '../post-publish-panel';
import PluginPrePublishPanel from '../plugin-pre-publish-panel';
import PluginPostPublishPanel from '../plugin-post-publish-panel';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('ActionsPanel');
export const ActionsPanelFill = Fill;
export default function SavePublishPanels({
  setEntitiesSavedStatesCallback,
  closeEntitiesSavedStates,
  isEntitiesSavedStatesOpen,
  forceIsDirtyPublishPanel
}) {
  const {
    closePublishSidebar,
    togglePublishSidebar
  } = useDispatch(editorStore);
  const {
    publishSidebarOpened,
    isPublishable,
    isDirty,
    hasOtherEntitiesChanges
  } = useSelect(select => {
    const {
      isPublishSidebarOpened,
      isEditedPostPublishable,
      isCurrentPostPublished,
      isEditedPostDirty,
      hasNonPostEntityChanges
    } = select(editorStore);
    const _hasOtherEntitiesChanges = hasNonPostEntityChanges();
    return {
      publishSidebarOpened: isPublishSidebarOpened(),
      isPublishable: !isCurrentPostPublished() && isEditedPostPublishable(),
      isDirty: _hasOtherEntitiesChanges || isEditedPostDirty(),
      hasOtherEntitiesChanges: _hasOtherEntitiesChanges
    };
  }, []);
  const openEntitiesSavedStates = useCallback(() => setEntitiesSavedStatesCallback(true), []);

  // It is ok for these components to be unmounted when not in visual use.
  // We don't want more than one present at a time, decide which to render.
  let unmountableContent;
  if (publishSidebarOpened) {
    unmountableContent = /*#__PURE__*/_jsx(PostPublishPanel, {
      onClose: closePublishSidebar,
      forceIsDirty: forceIsDirtyPublishPanel,
      PrePublishExtension: PluginPrePublishPanel.Slot,
      PostPublishExtension: PluginPostPublishPanel.Slot
    });
  } else if (isPublishable && !hasOtherEntitiesChanges) {
    unmountableContent = /*#__PURE__*/_jsx("div", {
      className: "editor-layout__toggle-publish-panel",
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "secondary",
        className: "editor-layout__toggle-publish-panel-button",
        onClick: togglePublishSidebar,
        "aria-expanded": false,
        children: __('Open publish panel')
      })
    });
  } else {
    unmountableContent = /*#__PURE__*/_jsx("div", {
      className: "editor-layout__toggle-entities-saved-states-panel",
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "secondary",
        className: "editor-layout__toggle-entities-saved-states-panel-button",
        onClick: openEntitiesSavedStates,
        "aria-expanded": false,
        disabled: !isDirty,
        accessibleWhenDisabled: true,
        children: __('Open save panel')
      })
    });
  }

  // Since EntitiesSavedStates controls its own panel, we can keep it
  // always mounted to retain its own component state (such as checkboxes).
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isEntitiesSavedStatesOpen && /*#__PURE__*/_jsx(EntitiesSavedStates, {
      close: closeEntitiesSavedStates
    }), /*#__PURE__*/_jsx(Slot, {
      bubblesVirtually: true
    }), !isEntitiesSavedStatesOpen && unmountableContent]
  });
}
//# sourceMappingURL=index.js.map
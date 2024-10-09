/**
 * Internal dependencies
 */

export default function convertEditorSettings(data) {
  var _newData$coreEditPo, _newData$coreEditSi;
  let newData = data;
  const settingsToMoveToCore = ['allowRightClickOverrides', 'distractionFree', 'editorMode', 'fixedToolbar', 'focusMode', 'hiddenBlockTypes', 'inactivePanels', 'keepCaretInsideBlock', 'mostUsedBlocks', 'openPanels', 'showBlockBreadcrumbs', 'showIconLabels', 'showListViewByDefault', 'isPublishSidebarEnabled', 'isComplementaryAreaVisible', 'pinnedItems'];
  settingsToMoveToCore.forEach(setting => {
    if (data?.['core/edit-post']?.[setting] !== undefined) {
      newData = {
        ...newData,
        core: {
          ...newData?.core,
          [setting]: data['core/edit-post'][setting]
        }
      };
      delete newData['core/edit-post'][setting];
    }
    if (data?.['core/edit-site']?.[setting] !== undefined) {
      delete newData['core/edit-site'][setting];
    }
  });
  if (Object.keys((_newData$coreEditPo = newData?.['core/edit-post']) !== null && _newData$coreEditPo !== void 0 ? _newData$coreEditPo : {})?.length === 0) {
    delete newData['core/edit-post'];
  }
  if (Object.keys((_newData$coreEditSi = newData?.['core/edit-site']) !== null && _newData$coreEditSi !== void 0 ? _newData$coreEditSi : {})?.length === 0) {
    delete newData['core/edit-site'];
  }
  return newData;
}
//# sourceMappingURL=convert-editor-settings.js.map
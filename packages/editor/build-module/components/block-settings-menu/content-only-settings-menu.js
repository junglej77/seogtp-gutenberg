/**
 * WordPress dependencies
 */
import { BlockSettingsMenuControls, __unstableBlockSettingsMenuFirstItem as BlockSettingsMenuFirstItem, store as blockEditorStore, useBlockDisplayInformation } from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { __experimentalText as Text, MenuItem } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ContentOnlySettingsMenuItems({
  clientId,
  onClose
}) {
  const {
    entity,
    onNavigateToEntityRecord,
    canEditTemplates
  } = useSelect(select => {
    const {
      getBlockEditingMode,
      getBlockParentsByBlockName,
      getSettings,
      getBlockAttributes
    } = select(blockEditorStore);
    const contentOnly = getBlockEditingMode(clientId) === 'contentOnly';
    if (!contentOnly) {
      return {};
    }
    const patternParent = getBlockParentsByBlockName(clientId, 'core/block', true)[0];
    let record;
    if (patternParent) {
      record = select(coreStore).getEntityRecord('postType', 'wp_block', getBlockAttributes(patternParent).ref);
    } else {
      const {
        getCurrentTemplateId
      } = select(editorStore);
      const templateId = getCurrentTemplateId();
      const {
        getContentLockingParent
      } = unlock(select(blockEditorStore));
      if (!getContentLockingParent(clientId) && templateId) {
        record = select(coreStore).getEntityRecord('postType', 'wp_template', templateId);
      }
    }
    const _canEditTemplates = select(coreStore).canUser('create', {
      kind: 'postType',
      name: 'wp_template'
    });
    return {
      canEditTemplates: _canEditTemplates,
      entity: record,
      onNavigateToEntityRecord: getSettings().onNavigateToEntityRecord
    };
  }, [clientId]);
  if (!entity) {
    return /*#__PURE__*/_jsx(TemplateLockContentOnlyMenuItems, {
      clientId: clientId,
      onClose: onClose
    });
  }
  const isPattern = entity.type === 'wp_block';
  let helpText = isPattern ? __('Edit the pattern to move, delete, or make further changes to this block.') : __('Edit the template to move, delete, or make further changes to this block.');
  if (!canEditTemplates) {
    helpText = __('Only users with permissions to edit the template can move or delete this block');
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockSettingsMenuFirstItem, {
      children: /*#__PURE__*/_jsx(MenuItem, {
        onClick: () => {
          onNavigateToEntityRecord({
            postId: entity.id,
            postType: entity.type
          });
        },
        disabled: !canEditTemplates,
        children: isPattern ? __('Edit pattern') : __('Edit template')
      })
    }), /*#__PURE__*/_jsx(Text, {
      variant: "muted",
      as: "p",
      className: "editor-content-only-settings-menu__description",
      children: helpText
    })]
  });
}
function TemplateLockContentOnlyMenuItems({
  clientId,
  onClose
}) {
  const {
    contentLockingParent
  } = useSelect(select => {
    const {
      getContentLockingParent
    } = unlock(select(blockEditorStore));
    return {
      contentLockingParent: getContentLockingParent(clientId)
    };
  }, [clientId]);
  const blockDisplayInformation = useBlockDisplayInformation(contentLockingParent);
  const blockEditorActions = useDispatch(blockEditorStore);
  if (!blockDisplayInformation?.title) {
    return null;
  }
  const {
    modifyContentLockBlock
  } = unlock(blockEditorActions);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockSettingsMenuFirstItem, {
      children: /*#__PURE__*/_jsx(MenuItem, {
        onClick: () => {
          modifyContentLockBlock(contentLockingParent);
          onClose();
        },
        children: _x('Unlock', 'Unlock content locked blocks')
      })
    }), /*#__PURE__*/_jsx(Text, {
      variant: "muted",
      as: "p",
      className: "editor-content-only-settings-menu__description",
      children: __('Temporarily unlock the parent block to edit, delete or make further changes to this block.')
    })]
  });
}
export default function ContentOnlySettingsMenu() {
  return /*#__PURE__*/_jsx(BlockSettingsMenuControls, {
    children: ({
      selectedClientIds,
      onClose
    }) => selectedClientIds.length === 1 && /*#__PURE__*/_jsx(ContentOnlySettingsMenuItems, {
      clientId: selectedClientIds[0],
      onClose: onClose
    })
  });
}
//# sourceMappingURL=content-only-settings-menu.js.map
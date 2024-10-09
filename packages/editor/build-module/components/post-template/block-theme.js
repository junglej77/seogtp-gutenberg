/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEntityRecord, store as coreStore } from '@wordpress/core-data';
import { check } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import SwapTemplateButton from './swap-template-button';
import ResetDefaultTemplate from './reset-default-template';
import { unlock } from '../../lock-unlock';
import CreateNewTemplate from './create-new-template';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const POPOVER_PROPS = {
  className: 'editor-post-template__dropdown',
  placement: 'bottom-start'
};
export default function BlockThemeControl({
  id
}) {
  const {
    isTemplateHidden,
    onNavigateToEntityRecord,
    getEditorSettings,
    hasGoBack
  } = useSelect(select => {
    const {
      getRenderingMode,
      getEditorSettings: _getEditorSettings
    } = unlock(select(editorStore));
    const editorSettings = _getEditorSettings();
    return {
      isTemplateHidden: getRenderingMode() === 'post-only',
      onNavigateToEntityRecord: editorSettings.onNavigateToEntityRecord,
      getEditorSettings: _getEditorSettings,
      hasGoBack: editorSettings.hasOwnProperty('onNavigateToPreviousEntityRecord')
    };
  }, []);
  const {
    get: getPreference
  } = useSelect(preferencesStore);
  const {
    editedRecord: template,
    hasResolved
  } = useEntityRecord('postType', 'wp_template', id);
  const {
    createSuccessNotice
  } = useDispatch(noticesStore);
  const {
    setRenderingMode
  } = useDispatch(editorStore);
  const canCreateTemplate = useSelect(select => !!select(coreStore).canUser('create', {
    kind: 'postType',
    name: 'wp_template'
  }), []);
  if (!hasResolved) {
    return null;
  }

  // The site editor does not have a `onNavigateToPreviousEntityRecord` setting as it uses its own routing
  // and assigns its own backlink to focusMode pages.
  const notificationAction = hasGoBack ? [{
    label: __('Go back'),
    onClick: () => getEditorSettings().onNavigateToPreviousEntityRecord()
  }] : undefined;
  const mayShowTemplateEditNotice = () => {
    if (!getPreference('core/edit-site', 'welcomeGuideTemplate')) {
      createSuccessNotice(__('Editing template. Changes made here affect all posts and pages that use the template.'), {
        type: 'snackbar',
        actions: notificationAction
      });
    }
  };
  return /*#__PURE__*/_jsx(DropdownMenu, {
    popoverProps: POPOVER_PROPS,
    focusOnMount: true,
    toggleProps: {
      size: 'compact',
      variant: 'tertiary',
      tooltipPosition: 'middle left'
    },
    label: __('Template options'),
    text: decodeEntities(template.title),
    icon: null,
    children: ({
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(MenuGroup, {
        children: [canCreateTemplate && /*#__PURE__*/_jsx(MenuItem, {
          onClick: () => {
            onNavigateToEntityRecord({
              postId: template.id,
              postType: 'wp_template'
            });
            onClose();
            mayShowTemplateEditNotice();
          },
          children: __('Edit template')
        }), /*#__PURE__*/_jsx(SwapTemplateButton, {
          onClick: onClose
        }), /*#__PURE__*/_jsx(ResetDefaultTemplate, {
          onClick: onClose
        }), canCreateTemplate && /*#__PURE__*/_jsx(CreateNewTemplate, {
          onClick: onClose
        })]
      }), /*#__PURE__*/_jsx(MenuGroup, {
        children: /*#__PURE__*/_jsx(MenuItem, {
          icon: !isTemplateHidden ? check : undefined,
          isSelected: !isTemplateHidden,
          role: "menuitemcheckbox",
          onClick: () => {
            setRenderingMode(isTemplateHidden ? 'template-locked' : 'post-only');
          },
          children: __('Show template')
        })
      })]
    })
  });
}
//# sourceMappingURL=block-theme.js.map
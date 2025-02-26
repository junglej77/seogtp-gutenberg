/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, Dropdown, Button, Notice } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';
import { useState, useMemo } from '@wordpress/element';
import { addTemplate } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import CreateNewTemplateModal from './create-new-template-modal';
import { useAllowSwitchingTemplates } from './hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const POPOVER_PROPS = {
  className: 'editor-post-template__dropdown',
  placement: 'bottom-start'
};
function PostTemplateToggle({
  isOpen,
  onClick
}) {
  const templateTitle = useSelect(select => {
    const templateSlug = select(editorStore).getEditedPostAttribute('template');
    const {
      supportsTemplateMode,
      availableTemplates
    } = select(editorStore).getEditorSettings();
    if (!supportsTemplateMode && availableTemplates[templateSlug]) {
      return availableTemplates[templateSlug];
    }
    const template = select(coreStore).canUser('create', {
      kind: 'postType',
      name: 'wp_template'
    }) && select(editorStore).getCurrentTemplateId();
    return template?.title || template?.slug || availableTemplates?.[templateSlug];
  }, []);
  return /*#__PURE__*/_jsx(Button, {
    __next40pxDefaultSize: true,
    variant: "tertiary",
    "aria-expanded": isOpen,
    "aria-label": __('Template options'),
    onClick: onClick,
    children: templateTitle !== null && templateTitle !== void 0 ? templateTitle : __('Default template')
  });
}

/**
 * Renders the dropdown content for selecting a post template.
 *
 * @param {Object}   props         The component props.
 * @param {Function} props.onClose The function to close the dropdown.
 *
 * @return {JSX.Element} The rendered dropdown content.
 */
function PostTemplateDropdownContent({
  onClose
}) {
  var _options$find, _selectedOption$value;
  const allowSwitchingTemplate = useAllowSwitchingTemplates();
  const {
    availableTemplates,
    fetchedTemplates,
    selectedTemplateSlug,
    canCreate,
    canEdit,
    currentTemplateId,
    onNavigateToEntityRecord,
    getEditorSettings
  } = useSelect(select => {
    const {
      canUser,
      getEntityRecords
    } = select(coreStore);
    const editorSettings = select(editorStore).getEditorSettings();
    const canCreateTemplates = canUser('create', {
      kind: 'postType',
      name: 'wp_template'
    });
    const _currentTemplateId = select(editorStore).getCurrentTemplateId();
    return {
      availableTemplates: editorSettings.availableTemplates,
      fetchedTemplates: canCreateTemplates ? getEntityRecords('postType', 'wp_template', {
        post_type: select(editorStore).getCurrentPostType(),
        per_page: -1
      }) : undefined,
      selectedTemplateSlug: select(editorStore).getEditedPostAttribute('template'),
      canCreate: allowSwitchingTemplate && canCreateTemplates && editorSettings.supportsTemplateMode,
      canEdit: allowSwitchingTemplate && canCreateTemplates && editorSettings.supportsTemplateMode && !!_currentTemplateId,
      currentTemplateId: _currentTemplateId,
      onNavigateToEntityRecord: editorSettings.onNavigateToEntityRecord,
      getEditorSettings: select(editorStore).getEditorSettings
    };
  }, [allowSwitchingTemplate]);
  const options = useMemo(() => Object.entries({
    ...availableTemplates,
    ...Object.fromEntries((fetchedTemplates !== null && fetchedTemplates !== void 0 ? fetchedTemplates : []).map(({
      slug,
      title
    }) => [slug, title.rendered]))
  }).map(([slug, title]) => ({
    value: slug,
    label: title
  })), [availableTemplates, fetchedTemplates]);
  const selectedOption = (_options$find = options.find(option => option.value === selectedTemplateSlug)) !== null && _options$find !== void 0 ? _options$find : options.find(option => !option.value); // The default option has '' value.

  const {
    editPost
  } = useDispatch(editorStore);
  const {
    createSuccessNotice
  } = useDispatch(noticesStore);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-post-template__classic-theme-dropdown",
    children: [/*#__PURE__*/_jsx(InspectorPopoverHeader, {
      title: __('Template'),
      help: __('Templates define the way content is displayed when viewing your site.'),
      actions: canCreate ? [{
        icon: addTemplate,
        label: __('Add template'),
        onClick: () => setIsCreateModalOpen(true)
      }] : [],
      onClose: onClose
    }), !allowSwitchingTemplate ? /*#__PURE__*/_jsx(Notice, {
      status: "warning",
      isDismissible: false,
      children: __('The posts page template cannot be changed.')
    }) : /*#__PURE__*/_jsx(SelectControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      hideLabelFromVision: true,
      label: __('Template'),
      value: (_selectedOption$value = selectedOption?.value) !== null && _selectedOption$value !== void 0 ? _selectedOption$value : '',
      options: options,
      onChange: slug => editPost({
        template: slug || ''
      })
    }), canEdit && onNavigateToEntityRecord && /*#__PURE__*/_jsx("p", {
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "link",
        onClick: () => {
          onNavigateToEntityRecord({
            postId: currentTemplateId,
            postType: 'wp_template'
          });
          onClose();
          createSuccessNotice(__('Editing template. Changes made here affect all posts and pages that use the template.'), {
            type: 'snackbar',
            actions: [{
              label: __('Go back'),
              onClick: () => getEditorSettings().onNavigateToPreviousEntityRecord()
            }]
          });
        },
        children: __('Edit template')
      })
    }), isCreateModalOpen && /*#__PURE__*/_jsx(CreateNewTemplateModal, {
      onClose: () => setIsCreateModalOpen(false)
    })]
  });
}
function ClassicThemeControl() {
  return /*#__PURE__*/_jsx(Dropdown, {
    popoverProps: POPOVER_PROPS,
    focusOnMount: true,
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(PostTemplateToggle, {
      isOpen: isOpen,
      onClick: onToggle
    }),
    renderContent: ({
      onClose
    }) => /*#__PURE__*/_jsx(PostTemplateDropdownContent, {
      onClose: onClose
    })
  });
}

/**
 * Provides a dropdown menu for selecting and managing post templates.
 *
 * The dropdown menu includes a button for toggling the menu, a list of available templates, and options for creating and editing templates.
 *
 * @return {JSX.Element} The rendered ClassicThemeControl component.
 */
export default ClassicThemeControl;
//# sourceMappingURL=classic-theme.js.map
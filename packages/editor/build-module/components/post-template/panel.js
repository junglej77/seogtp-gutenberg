/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import ClassicThemeControl from './classic-theme';
import BlockThemeControl from './block-theme';
import PostPanelRow from '../post-panel-row';

/**
 * Displays the template controls based on the current editor settings and user permissions.
 *
 * @return {JSX.Element|null} The rendered PostTemplatePanel component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export default function PostTemplatePanel() {
  const {
    templateId,
    isBlockTheme
  } = useSelect(select => {
    const {
      getCurrentTemplateId,
      getEditorSettings
    } = select(editorStore);
    return {
      templateId: getCurrentTemplateId(),
      isBlockTheme: getEditorSettings().__unstableIsBlockBasedTheme
    };
  }, []);
  const isVisible = useSelect(select => {
    var _select$canUser;
    const postTypeSlug = select(editorStore).getCurrentPostType();
    const postType = select(coreStore).getPostType(postTypeSlug);
    if (!postType?.viewable) {
      return false;
    }
    const settings = select(editorStore).getEditorSettings();
    const hasTemplates = !!settings.availableTemplates && Object.keys(settings.availableTemplates).length > 0;
    if (hasTemplates) {
      return true;
    }
    if (!settings.supportsTemplateMode) {
      return false;
    }
    const canCreateTemplates = (_select$canUser = select(coreStore).canUser('create', {
      kind: 'postType',
      name: 'wp_template'
    })) !== null && _select$canUser !== void 0 ? _select$canUser : false;
    return canCreateTemplates;
  }, []);
  const canViewTemplates = useSelect(select => {
    var _select$canUser2;
    return (_select$canUser2 = select(coreStore).canUser('read', {
      kind: 'postType',
      name: 'wp_template'
    })) !== null && _select$canUser2 !== void 0 ? _select$canUser2 : false;
  }, []);
  if ((!isBlockTheme || !canViewTemplates) && isVisible) {
    return /*#__PURE__*/_jsx(PostPanelRow, {
      label: __('Template'),
      children: /*#__PURE__*/_jsx(ClassicThemeControl, {})
    });
  }
  if (isBlockTheme && !!templateId) {
    return /*#__PURE__*/_jsx(PostPanelRow, {
      label: __('Template'),
      children: /*#__PURE__*/_jsx(BlockThemeControl, {
        id: templateId
      })
    });
  }
  return null;
}
//# sourceMappingURL=panel.js.map
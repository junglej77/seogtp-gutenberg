/**
 * WordPress 依赖
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { __, sprintf, isRTL } from '@wordpress/i18n';
import { trash, rotateLeft, rotateRight, layout, page } from '@wordpress/icons';
import { useCommandLoader } from '@wordpress/commands';
import { decodeEntities } from '@wordpress/html-entities';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { store as editorStore } from '@wordpress/editor';

/**
 * 内部依赖
 */
import { store as editSiteStore } from '../../store';
import useEditedEntityRecord from '../../components/use-edited-entity-record';
import isTemplateRemovable from '../../utils/is-template-removable';
import isTemplateRevertable from '../../utils/is-template-revertable';
import { unlock } from '../../lock-unlock';
import { TEMPLATE_POST_TYPE } from '../../utils/constants';
import { useLink } from '../../components/routes/link';
const {
  useHistory
} = unlock(routerPrivateApis);

/**
 * 使用页面内容焦点命令
 *
 * 该函数用于生成与页面内容焦点相关的命令，主要用于在编辑模式下切换模板和页面。
 */
function usePageContentFocusCommands() {
  const {
    record: template
  } = useEditedEntityRecord();
  const {
    isPage,
    canvasMode,
    templateId,
    currentPostType
  } = useSelect(select => {
    const {
      isPage: _isPage,
      getCanvasMode
    } = unlock(select(editSiteStore));
    const {
      getCurrentPostType,
      getCurrentTemplateId
    } = select(editorStore);
    return {
      isPage: _isPage(),
      canvasMode: getCanvasMode(),
      templateId: getCurrentTemplateId(),
      currentPostType: getCurrentPostType()
    };
  }, []);
  const {
    onClick: editTemplate
  } = useLink({
    postType: 'wp_template',
    postId: templateId
  });
  const {
    setRenderingMode
  } = useDispatch(editorStore);

  // 如果不在页面编辑模式下，返回空命令
  if (!isPage || canvasMode !== 'edit') {
    return {
      isLoading: false,
      commands: []
    };
  }
  const commands = [];

  // 如果当前编辑的不是模板，添加切换到模板编辑的命令
  if (currentPostType !== 'wp_template') {
    commands.push({
      name: 'core/switch-to-template-focus',
      label: sprintf( /* translators: %s: template title */
      __('Edit template: %s'), decodeEntities(template.title)),
      icon: layout,
      callback: ({
        close
      }) => {
        editTemplate();
        close();
      }
    });
  } else {
    // 如果当前编辑的是模板，添加切换回页面编辑的命令
    commands.push({
      name: 'core/switch-to-page-focus',
      label: __('Back to page'),
      icon: page,
      callback: ({
        close
      }) => {
        setRenderingMode('template-locked');
        close();
      }
    });
  }
  return {
    isLoading: false,
    commands
  };
}

/**
 * 使用文档操作命令
 *
 * 该函数用于生成与文档操作相关的命令，主要用于重置和删除模板。
 */
function useManipulateDocumentCommands() {
  const {
    isLoaded,
    record: template
  } = useEditedEntityRecord();
  const {
    removeTemplate,
    revertTemplate
  } = useDispatch(editSiteStore);
  const history = useHistory();
  const isEditingPage = useSelect(select => select(editSiteStore).isPage() && select(editorStore).getCurrentPostType() !== 'wp_template', []);

  // 如果模板未加载，返回空命令
  if (!isLoaded) {
    return {
      isLoading: true,
      commands: []
    };
  }
  const commands = [];

  // 如果模板可重置且不在页面编辑模式下，添加重置模板的命令
  if (isTemplateRevertable(template) && !isEditingPage) {
    const label = template.type === TEMPLATE_POST_TYPE ? sprintf( /* translators: %s: template title */
    __('Reset template: %s'), decodeEntities(template.title)) : sprintf( /* translators: %s: template part title */
    __('Reset template part: %s'), decodeEntities(template.title));
    commands.push({
      name: 'core/reset-template',
      label,
      icon: isRTL() ? rotateRight : rotateLeft,
      callback: ({
        close
      }) => {
        revertTemplate(template);
        close();
      }
    });
  }

  // 如果模板可删除且不在页面编辑模式下，添加删除模板的命令
  if (isTemplateRemovable(template) && !isEditingPage) {
    const label = template.type === TEMPLATE_POST_TYPE ? sprintf( /* translators: %s: template title */
    __('Delete template: %s'), decodeEntities(template.title)) : sprintf( /* translators: %s: template part title */
    __('Delete template part: %s'), decodeEntities(template.title));
    commands.push({
      name: 'core/remove-template',
      label,
      icon: trash,
      callback: ({
        close
      }) => {
        removeTemplate(template);
        // 导航到模板列表
        history.push({
          postType: template.type
        });
        close();
      }
    });
  }
  return {
    isLoading: !isLoaded,
    commands
  };
}

/**
 * 使用编辑模式命令
 *
 * 该函数用于注册编辑模式下的命令加载器。
 */
export function useEditModeCommands() {
  useCommandLoader({
    name: 'core/edit-site/page-content-focus',
    hook: usePageContentFocusCommands,
    context: 'entity-edit'
  });
  useCommandLoader({
    name: 'core/edit-site/manipulate-document',
    hook: useManipulateDocumentCommands
  });
}
//# sourceMappingURL=use-edit-mode-commands.js.map
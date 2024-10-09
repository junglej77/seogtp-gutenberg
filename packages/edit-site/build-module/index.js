/**
 * WordPress 依赖项
 */
import { store as blocksStore } from '@wordpress/blocks'; // 导入 WordPress 块存储
import { registerCoreBlocks,
// 注册核心块
__experimentalGetCoreBlocks,
// 获取核心块（实验性）
__experimentalRegisterExperimentalCoreBlocks // 注册实验性核心块（实验性）
} from '@wordpress/block-library'; // 从 WordPress 块库导入
import { dispatch } from '@wordpress/data'; // 导入数据分发函数
import deprecated from '@wordpress/deprecated'; // 导入弃用警告函数
import { createRoot, StrictMode } from '@wordpress/element'; // 导入 React 相关函数
import { store as editorStore,
// 导入编辑器存储
privateApis as editorPrivateApis // 导入编辑器私有 API
} from '@wordpress/editor'; // 从 WordPress 编辑器导入
import { store as preferencesStore } from '@wordpress/preferences'; // 导入偏好设置存储
import { registerLegacyWidgetBlock,
// 注册旧版小工具块
registerWidgetGroupBlock // 注册小工具组块
} from '@wordpress/widgets'; // 从 WordPress 小工具导入

/**
 * 内部依赖项
 */
import './hooks'; // 导入钩子文件
import { store as editSiteStore } from './store'; // 导入站点编辑器存储
import { unlock } from './lock-unlock'; // 导入解锁函数
import App from './components/app'; // 导入应用组件

// 解锁编辑器私有 API 中的函数
import { jsx as _jsx } from "react/jsx-runtime";
const {
  registerCoreBlockBindingsSources,
  // 注册核心块绑定源
  bootstrapBlockBindingsSourcesFromServer // 从服务器引导块绑定源
} = unlock(editorPrivateApis);

/**
 * 初始化站点编辑器屏幕。
 *
 * @param {string} id       根元素的 ID，用于渲染屏幕。
 * @param {Object} settings 编辑器设置。
 */
export function initializeEditor(id, settings) {
  const target = document.getElementById(id); // 获取目标元素
  const root = createRoot(target); // 创建根元素

  dispatch(blocksStore).reapplyBlockTypeFilters(); // 重新应用块类型过滤器
  const coreBlocks = __experimentalGetCoreBlocks().filter(
  // 获取核心块并过滤掉 'core/freeform' 块
  ({
    name
  }) => name !== 'core/freeform');
  registerCoreBlocks(coreBlocks); // 注册核心块
  bootstrapBlockBindingsSourcesFromServer(settings?.blockBindingsSources); // 从服务器引导块绑定源
  registerCoreBlockBindingsSources(); // 注册核心块绑定源
  dispatch(blocksStore).setFreeformFallbackBlockName('core/html'); // 设置自由形式块的回退块名称
  registerLegacyWidgetBlock({
    inserter: false
  }); // 注册旧版小工具块（不插入）
  registerWidgetGroupBlock({
    inserter: false
  }); // 注册小工具组块（不插入）
  if (globalThis.IS_GUTENBERG_PLUGIN) {
    // 如果是 Gutenberg 插件
    __experimentalRegisterExperimentalCoreBlocks({
      // 注册实验性核心块
      enableFSEBlocks: true
    });
  }

  // 在渲染之前同步分发操作和更新存储，以避免不必要的 useEffect 重新渲染
  dispatch(preferencesStore).setDefaults('core/edit-site', {
    welcomeGuide: true,
    // 欢迎指南
    welcomeGuideStyles: true,
    // 欢迎指南样式
    welcomeGuidePage: true,
    // 欢迎指南页面
    welcomeGuideTemplate: true // 欢迎指南模板
  });
  dispatch(preferencesStore).setDefaults('core', {
    allowRightClickOverrides: true,
    // 允许右键覆盖
    distractionFree: false,
    // 无干扰模式
    editorMode: 'visual',
    // 编辑器模式
    fixedToolbar: false,
    // 固定工具栏
    focusMode: false,
    // 焦点模式
    inactivePanels: [],
    // 非活动面板
    keepCaretInsideBlock: false,
    // 保持光标在块内
    openPanels: ['post-status'],
    // 打开的面板
    showBlockBreadcrumbs: true,
    // 显示块面包屑
    showListViewByDefault: false,
    // 默认显示列表视图
    enableChoosePatternModal: true // 启用选择模式模态框
  });
  if (window.__experimentalMediaProcessing) {
    // 如果启用实验性媒体处理
    dispatch(preferencesStore).setDefaults('core/media', {
      requireApproval: true,
      // 需要批准
      optimizeOnUpload: true // 上传时优化
    });
  }
  dispatch(editSiteStore).updateSettings(settings); // 更新站点编辑器设置

  // 将 defaultTemplateTypes 保存在 core/editor 设置中，以便在任何编辑器中使用 core/editor 选择器进行选择
  // 这是必需的，因为 edit-site 不会使用 EditorProvider 初始化，后者内部也使用 updateEditorSettings
  dispatch(editorStore).updateEditorSettings({
    defaultTemplateTypes: settings.defaultTemplateTypes,
    // 默认模板类型
    defaultTemplatePartAreas: settings.defaultTemplatePartAreas // 默认模板部分区域
  });

  // 防止文件拖放到非拖放区域时的默认浏览器行为
  window.addEventListener('dragover', e => e.preventDefault(), false);
  window.addEventListener('drop', e => e.preventDefault(), false);
  root.render(
  /*#__PURE__*/
  // 渲染应用
  _jsx(StrictMode, {
    children: /*#__PURE__*/_jsx(App, {})
  }));
  return root; // 返回根元素
}

/**
 * 重新初始化编辑器（已弃用）
 */
export function reinitializeEditor() {
  deprecated('wp.editSite.reinitializeEditor', {
    since: '6.2',
    // 自 6.2 版本起
    version: '6.3' // 在 6.3 版本中弃用
  });
}

// 导出组件和存储
export { default as PluginTemplateSettingPanel } from './components/plugin-template-setting-panel';
export { store } from './store';
export * from './deprecated';

// 临时：在帖子仪表板迭代期间，它与站点编辑器构建在同一个包中
export { initializePostsDashboard } from './posts';
//# sourceMappingURL=index.js.map
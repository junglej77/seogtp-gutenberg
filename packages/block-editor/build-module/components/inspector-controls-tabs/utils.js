/**
 * WordPress dependencies
 */
import { cog, styles, listView, layout } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
export const TAB_SETTINGS = {
  name: 'settings',
  title: __('设置'),
  value: 'settings',
  icon: cog,
  className: 'block-editor-block-inspector__tab-item'
};
export const TAB_STYLES = {
  name: 'styles',
  title: __('风格'),
  value: 'styles',
  icon: styles,
  className: 'block-editor-block-inspector__tab-item'
};
export const TAB_LIST_VIEW = {
  name: 'list',
  title: __('子菜单列表'),
  value: 'list-view',
  icon: listView,
  className: 'block-editor-block-inspector__tab-item'
};
export const TAB_LAYOUT = {
  name: 'layout',
  title: __('布局'),
  value: 'layout',
  icon: layout,
  // 使用对应图标
  className: 'block-editor-block-inspector__tab-item'
};
export const TAB_ADVANCED = {
  name: 'advanced',
  title: __('高级'),
  value: 'advanced',
  icon: listView,
  // 使用高级的工具图标
  className: 'block-editor-block-inspector__tab-item'
};
//# sourceMappingURL=utils.js.map
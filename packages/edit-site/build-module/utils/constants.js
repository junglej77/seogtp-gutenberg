/**
 * WordPress 依赖项
 */
import { __ } from '@wordpress/i18n'; // 导入 WordPress 国际化工具
import { privateApis as patternPrivateApis } from '@wordpress/patterns'; // 导入 WordPress 模式相关的私有 API

/**
 * 内部依赖项
 */
import { unlock } from '../lock-unlock'; // 导入解锁函数，用于访问受保护的 API

// 导航相关常量
export const NAVIGATION_POST_TYPE = 'wp_navigation'; // 导航文章类型

// 模板相关常量
export const TEMPLATE_POST_TYPE = 'wp_template'; // 模板文章类型
export const TEMPLATE_PART_POST_TYPE = 'wp_template_part'; // 模板部件文章类型
export const TEMPLATE_ORIGINS = {
  custom: 'custom',
  // 自定义模板
  theme: 'theme',
  // 主题模板
  plugin: 'plugin' // 插件模板
};
export const TEMPLATE_PART_AREA_DEFAULT_CATEGORY = 'uncategorized'; // 模板部件默认分类
export const TEMPLATE_PART_ALL_AREAS_CATEGORY = 'all-parts'; // 所有模板部件分类

// 模式相关常量
export const {
  PATTERN_TYPES,
  // 模式类型
  PATTERN_DEFAULT_CATEGORY,
  // 默认模式分类
  PATTERN_USER_CATEGORY,
  // 用户模式分类
  EXCLUDED_PATTERN_SOURCES,
  // 排除的模式来源
  PATTERN_SYNC_TYPES // 模式同步类型
} = unlock(patternPrivateApis); // 解锁并导出模式相关的私有 API

// 可编辑的实体类型
export const FOCUSABLE_ENTITIES = [TEMPLATE_PART_POST_TYPE,
// 模板部件
NAVIGATION_POST_TYPE,
// 导航
PATTERN_TYPES.user // 用户模式
];

// 文章类型标签
export const POST_TYPE_LABELS = {
  [TEMPLATE_POST_TYPE]: __('Template'),
  // 模板标签
  [TEMPLATE_PART_POST_TYPE]: __('Template part'),
  // 模板部件标签
  [PATTERN_TYPES.user]: __('Pattern'),
  // 模式标签
  [NAVIGATION_POST_TYPE]: __('Navigation') // 导航标签
};

// 数据视图常量
export const LAYOUT_GRID = 'grid'; // 网格布局
export const LAYOUT_TABLE = 'table'; // 表格布局
export const LAYOUT_LIST = 'list'; // 列表布局

// 操作符常量
export const OPERATOR_IS = 'is'; // 等于
export const OPERATOR_IS_NOT = 'isNot'; // 不等于
export const OPERATOR_IS_ANY = 'isAny'; // 任意
export const OPERATOR_IS_NONE = 'isNone'; // 无
//# sourceMappingURL=constants.js.map
/**
 * 外部依赖
 */
import clsx from 'clsx'; // 用于更方便地处理条件性的 CSS 类名合并。

/**
 * WordPress 依赖
 */
import { __experimentalHStack as HStack, __experimentalHeading as Heading, __experimentalVStack as VStack } from '@wordpress/components'; // 用于布局和显示标题。
import { isRTL, __, sprintf } from '@wordpress/i18n'; // 提供国际化支持，例如文本翻译。
import { chevronRight, chevronLeft } from '@wordpress/icons'; // 引入 chevronRight 和 chevronLeft 图标，用于显示指向性的图标。
import { store as coreStore } from '@wordpress/core-data'; // 使用 store as coreStore 来访问 WordPress 核心数据。
import { useSelect } from '@wordpress/data'; // 使用 useSelect 钩子来订阅和选择 Redux store 中的数据。
import { privateApis as routerPrivateApis } from '@wordpress/router'; // 通过 privateApis 访问路由相关的私有 API。
import { useContext } from '@wordpress/element'; //  引入 useContext，一个 React 钩子，用于访问 React context。

/**
 * 内部依赖
 */
import { store as editSiteStore } from '../../store'; // 引入编辑站点的 store。
import { unlock } from '../../lock-unlock'; // 可能是一个自定义的功能，用来解锁或启用某些功能或 API。
import SidebarButton from '../sidebar-button'; // 一个自定义的按钮组件，用于侧边栏。
import { isPreviewingTheme, currentlyPreviewingTheme } from '../../utils/is-previewing-theme'; // 一些实用函数，检查是否在预览主题。
import { SidebarNavigationContext } from '../sidebar'; // 使用 useContext 来获取导航相关的上下文。
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useHistory,
  useLocation
} = unlock(routerPrivateApis); // 使用 unlock 函数解锁路由相关的功能，用于导航历史和位置信息。

export default function SidebarNavigationScreen({
  isRoot,
  title,
  actions,
  meta,
  content,
  footer,
  description,
  backPath: backPathProp
}) {
  const {
    dashboardLink,
    dashboardLinkText,
    previewingThemeName
  } = useSelect(select => {
    const {
      getSettings
    } = unlock(select(editSiteStore));
    const currentlyPreviewingThemeId = currentlyPreviewingTheme();
    return {
      dashboardLink: getSettings().__experimentalDashboardLink,
      dashboardLinkText: getSettings().__experimentalDashboardLinkText,
      // Do not call `getTheme` with null, it will cause a request to
      // the server.
      previewingThemeName: currentlyPreviewingThemeId ? select(coreStore).getTheme(currentlyPreviewingThemeId)?.name?.rendered : undefined
    };
  }, []);
  const location = useLocation();
  const history = useHistory();
  const {
    navigate
  } = useContext(SidebarNavigationContext);
  const backPath = backPathProp !== null && backPathProp !== void 0 ? backPathProp : location.state?.backPath;
  const icon = isRTL() ? chevronRight : chevronLeft;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(VStack, {
      className: clsx('edit-site-sidebar-navigation-screen__main', {
        'has-footer': !!footer
      }),
      spacing: 0,
      justify: "flex-start",
      children: [/*#__PURE__*/_jsxs(HStack, {
        spacing: 3,
        alignment: "flex-start",
        className: "edit-site-sidebar-navigation-screen__title-icon",
        children: [!isRoot && /*#__PURE__*/_jsx(SidebarButton, {
          onClick: () => {
            history.push(backPath);
            navigate('back');
          },
          icon: icon,
          label: __('Back'),
          showTooltip: false
        }), isRoot && /*#__PURE__*/_jsx(SidebarButton, {
          icon: icon,
          label: dashboardLinkText || __('Go to the Dashboard'),
          href: dashboardLink || 'index.php'
        }), /*#__PURE__*/_jsx(Heading, {
          className: "edit-site-sidebar-navigation-screen__title",
          color: '#e0e0e0' /* $gray-200 */,
          level: 1,
          size: 20,
          children: !isPreviewingTheme() ? title : sprintf('Previewing %1$s: %2$s', previewingThemeName, title)
        }), actions && /*#__PURE__*/_jsx("div", {
          className: "edit-site-sidebar-navigation-screen__actions",
          children: actions
        })]
      }), meta && /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsx("div", {
          className: "edit-site-sidebar-navigation-screen__meta",
          children: meta
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "edit-site-sidebar-navigation-screen__content",
        children: [description && /*#__PURE__*/_jsx("p", {
          className: "edit-site-sidebar-navigation-screen__description",
          children: description
        }), content]
      })]
    }), footer && /*#__PURE__*/_jsx("footer", {
      className: "edit-site-sidebar-navigation-screen__footer",
      children: footer
    })]
  });
}
/**
 * 这段代码定义了一个名为 SidebarNavigationScreen 的 React 组件，主要用于 WordPress Gutenberg 编辑器中的侧边导航屏幕。
 * 这个组件可以在多个场景中使用，比如编辑站点的侧边栏，用于展示各种管理链接、设置和内容。下面是这个组件每个部分的详细解释：

函数组件的参数
isRoot: 一个布尔值，用于判断当前是否处于导航的根部。
title: 显示在侧边栏导航顶部的标题。
actions: 可能是一个 React 节点或组件，用于执行特定操作，如保存、发布等。
meta: 提供额外信息的组件或元素，例如版权信息或者版本号。
content: 主体内容，可以是任何 React 节点，通常用于填充具体的功能或信息。
footer: 底部内容，可能包含辅助链接或者操作按钮。
description: 对当前页面或功能的描述，有助于用户理解当前界面的用途。
backPathProp: 提供一个回退路径，用于导航操作。
使用的 Hooks 和 Context
useSelect: 这是一个 Redux Hook，用于从 Redux store 中选择部分状态。这里用来获取当前主题预览的链接、文本和名称。
useLocation: 用于获取当前页面的路径信息。
useHistory: 提供导航功能，例如回退到上一个页面。
useContext: 使用 SidebarNavigationContext，这可能是一个自定义的 Context 提供侧边栏的导航逻辑。
组件逻辑
Navigation Logic: 如果不是根路径，显示一个返回按钮，点击后使用 history.push() 和 navigate('back') 实现页面回退。
Display Logic: 如果是根路径，显示一个导航到仪表盘的按钮。根据是否正在预览一个主题来动态调整标题显示。
Actions and Meta: 根据传入的 actions 和 meta props 动态渲染内容区域。
Content and Footer: 显示描述性文本和主要内容，以及可选的页脚。
JSX 结构
VStack 和 HStack: 这些来自 @wordpress/components 的组件用于垂直和水平堆叠布局，这有助于组织组件内部的布局结构。
SidebarButton: 自定义的按钮组件，用于实现导航和动作执行。
Heading: 显示页面标题，支持国际化和动态内容。
功能和样式
Icon Logic: 根据当前的文本方向（如 RTL）来决定使用向右还是向左的图标，增强用户体验。
CSS Class Logic: 使用 clsx 动态生成 CSS 类，根据条件（如是否有 footer）来应用不同的样式。
 */
//# sourceMappingURL=index.js.map
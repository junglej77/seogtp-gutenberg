/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { layout, symbol, navigation, styles, page } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { SidebarNavigationItemGlobalStyles } from '../sidebar-navigation-screen-global-styles';
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import { NAVIGATION_POST_TYPE, TEMPLATE_POST_TYPE, PATTERN_TYPES } from '../../utils/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function SidebarNavigationScreenMain() {
  const {
    setEditorCanvasContainerView
  } = unlock(useDispatch(editSiteStore));

  // Clear the editor canvas container view when accessing the main navigation screen.
  useEffect(() => {
    setEditorCanvasContainerView(undefined);
  }, [setEditorCanvasContainerView]);
  return /*#__PURE__*/_jsx(SidebarNavigationScreen, {
    isRoot: true,
    title: __('网站全局设计'),
    description: __('使用块编辑器自定义网站的外观。'),
    content: /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsxs(ItemGroup, {
        children: [/*#__PURE__*/_jsx(SidebarNavigationItem, {
          uid: "navigation-navigation-item",
          params: {
            postType: NAVIGATION_POST_TYPE
          },
          withChevron: true,
          icon: navigation,
          children: __('导航')
        }), /*#__PURE__*/_jsx(SidebarNavigationItemGlobalStyles, {
          uid: "styles-navigation-item",
          withChevron: true,
          icon: styles,
          children: __('风格')
        }), /*#__PURE__*/_jsx(SidebarNavigationItem, {
          uid: "page-navigation-item",
          params: {
            postType: 'page'
          },
          withChevron: true,
          icon: page,
          children: __('页面')
        }), /*#__PURE__*/_jsx(SidebarNavigationItem, {
          uid: "template-navigation-item",
          params: {
            postType: TEMPLATE_POST_TYPE
          },
          withChevron: true,
          icon: layout,
          children: __('模板')
        }), /*#__PURE__*/_jsx(SidebarNavigationItem, {
          uid: "patterns-navigation-item",
          params: {
            postType: PATTERN_TYPES.user
          },
          withChevron: true,
          icon: symbol,
          children: __('块设计')
        })]
      })
    })
  });
}
//# sourceMappingURL=index.js.map
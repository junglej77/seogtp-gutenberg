/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * Internal dependencies
 */
import { SidebarNavigationScreenWrapper } from '../sidebar-navigation-screen-navigation-menus';
import ScreenNavigationMoreMenu from './more-menu';
import NavigationMenuEditor from './navigation-menu-editor';
import buildNavigationLabel from '../sidebar-navigation-screen-navigation-menus/build-navigation-label';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function SingleNavigationMenu({
  navigationMenu,
  backPath,
  handleDelete,
  handleDuplicate,
  handleSave
}) {
  const menuTitle = navigationMenu?.title?.rendered;
  return /*#__PURE__*/_jsx(SidebarNavigationScreenWrapper, {
    actions: /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsx(ScreenNavigationMoreMenu, {
        menuId: navigationMenu?.id,
        menuTitle: decodeEntities(menuTitle),
        onDelete: handleDelete,
        onSave: handleSave,
        onDuplicate: handleDuplicate
      })
    }),
    backPath: backPath,
    title: buildNavigationLabel(navigationMenu?.title, navigationMenu?.id, navigationMenu?.status),
    description: __('Navigation Menus are a curated collection of blocks that allow visitors to get around your site.'),
    children: /*#__PURE__*/_jsx(NavigationMenuEditor, {
      navigationMenuId: navigationMenu?.id
    })
  });
}
//# sourceMappingURL=single-navigation-menu.js.map
/**
 * WordPress dependencies
 */
import { MenuGroup, MenuItem, MenuItemsChoice, DropdownMenu } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import useNavigationMenu from '../use-navigation-menu';
import useNavigationEntities from '../use-navigation-entities';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function buildMenuLabel(title, id, status) {
  if (!title) {
    /* translators: %s is the index of the menu in the list of menus. */
    return sprintf(__('(no title %s)'), id);
  }
  if (status === 'publish') {
    return decodeEntities(title);
  }
  return sprintf(
  // translators: %1s: title of the menu; %2s: status of the menu (draft, pending, etc.).
  __('%1$s (%2$s)'), decodeEntities(title), status);
}
function NavigationMenuSelector({
  currentMenuId,
  onSelectNavigationMenu,
  onSelectClassicMenu,
  onCreateNew,
  actionLabel,
  createNavigationMenuIsSuccess,
  createNavigationMenuIsError
}) {
  /* translators: %s: The name of a menu. */
  const createActionLabel = __("Create from '%s'");
  const [isUpdatingMenuRef, setIsUpdatingMenuRef] = useState(false);
  actionLabel = actionLabel || createActionLabel;
  const {
    menus: classicMenus
  } = useNavigationEntities();
  const {
    navigationMenus,
    isResolvingNavigationMenus,
    hasResolvedNavigationMenus,
    canUserCreateNavigationMenus,
    canSwitchNavigationMenu
  } = useNavigationMenu();
  const [currentTitle] = useEntityProp('postType', 'wp_navigation', 'title');
  const menuChoices = useMemo(() => {
    return navigationMenus?.map(({
      id,
      title,
      status
    }, index) => {
      const label = buildMenuLabel(title?.rendered, index + 1, status);
      return {
        value: id,
        label,
        ariaLabel: sprintf(actionLabel, label),
        disabled: isUpdatingMenuRef || isResolvingNavigationMenus || !hasResolvedNavigationMenus
      };
    }) || [];
  }, [navigationMenus, actionLabel, isResolvingNavigationMenus, hasResolvedNavigationMenus, isUpdatingMenuRef]);
  const hasNavigationMenus = !!navigationMenus?.length;
  const hasClassicMenus = !!classicMenus?.length;
  const showNavigationMenus = !!canSwitchNavigationMenu;
  const showClassicMenus = !!canUserCreateNavigationMenus;
  const noMenuSelected = hasNavigationMenus && !currentMenuId;
  const noBlockMenus = !hasNavigationMenus && hasResolvedNavigationMenus;
  const menuUnavailable = hasResolvedNavigationMenus && currentMenuId === null;
  let selectorLabel = '';
  if (isResolvingNavigationMenus) {
    selectorLabel = __('Loading…');
  } else if (noMenuSelected || noBlockMenus || menuUnavailable) {
    // Note: classic Menus may be available.
    selectorLabel = __('Choose or create a Navigation Menu');
  } else {
    // Current Menu's title.
    selectorLabel = currentTitle;
  }
  useEffect(() => {
    if (isUpdatingMenuRef && (createNavigationMenuIsSuccess || createNavigationMenuIsError)) {
      setIsUpdatingMenuRef(false);
    }
  }, [hasResolvedNavigationMenus, createNavigationMenuIsSuccess, canUserCreateNavigationMenus, createNavigationMenuIsError, isUpdatingMenuRef, menuUnavailable, noBlockMenus, noMenuSelected]);
  const NavigationMenuSelectorDropdown = /*#__PURE__*/_jsx(DropdownMenu, {
    label: selectorLabel,
    icon: moreVertical,
    toggleProps: {
      size: 'small'
    },
    children: ({
      onClose
    }) => /*#__PURE__*/_jsxs(_Fragment, {
      children: [showNavigationMenus && hasNavigationMenus && /*#__PURE__*/_jsx(MenuGroup, {
        label: __('Menus'),
        children: /*#__PURE__*/_jsx(MenuItemsChoice, {
          value: currentMenuId,
          onSelect: menuId => {
            onSelectNavigationMenu(menuId);
            onClose();
          },
          choices: menuChoices
        })
      }), showClassicMenus && hasClassicMenus && /*#__PURE__*/_jsx(MenuGroup, {
        label: __('Import Classic Menus'),
        children: classicMenus?.map(menu => {
          const label = decodeEntities(menu.name);
          return /*#__PURE__*/_jsx(MenuItem, {
            onClick: async () => {
              setIsUpdatingMenuRef(true);
              await onSelectClassicMenu(menu);
              setIsUpdatingMenuRef(false);
              onClose();
            },
            "aria-label": sprintf(createActionLabel, label),
            disabled: isUpdatingMenuRef || isResolvingNavigationMenus || !hasResolvedNavigationMenus,
            children: label
          }, menu.id);
        })
      }), canUserCreateNavigationMenus && /*#__PURE__*/_jsx(MenuGroup, {
        label: __('Tools'),
        children: /*#__PURE__*/_jsx(MenuItem, {
          onClick: async () => {
            setIsUpdatingMenuRef(true);
            await onCreateNew();
            setIsUpdatingMenuRef(false);
            onClose();
          },
          disabled: isUpdatingMenuRef || isResolvingNavigationMenus || !hasResolvedNavigationMenus,
          children: __('Create new Menu')
        })
      })]
    })
  });
  return NavigationMenuSelectorDropdown;
}
export default NavigationMenuSelector;
//# sourceMappingURL=navigation-menu-selector.js.map
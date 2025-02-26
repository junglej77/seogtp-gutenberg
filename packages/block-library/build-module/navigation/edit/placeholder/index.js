/**
 * WordPress dependencies
 */
import { Placeholder, Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { navigation, Icon } from '@wordpress/icons';
import { speak } from '@wordpress/a11y';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useNavigationEntities from '../../use-navigation-entities';
import PlaceholderPreview from './placeholder-preview';
import NavigationMenuSelector from '../navigation-menu-selector';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function NavigationPlaceholder({
  isSelected,
  currentMenuId,
  clientId,
  canUserCreateNavigationMenus = false,
  isResolvingCanUserCreateNavigationMenus,
  onSelectNavigationMenu,
  onSelectClassicMenu,
  onCreateEmpty
}) {
  const {
    isResolvingMenus,
    hasResolvedMenus
  } = useNavigationEntities();
  useEffect(() => {
    if (!isSelected) {
      return;
    }
    if (isResolvingMenus) {
      speak(__('Loading navigation block setup options…'));
    }
    if (hasResolvedMenus) {
      speak(__('Navigation block setup options ready.'));
    }
  }, [hasResolvedMenus, isResolvingMenus, isSelected]);
  const isResolvingActions = isResolvingMenus && isResolvingCanUserCreateNavigationMenus;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(Placeholder, {
      className: "wp-block-navigation-placeholder",
      children: [/*#__PURE__*/_jsx(PlaceholderPreview, {
        isVisible: !isSelected
      }), /*#__PURE__*/_jsx("div", {
        "aria-hidden": !isSelected ? true : undefined,
        className: "wp-block-navigation-placeholder__controls",
        children: /*#__PURE__*/_jsxs("div", {
          className: "wp-block-navigation-placeholder__actions",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "wp-block-navigation-placeholder__actions__indicator",
            children: [/*#__PURE__*/_jsx(Icon, {
              icon: navigation
            }), " ", __('Navigation')]
          }), /*#__PURE__*/_jsx("hr", {}), isResolvingActions && /*#__PURE__*/_jsx(Spinner, {}), /*#__PURE__*/_jsx(NavigationMenuSelector, {
            currentMenuId: currentMenuId,
            clientId: clientId,
            onSelectNavigationMenu: onSelectNavigationMenu,
            onSelectClassicMenu: onSelectClassicMenu
          }), /*#__PURE__*/_jsx("hr", {}), canUserCreateNavigationMenus && /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: onCreateEmpty,
            children: __('Start empty')
          })]
        })
      })]
    })
  });
}
//# sourceMappingURL=index.js.map
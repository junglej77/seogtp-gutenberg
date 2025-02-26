/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ROOT_MENU } from '../constants';
import { NavigationMenuContext } from './context';
import { useNavigationContext } from '../context';
import { useNavigationTreeMenu } from './use-navigation-tree-menu';
import NavigationBackButton from '../back-button';
import NavigationMenuTitle from './menu-title';
import NavigationSearchNoResultsFound from './search-no-results-found';
import { NavigableMenu } from '../../navigable-container';
import { MenuUI } from '../styles/navigation-styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @deprecated Use `Navigator` instead.
 */
export function NavigationMenu(props) {
  const {
    backButtonLabel,
    children,
    className,
    hasSearch,
    menu = ROOT_MENU,
    onBackButtonClick,
    onSearch: setControlledSearch,
    parentMenu,
    search: controlledSearch,
    isSearchDebouncing,
    title,
    titleAction
  } = props;
  const [uncontrolledSearch, setUncontrolledSearch] = useState('');
  useNavigationTreeMenu(props);
  const {
    activeMenu
  } = useNavigationContext();
  const context = {
    menu,
    search: uncontrolledSearch
  };

  // Keep the children rendered to make sure invisible items are included in the navigation tree.
  if (activeMenu !== menu) {
    return /*#__PURE__*/_jsx(NavigationMenuContext.Provider, {
      value: context,
      children: children
    });
  }
  const isControlledSearch = !!setControlledSearch;
  const search = isControlledSearch ? controlledSearch : uncontrolledSearch;
  const onSearch = isControlledSearch ? setControlledSearch : setUncontrolledSearch;
  const menuTitleId = `components-navigation__menu-title-${menu}`;
  const classes = clsx('components-navigation__menu', className);
  return /*#__PURE__*/_jsx(NavigationMenuContext.Provider, {
    value: context,
    children: /*#__PURE__*/_jsxs(MenuUI, {
      className: classes,
      children: [(parentMenu || onBackButtonClick) && /*#__PURE__*/_jsx(NavigationBackButton, {
        backButtonLabel: backButtonLabel,
        parentMenu: parentMenu,
        onClick: onBackButtonClick
      }), title && /*#__PURE__*/_jsx(NavigationMenuTitle, {
        hasSearch: hasSearch,
        onSearch: onSearch,
        search: search,
        title: title,
        titleAction: titleAction
      }), /*#__PURE__*/_jsx(NavigableMenu, {
        children: /*#__PURE__*/_jsxs("ul", {
          "aria-labelledby": menuTitleId,
          children: [children, search && !isSearchDebouncing && /*#__PURE__*/_jsx(NavigationSearchNoResultsFound, {
            search: search
          })]
        })
      })]
    })
  });
}
export default NavigationMenu;
//# sourceMappingURL=index.js.map
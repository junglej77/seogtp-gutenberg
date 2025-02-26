/**
 * WordPress dependencies
 */
import { useRef, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Icon, search as searchIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { getAnimateClassName } from '../../animate';
import Button from '../../button';
import MenuTitleSearch from './menu-title-search';
import { GroupTitleUI, MenuTitleActionsUI, MenuTitleUI } from '../styles/navigation-styles';
import { useNavigationMenuContext } from './context';
import { SEARCH_FOCUS_DELAY } from '../constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function NavigationMenuTitle({
  hasSearch,
  onSearch,
  search,
  title,
  titleAction
}) {
  const [isSearching, setIsSearching] = useState(false);
  const {
    menu
  } = useNavigationMenuContext();
  const searchButtonRef = useRef(null);
  if (!title) {
    return null;
  }
  const onCloseSearch = () => {
    setIsSearching(false);

    // Wait for the slide-in animation to complete before focusing the search button.
    // eslint-disable-next-line @wordpress/react-no-unsafe-timeout
    setTimeout(() => {
      searchButtonRef.current?.focus();
    }, SEARCH_FOCUS_DELAY);
  };
  const menuTitleId = `components-navigation__menu-title-${menu}`;
  /* translators: search button label for menu search box. %s: menu title */
  const searchButtonLabel = sprintf(__('Search in %s'), title);
  return /*#__PURE__*/_jsxs(MenuTitleUI, {
    className: "components-navigation__menu-title",
    children: [!isSearching && /*#__PURE__*/_jsxs(GroupTitleUI, {
      as: "h2",
      className: "components-navigation__menu-title-heading",
      level: 3,
      children: [/*#__PURE__*/_jsx("span", {
        id: menuTitleId,
        children: title
      }), (hasSearch || titleAction) && /*#__PURE__*/_jsxs(MenuTitleActionsUI, {
        children: [titleAction, hasSearch && /*#__PURE__*/_jsx(Button, {
          size: "small",
          variant: "tertiary",
          label: searchButtonLabel,
          onClick: () => setIsSearching(true),
          ref: searchButtonRef,
          children: /*#__PURE__*/_jsx(Icon, {
            icon: searchIcon
          })
        })]
      })]
    }), isSearching && /*#__PURE__*/_jsx("div", {
      className: getAnimateClassName({
        type: 'slide-in',
        origin: 'left'
      }),
      children: /*#__PURE__*/_jsx(MenuTitleSearch, {
        onCloseSearch: onCloseSearch,
        onSearch: onSearch,
        search: search,
        title: title
      })
    })]
  });
}
//# sourceMappingURL=menu-title.js.map
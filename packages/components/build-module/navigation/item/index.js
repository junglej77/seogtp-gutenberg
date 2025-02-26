/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';
import { isRTL } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../button';
import { useNavigationContext } from '../context';
import { ItemUI, ItemIconUI } from '../styles/navigation-styles';
import NavigationItemBaseContent from './base-content';
import NavigationItemBase from './base';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const noop = () => {};

/**
 * @deprecated Use `Navigator` instead.
 */
export function NavigationItem(props) {
  const {
    badge,
    children,
    className,
    href,
    item,
    navigateToMenu,
    onClick = noop,
    title,
    icon,
    hideIfTargetMenuEmpty,
    isText,
    ...restProps
  } = props;
  const {
    activeItem,
    setActiveMenu,
    navigationTree: {
      isMenuEmpty
    }
  } = useNavigationContext();

  // If hideIfTargetMenuEmpty prop is true
  // And the menu we are supposed to navigate to
  // Is marked as empty, then we skip rendering the item.
  if (hideIfTargetMenuEmpty && navigateToMenu && isMenuEmpty(navigateToMenu)) {
    return null;
  }
  const isActive = item && activeItem === item;
  const classes = clsx(className, {
    'is-active': isActive
  });
  const onItemClick = event => {
    if (navigateToMenu) {
      setActiveMenu(navigateToMenu);
    }
    onClick(event);
  };
  const navigationIcon = isRTL() ? chevronLeft : chevronRight;
  const baseProps = children ? props : {
    ...props,
    onClick: undefined
  };
  const itemProps = isText ? restProps : {
    as: Button,
    href,
    onClick: onItemClick,
    'aria-current': isActive ? 'page' : undefined,
    ...restProps
  };
  return /*#__PURE__*/_jsx(NavigationItemBase, {
    ...baseProps,
    className: classes,
    children: children || /*#__PURE__*/_jsxs(ItemUI, {
      ...itemProps,
      children: [icon && /*#__PURE__*/_jsx(ItemIconUI, {
        children: /*#__PURE__*/_jsx(Icon, {
          icon: icon
        })
      }), /*#__PURE__*/_jsx(NavigationItemBaseContent, {
        title: title,
        badge: badge
      }), navigateToMenu && /*#__PURE__*/_jsx(Icon, {
        icon: navigationIcon
      })]
    })
  });
}
export default NavigationItem;
//# sourceMappingURL=index.js.map
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalItem as Item, __experimentalHStack as HStack, FlexBlock } from '@wordpress/components';
import { isRTL } from '@wordpress/i18n';
import { chevronRightSmall, chevronLeftSmall, Icon } from '@wordpress/icons';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { SidebarNavigationContext } from '../sidebar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useHistory
} = unlock(routerPrivateApis);
export default function SidebarNavigationItem({
  className,
  icon,
  withChevron = false,
  suffix,
  uid,
  params,
  onClick,
  children,
  ...props
}) {
  const history = useHistory();
  const {
    navigate
  } = useContext(SidebarNavigationContext);
  // If there is no custom click handler, create one that navigates to `params`.
  function handleClick(e) {
    if (onClick) {
      onClick(e);
      navigate('forward');
    } else if (params) {
      e.preventDefault();
      history.push(params);
      navigate('forward', `[id="${uid}"]`);
    }
  }
  return /*#__PURE__*/_jsx(Item, {
    className: clsx('edit-site-sidebar-navigation-item', {
      'with-suffix': !withChevron && suffix
    }, className),
    onClick: handleClick,
    id: uid,
    ...props,
    children: /*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      children: [icon && /*#__PURE__*/_jsx(Icon, {
        style: {
          fill: 'currentcolor'
        },
        icon: icon,
        size: 24
      }), /*#__PURE__*/_jsx(FlexBlock, {
        children: children
      }), withChevron && /*#__PURE__*/_jsx(Icon, {
        icon: isRTL() ? chevronLeftSmall : chevronRightSmall,
        className: "edit-site-sidebar-navigation-item__drilldown-indicator",
        size: 24
      }), !withChevron && suffix]
    })
  });
}
//# sourceMappingURL=index.js.map
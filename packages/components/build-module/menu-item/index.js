/**
 * External dependencies
 */

import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { cloneElement, forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Shortcut from '../shortcut';
import Button from '../button';
import Icon from '../icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedMenuItem(props, ref) {
  let {
    children,
    info,
    className,
    icon,
    iconPosition = 'right',
    shortcut,
    isSelected,
    role = 'menuitem',
    suffix,
    ...buttonProps
  } = props;
  className = clsx('components-menu-item__button', className);
  if (info) {
    children = /*#__PURE__*/_jsxs("span", {
      className: "components-menu-item__info-wrapper",
      children: [/*#__PURE__*/_jsx("span", {
        className: "components-menu-item__item",
        children: children
      }), /*#__PURE__*/_jsx("span", {
        className: "components-menu-item__info",
        children: info
      })]
    });
  }
  if (icon && typeof icon !== 'string') {
    icon = cloneElement(icon, {
      className: clsx('components-menu-items__item-icon', {
        'has-icon-right': iconPosition === 'right'
      })
    });
  }
  return /*#__PURE__*/_jsxs(Button, {
    ref: ref
    // Make sure aria-checked matches spec https://www.w3.org/TR/wai-aria-1.1/#aria-checked
    ,
    "aria-checked": role === 'menuitemcheckbox' || role === 'menuitemradio' ? isSelected : undefined,
    role: role,
    icon: iconPosition === 'left' ? icon : undefined,
    className: className,
    ...buttonProps,
    children: [/*#__PURE__*/_jsx("span", {
      className: "components-menu-item__item",
      children: children
    }), !suffix && /*#__PURE__*/_jsx(Shortcut, {
      className: "components-menu-item__shortcut",
      shortcut: shortcut
    }), !suffix && icon && iconPosition === 'right' && /*#__PURE__*/_jsx(Icon, {
      icon: icon
    }), suffix]
  });
}

/**
 * MenuItem is a component which renders a button intended to be used in combination with the `DropdownMenu` component.
 *
 * ```jsx
 * import { MenuItem } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyMenuItem = () => {
 * 	const [ isActive, setIsActive ] = useState( true );
 *
 * 	return (
 * 		<MenuItem
 * 			icon={ isActive ? 'yes' : 'no' }
 * 			isSelected={ isActive }
 * 			role="menuitemcheckbox"
 * 			onClick={ () => setIsActive( ( state ) => ! state ) }
 * 		>
 * 			Toggle
 * 		</MenuItem>
 * 	);
 * };
 * ```
 */
export const MenuItem = forwardRef(UnforwardedMenuItem);
export default MenuItem;
//# sourceMappingURL=index.js.map
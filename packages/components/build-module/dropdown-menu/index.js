/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { menu } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { contextConnectWithoutRef, useContextSystem } from '../context';
import Button from '../button';
import Dropdown from '../dropdown';
import { NavigableMenu } from '../navigable-container';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function mergeProps(defaultProps = {}, props = {}) {
  const mergedProps = {
    ...defaultProps,
    ...props
  };
  if (props.className && defaultProps.className) {
    mergedProps.className = clsx(props.className, defaultProps.className);
  }
  return mergedProps;
}
function isFunction(maybeFunc) {
  return typeof maybeFunc === 'function';
}
function UnconnectedDropdownMenu(dropdownMenuProps) {
  const {
    children,
    className,
    controls,
    icon = menu,
    label,
    popoverProps,
    toggleProps,
    menuProps,
    disableOpenOnArrowDown = false,
    text,
    noIcons,
    open,
    defaultOpen,
    onToggle: onToggleProp,
    // Context
    variant
  } = useContextSystem(dropdownMenuProps, 'DropdownMenu');
  if (!controls?.length && !isFunction(children)) {
    return null;
  }

  // Normalize controls to nested array of objects (sets of controls)
  let controlSets;
  if (controls?.length) {
    // @ts-expect-error The check below is needed because `DropdownMenus`
    // rendered by `ToolBarGroup` receive controls as a nested array.
    controlSets = controls;
    if (!Array.isArray(controlSets[0])) {
      // This is not ideal, but at this point we know that `controls` is
      // not a nested array, even if TypeScript doesn't.
      controlSets = [controls];
    }
  }
  const mergedPopoverProps = mergeProps({
    className: 'components-dropdown-menu__popover',
    variant
  }, popoverProps);
  return /*#__PURE__*/_jsx(Dropdown, {
    className: className,
    popoverProps: mergedPopoverProps,
    renderToggle: ({
      isOpen,
      onToggle
    }) => {
      var _toggleProps$showTool;
      const openOnArrowDown = event => {
        if (disableOpenOnArrowDown) {
          return;
        }
        if (!isOpen && event.code === 'ArrowDown') {
          event.preventDefault();
          onToggle();
        }
      };
      const {
        as: Toggle = Button,
        ...restToggleProps
      } = toggleProps !== null && toggleProps !== void 0 ? toggleProps : {};
      const mergedToggleProps = mergeProps({
        className: clsx('components-dropdown-menu__toggle', {
          'is-opened': isOpen
        })
      }, restToggleProps);
      return /*#__PURE__*/_jsx(Toggle, {
        ...mergedToggleProps,
        icon: icon,
        onClick: event => {
          onToggle();
          if (mergedToggleProps.onClick) {
            mergedToggleProps.onClick(event);
          }
        },
        onKeyDown: event => {
          openOnArrowDown(event);
          if (mergedToggleProps.onKeyDown) {
            mergedToggleProps.onKeyDown(event);
          }
        },
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        label: label,
        text: text,
        showTooltip: (_toggleProps$showTool = toggleProps?.showTooltip) !== null && _toggleProps$showTool !== void 0 ? _toggleProps$showTool : true,
        children: mergedToggleProps.children
      });
    },
    renderContent: props => {
      const mergedMenuProps = mergeProps({
        'aria-label': label,
        className: clsx('components-dropdown-menu__menu', {
          'no-icons': noIcons
        })
      }, menuProps);
      return /*#__PURE__*/_jsxs(NavigableMenu, {
        ...mergedMenuProps,
        role: "menu",
        children: [isFunction(children) ? children(props) : null, controlSets?.flatMap((controlSet, indexOfSet) => controlSet.map((control, indexOfControl) => /*#__PURE__*/_jsx(Button, {
          onClick: event => {
            event.stopPropagation();
            props.onClose();
            if (control.onClick) {
              control.onClick();
            }
          },
          className: clsx('components-dropdown-menu__menu-item', {
            'has-separator': indexOfSet > 0 && indexOfControl === 0,
            'is-active': control.isActive,
            'is-icon-only': !control.title
          }),
          icon: control.icon,
          label: control.label,
          "aria-checked": control.role === 'menuitemcheckbox' || control.role === 'menuitemradio' ? control.isActive : undefined,
          role: control.role === 'menuitemcheckbox' || control.role === 'menuitemradio' ? control.role : 'menuitem',
          accessibleWhenDisabled: true,
          disabled: control.isDisabled,
          children: control.title
        }, [indexOfSet, indexOfControl].join())))]
      });
    },
    open: open,
    defaultOpen: defaultOpen,
    onToggle: onToggleProp
  });
}

/**
 *
 * The DropdownMenu displays a list of actions (each contained in a MenuItem,
 * MenuItemsChoice, or MenuGroup) in a compact way. It appears in a Popover
 * after the user has interacted with an element (a button or icon) or when
 * they perform a specific action.
 *
 * Render a Dropdown Menu with a set of controls:
 *
 * ```jsx
 * import { DropdownMenu } from '@wordpress/components';
 * import {
 * 	more,
 * 	arrowLeft,
 * 	arrowRight,
 * 	arrowUp,
 * 	arrowDown,
 * } from '@wordpress/icons';
 *
 * const MyDropdownMenu = () => (
 * 	<DropdownMenu
 * 		icon={ more }
 * 		label="Select a direction"
 * 		controls={ [
 * 			{
 * 				title: 'Up',
 * 				icon: arrowUp,
 * 				onClick: () => console.log( 'up' ),
 * 			},
 * 			{
 * 				title: 'Right',
 * 				icon: arrowRight,
 * 				onClick: () => console.log( 'right' ),
 * 			},
 * 			{
 * 				title: 'Down',
 * 				icon: arrowDown,
 * 				onClick: () => console.log( 'down' ),
 * 			},
 * 			{
 * 				title: 'Left',
 * 				icon: arrowLeft,
 * 				onClick: () => console.log( 'left' ),
 * 			},
 * 		] }
 * 	/>
 * );
 * ```
 *
 * Alternatively, specify a `children` function which returns elements valid for
 * use in a DropdownMenu: `MenuItem`, `MenuItemsChoice`, or `MenuGroup`.
 *
 * ```jsx
 * import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
 * import { more, arrowUp, arrowDown, trash } from '@wordpress/icons';
 *
 * const MyDropdownMenu = () => (
 * 	<DropdownMenu icon={ more } label="Select a direction">
 * 		{ ( { onClose } ) => (
 * 			<>
 * 				<MenuGroup>
 * 					<MenuItem icon={ arrowUp } onClick={ onClose }>
 * 						Move Up
 * 					</MenuItem>
 * 					<MenuItem icon={ arrowDown } onClick={ onClose }>
 * 						Move Down
 * 					</MenuItem>
 * 				</MenuGroup>
 * 				<MenuGroup>
 * 					<MenuItem icon={ trash } onClick={ onClose }>
 * 						Remove
 * 					</MenuItem>
 * 				</MenuGroup>
 * 			</>
 * 		) }
 * 	</DropdownMenu>
 * );
 * ```
 *
 */
export const DropdownMenu = contextConnectWithoutRef(UnconnectedDropdownMenu, 'DropdownMenu');
export default DropdownMenu;
//# sourceMappingURL=index.js.map
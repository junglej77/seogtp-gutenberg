/**
 * WordPress dependencies
 */
import { check } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import MenuItem from '../menu-item';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const noop = () => {};

/**
 * `MenuItemsChoice` functions similarly to a set of `MenuItem`s, but allows the user to select one option from a set of multiple choices.
 *
 *
 * ```jsx
 * import { MenuGroup, MenuItemsChoice } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyMenuItemsChoice = () => {
 * 	const [ mode, setMode ] = useState( 'visual' );
 * 	const choices = [
 * 		{
 * 			value: 'visual',
 * 			label: 'Visual editor',
 * 		},
 * 		{
 * 			value: 'text',
 * 			label: 'Code editor',
 * 		},
 * 	];
 *
 * 	return (
 * 		<MenuGroup label="Editor">
 * 			<MenuItemsChoice
 * 				choices={ choices }
 * 				value={ mode }
 * 				onSelect={ ( newMode ) => setMode( newMode ) }
 * 			/>
 * 		</MenuGroup>
 * 	);
 * };
 * ```
 */
function MenuItemsChoice({
  choices = [],
  onHover = noop,
  onSelect,
  value
}) {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: choices.map(item => {
      const isSelected = value === item.value;
      return /*#__PURE__*/_jsx(MenuItem, {
        role: "menuitemradio",
        disabled: item.disabled,
        icon: isSelected ? check : null,
        info: item.info,
        isSelected: isSelected,
        shortcut: item.shortcut,
        className: "components-menu-items-choice",
        onClick: () => {
          if (!isSelected) {
            onSelect(item.value);
          }
        },
        onMouseEnter: () => onHover(item.value),
        onMouseLeave: () => onHover(null),
        "aria-label": item['aria-label'],
        children: item.label
      }, item.value);
    })
  });
}
export default MenuItemsChoice;
//# sourceMappingURL=index.js.map
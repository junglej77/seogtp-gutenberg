/**
 * WordPress dependencies
 */
import { forwardRef, useContext } from '@wordpress/element';

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import ToolbarItem from '../toolbar-item';
import ToolbarContext from '../toolbar-context';
import DropdownMenu from '../../dropdown-menu';
import { jsx as _jsx } from "react/jsx-runtime";
function ToolbarDropdownMenu(props, ref) {
  const accessibleToolbarState = useContext(ToolbarContext);
  if (!accessibleToolbarState) {
    return /*#__PURE__*/_jsx(DropdownMenu, {
      ...props
    });
  }

  // ToolbarItem will pass all props to the render prop child, which will pass
  // all props to the toggle of DropdownMenu. This means that ToolbarDropdownMenu
  // has the same API as DropdownMenu.
  return /*#__PURE__*/_jsx(ToolbarItem, {
    ref: ref,
    ...props.toggleProps,
    children: toolbarItemProps => /*#__PURE__*/_jsx(DropdownMenu, {
      ...props,
      popoverProps: {
        ...props.popoverProps
      },
      toggleProps: toolbarItemProps
    })
  });
}
export default forwardRef(ToolbarDropdownMenu);
//# sourceMappingURL=index.js.map
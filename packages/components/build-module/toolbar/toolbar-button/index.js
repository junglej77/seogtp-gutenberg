/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { useContext, forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Button from '../../button';
import ToolbarItem from '../toolbar-item';
import ToolbarContext from '../toolbar-context';
import ToolbarButtonContainer from './toolbar-button-container';
import { jsx as _jsx } from "react/jsx-runtime";
function useDeprecatedProps({
  isDisabled,
  ...otherProps
}) {
  return {
    disabled: isDisabled,
    ...otherProps
  };
}
function UnforwardedToolbarButton(props, ref) {
  const {
    children,
    className,
    containerClassName,
    extraProps,
    isActive,
    title,
    ...restProps
  } = useDeprecatedProps(props);
  const accessibleToolbarState = useContext(ToolbarContext);
  if (!accessibleToolbarState) {
    return /*#__PURE__*/_jsx(ToolbarButtonContainer, {
      className: containerClassName,
      children: /*#__PURE__*/_jsx(Button, {
        ref: ref,
        icon: restProps.icon,
        label: title,
        shortcut: restProps.shortcut,
        "data-subscript": restProps.subscript,
        onClick: event => {
          event.stopPropagation();
          // TODO: Possible bug; maybe use onClick instead of restProps.onClick.
          if (restProps.onClick) {
            restProps.onClick(event);
          }
        },
        className: clsx('components-toolbar__control', className),
        isPressed: isActive,
        accessibleWhenDisabled: true,
        "data-toolbar-item": true,
        ...extraProps,
        ...restProps,
        children: children
      })
    });
  }

  // ToobarItem will pass all props to the render prop child, which will pass
  // all props to Button. This means that ToolbarButton has the same API as
  // Button.
  return /*#__PURE__*/_jsx(ToolbarItem, {
    className: clsx('components-toolbar-button', className),
    ...extraProps,
    ...restProps,
    ref: ref,
    children: toolbarItemProps => /*#__PURE__*/_jsx(Button, {
      label: title,
      isPressed: isActive,
      ...toolbarItemProps,
      children: children
    })
  });
}

/**
 * ToolbarButton can be used to add actions to a toolbar, usually inside a Toolbar
 * or ToolbarGroup when used to create general interfaces.
 *
 * ```jsx
 * import { Toolbar, ToolbarButton } from '@wordpress/components';
 * import { edit } from '@wordpress/icons';
 *
 * function MyToolbar() {
 *   return (
 *		<Toolbar label="Options">
 *			<ToolbarButton
 *				icon={ edit }
 *				label="Edit"
 *				onClick={ () => alert( 'Editing' ) }
 *			/>
 *		</Toolbar>
 *   );
 * }
 * ```
 */
export const ToolbarButton = forwardRef(UnforwardedToolbarButton);
export default ToolbarButton;
//# sourceMappingURL=index.js.map
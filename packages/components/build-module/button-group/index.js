/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedButtonGroup(props, ref) {
  const {
    className,
    ...restProps
  } = props;
  const classes = clsx('components-button-group', className);
  return /*#__PURE__*/_jsx("div", {
    ref: ref,
    role: "group",
    className: classes,
    ...restProps
  });
}

/**
 * ButtonGroup can be used to group any related buttons together. To emphasize
 * related buttons, a group should share a common container.
 *
 * ```jsx
 * import { Button, ButtonGroup } from '@wordpress/components';
 *
 * const MyButtonGroup = () => (
 *   <ButtonGroup>
 *     <Button variant="primary">Button 1</Button>
 *     <Button variant="primary">Button 2</Button>
 *   </ButtonGroup>
 * );
 * ```
 */
export const ButtonGroup = forwardRef(UnforwardedButtonGroup);
export default ButtonGroup;
//# sourceMappingURL=index.js.map
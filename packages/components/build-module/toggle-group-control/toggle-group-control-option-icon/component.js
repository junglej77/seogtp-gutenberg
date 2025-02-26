/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { ToggleGroupControlOptionBase } from '../toggle-group-control-option-base';
import Icon from '../../icon';
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedToggleGroupControlOptionIcon(props, ref) {
  const {
    icon,
    label,
    ...restProps
  } = props;
  return /*#__PURE__*/_jsx(ToggleGroupControlOptionBase, {
    ...restProps,
    isIcon: true,
    "aria-label": label,
    showTooltip: true,
    ref: ref,
    children: /*#__PURE__*/_jsx(Icon, {
      icon: icon
    })
  });
}

/**
 * `ToggleGroupControlOptionIcon` is a form component which is meant to be used as a
 * child of `ToggleGroupControl` and displays an icon.
 *
 * ```jsx
 *
 * import {
 *	__experimentalToggleGroupControl as ToggleGroupControl,
 *	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
 * from '@wordpress/components';
 * import { formatLowercase, formatUppercase } from '@wordpress/icons';
 *
 * function Example() {
 *  return (
 *    <ToggleGroupControl __nextHasNoMarginBottom>
 *      <ToggleGroupControlOptionIcon
 *        value="uppercase"
 *        label="Uppercase"
 *        icon={ formatUppercase }
 *      />
 *      <ToggleGroupControlOptionIcon
 *        value="lowercase"
 *        label="Lowercase"
 *        icon={ formatLowercase }
 *      />
 *    </ToggleGroupControl>
 *  );
 * }
 * ```
 */
export const ToggleGroupControlOptionIcon = forwardRef(UnforwardedToggleGroupControlOptionIcon);
export default ToggleGroupControlOptionIcon;
//# sourceMappingURL=component.js.map
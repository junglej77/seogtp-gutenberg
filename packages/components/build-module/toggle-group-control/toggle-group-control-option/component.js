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
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedToggleGroupControlOption(props, ref) {
  const {
    label,
    ...restProps
  } = props;
  const optionLabel = restProps['aria-label'] || label;
  return /*#__PURE__*/_jsx(ToggleGroupControlOptionBase, {
    ...restProps,
    "aria-label": optionLabel,
    ref: ref,
    children: label
  });
}

/**
 * `ToggleGroupControlOption` is a form component and is meant to be used as a
 * child of `ToggleGroupControl`.
 *
 * ```jsx
 * import {
 *   __experimentalToggleGroupControl as ToggleGroupControl,
 *   __experimentalToggleGroupControlOption as ToggleGroupControlOption,
 * } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <ToggleGroupControl
 *       label="my label"
 *       value="vertical"
 *       isBlock
 *       __nextHasNoMarginBottom
 *     >
 *       <ToggleGroupControlOption value="horizontal" label="Horizontal" />
 *       <ToggleGroupControlOption value="vertical" label="Vertical" />
 *     </ToggleGroupControl>
 *   );
 * }
 * ```
 */
export const ToggleGroupControlOption = forwardRef(UnforwardedToggleGroupControlOption);
export default ToggleGroupControlOption;
//# sourceMappingURL=component.js.map
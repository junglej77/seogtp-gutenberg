/**
 * Internal dependencies
 */
import type { WordPressComponentProps } from '../../context';
import type { ToggleGroupControlOptionBaseProps } from '../types';
/**
 * `ToggleGroupControlOptionBase` is a form component and is meant to be used as an internal,
 * generic component for any children of `ToggleGroupControl`.
 *
 * @example
 * ```jsx
 * import {
 *   __experimentalToggleGroupControl as ToggleGroupControl,
 *   __experimentalToggleGroupControlOptionBase as ToggleGroupControlOptionBase,
 * } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <ToggleGroupControl label="my label" value="vertical" isBlock>
 *       <ToggleGroupControlOption value="horizontal" label="Horizontal" />
 *       <ToggleGroupControlOption value="vertical" label="Vertical" />
 *     </ToggleGroupControl>
 *   );
 * }
 * ```
 */
declare const ConnectedToggleGroupControlOptionBase: import("../../context").WordPressComponent<import("react").ElementType<any, keyof import("react").JSX.IntrinsicElements> | null, Omit<WordPressComponentProps<ToggleGroupControlOptionBaseProps, "button", false>, "id" | "aria-disabled"> & import("react").RefAttributes<any>, boolean>;
export default ConnectedToggleGroupControlOptionBase;
//# sourceMappingURL=component.d.ts.map
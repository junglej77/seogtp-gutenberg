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
export declare const ToggleGroupControlOptionIcon: import("react").ForwardRefExoticComponent<Pick<import("../types").ToggleGroupControlOptionBaseProps, "value"> & {
    icon: JSX.Element;
    label: string;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "value" | "icon"> & import("react").RefAttributes<any>>;
export default ToggleGroupControlOptionIcon;
//# sourceMappingURL=component.d.ts.map
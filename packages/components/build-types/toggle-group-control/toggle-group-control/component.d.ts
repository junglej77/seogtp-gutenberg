/**
 * `ToggleGroupControl` is a form component that lets users choose options
 * represented in horizontal segments. To render options for this control use
 * `ToggleGroupControlOption` component.
 *
 * This component is intended for selecting a single persistent value from a set of options,
 * similar to a how a radio button group would work. If you simply want a toggle to switch between views,
 * use a `TabPanel` instead.
 *
 * Only use this control when you know for sure the labels of items inside won't
 * wrap. For items with longer labels, you can consider a `SelectControl` or a
 * `CustomSelectControl` component instead.
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
export declare const ToggleGroupControl: import("../../context").WordPressComponent<"div", Pick<import("../../base-control/types").BaseControlProps, "help" | "__nextHasNoMarginBottom"> & {
    label: string;
    hideLabelFromVision?: boolean;
    isAdaptiveWidth?: boolean;
    isBlock?: boolean;
    isDeselectable?: boolean;
    onChange?: (value: string | number | undefined) => void;
    value?: string | number;
    children: import("react").ReactNode;
    size?: "default" | "__unstable-large";
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any>, false>;
export default ToggleGroupControl;
//# sourceMappingURL=component.d.ts.map
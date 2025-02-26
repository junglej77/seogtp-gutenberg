/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
/**
 * Internal dependencies
 */
import { BorderControl } from '..';
import type { Border } from '../types';
declare const meta: Meta<typeof BorderControl>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & import("../types").LabelProps & {
    disableUnits?: boolean;
    enableStyle?: boolean;
    isCompact?: boolean;
    onChange: (value?: Border) => void;
    placeholder?: HTMLInputElement["placeholder"];
    __unstablePopoverProps?: Omit<import("../../popover/types").PopoverProps, "children">;
    shouldSanitizeBorder?: boolean;
    showDropdownHeader?: boolean;
    size?: "default" | "__unstable-large";
    value?: Border;
    width?: import("react").CSSProperties["width"];
    withSlider?: boolean;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "onChange" | "value" | "width" | "placeholder" | "size" | keyof import("react").RefAttributes<any> | "__next40pxDefaultSize" | "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar" | "enableStyle" | "disableCustomColors" | "__unstablePopoverProps" | keyof import("../types").LabelProps | "disableUnits" | "isCompact" | "shouldSanitizeBorder" | "showDropdownHeader" | "withSlider">>;
/**
 * Render a slider beside the control.
 */
export declare const WithSlider: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & import("../types").LabelProps & {
    disableUnits?: boolean;
    enableStyle?: boolean;
    isCompact?: boolean;
    onChange: (value?: Border) => void;
    placeholder?: HTMLInputElement["placeholder"];
    __unstablePopoverProps?: Omit<import("../../popover/types").PopoverProps, "children">;
    shouldSanitizeBorder?: boolean;
    showDropdownHeader?: boolean;
    size?: "default" | "__unstable-large";
    value?: Border;
    width?: import("react").CSSProperties["width"];
    withSlider?: boolean;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "onChange" | "value" | "width" | "placeholder" | "size" | keyof import("react").RefAttributes<any> | "__next40pxDefaultSize" | "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar" | "enableStyle" | "disableCustomColors" | "__unstablePopoverProps" | keyof import("../types").LabelProps | "disableUnits" | "isCompact" | "shouldSanitizeBorder" | "showDropdownHeader" | "withSlider">>;
/**
 * When rendering with a slider, the `width` prop is useful to customize the width of the number input.
 */
export declare const WithSliderCustomWidth: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & import("../types").LabelProps & {
    disableUnits?: boolean;
    enableStyle?: boolean;
    isCompact?: boolean;
    onChange: (value?: Border) => void;
    placeholder?: HTMLInputElement["placeholder"];
    __unstablePopoverProps?: Omit<import("../../popover/types").PopoverProps, "children">;
    shouldSanitizeBorder?: boolean;
    showDropdownHeader?: boolean;
    size?: "default" | "__unstable-large";
    value?: Border;
    width?: import("react").CSSProperties["width"];
    withSlider?: boolean;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "onChange" | "value" | "width" | "placeholder" | "size" | keyof import("react").RefAttributes<any> | "__next40pxDefaultSize" | "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar" | "enableStyle" | "disableCustomColors" | "__unstablePopoverProps" | keyof import("../types").LabelProps | "disableUnits" | "isCompact" | "shouldSanitizeBorder" | "showDropdownHeader" | "withSlider">>;
/**
 * Restrict the width of the control and prevent it from expanding to take up additional space.
 * When `true`, the `width` prop will be ignored.
 */
export declare const IsCompact: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & import("../types").LabelProps & {
    disableUnits?: boolean;
    enableStyle?: boolean;
    isCompact?: boolean;
    onChange: (value?: Border) => void;
    placeholder?: HTMLInputElement["placeholder"];
    __unstablePopoverProps?: Omit<import("../../popover/types").PopoverProps, "children">;
    shouldSanitizeBorder?: boolean;
    showDropdownHeader?: boolean;
    size?: "default" | "__unstable-large";
    value?: Border;
    width?: import("react").CSSProperties["width"];
    withSlider?: boolean;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "onChange" | "value" | "width" | "placeholder" | "size" | keyof import("react").RefAttributes<any> | "__next40pxDefaultSize" | "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar" | "enableStyle" | "disableCustomColors" | "__unstablePopoverProps" | keyof import("../types").LabelProps | "disableUnits" | "isCompact" | "shouldSanitizeBorder" | "showDropdownHeader" | "withSlider">>;
/**
 * The `colors` object can contain multiple origins.
 */
export declare const WithMultipleOrigins: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & import("../types").LabelProps & {
    disableUnits?: boolean;
    enableStyle?: boolean;
    isCompact?: boolean;
    onChange: (value?: Border) => void;
    placeholder?: HTMLInputElement["placeholder"];
    __unstablePopoverProps?: Omit<import("../../popover/types").PopoverProps, "children">;
    shouldSanitizeBorder?: boolean;
    showDropdownHeader?: boolean;
    size?: "default" | "__unstable-large";
    value?: Border;
    width?: import("react").CSSProperties["width"];
    withSlider?: boolean;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "onChange" | "value" | "width" | "placeholder" | "size" | keyof import("react").RefAttributes<any> | "__next40pxDefaultSize" | "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar" | "enableStyle" | "disableCustomColors" | "__unstablePopoverProps" | keyof import("../types").LabelProps | "disableUnits" | "isCompact" | "shouldSanitizeBorder" | "showDropdownHeader" | "withSlider">>;
/**
 * Allow the alpha channel to be edited on each color.
 */
export declare const WithAlphaEnabled: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & import("../types").LabelProps & {
    disableUnits?: boolean;
    enableStyle?: boolean;
    isCompact?: boolean;
    onChange: (value?: Border) => void;
    placeholder?: HTMLInputElement["placeholder"];
    __unstablePopoverProps?: Omit<import("../../popover/types").PopoverProps, "children">;
    shouldSanitizeBorder?: boolean;
    showDropdownHeader?: boolean;
    size?: "default" | "__unstable-large";
    value?: Border;
    width?: import("react").CSSProperties["width"];
    withSlider?: boolean;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "onChange" | "value" | "width" | "placeholder" | "size" | keyof import("react").RefAttributes<any> | "__next40pxDefaultSize" | "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar" | "enableStyle" | "disableCustomColors" | "__unstablePopoverProps" | keyof import("../types").LabelProps | "disableUnits" | "isCompact" | "shouldSanitizeBorder" | "showDropdownHeader" | "withSlider">>;
//# sourceMappingURL=index.story.d.ts.map
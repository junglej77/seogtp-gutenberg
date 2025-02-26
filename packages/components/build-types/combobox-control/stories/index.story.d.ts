/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
/**
 * Internal dependencies
 */
import ComboboxControl from '..';
import type { ComboboxControlProps } from '../types';
declare const meta: Meta<typeof ComboboxControl>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../base-control/types").BaseControlProps, "label" | "className" | "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & {
    __experimentalRenderItem?: (args: {
        item: import("../types").ComboboxControlOption;
    }) => React.ReactNode;
    __next36pxDefaultSize?: boolean;
    __next40pxDefaultSize?: boolean;
    allowReset?: boolean;
    expandOnFocus?: boolean;
    messages?: {
        selected: string;
    };
    onChange?: (value: ComboboxControlProps["value"]) => void;
    onFilterValueChange?: (value: string) => void;
    options: import("../types").ComboboxControlOption[];
    value?: string | null;
}>;
/**
 * The rendered output of each suggestion can be customized by passing a
 * render function to the `__experimentalRenderItem` prop. (This is still an experimental feature
 * and is subject to change.)
 */
export declare const WithCustomRenderItem: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../base-control/types").BaseControlProps, "label" | "className" | "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & {
    __experimentalRenderItem?: (args: {
        item: import("../types").ComboboxControlOption;
    }) => React.ReactNode;
    __next36pxDefaultSize?: boolean;
    __next40pxDefaultSize?: boolean;
    allowReset?: boolean;
    expandOnFocus?: boolean;
    messages?: {
        selected: string;
    };
    onChange?: (value: ComboboxControlProps["value"]) => void;
    onFilterValueChange?: (value: string) => void;
    options: import("../types").ComboboxControlOption[];
    value?: string | null;
}>;
/**
 * You can disable options in the list
 * by setting the `disabled` property to true
 * for individual items in the option object.
 */
export declare const WithDisabledOptions: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../base-control/types").BaseControlProps, "label" | "className" | "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & {
    __experimentalRenderItem?: (args: {
        item: import("../types").ComboboxControlOption;
    }) => React.ReactNode;
    __next36pxDefaultSize?: boolean;
    __next40pxDefaultSize?: boolean;
    allowReset?: boolean;
    expandOnFocus?: boolean;
    messages?: {
        selected: string;
    };
    onChange?: (value: ComboboxControlProps["value"]) => void;
    onFilterValueChange?: (value: string) => void;
    options: import("../types").ComboboxControlOption[];
    value?: string | null;
}>;
/**
 * By default, the combobox expands when focused.
 * You can disable this behavior by setting the `expandOnFocus` prop to `false`.
 * This is useful when you want to show the suggestions only when the user interacts with the input.
 */
export declare const NotExpandOnFocus: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../base-control/types").BaseControlProps, "label" | "className" | "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & {
    __experimentalRenderItem?: (args: {
        item: import("../types").ComboboxControlOption;
    }) => React.ReactNode;
    __next36pxDefaultSize?: boolean;
    __next40pxDefaultSize?: boolean;
    allowReset?: boolean;
    expandOnFocus?: boolean;
    messages?: {
        selected: string;
    };
    onChange?: (value: ComboboxControlProps["value"]) => void;
    onFilterValueChange?: (value: string) => void;
    options: import("../types").ComboboxControlOption[];
    value?: string | null;
}>;
//# sourceMappingURL=index.story.d.ts.map
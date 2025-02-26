/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
/**
 * Internal dependencies
 */
import ToggleControl from '..';
declare const meta: Meta<typeof ToggleControl>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../form-toggle/types").FormToggleProps, "disabled" | "checked"> & Pick<import("../../base-control/types").BaseControlProps, "className" | "__nextHasNoMarginBottom"> & {
    help?: import("react").ReactNode | ((checked: boolean) => import("react").ReactNode);
    label: import("react").ReactNode;
    onChange: (value: boolean) => void;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "label" | "as" | "children" | "className" | "onChange" | "disabled" | "checked" | "help" | "__nextHasNoMarginBottom"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const WithHelpText: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../form-toggle/types").FormToggleProps, "disabled" | "checked"> & Pick<import("../../base-control/types").BaseControlProps, "className" | "__nextHasNoMarginBottom"> & {
    help?: import("react").ReactNode | ((checked: boolean) => import("react").ReactNode);
    label: import("react").ReactNode;
    onChange: (value: boolean) => void;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "label" | "as" | "children" | "className" | "onChange" | "disabled" | "checked" | "help" | "__nextHasNoMarginBottom"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=index.story.d.ts.map
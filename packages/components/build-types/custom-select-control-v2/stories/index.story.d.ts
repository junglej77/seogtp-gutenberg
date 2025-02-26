/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
/**
 * Internal dependencies
 */
import CustomSelectControlV2 from '..';
declare const meta: Meta<typeof CustomSelectControlV2>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").CustomSelectButtonProps & {
    className?: string;
    children: React.ReactNode;
    hideLabelFromVision?: boolean;
    label: string;
} & {
    size?: "default" | "compact" | undefined;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "size" | "hideLabelFromVision" | keyof import("../types").CustomSelectButtonProps>>;
/**
 * Multiple selection can be enabled by using an array for the `value` and
 * `defaultValue` props. The argument type of the `onChange` function will also
 * change accordingly.
 */
export declare const MultipleSelection: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").CustomSelectButtonProps & {
    className?: string;
    children: React.ReactNode;
    hideLabelFromVision?: boolean;
    label: string;
} & {
    size?: "default" | "compact" | undefined;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "size" | "hideLabelFromVision" | keyof import("../types").CustomSelectButtonProps>>;
/**
 * The `renderSelectedValue` prop can be used to customize how the selected value
 * is rendered in the dropdown trigger.
 */
export declare const CustomSelectedValue: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").CustomSelectButtonProps & {
    className?: string;
    children: React.ReactNode;
    hideLabelFromVision?: boolean;
    label: string;
} & {
    size?: "default" | "compact" | undefined;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "size" | "hideLabelFromVision" | keyof import("../types").CustomSelectButtonProps>>;
//# sourceMappingURL=index.story.d.ts.map
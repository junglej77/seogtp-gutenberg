/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';
import MenuItem from '..';
declare const meta: Meta<typeof MenuItem>;
export default meta;
export declare const Default: StoryFn<typeof MenuItem>;
/**
 * When the `role` prop is either `"menuitemcheckbox"` or `"menuitemradio"`, the
 * `isSelected` prop should be used so screen readers can tell which item is currently selected.
 */
export declare const IsSelected: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../button/types").ButtonAsButtonProps, "isDestructive"> & {
    className?: string;
    children?: import("react").ReactNode;
    info?: string;
    icon?: JSX.Element | null;
    iconPosition?: import("../../button/types").ButtonAsButtonProps["iconPosition"];
    isSelected?: boolean;
    shortcut?: string | {
        display: string;
        ariaLabel: string;
    };
    role?: string;
    suffix?: import("react").ReactNode;
    label?: string;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "role" | "shortcut" | "icon" | "isDestructive" | "suffix" | "info" | "iconPosition" | "isSelected"> & import("react").RefAttributes<HTMLButtonElement>>;
export declare const WithIcon: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../button/types").ButtonAsButtonProps, "isDestructive"> & {
    className?: string;
    children?: import("react").ReactNode;
    info?: string;
    icon?: JSX.Element | null;
    iconPosition?: import("../../button/types").ButtonAsButtonProps["iconPosition"];
    isSelected?: boolean;
    shortcut?: string | {
        display: string;
        ariaLabel: string;
    };
    role?: string;
    suffix?: import("react").ReactNode;
    label?: string;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "role" | "shortcut" | "icon" | "isDestructive" | "suffix" | "info" | "iconPosition" | "isSelected"> & import("react").RefAttributes<HTMLButtonElement>>;
export declare const WithInfo: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../button/types").ButtonAsButtonProps, "isDestructive"> & {
    className?: string;
    children?: import("react").ReactNode;
    info?: string;
    icon?: JSX.Element | null;
    iconPosition?: import("../../button/types").ButtonAsButtonProps["iconPosition"];
    isSelected?: boolean;
    shortcut?: string | {
        display: string;
        ariaLabel: string;
    };
    role?: string;
    suffix?: import("react").ReactNode;
    label?: string;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "role" | "shortcut" | "icon" | "isDestructive" | "suffix" | "info" | "iconPosition" | "isSelected"> & import("react").RefAttributes<HTMLButtonElement>>;
export declare const WithSuffix: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../button/types").ButtonAsButtonProps, "isDestructive"> & {
    className?: string;
    children?: import("react").ReactNode;
    info?: string;
    icon?: JSX.Element | null;
    iconPosition?: import("../../button/types").ButtonAsButtonProps["iconPosition"];
    isSelected?: boolean;
    shortcut?: string | {
        display: string;
        ariaLabel: string;
    };
    role?: string;
    suffix?: import("react").ReactNode;
    label?: string;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "label" | "as" | "children" | "className" | "role" | "shortcut" | "icon" | "isDestructive" | "suffix" | "info" | "iconPosition" | "isSelected"> & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=index.story.d.ts.map
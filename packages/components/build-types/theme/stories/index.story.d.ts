/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';
/**
 * Internal dependencies
 */
import Theme from '../index';
declare const meta: Meta<typeof Theme>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").ThemeInputValues & {
    children?: import("react").ReactNode;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | keyof import("../types").ThemeInputValues> & {
    as?: keyof JSX.IntrinsicElements | undefined;
}>;
export declare const Nested: StoryFn<typeof Theme>;
/**
 * The rest of the required colors are generated based on the given accent and background colors.
 */
export declare const ColorScheme: StoryFn<typeof Theme>;
//# sourceMappingURL=index.story.d.ts.map
/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';
/**
 * Internal dependencies
 */
import BaseControl from '..';
declare const meta: Meta<typeof BaseControl>;
export default meta;
export declare const Default: StoryFn<typeof BaseControl>;
export declare const WithHelpText: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").BaseControlProps & {
    as?: keyof JSX.IntrinsicElements | null | undefined;
}>;
/**
 * `BaseControl.VisualLabel` is used to render a purely visual label inside a `BaseControl` component.
 *
 * It should only be used in cases where the children being rendered inside `BaseControl` are already accessibly labeled,
 * e.g., a button, but we want an additional visual label for that section equivalent to the labels `BaseControl` would
 * otherwise use if the `label` prop was passed.
 */
export declare const WithVisualLabel: StoryFn<typeof BaseControl>;
//# sourceMappingURL=index.story.d.ts.map
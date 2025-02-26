/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';
/**
 * Internal dependencies
 */
import { ProgressBar } from '..';
declare const meta: Meta<typeof ProgressBar>;
export default meta;
export declare const Default: StoryFn<typeof ProgressBar>;
/**
 * A progress bar with a custom width.
 *
 * You can override the default `width` by passing a custom CSS class via the
 * `className` prop.
 *
 * This example shows a progress bar with an overriden `width` of `100%` which
 * makes it fit all available horizontal space of the parent element. The CSS
 * class looks like this:
 *
 * ```css
 * .custom-progress-bar {
 *   width: 100%;
 * }
 * ```
 */
export declare const WithCustomWidth: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").ProgressBarProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>, "ref">, "as" | "children" | keyof import("../types").ProgressBarProps> & import("react").RefAttributes<HTMLProgressElement>>;
//# sourceMappingURL=index.story.d.ts.map
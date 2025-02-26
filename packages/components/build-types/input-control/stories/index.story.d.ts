/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';
/**
 * Internal dependencies
 */
import InputControl from '..';
declare const meta: Meta<typeof InputControl>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").InputControlProps & import("react").RefAttributes<HTMLInputElement>>;
export declare const WithHelpText: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").InputControlProps & import("react").RefAttributes<HTMLInputElement>>;
/**
 * A `prefix` can be inserted before the input. By default, the prefix is aligned with the edge of the input border,
 * with no padding. If you want to apply standard padding in accordance with the size variant, use the provided
 * `<InputControlPrefixWrapper>` convenience wrapper.
 */
export declare const WithPrefix: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").InputControlProps & import("react").RefAttributes<HTMLInputElement>>;
/**
 * A `suffix` can be inserted after the input. By default, the suffix is aligned with the edge of the input border,
 * with no padding. If you want to apply standard padding in accordance with the size variant, use the provided
 * `<InputControlSuffixWrapper>` convenience wrapper.
 */
export declare const WithSuffix: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").InputControlProps & import("react").RefAttributes<HTMLInputElement>>;
/**
 * `<InputControlPrefixWrapper>` and `<InputControlSuffixWrapper>` have a `variant` prop that can be used to
 * adjust the wrapper based on the prefix or suffix content.
 *
 * - `'default'`: Standard padding for text content.
 * - `'icon'`: For icons.
 * - `'control'`: For controls, like buttons or selects.
 */
export declare const WithIconOrControl: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").InputControlProps & import("react").RefAttributes<HTMLInputElement>>;
export declare const WithSideLabel: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").InputControlProps & import("react").RefAttributes<HTMLInputElement>>;
export declare const WithEdgeLabel: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").InputControlProps & import("react").RefAttributes<HTMLInputElement>>;
export declare const ShowPassword: StoryFn<typeof InputControl>;
//# sourceMappingURL=index.story.d.ts.map
/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
/**
 * Internal dependencies
 */
import SearchControl from '..';
declare const meta: Meta<typeof SearchControl>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Omit<import("../../context").WordPressComponentProps<import("../types").SearchControlProps, "input", false>, "disabled"> & import("react").RefAttributes<HTMLInputElement>>;
/**
 * When an `onClose` callback is provided, the search control will render a close button
 * that will trigger the given callback.
 *
 * Use this if you want the button to trigger your own logic to close the search field entirely,
 * rather than just clearing the input value.
 */
export declare const WithOnClose: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Omit<import("../../context").WordPressComponentProps<import("../types").SearchControlProps, "input", false>, "disabled"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=index.story.d.ts.map
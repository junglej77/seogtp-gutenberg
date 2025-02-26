/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';
/**
 * Internal dependencies
 */
import Tooltip from '..';
declare const meta: Meta<typeof Tooltip>;
export default meta;
export declare const Default: StoryFn<typeof Tooltip>;
export declare const KeyboardShortcut: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("../types").TooltipProps & import("react").RefAttributes<any>>;
/**
 * In case one or more `Tooltip` components are rendered inside another
 * `Tooltip` component, only the tooltip associated to the outermost `Tooltip`
 * component will be rendered in the browser and shown to the user
 * appropriately. The rest of the nested `Tooltip` components will simply no-op
 * and pass-through their anchor.
 */
export declare const Nested: StoryFn<typeof Tooltip>;
//# sourceMappingURL=index.story.d.ts.map
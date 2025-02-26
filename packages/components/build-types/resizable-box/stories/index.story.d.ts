/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
/**
 * Internal dependencies
 */
import ResizableBox from '..';
declare const meta: Meta<typeof ResizableBox>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("re-resizable").ResizableProps & {
    children: import("react").ReactNode;
    showHandle?: boolean;
    __experimentalShowTooltip?: boolean;
    __experimentalTooltipProps?: Parameters<import("react").ForwardRefExoticComponent<Omit<{
        theme?: import("@emotion/react").Theme;
        as?: React.ElementType;
    } & import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
        'aria-hidden'?: boolean;
        axis?: import("../resize-tooltip/utils").Axis;
        className?: string;
        fadeTimeout?: number;
        isVisible?: boolean;
        labelRef?: import("react").Ref<HTMLDivElement>;
        onResize?: Parameters<typeof import("../resize-tooltip/utils").useResizeLabel>[0]["onResize"];
        position?: import("../resize-tooltip/utils").Position;
        showPx?: boolean;
        zIndex?: number;
    }, "ref"> & import("react").RefAttributes<HTMLDivElement>>>[0];
} & import("react").RefAttributes<import("re-resizable").Resizable>>;
/**
 * The `enable` prop can be used to disable resizing in specific directions.
 */
export declare const DisabledDirections: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, import("re-resizable").ResizableProps & {
    children: import("react").ReactNode;
    showHandle?: boolean;
    __experimentalShowTooltip?: boolean;
    __experimentalTooltipProps?: Parameters<import("react").ForwardRefExoticComponent<Omit<{
        theme?: import("@emotion/react").Theme;
        as?: React.ElementType;
    } & import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
        'aria-hidden'?: boolean;
        axis?: import("../resize-tooltip/utils").Axis;
        className?: string;
        fadeTimeout?: number;
        isVisible?: boolean;
        labelRef?: import("react").Ref<HTMLDivElement>;
        onResize?: Parameters<typeof import("../resize-tooltip/utils").useResizeLabel>[0]["onResize"];
        position?: import("../resize-tooltip/utils").Position;
        showPx?: boolean;
        zIndex?: number;
    }, "ref"> & import("react").RefAttributes<HTMLDivElement>>>[0];
} & import("react").RefAttributes<import("re-resizable").Resizable>>;
//# sourceMappingURL=index.story.d.ts.map
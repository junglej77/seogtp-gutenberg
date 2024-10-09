/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
import { VStack } from '..';
declare const meta: Meta<typeof VStack>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Omit<import("../../h-stack/types").Props, "spacing" | "alignment"> & {
    alignment?: import("../../h-stack/types").HStackAlignment | import("react").CSSProperties["alignItems"];
    spacing?: import("react").CSSProperties["width"];
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "direction" | "spacing" | "wrap" | "justify" | keyof import("react").RefAttributes<any> | "expanded" | "isReversed" | "alignment"> & {
    as?: keyof JSX.IntrinsicElements | undefined;
}>;
//# sourceMappingURL=index.story.d.ts.map
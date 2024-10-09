/**
 * External dependencies
 */
import type { Meta } from '@storybook/react';
import { BorderBoxControl } from '../';
declare const meta: Meta<typeof BorderBoxControl>;
export default meta;
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react").ReactRenderer, Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & import("../../border-control/types").LabelProps & Pick<import("../../border-control/types").BorderControlProps, "size" | "enableStyle"> & {
    onChange: (value: import("../types").AnyBorder) => void;
    popoverPlacement?: import("../../popover/types").PopoverProps["placement"];
    popoverOffset?: import("../../popover/types").PopoverProps["offset"];
    value: import("../types").AnyBorder;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "onChange" | "value" | "size" | keyof import("react").RefAttributes<any> | "__next40pxDefaultSize" | "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar" | "enableStyle" | "disableCustomColors" | "popoverPlacement" | "popoverOffset" | keyof import("../../border-control/types").LabelProps>>;
//# sourceMappingURL=index.story.d.ts.map
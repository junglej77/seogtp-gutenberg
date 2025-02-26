export type Axis = 'x' | 'y';
export declare const POSITIONS: {
    readonly bottom: "bottom";
    readonly corner: "corner";
};
export type Position = (typeof POSITIONS)[keyof typeof POSITIONS];
interface UseResizeLabelProps {
    /** The label value. */
    label?: string;
    /** Element to be rendered for resize listening events. */
    resizeListener: JSX.Element;
}
interface UseResizeLabelArgs {
    axis?: Axis;
    fadeTimeout: number;
    onResize: (data: {
        width: number | null;
        height: number | null;
    }) => void;
    position: Position;
    showPx: boolean;
}
/**
 * Custom hook that manages resize listener events. It also provides a label
 * based on current resize width x height values.
 *
 * @param props
 * @param props.axis        Only shows the label corresponding to the axis.
 * @param props.fadeTimeout Duration (ms) before deactivating the resize label.
 * @param props.onResize    Callback when a resize occurs. Provides { width, height } callback.
 * @param props.position    Adjusts label value.
 * @param props.showPx      Whether to add `PX` to the label.
 *
 * @return Properties for hook.
 */
export declare function useResizeLabel({ axis, fadeTimeout, onResize, position, showPx, }: UseResizeLabelArgs): UseResizeLabelProps;
export {};
//# sourceMappingURL=utils.d.ts.map
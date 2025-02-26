/**
 * @param {Object}                                  props
 * @param {(e: import('react').MouseEvent) => void} props.onDragStart
 * @param {(e: MouseEvent) => void}                 props.onDragMove
 * @param {(e?: MouseEvent) => void}                props.onDragEnd
 */
export default function useDragging({ onDragStart, onDragMove, onDragEnd }: {
    onDragStart: (e: import("react").MouseEvent) => void;
    onDragMove: (e: MouseEvent) => void;
    onDragEnd: (e?: MouseEvent) => void;
}): {
    startDrag: (e: import("react").MouseEvent) => void;
    endDrag: (e?: MouseEvent) => void;
    isDragging: boolean;
};
//# sourceMappingURL=index.d.ts.map
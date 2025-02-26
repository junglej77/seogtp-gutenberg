/**
 * A hook to facilitate drag and drop handling.
 *
 * @param {Object}                  props                   Named parameters.
 * @param {?HTMLElement}            [props.dropZoneElement] Optional element to be used as the drop zone.
 * @param {boolean}                 [props.isDisabled]      Whether or not to disable the drop zone.
 * @param {(e: DragEvent) => void}  [props.onDragStart]     Called when dragging has started.
 * @param {(e: DragEvent) => void}  [props.onDragEnter]     Called when the zone is entered.
 * @param {(e: DragEvent) => void}  [props.onDragOver]      Called when the zone is moved within.
 * @param {(e: DragEvent) => void}  [props.onDragLeave]     Called when the zone is left.
 * @param {(e: MouseEvent) => void} [props.onDragEnd]       Called when dragging has ended.
 * @param {(e: DragEvent) => void}  [props.onDrop]          Called when dropping in the zone.
 *
 * @return {import('react').RefCallback<HTMLElement>} Ref callback to be passed to the drop zone element.
 */
export default function useDropZone({ dropZoneElement, isDisabled, onDrop: _onDrop, onDragStart: _onDragStart, onDragEnter: _onDragEnter, onDragLeave: _onDragLeave, onDragEnd: _onDragEnd, onDragOver: _onDragOver, }: {
    dropZoneElement?: HTMLElement | null | undefined;
    isDisabled?: boolean | undefined;
    onDragStart?: ((e: DragEvent) => void) | undefined;
    onDragEnter?: ((e: DragEvent) => void) | undefined;
    onDragOver?: ((e: DragEvent) => void) | undefined;
    onDragLeave?: ((e: DragEvent) => void) | undefined;
    onDragEnd?: ((e: MouseEvent) => void) | undefined;
    onDrop?: ((e: DragEvent) => void) | undefined;
}): import("react").RefCallback<HTMLElement>;
//# sourceMappingURL=index.d.ts.map
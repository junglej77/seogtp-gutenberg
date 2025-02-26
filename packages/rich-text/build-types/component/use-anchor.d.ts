/**
 * This hook, to be used in a format type's Edit component, returns the active
 * element that is formatted, or a virtual element for the selection range if
 * no format is active. The returned value is meant to be used for positioning
 * UI, e.g. by passing it to the `Popover` component via the `anchor` prop.
 *
 * @param {Object}           $1                        Named parameters.
 * @param {HTMLElement|null} $1.editableContentElement The element containing
 *                                                     the editable content.
 * @param {WPFormat=}        $1.settings               The format type's settings.
 * @return {Element|VirtualAnchorElement|undefined|null} The active element or selection range.
 */
export function useAnchor({ editableContentElement, settings }: {
    editableContentElement: HTMLElement | null;
    settings?: WPFormat | undefined;
}): Element | VirtualAnchorElement | undefined | null;
export type WPFormat = import("../register-format-type").WPFormat;
export type RichTextValue = import("../types").RichTextValue;
export type VirtualAnchorElement = {
    /**
     * A function returning a DOMRect
     */
    getBoundingClientRect: () => DOMRect;
    /**
     * The actual DOM element
     */
    contextElement: HTMLElement;
};
//# sourceMappingURL=use-anchor.d.ts.map
/**
 * @template T
 * @typedef {import('@wordpress/element').RefObject<T>} RefObject<T>
 */
/** @typedef {import('../register-format-type').WPFormat} WPFormat */
/** @typedef {import('../types').RichTextValue} RichTextValue */
/**
 * This hook, to be used in a format type's Edit component, returns the active
 * element that is formatted, or the selection range if no format is active.
 * The returned value is meant to be used for positioning UI, e.g. by passing it
 * to the `Popover` component.
 *
 * @param {Object}                 $1          Named parameters.
 * @param {RefObject<HTMLElement>} $1.ref      React ref of the element
 *                                             containing  the editable content.
 * @param {RichTextValue}          $1.value    Value to check for selection.
 * @param {WPFormat}               $1.settings The format type's settings.
 *
 * @return {Element|Range} The active element or selection range.
 */
export function useAnchorRef({ ref, value, settings }: {
    ref: RefObject<HTMLElement>;
    value: RichTextValue;
    settings: WPFormat;
}): Element | Range;
/**
 * <T>
 */
export type RefObject<T> = import("@wordpress/element").RefObject<T>;
export type WPFormat = import("../register-format-type").WPFormat;
export type RichTextValue = import("../types").RichTextValue;
//# sourceMappingURL=use-anchor-ref.d.ts.map
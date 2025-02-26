/** @typedef {import('./types').RichTextValue} RichTextValue */
/** @typedef {import('./types').RichTextFormat} RichTextFormat */
/**
 * Gets the active object, if there is any.
 *
 * @param {RichTextValue} value Value to inspect.
 *
 * @return {RichTextFormat|void} Active object, or undefined.
 */
export function getActiveObject({ start, end, replacements, text }: RichTextValue): RichTextFormat | void;
export type RichTextValue = import("./types").RichTextValue;
export type RichTextFormat = import("./types").RichTextFormat;
//# sourceMappingURL=get-active-object.d.ts.map
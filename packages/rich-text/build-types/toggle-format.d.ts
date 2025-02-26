/** @typedef {import('./types').RichTextValue} RichTextValue */
/** @typedef {import('./types').RichTextFormat} RichTextFormat */
/**
 * Toggles a format object to a Rich Text value at the current selection.
 *
 * @param {RichTextValue}  value  Value to modify.
 * @param {RichTextFormat} format Format to apply or remove.
 *
 * @return {RichTextValue} A new value with the format applied or removed.
 */
export function toggleFormat(value: RichTextValue, format: RichTextFormat): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
export type RichTextFormat = import("./types").RichTextFormat;
//# sourceMappingURL=toggle-format.d.ts.map
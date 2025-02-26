/**
 * Apply a format object to a Rich Text value from the given `startIndex` to the
 * given `endIndex`. Indices are retrieved from the selection if none are
 * provided.
 *
 * @param {RichTextValue}  value        Value to modify.
 * @param {RichTextFormat} format       Format to apply.
 * @param {number}         [startIndex] Start index.
 * @param {number}         [endIndex]   End index.
 *
 * @return {RichTextValue} A new value with the format applied.
 */
export function applyFormat(value: RichTextValue, format: RichTextFormat, startIndex?: number | undefined, endIndex?: number | undefined): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
export type RichTextFormat = import("./types").RichTextFormat;
//# sourceMappingURL=apply-format.d.ts.map
/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Remove any format object from a Rich Text value by type from the given
 * `startIndex` to the given `endIndex`. Indices are retrieved from the
 * selection if none are provided.
 *
 * @param {RichTextValue} value        Value to modify.
 * @param {string}        formatType   Format type to remove.
 * @param {number}        [startIndex] Start index.
 * @param {number}        [endIndex]   End index.
 *
 * @return {RichTextValue} A new value with the format applied.
 */
export function removeFormat(value: RichTextValue, formatType: string, startIndex?: number | undefined, endIndex?: number | undefined): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=remove-format.d.ts.map
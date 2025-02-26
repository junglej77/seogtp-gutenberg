/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Remove content from a Rich Text value between the given `startIndex` and
 * `endIndex`. Indices are retrieved from the selection if none are provided.
 *
 * @param {RichTextValue} value        Value to modify.
 * @param {number}        [startIndex] Start index.
 * @param {number}        [endIndex]   End index.
 *
 * @return {RichTextValue} A new value with the content removed.
 */
export function remove(value: RichTextValue, startIndex?: number | undefined, endIndex?: number | undefined): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=remove.d.ts.map
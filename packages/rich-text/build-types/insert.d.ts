/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Insert a Rich Text value, an HTML string, or a plain text string, into a
 * Rich Text value at the given `startIndex`. Any content between `startIndex`
 * and `endIndex` will be removed. Indices are retrieved from the selection if
 * none are provided.
 *
 * @param {RichTextValue}        value         Value to modify.
 * @param {RichTextValue|string} valueToInsert Value to insert.
 * @param {number}               [startIndex]  Start index.
 * @param {number}               [endIndex]    End index.
 *
 * @return {RichTextValue} A new value with the value inserted.
 */
export function insert(value: RichTextValue, valueToInsert: RichTextValue | string, startIndex?: number | undefined, endIndex?: number | undefined): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=insert.d.ts.map
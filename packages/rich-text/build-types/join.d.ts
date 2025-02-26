/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Combine an array of Rich Text values into one, optionally separated by
 * `separator`, which can be a Rich Text value, HTML string, or plain text
 * string. This is similar to `Array.prototype.join`.
 *
 * @param {Array<RichTextValue>} values      An array of values to join.
 * @param {string|RichTextValue} [separator] Separator string or value.
 *
 * @return {RichTextValue} A new combined value.
 */
export function join(values: Array<RichTextValue>, separator?: string | import("./types").RichTextValue | undefined): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=join.d.ts.map
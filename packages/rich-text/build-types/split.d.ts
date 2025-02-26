/**
 * Internal dependencies
 */
/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Split a Rich Text value in two at the given `startIndex` and `endIndex`, or
 * split at the given separator. This is similar to `String.prototype.split`.
 * Indices are retrieved from the selection if none are provided.
 *
 * @param {RichTextValue} value
 * @param {number|string} [string] Start index, or string at which to split.
 *
 * @return {Array<RichTextValue>|undefined} An array of new values.
 */
export function split({ formats, replacements, text, start, end }: RichTextValue, string?: string | number | undefined, ...args: any[]): Array<RichTextValue> | undefined;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=split.d.ts.map
/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Search a Rich Text value and replace the match(es) with `replacement`. This
 * is similar to `String.prototype.replace`.
 *
 * @param {RichTextValue}   value       The value to modify.
 * @param {RegExp|string}   pattern     A RegExp object or literal. Can also be
 *                                      a string. It is treated as a verbatim
 *                                      string and is not interpreted as a
 *                                      regular expression. Only the first
 *                                      occurrence will be replaced.
 * @param {Function|string} replacement The match or matches are replaced with
 *                                      the specified or the value returned by
 *                                      the specified function.
 *
 * @return {RichTextValue} A new value with replacements applied.
 */
export function replace({ formats, replacements, text, start, end }: RichTextValue, pattern: RegExp | string, replacement: Function | string): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=replace.d.ts.map
/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Concats a pair of rich text values. Not that this mutates `a` and does NOT
 * normalise formats!
 *
 * @param {Object} a Value to mutate.
 * @param {Object} b Value to add read from.
 *
 * @return {Object} `a`, mutated.
 */
export function mergePair(a: Object, b: Object): Object;
/**
 * Combine all Rich Text values into one. This is similar to
 * `String.prototype.concat`.
 *
 * @param {...RichTextValue} values Objects to combine.
 *
 * @return {RichTextValue} A new value combining all given records.
 */
export function concat(...values: RichTextValue[]): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=concat.d.ts.map
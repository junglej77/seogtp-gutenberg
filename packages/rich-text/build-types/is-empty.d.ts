/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Check if a Rich Text value is Empty, meaning it contains no text or any
 * objects (such as images).
 *
 * @param {RichTextValue} value Value to use.
 *
 * @return {boolean} True if the value is empty, false if not.
 */
export function isEmpty({ text }: RichTextValue): boolean;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=is-empty.d.ts.map
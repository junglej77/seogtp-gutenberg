/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Get the textual content of a Rich Text value. This is similar to
 * `Element.textContent`.
 *
 * @param {RichTextValue} value Value to use.
 *
 * @return {string} The text content.
 */
export function getTextContent({ text }: RichTextValue): string;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=get-text-content.d.ts.map
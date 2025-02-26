/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Create an HTML string from a Rich Text value.
 *
 * @param {Object}        $1                      Named argements.
 * @param {RichTextValue} $1.value                Rich text value.
 * @param {boolean}       [$1.preserveWhiteSpace] Preserves newlines if true.
 *
 * @return {string} HTML string.
 */
export function toHTMLString({ value, preserveWhiteSpace }: {
    value: RichTextValue;
    preserveWhiteSpace?: boolean | undefined;
}): string;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=to-html-string.d.ts.map
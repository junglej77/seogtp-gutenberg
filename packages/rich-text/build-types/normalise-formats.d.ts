/** @typedef {import('./types').RichTextValue} RichTextValue */
/**
 * Normalises formats: ensures subsequent adjacent equal formats have the same
 * reference.
 *
 * @param {RichTextValue} value Value to normalise formats of.
 *
 * @return {RichTextValue} New value with normalised formats.
 */
export function normaliseFormats(value: RichTextValue): RichTextValue;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=normalise-formats.d.ts.map
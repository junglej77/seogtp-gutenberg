/** @typedef {import('./types').RichTextValue} RichTextValue */
/** @typedef {import('./types').RichTextFormat} RichTextFormat */
/**
 * Gets the format object by type at the start of the selection. This can be
 * used to get e.g. the URL of a link format at the current selection, but also
 * to check if a format is active at the selection. Returns undefined if there
 * is no format at the selection.
 *
 * @param {RichTextValue} value      Value to inspect.
 * @param {string}        formatType Format type to look for.
 *
 * @return {RichTextFormat|undefined} Active format object of the specified
 *                                    type, or undefined.
 */
export function getActiveFormat(value: RichTextValue, formatType: string): RichTextFormat | undefined;
export type RichTextValue = import("./types").RichTextValue;
export type RichTextFormat = import("./types").RichTextFormat;
//# sourceMappingURL=get-active-format.d.ts.map
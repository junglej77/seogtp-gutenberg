/** @typedef {import('./register-format-type').RichTextFormatType} RichTextFormatType */
/**
 * Returns a registered format type.
 *
 * @param {string} name Format name.
 *
 * @return {RichTextFormatType|undefined} Format type.
 */
export function getFormatType(name: string): RichTextFormatType | undefined;
export type RichTextFormatType = import("./register-format-type").RichTextFormatType;
//# sourceMappingURL=get-format-type.d.ts.map
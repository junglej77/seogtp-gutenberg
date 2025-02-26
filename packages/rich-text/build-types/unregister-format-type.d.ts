/** @typedef {import('./register-format-type').WPFormat} WPFormat */
/**
 * Unregisters a format.
 *
 * @param {string} name Format name.
 *
 * @return {WPFormat|undefined} The previous format value, if it has
 *                                        been successfully unregistered;
 *                                        otherwise `undefined`.
 */
export function unregisterFormatType(name: string): WPFormat | undefined;
export type WPFormat = import("./register-format-type").WPFormat;
//# sourceMappingURL=unregister-format-type.d.ts.map
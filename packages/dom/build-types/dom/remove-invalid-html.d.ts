/**
 * Given a schema, unwraps or removes nodes, attributes and classes on HTML.
 *
 * @param {string}                             HTML   The HTML to clean up.
 * @param {import('./clean-node-list').Schema} schema Schema for the HTML.
 * @param {boolean}                            inline Whether to clean for inline mode.
 *
 * @return {string} The cleaned up HTML.
 */
export default function removeInvalidHTML(HTML: string, schema: import("./clean-node-list").Schema, inline: boolean): string;
//# sourceMappingURL=remove-invalid-html.d.ts.map
/**
 * Copies the text to the clipboard when the element is clicked.
 *
 * @deprecated
 *
 * @param {import('react').RefObject<string | Element | NodeListOf<Element>>} ref       Reference with the element.
 * @param {string|Function}                                                   text      The text to copy.
 * @param {number}                                                            [timeout] Optional timeout to reset the returned
 *                                                                                      state. 4 seconds by default.
 *
 * @return {boolean} Whether or not the text has been copied. Resets after the
 *                   timeout.
 */
export default function useCopyOnClick(ref: import("react").RefObject<string | Element | NodeListOf<Element>>, text: string | Function, timeout?: number | undefined): boolean;
//# sourceMappingURL=index.d.ts.map
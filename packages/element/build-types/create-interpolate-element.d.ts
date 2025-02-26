export default createInterpolateElement;
/**
 * The stack frame tracking parse progress.
 */
export type Frame = {
    /**
     * A parent element which may still have
     */
    element: Element;
    /**
     * Offset at which parent element first
     * appears.
     */
    tokenStart: number;
    /**
     * Length of string marking start of parent
     * element.
     */
    tokenLength: number;
    /**
     * Running offset at which parsing should
     *        continue.
     */
    prevOffset?: number;
    /**
     * Offset at which last closing element
     *  finished, used for finding text between
     *  elements.
     */
    leadingTextStart?: number;
    /**
     * Children.
     */
    children: Element[];
};
/**
 * Object containing a React element.
 */
export type Element = import("react").ReactElement;
/**
 * This function creates an interpolated element from a passed in string with
 * specific tags matching how the string should be converted to an element via
 * the conversion map value.
 *
 * @example
 * For example, for the given string:
 *
 * "This is a <span>string</span> with <a>a link</a> and a self-closing
 * <CustomComponentB/> tag"
 *
 * You would have something like this as the conversionMap value:
 *
 * ```js
 * {
 *     span: <span />,
 *     a: <a href={ 'https://github.com' } />,
 *     CustomComponentB: <CustomComponent />,
 * }
 * ```
 *
 * @param {string}                  interpolatedString The interpolation string to be parsed.
 * @param {Record<string, Element>} conversionMap      The map used to convert the string to
 *                                                     a react element.
 * @throws {TypeError}
 * @return {Element}  A wp element.
 */
declare function createInterpolateElement(interpolatedString: string, conversionMap: Record<string, Element>): Element;
//# sourceMappingURL=create-interpolate-element.d.ts.map
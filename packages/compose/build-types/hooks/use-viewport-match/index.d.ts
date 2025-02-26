export default useViewportMatch;
export type WPBreakpoint = "xhuge" | "huge" | "wide" | "xlarge" | "large" | "medium" | "small" | "mobile";
export type WPViewportOperator = ">=" | "<";
/**
 * Returns true if the viewport matches the given query, or false otherwise.
 *
 * @param {WPBreakpoint}       breakpoint      Breakpoint size name.
 * @param {WPViewportOperator} [operator=">="] Viewport operator.
 *
 * @example
 *
 * ```js
 * useViewportMatch( 'huge', '<' );
 * useViewportMatch( 'medium' );
 * ```
 *
 * @return {boolean} Whether viewport matches query.
 */
declare function useViewportMatch(breakpoint: WPBreakpoint, operator?: WPViewportOperator | undefined): boolean;
declare namespace useViewportMatch {
    let __experimentalWidthProvider: import("react").Provider<number | null>;
}
//# sourceMappingURL=index.d.ts.map
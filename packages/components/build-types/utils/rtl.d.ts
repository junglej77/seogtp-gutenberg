/**
 * A higher-order function that create an incredibly basic ltr -> rtl style converter for CSS objects.
 *
 * @param {import('react').CSSProperties} ltrStyles   Ltr styles. Converts and renders from ltr -> rtl styles, if applicable.
 * @param {import('react').CSSProperties} [rtlStyles] Rtl styles. Renders if provided.
 *
 * @return {() => import('@emotion/react').SerializedStyles} A function to output CSS styles for Emotion's renderer
 */
export function rtl(ltrStyles?: import("react").CSSProperties, rtlStyles?: import("react").CSSProperties | undefined): () => import("@emotion/react").SerializedStyles;
export namespace rtl {
    /**
     * Call this in the `useMemo` dependency array to ensure that subsequent renders will
     * cause rtl styles to update based on the `isRTL` return value even if all other dependencies
     * remain the same.
     *
     * @example
     * const styles = useMemo( () => {
     *   return css`
     *     ${ rtl( { marginRight: '10px' } ) }
     *   `;
     * }, [ rtl.watch() ] );
     */
    function watch(): boolean;
}
export function convertLTRToRTL(ltrStyles?: import("react").CSSProperties): import("react").CSSProperties;
//# sourceMappingURL=rtl.d.ts.map
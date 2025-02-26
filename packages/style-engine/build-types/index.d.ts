/**
 * Internal dependencies
 */
import type { Style, StyleOptions, GeneratedCSSRule } from './types';
/**
 * Generates a stylesheet for a given style object and selector.
 *
 * @since 6.1.0 Introduced in WordPress core.
 *
 * @param style   Style object, for example, the value of a block's attributes.style object or the top level styles in theme.json
 * @param options Options object with settings to adjust how the styles are generated.
 *
 * @return A generated stylesheet or inline style declarations.
 */
export declare function compileCSS(style: Style, options?: StyleOptions): string;
/**
 * Returns a JSON representation of the generated CSS rules.
 *
 * @since 6.1.0 Introduced in WordPress core.
 *
 * @param style   Style object, for example, the value of a block's attributes.style object or the top level styles in theme.json
 * @param options Options object with settings to adjust how the styles are generated.
 *
 * @return A collection of objects containing the selector, if any, the CSS property key (camelcase) and parsed CSS value.
 */
export declare function getCSSRules(style: Style, options?: StyleOptions): GeneratedCSSRule[];
export { getCSSValueFromRawStyle } from './styles/utils';
//# sourceMappingURL=index.d.ts.map
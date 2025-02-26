/**
 * Internal dependencies
 */
import type { CssRulesKeys, GeneratedCSSRule, Style, StyleOptions } from '../types';
/**
 * Helper util to return a value from a certain path of the object.
 * Path is specified as an array of properties, like `[ 'x', 'y' ]`.
 *
 * @param object Input object.
 * @param path   Path to the object property.
 * @return Value of the object property at the specified path.
 */
export declare const getStyleValueByPath: (object: Record<any, any>, path: string[]) => any;
/**
 * Returns a JSON representation of the generated CSS rules.
 *
 * @param style   Style object.
 * @param options Options object with settings to adjust how the styles are generated.
 * @param path    An array of strings representing the path to the style value in the style object.
 * @param ruleKey A CSS property key.
 *
 * @return GeneratedCSSRule[] CSS rules.
 */
export declare function generateRule(style: Style, options: StyleOptions, path: string[], ruleKey: string): GeneratedCSSRule[];
/**
 * Returns a JSON representation of the generated CSS rules taking into account box model properties, top, right, bottom, left.
 *
 * @param style                Style object.
 * @param options              Options object with settings to adjust how the styles are generated.
 * @param path                 An array of strings representing the path to the style value in the style object.
 * @param ruleKeys             An array of CSS property keys and patterns.
 * @param individualProperties The "sides" or individual properties for which to generate rules.
 *
 * @return GeneratedCSSRule[]  CSS rules.
 */
export declare function generateBoxRules(style: Style, options: StyleOptions, path: string[], ruleKeys: CssRulesKeys, individualProperties?: string[]): GeneratedCSSRule[];
/**
 * Returns a WordPress CSS custom var value from incoming style preset value,
 * if one is detected.
 *
 * The preset value is a string and follows the pattern `var:description|context|slug`.
 *
 * Example:
 *
 * `getCSSValueFromRawStyle( 'var:preset|color|heavenlyBlue' )` // returns 'var(--wp--preset--color--heavenly-blue)'
 *
 * @param styleValue A string representing a raw CSS value. Non-strings won't be processed.
 *
 * @return A CSS custom var value if the incoming style value is a preset value.
 */
export declare function getCSSValueFromRawStyle<StyleValue = string>(styleValue: StyleValue): StyleValue;
/**
 * Capitalizes the first letter in a string.
 *
 * @param string The string whose first letter the function will capitalize.
 *
 * @return String with the first letter capitalized.
 */
export declare function upperFirst(string: string): string;
/**
 * Converts an array of strings into a camelCase string.
 *
 * @param strings The strings to join into a camelCase string.
 *
 * @return camelCase string.
 */
export declare function camelCaseJoin(strings: string[]): string;
/**
 * Safely decodes a URI with `decodeURI`. Returns the URI unmodified if
 * `decodeURI` throws an error.
 *
 * @param {string} uri URI to decode.
 *
 * @example
 * ```js
 * const badUri = safeDecodeURI( '%z' ); // does not throw an Error, simply returns '%z'
 * ```
 *
 * @return {string} Decoded URI if possible.
 */
export declare function safeDecodeURI(uri: string): string;
//# sourceMappingURL=utils.d.ts.map
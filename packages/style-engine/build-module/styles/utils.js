/**
 * External dependencies
 */
import { paramCase as kebabCase } from 'change-case';

/**
 * Internal dependencies
 */

import { VARIABLE_REFERENCE_PREFIX, VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE, VARIABLE_PATH_SEPARATOR_TOKEN_STYLE } from './constants';

/**
 * Helper util to return a value from a certain path of the object.
 * Path is specified as an array of properties, like `[ 'x', 'y' ]`.
 *
 * @param object Input object.
 * @param path   Path to the object property.
 * @return Value of the object property at the specified path.
 */
export const getStyleValueByPath = (object, path) => {
  let value = object;
  path.forEach(fieldName => {
    value = value?.[fieldName];
  });
  return value;
};

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
export function generateRule(style, options, path, ruleKey) {
  const styleValue = getStyleValueByPath(style, path);
  return styleValue ? [{
    selector: options?.selector,
    key: ruleKey,
    value: getCSSValueFromRawStyle(styleValue)
  }] : [];
}

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
export function generateBoxRules(style, options, path, ruleKeys, individualProperties = ['top', 'right', 'bottom', 'left']) {
  const boxStyle = getStyleValueByPath(style, path);
  if (!boxStyle) {
    return [];
  }
  const rules = [];
  if (typeof boxStyle === 'string') {
    rules.push({
      selector: options?.selector,
      key: ruleKeys.default,
      value: boxStyle
    });
  } else {
    const sideRules = individualProperties.reduce((acc, side) => {
      const value = getCSSValueFromRawStyle(getStyleValueByPath(boxStyle, [side]));
      if (value) {
        acc.push({
          selector: options?.selector,
          key: ruleKeys?.individual.replace('%s', upperFirst(side)),
          value
        });
      }
      return acc;
    }, []);
    rules.push(...sideRules);
  }
  return rules;
}

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

export function getCSSValueFromRawStyle(styleValue) {
  if (typeof styleValue === 'string' && styleValue.startsWith(VARIABLE_REFERENCE_PREFIX)) {
    const variable = styleValue.slice(VARIABLE_REFERENCE_PREFIX.length).split(VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE).map(presetVariable => kebabCase(presetVariable, {
      splitRegexp: [/([a-z0-9])([A-Z])/g,
      // fooBar => foo-bar, 3Bar => 3-bar
      /([0-9])([a-z])/g,
      // 3bar => 3-bar
      /([A-Za-z])([0-9])/g,
      // Foo3 => foo-3, foo3 => foo-3
      /([A-Z])([A-Z][a-z])/g // FOOBar => foo-bar
      ]
    })).join(VARIABLE_PATH_SEPARATOR_TOKEN_STYLE);
    return `var(--wp--${variable})`;
  }
  return styleValue;
}

/**
 * Capitalizes the first letter in a string.
 *
 * @param string The string whose first letter the function will capitalize.
 *
 * @return String with the first letter capitalized.
 */
export function upperFirst(string) {
  const [firstLetter, ...rest] = string;
  return firstLetter.toUpperCase() + rest.join('');
}

/**
 * Converts an array of strings into a camelCase string.
 *
 * @param strings The strings to join into a camelCase string.
 *
 * @return camelCase string.
 */
export function camelCaseJoin(strings) {
  const [firstItem, ...rest] = strings;
  return firstItem.toLowerCase() + rest.map(upperFirst).join('');
}

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
export function safeDecodeURI(uri) {
  try {
    return decodeURI(uri);
  } catch (uriError) {
    return uri;
  }
}
//# sourceMappingURL=utils.js.map
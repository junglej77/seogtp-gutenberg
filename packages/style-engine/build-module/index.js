/**
 * External dependencies
 */
import { paramCase as kebabCase } from 'change-case';

/**
 * Internal dependencies
 */

import { styleDefinitions } from './styles';

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
export function compileCSS(style, options = {}) {
  const rules = getCSSRules(style, options);

  // If no selector is provided, treat generated rules as inline styles to be returned as a single string.
  if (!options?.selector) {
    const inlineRules = [];
    rules.forEach(rule => {
      inlineRules.push(`${kebabCase(rule.key)}: ${rule.value};`);
    });
    return inlineRules.join(' ');
  }
  const groupedRules = rules.reduce((acc, rule) => {
    const {
      selector
    } = rule;
    if (!selector) {
      return acc;
    }
    if (!acc[selector]) {
      acc[selector] = [];
    }
    acc[selector].push(rule);
    return acc;
  }, {});
  const selectorRules = Object.keys(groupedRules).reduce((acc, subSelector) => {
    acc.push(`${subSelector} { ${groupedRules[subSelector].map(rule => `${kebabCase(rule.key)}: ${rule.value};`).join(' ')} }`);
    return acc;
  }, []);
  return selectorRules.join('\n');
}

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
export function getCSSRules(style, options = {}) {
  const rules = [];
  styleDefinitions.forEach(definition => {
    if (typeof definition.generate === 'function') {
      rules.push(...definition.generate(style, options));
    }
  });
  return rules;
}

// Export style utils.
export { getCSSValueFromRawStyle } from './styles/utils';
//# sourceMappingURL=index.js.map
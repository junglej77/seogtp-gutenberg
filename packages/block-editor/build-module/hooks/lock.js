/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Filters registered block settings, extending attributes to include `lock`.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute(settings) {
  var _settings$attributes$;
  // Allow blocks to specify their own attribute definition with default values if needed.
  if ('type' in ((_settings$attributes$ = settings.attributes?.lock) !== null && _settings$attributes$ !== void 0 ? _settings$attributes$ : {})) {
    return settings;
  }
  // Gracefully handle if settings.attributes is undefined.
  settings.attributes = {
    ...settings.attributes,
    lock: {
      type: 'object'
    }
  };
  return settings;
}
addFilter('blocks.registerBlockType', 'core/lock/addAttribute', addAttribute);
//# sourceMappingURL=lock.js.map
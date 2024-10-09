/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
export default function useDefaultPatternCategories() {
  const blockPatternCategories = useSelect(select => {
    var _settings$__experimen;
    const {
      getSettings
    } = unlock(select(editSiteStore));
    const settings = getSettings();
    return (_settings$__experimen = settings.__experimentalAdditionalBlockPatternCategories) !== null && _settings$__experimen !== void 0 ? _settings$__experimen : settings.__experimentalBlockPatternCategories;
  });
  const restBlockPatternCategories = useSelect(select => select(coreStore).getBlockPatternCategories());
  return [...(blockPatternCategories || []), ...(restBlockPatternCategories || [])];
}
//# sourceMappingURL=use-default-pattern-categories.js.map
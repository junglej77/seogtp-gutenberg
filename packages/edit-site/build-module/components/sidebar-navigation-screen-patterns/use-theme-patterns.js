/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { filterOutDuplicatesByName } from '../page-patterns/utils';
import { EXCLUDED_PATTERN_SOURCES } from '../../utils/constants';
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
export default function useThemePatterns() {
  const blockPatterns = useSelect(select => {
    var _getSettings$__experi;
    const {
      getSettings
    } = unlock(select(editSiteStore));
    return (_getSettings$__experi = getSettings().__experimentalAdditionalBlockPatterns) !== null && _getSettings$__experi !== void 0 ? _getSettings$__experi : getSettings().__experimentalBlockPatterns;
  });
  const restBlockPatterns = useSelect(select => select(coreStore).getBlockPatterns());
  const patterns = useMemo(() => [...(blockPatterns || []), ...(restBlockPatterns || [])].filter(pattern => !EXCLUDED_PATTERN_SOURCES.includes(pattern.source)).filter(filterOutDuplicatesByName).filter(pattern => pattern.inserter !== false), [blockPatterns, restBlockPatterns]);
  return patterns;
}
//# sourceMappingURL=use-theme-patterns.js.map
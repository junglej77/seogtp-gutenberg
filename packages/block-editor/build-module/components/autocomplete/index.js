/**
 * WordPress dependencies
 */
import { applyFilters, hasFilter } from '@wordpress/hooks';
import { Autocomplete, __unstableUseAutocompleteProps as useAutocompleteProps } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { getDefaultBlockName, getBlockSupport } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { useBlockEditContext } from '../block-edit/context';
import blockAutocompleter from '../../autocompleters/block';
import linkAutocompleter from '../../autocompleters/link';

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation.
 *
 * @type {Array}
 */
import { jsx as _jsx } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
function useCompleters({
  completers = EMPTY_ARRAY
}) {
  const {
    name
  } = useBlockEditContext();
  return useMemo(() => {
    let filteredCompleters = [...completers, linkAutocompleter];
    if (name === getDefaultBlockName() || getBlockSupport(name, '__experimentalSlashInserter', false)) {
      filteredCompleters = [...filteredCompleters, blockAutocompleter];
    }
    if (hasFilter('editor.Autocomplete.completers')) {
      // Provide copies so filters may directly modify them.
      if (filteredCompleters === completers) {
        filteredCompleters = filteredCompleters.map(completer => ({
          ...completer
        }));
      }
      filteredCompleters = applyFilters('editor.Autocomplete.completers', filteredCompleters, name);
    }
    return filteredCompleters;
  }, [completers, name]);
}
export function useBlockEditorAutocompleteProps(props) {
  return useAutocompleteProps({
    ...props,
    completers: useCompleters(props)
  });
}

/**
 * Wrap the default Autocomplete component with one that supports a filter hook
 * for customizing its list of autocompleters.
 *
 * @type {import('react').FC}
 */
function BlockEditorAutocomplete(props) {
  return /*#__PURE__*/_jsx(Autocomplete, {
    ...props,
    completers: useCompleters(props)
  });
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/autocomplete/README.md
 */
export default BlockEditorAutocomplete;
//# sourceMappingURL=index.js.map
/**
 * WordPress dependencies
 */
import { __unstableInserterMenuExtension } from '@wordpress/block-editor';
import { debounce } from '@wordpress/compose';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import DownloadableBlocksPanel from '../../components/downloadable-blocks-panel';
import { jsx as _jsx } from "react/jsx-runtime";
function InserterMenuDownloadableBlocksPanel() {
  const [debouncedFilterValue, setFilterValue] = useState('');
  const debouncedSetFilterValue = debounce(setFilterValue, 400);
  return /*#__PURE__*/_jsx(__unstableInserterMenuExtension, {
    children: ({
      onSelect,
      onHover,
      filterValue,
      hasItems
    }) => {
      if (debouncedFilterValue !== filterValue) {
        debouncedSetFilterValue(filterValue);
      }
      if (!debouncedFilterValue) {
        return null;
      }
      return /*#__PURE__*/_jsx(DownloadableBlocksPanel, {
        onSelect: onSelect,
        onHover: onHover,
        filterValue: debouncedFilterValue,
        hasLocalBlocks: hasItems,
        isTyping: filterValue !== debouncedFilterValue
      });
    }
  });
}
export default InserterMenuDownloadableBlocksPanel;
//# sourceMappingURL=index.js.map
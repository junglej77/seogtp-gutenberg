/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockTypesList from '../block-types-list';
import { store as blockEditorStore } from '../../store';
import { createInserterSection, filterInserterItems } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
function ReusableBlocksTab({
  onSelect,
  rootClientId,
  listProps
}) {
  const {
    inserterItems
  } = useSelect(select => {
    const {
      getInserterItems
    } = select(blockEditorStore);
    const allItems = getInserterItems(rootClientId);
    return {
      inserterItems: allItems
    };
  }, [rootClientId]);
  const items = useMemo(() => {
    return filterInserterItems(inserterItems, {
      onlyReusable: true
    });
  }, [inserterItems]);
  const sections = [createInserterSection({
    key: 'reuseable',
    items
  })];
  return /*#__PURE__*/_jsx(BlockTypesList, {
    name: "SyncedPatterns",
    sections: sections,
    onSelect: onSelect,
    listProps: listProps,
    label: __('Synced patterns')
  });
}
export default ReusableBlocksTab;
//# sourceMappingURL=reusable-blocks-tab.native.js.map
/**
 * WordPress dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { blockDefault } from '@wordpress/icons';
import { PluginPrePublishPanel } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import CompactList from '../../components/compact-list';
import { store as blockDirectoryStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function InstalledBlocksPrePublishPanel() {
  const newBlockTypes = useSelect(select => select(blockDirectoryStore).getNewBlockTypes(), []);
  if (!newBlockTypes.length) {
    return null;
  }
  return /*#__PURE__*/_jsxs(PluginPrePublishPanel, {
    icon: blockDefault,
    title: sprintf(
    // translators: %d: number of blocks (number).
    _n('Added: %d block', 'Added: %d blocks', newBlockTypes.length), newBlockTypes.length),
    initialOpen: true,
    children: [/*#__PURE__*/_jsx("p", {
      className: "installed-blocks-pre-publish-panel__copy",
      children: _n('The following block has been added to your site.', 'The following blocks have been added to your site.', newBlockTypes.length)
    }), /*#__PURE__*/_jsx(CompactList, {
      items: newBlockTypes
    })]
  });
}
//# sourceMappingURL=index.js.map
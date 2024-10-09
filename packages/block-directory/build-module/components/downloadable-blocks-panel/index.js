/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import DownloadableBlocksList from '../downloadable-blocks-list';
import DownloadableBlocksInserterPanel from './inserter-panel';
import DownloadableBlocksNoResults from './no-results';
import { store as blockDirectoryStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
const useDownloadableBlocks = filterValue => useSelect(select => {
  const {
    getDownloadableBlocks,
    isRequestingDownloadableBlocks,
    getInstalledBlockTypes
  } = select(blockDirectoryStore);
  const hasPermission = select(coreStore).canUser('read', 'block-directory/search');
  let downloadableBlocks = EMPTY_ARRAY;
  if (hasPermission) {
    downloadableBlocks = getDownloadableBlocks(filterValue);

    // Filter out blocks that are already installed.
    const installedBlockTypes = getInstalledBlockTypes();
    const installableBlocks = downloadableBlocks.filter(({
      name
    }) => {
      // Check if the block has just been installed, in which case it
      // should still show in the list to avoid suddenly disappearing.
      // `installedBlockTypes` only returns blocks stored in state
      // immediately after installation, not all installed blocks.
      const isJustInstalled = installedBlockTypes.some(blockType => blockType.name === name);
      const isPreviouslyInstalled = getBlockType(name);
      return isJustInstalled || !isPreviouslyInstalled;
    });

    // Keep identity of the `downloadableBlocks` array if nothing was filtered out
    if (installableBlocks.length !== downloadableBlocks.length) {
      downloadableBlocks = installableBlocks;
    }

    // Return identical empty array when there are no blocks
    if (downloadableBlocks.length === 0) {
      downloadableBlocks = EMPTY_ARRAY;
    }
  }
  return {
    hasPermission,
    downloadableBlocks,
    isLoading: isRequestingDownloadableBlocks(filterValue)
  };
}, [filterValue]);
export default function DownloadableBlocksPanel({
  onSelect,
  onHover,
  hasLocalBlocks,
  isTyping,
  filterValue
}) {
  const {
    hasPermission,
    downloadableBlocks,
    isLoading
  } = useDownloadableBlocks(filterValue);
  if (hasPermission === undefined || isLoading || isTyping) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [hasPermission && !hasLocalBlocks && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("p", {
          className: "block-directory-downloadable-blocks-panel__no-local",
          children: __('No results available from your installed blocks.')
        }), /*#__PURE__*/_jsx("div", {
          className: "block-editor-inserter__quick-inserter-separator"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "block-directory-downloadable-blocks-panel has-blocks-loading",
        children: /*#__PURE__*/_jsx(Spinner, {})
      })]
    });
  }
  if (false === hasPermission) {
    if (!hasLocalBlocks) {
      return /*#__PURE__*/_jsx(DownloadableBlocksNoResults, {});
    }
    return null;
  }
  if (downloadableBlocks.length === 0) {
    return hasLocalBlocks ? null : /*#__PURE__*/_jsx(DownloadableBlocksNoResults, {});
  }
  return /*#__PURE__*/_jsx(DownloadableBlocksInserterPanel, {
    downloadableItems: downloadableBlocks,
    hasLocalBlocks: hasLocalBlocks,
    children: /*#__PURE__*/_jsx(DownloadableBlocksList, {
      items: downloadableBlocks,
      onSelect: onSelect,
      onHover: onHover
    })
  });
}
//# sourceMappingURL=index.js.map
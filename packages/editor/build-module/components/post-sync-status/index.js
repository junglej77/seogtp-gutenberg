/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PostPanelRow from '../post-panel-row';
import { store as editorStore } from '../../store';

/**
 * Renders the sync status of a post.
 *
 * @return {JSX.Element|null} The rendered sync status component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export default function PostSyncStatus() {
  const {
    syncStatus,
    postType
  } = useSelect(select => {
    const {
      getEditedPostAttribute
    } = select(editorStore);
    const meta = getEditedPostAttribute('meta');

    // When the post is first created, the top level wp_pattern_sync_status is not set so get meta value instead.
    const currentSyncStatus = meta?.wp_pattern_sync_status === 'unsynced' ? 'unsynced' : getEditedPostAttribute('wp_pattern_sync_status');
    return {
      syncStatus: currentSyncStatus,
      postType: getEditedPostAttribute('type')
    };
  });
  if (postType !== 'wp_block') {
    return null;
  }
  return /*#__PURE__*/_jsx(PostPanelRow, {
    label: __('Sync status'),
    children: /*#__PURE__*/_jsx("div", {
      className: "editor-post-sync-status__value",
      children: syncStatus === 'unsynced' ? _x('Not synced', 'pattern (singular)') : _x('Synced', 'pattern (singular)')
    })
  });
}
//# sourceMappingURL=index.js.map
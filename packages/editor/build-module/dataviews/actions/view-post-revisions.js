/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const viewPostRevisions = {
  id: 'view-post-revisions',
  context: 'list',
  label(items) {
    var _items$0$_links$versi;
    const revisionsCount = (_items$0$_links$versi = items[0]._links?.['version-history']?.[0]?.count) !== null && _items$0$_links$versi !== void 0 ? _items$0$_links$versi : 0;
    return sprintf( /* translators: %s: number of revisions */
    __('View revisions (%s)'), revisionsCount);
  },
  isEligible(post) {
    var _post$_links$predeces, _post$_links$version;
    if (post.status === 'trash') {
      return false;
    }
    const lastRevisionId = (_post$_links$predeces = post?._links?.['predecessor-version']?.[0]?.id) !== null && _post$_links$predeces !== void 0 ? _post$_links$predeces : null;
    const revisionsCount = (_post$_links$version = post?._links?.['version-history']?.[0]?.count) !== null && _post$_links$version !== void 0 ? _post$_links$version : 0;
    return !!lastRevisionId && revisionsCount > 1;
  },
  callback(posts, {
    onActionPerformed
  }) {
    const post = posts[0];
    const href = addQueryArgs('revision.php', {
      revision: post?._links?.['predecessor-version']?.[0]?.id
    });
    document.location.href = href;
    if (onActionPerformed) {
      onActionPerformed(posts);
    }
  }
};
export default viewPostRevisions;
//# sourceMappingURL=view-post-revisions.js.map
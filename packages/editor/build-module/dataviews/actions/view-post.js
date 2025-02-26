/**
 * WordPress dependencies
 */
import { external } from '@wordpress/icons';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const viewPost = {
  id: 'view-post',
  label: _x('View', 'verb'),
  isPrimary: true,
  icon: external,
  isEligible(post) {
    return post.status !== 'trash';
  },
  callback(posts, {
    onActionPerformed
  }) {
    const post = posts[0];
    window.open(post?.link, '_blank');
    if (onActionPerformed) {
      onActionPerformed(posts);
    }
  }
};
export default viewPost;
//# sourceMappingURL=view-post.js.map
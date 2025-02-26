/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { Icon, __experimentalHStack as HStack, __experimentalText as Text } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { TEMPLATE_POST_TYPE, TEMPLATE_PART_POST_TYPE, PATTERN_POST_TYPE, GLOBAL_POST_TYPES } from '../../store/constants';
import { unlock } from '../../lock-unlock';
import PostActions from '../post-actions';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostCardPanel({
  postType,
  postId,
  onActionPerformed
}) {
  const {
    isFrontPage,
    isPostsPage,
    title,
    icon,
    isSync
  } = useSelect(select => {
    const {
      __experimentalGetTemplateInfo
    } = select(editorStore);
    const {
      canUser,
      getEditedEntityRecord
    } = select(coreStore);
    const siteSettings = canUser('read', {
      kind: 'root',
      name: 'site'
    }) ? getEditedEntityRecord('root', 'site') : undefined;
    const _record = getEditedEntityRecord('postType', postType, postId);
    const _templateInfo = [TEMPLATE_POST_TYPE, TEMPLATE_PART_POST_TYPE].includes(postType) && __experimentalGetTemplateInfo(_record);
    let _isSync = false;
    if (GLOBAL_POST_TYPES.includes(postType)) {
      if (PATTERN_POST_TYPE === postType) {
        // When the post is first created, the top level wp_pattern_sync_status is not set so get meta value instead.
        const currentSyncStatus = _record?.meta?.wp_pattern_sync_status === 'unsynced' ? 'unsynced' : _record?.wp_pattern_sync_status;
        _isSync = currentSyncStatus !== 'unsynced';
      } else {
        _isSync = true;
      }
    }
    return {
      title: _templateInfo?.title || _record?.title,
      icon: unlock(select(editorStore)).getPostIcon(postType, {
        area: _record?.area
      }),
      isSync: _isSync,
      isFrontPage: siteSettings?.page_on_front === postId,
      isPostsPage: siteSettings?.page_for_posts === postId
    };
  }, [postId, postType]);
  return /*#__PURE__*/_jsx("div", {
    className: "editor-post-card-panel",
    children: /*#__PURE__*/_jsxs(HStack, {
      spacing: 2,
      className: "editor-post-card-panel__header",
      align: "flex-start",
      children: [/*#__PURE__*/_jsx(Icon, {
        className: clsx('editor-post-card-panel__icon', {
          'is-sync': isSync
        }),
        icon: icon
      }), /*#__PURE__*/_jsxs(Text, {
        numberOfLines: 2,
        truncate: true,
        className: "editor-post-card-panel__title",
        weight: 500,
        as: "h2",
        lineHeight: "20px",
        children: [title ? decodeEntities(title) : __('No title'), isFrontPage && /*#__PURE__*/_jsx("span", {
          className: "editor-post-card-panel__title-badge",
          children: __('Homepage')
        }), isPostsPage && /*#__PURE__*/_jsx("span", {
          className: "editor-post-card-panel__title-badge",
          children: __('Posts Page')
        })]
      }), /*#__PURE__*/_jsx(PostActions, {
        postType: postType,
        postId: postId,
        onActionPerformed: onActionPerformed
      })]
    })
  });
}
//# sourceMappingURL=index.js.map
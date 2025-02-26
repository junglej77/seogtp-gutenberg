/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import PluginPostStatusInfo from '../plugin-post-status-info';
import PostAuthorPanel from '../post-author/panel';
import PostCardPanel from '../post-card-panel';
import PostContentInformation from '../post-content-information';
import PageAttributesPanel from '../page-attributes/panel';
import PostDiscussionPanel from '../post-discussion/panel';
import { PrivatePostExcerptPanel as PostExcerptPanel } from '../post-excerpt/panel';
import PostFeaturedImagePanel from '../post-featured-image/panel';
import PostFormatPanel from '../post-format/panel';
import PostLastEditedPanel from '../post-last-edited-panel';
import PostPanelSection from '../post-panel-section';
import PostSchedulePanel from '../post-schedule/panel';
import PostStatusPanel from '../post-status';
import PostSyncStatus from '../post-sync-status';
import PostTemplatePanel from '../post-template/panel';
import PostURLPanel from '../post-url/panel';
import BlogTitle from '../blog-title';
import PostsPerPage from '../posts-per-page';
import SiteDiscussion from '../site-discussion';
import { store as editorStore } from '../../store';
import { PrivatePostLastRevision } from '../post-last-revision';
import PostTrash from '../post-trash';

/**
 * Module Constants
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const PANEL_NAME = 'post-status';
export default function PostSummary({
  onActionPerformed
}) {
  const {
    isRemovedPostStatusPanel,
    postType,
    postId
  } = useSelect(select => {
    // We use isEditorPanelRemoved to hide the panel if it was programatically removed. We do
    // not use isEditorPanelEnabled since this panel should not be disabled through the UI.
    const {
      isEditorPanelRemoved,
      getCurrentPostType,
      getCurrentPostId
    } = select(editorStore);
    return {
      isRemovedPostStatusPanel: isEditorPanelRemoved(PANEL_NAME),
      postType: getCurrentPostType(),
      postId: getCurrentPostId()
    };
  }, []);
  return /*#__PURE__*/_jsx(PostPanelSection, {
    className: "editor-post-summary",
    children: /*#__PURE__*/_jsx(PluginPostStatusInfo.Slot, {
      children: fills => /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsxs(VStack, {
          spacing: 4,
          children: [/*#__PURE__*/_jsx(PostCardPanel, {
            postType: postType,
            postId: postId,
            onActionPerformed: onActionPerformed
          }), /*#__PURE__*/_jsx(PostFeaturedImagePanel, {
            withPanelBody: false
          }), /*#__PURE__*/_jsx(PostExcerptPanel, {}), /*#__PURE__*/_jsxs(VStack, {
            spacing: 1,
            children: [/*#__PURE__*/_jsx(PostContentInformation, {}), /*#__PURE__*/_jsx(PostLastEditedPanel, {})]
          }), !isRemovedPostStatusPanel && /*#__PURE__*/_jsxs(VStack, {
            spacing: 4,
            children: [/*#__PURE__*/_jsxs(VStack, {
              spacing: 1,
              children: [/*#__PURE__*/_jsx(PostStatusPanel, {}), /*#__PURE__*/_jsx(PostSchedulePanel, {}), /*#__PURE__*/_jsx(PostURLPanel, {}), /*#__PURE__*/_jsx(PostAuthorPanel, {}), /*#__PURE__*/_jsx(PostTemplatePanel, {}), /*#__PURE__*/_jsx(PostDiscussionPanel, {}), /*#__PURE__*/_jsx(PrivatePostLastRevision, {}), /*#__PURE__*/_jsx(PageAttributesPanel, {}), /*#__PURE__*/_jsx(PostSyncStatus, {}), /*#__PURE__*/_jsx(BlogTitle, {}), /*#__PURE__*/_jsx(PostsPerPage, {}), /*#__PURE__*/_jsx(SiteDiscussion, {}), /*#__PURE__*/_jsx(PostFormatPanel, {})]
            }), /*#__PURE__*/_jsx(PostTrash, {}), fills]
          })]
        })
      })
    })
  });
}
//# sourceMappingURL=post-summary.js.map
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { wordpress } from '@wordpress/icons';
import { filterURLForDisplay } from '@wordpress/url';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import PostVisibility from '../post-visibility';
import PostVisibilityLabel from '../post-visibility/label';
import PostSchedule from '../post-schedule';
import PostScheduleLabel from '../post-schedule/label';
import MaybeTagsPanel from './maybe-tags-panel';
import MaybePostFormatPanel from './maybe-post-format-panel';
import { store as editorStore } from '../../store';
import MaybeCategoryPanel from './maybe-category-panel';
import MaybeUploadMedia from './maybe-upload-media';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function PostPublishPanelPrepublish({
  children
}) {
  const {
    isBeingScheduled,
    isRequestingSiteIcon,
    hasPublishAction,
    siteIconUrl,
    siteTitle,
    siteHome
  } = useSelect(select => {
    var _getCurrentPost$_link;
    const {
      getCurrentPost,
      isEditedPostBeingScheduled
    } = select(editorStore);
    const {
      getEntityRecord,
      isResolving
    } = select(coreStore);
    const siteData = getEntityRecord('root', '__unstableBase', undefined) || {};
    return {
      hasPublishAction: (_getCurrentPost$_link = getCurrentPost()._links?.['wp:action-publish']) !== null && _getCurrentPost$_link !== void 0 ? _getCurrentPost$_link : false,
      isBeingScheduled: isEditedPostBeingScheduled(),
      isRequestingSiteIcon: isResolving('getEntityRecord', ['root', '__unstableBase', undefined]),
      siteIconUrl: siteData.site_icon_url,
      siteTitle: siteData.name,
      siteHome: siteData.home && filterURLForDisplay(siteData.home)
    };
  }, []);
  let siteIcon = /*#__PURE__*/_jsx(Icon, {
    className: "components-site-icon",
    size: "36px",
    icon: wordpress
  });
  if (siteIconUrl) {
    siteIcon = /*#__PURE__*/_jsx("img", {
      alt: __('Site Icon'),
      className: "components-site-icon",
      src: siteIconUrl
    });
  }
  if (isRequestingSiteIcon) {
    siteIcon = null;
  }
  let prePublishTitle, prePublishBodyText;
  if (!hasPublishAction) {
    prePublishTitle = __('Are you ready to submit for review?');
    prePublishBodyText = __('When you’re ready, submit your work for review, and an Editor will be able to approve it for you.');
  } else if (isBeingScheduled) {
    prePublishTitle = __('Are you ready to schedule?');
    prePublishBodyText = __('Your work will be published at the specified date and time.');
  } else {
    prePublishTitle = __('Are you ready to publish?');
    prePublishBodyText = __('Double-check your settings before publishing.');
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-post-publish-panel__prepublish",
    children: [/*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx("strong", {
        children: prePublishTitle
      })
    }), /*#__PURE__*/_jsx("p", {
      children: prePublishBodyText
    }), /*#__PURE__*/_jsxs("div", {
      className: "components-site-card",
      children: [siteIcon, /*#__PURE__*/_jsxs("div", {
        className: "components-site-info",
        children: [/*#__PURE__*/_jsx("span", {
          className: "components-site-name",
          children: decodeEntities(siteTitle) || __('(Untitled)')
        }), /*#__PURE__*/_jsx("span", {
          className: "components-site-home",
          children: siteHome
        })]
      })]
    }), /*#__PURE__*/_jsx(MaybeUploadMedia, {}), hasPublishAction && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(PanelBody, {
        initialOpen: false,
        title: [__('Visibility:'), /*#__PURE__*/_jsx("span", {
          className: "editor-post-publish-panel__link",
          children: /*#__PURE__*/_jsx(PostVisibilityLabel, {})
        }, "label")],
        children: /*#__PURE__*/_jsx(PostVisibility, {})
      }), /*#__PURE__*/_jsx(PanelBody, {
        initialOpen: false,
        title: [__('Publish:'), /*#__PURE__*/_jsx("span", {
          className: "editor-post-publish-panel__link",
          children: /*#__PURE__*/_jsx(PostScheduleLabel, {})
        }, "label")],
        children: /*#__PURE__*/_jsx(PostSchedule, {})
      })]
    }), /*#__PURE__*/_jsx(MaybePostFormatPanel, {}), /*#__PURE__*/_jsx(MaybeTagsPanel, {}), /*#__PURE__*/_jsx(MaybeCategoryPanel, {}), children]
  });
}
export default PostPublishPanelPrepublish;
//# sourceMappingURL=prepublish.js.map
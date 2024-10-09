/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Button, Spinner, CheckboxControl, withFocusReturn, withConstrainedTabbing } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { closeSmall } from '@wordpress/icons';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import PostPublishButton from '../post-publish-button';
import PostPublishPanelPrepublish from './prepublish';
import PostPublishPanelPostpublish from './postpublish';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export class PostPublishPanel extends Component {
  constructor() {
    super(...arguments);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    // Automatically collapse the publish sidebar when a post
    // is published and the user makes an edit.
    if (prevProps.isPublished && !this.props.isSaving && this.props.isDirty) {
      this.props.onClose();
    }
  }
  onSubmit() {
    const {
      onClose,
      hasPublishAction,
      isPostTypeViewable
    } = this.props;
    if (!hasPublishAction || !isPostTypeViewable) {
      onClose();
    }
  }
  render() {
    const {
      forceIsDirty,
      isBeingScheduled,
      isPublished,
      isPublishSidebarEnabled,
      isScheduled,
      isSaving,
      isSavingNonPostEntityChanges,
      onClose,
      onTogglePublishSidebar,
      PostPublishExtension,
      PrePublishExtension,
      ...additionalProps
    } = this.props;
    const {
      hasPublishAction,
      isDirty,
      isPostTypeViewable,
      ...propsForPanel
    } = additionalProps;
    const isPublishedOrScheduled = isPublished || isScheduled && isBeingScheduled;
    const isPrePublish = !isPublishedOrScheduled && !isSaving;
    const isPostPublish = isPublishedOrScheduled && !isSaving;
    return /*#__PURE__*/_jsxs("div", {
      className: "editor-post-publish-panel",
      ...propsForPanel,
      children: [/*#__PURE__*/_jsx("div", {
        className: "editor-post-publish-panel__header",
        children: isPostPublish ? /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          onClick: onClose,
          icon: closeSmall,
          label: __('Close panel')
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "editor-post-publish-panel__header-publish-button",
            children: /*#__PURE__*/_jsx(PostPublishButton, {
              focusOnMount: true,
              onSubmit: this.onSubmit,
              forceIsDirty: forceIsDirty
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "editor-post-publish-panel__header-cancel-button",
            children: /*#__PURE__*/_jsx(Button, {
              accessibleWhenDisabled: true,
              disabled: isSavingNonPostEntityChanges,
              onClick: onClose,
              variant: "secondary",
              size: "compact",
              children: __('Cancel')
            })
          })]
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "editor-post-publish-panel__content",
        children: [isPrePublish && /*#__PURE__*/_jsx(PostPublishPanelPrepublish, {
          children: PrePublishExtension && /*#__PURE__*/_jsx(PrePublishExtension, {})
        }), isPostPublish && /*#__PURE__*/_jsx(PostPublishPanelPostpublish, {
          focusOnMount: true,
          children: PostPublishExtension && /*#__PURE__*/_jsx(PostPublishExtension, {})
        }), isSaving && /*#__PURE__*/_jsx(Spinner, {})]
      }), /*#__PURE__*/_jsx("div", {
        className: "editor-post-publish-panel__footer",
        children: /*#__PURE__*/_jsx(CheckboxControl, {
          __nextHasNoMarginBottom: true,
          label: __('Always show pre-publish checks.'),
          checked: isPublishSidebarEnabled,
          onChange: onTogglePublishSidebar
        })
      })]
    });
  }
}

/**
 * Renders a panel for publishing a post.
 */
export default compose([withSelect(select => {
  var _getCurrentPost$_link;
  const {
    getPostType
  } = select(coreStore);
  const {
    getCurrentPost,
    getEditedPostAttribute,
    isCurrentPostPublished,
    isCurrentPostScheduled,
    isEditedPostBeingScheduled,
    isEditedPostDirty,
    isAutosavingPost,
    isSavingPost,
    isSavingNonPostEntityChanges
  } = select(editorStore);
  const {
    isPublishSidebarEnabled
  } = select(editorStore);
  const postType = getPostType(getEditedPostAttribute('type'));
  return {
    hasPublishAction: (_getCurrentPost$_link = getCurrentPost()._links?.['wp:action-publish']) !== null && _getCurrentPost$_link !== void 0 ? _getCurrentPost$_link : false,
    isPostTypeViewable: postType?.viewable,
    isBeingScheduled: isEditedPostBeingScheduled(),
    isDirty: isEditedPostDirty(),
    isPublished: isCurrentPostPublished(),
    isPublishSidebarEnabled: isPublishSidebarEnabled(),
    isSaving: isSavingPost() && !isAutosavingPost(),
    isSavingNonPostEntityChanges: isSavingNonPostEntityChanges(),
    isScheduled: isCurrentPostScheduled()
  };
}), withDispatch((dispatch, {
  isPublishSidebarEnabled
}) => {
  const {
    disablePublishSidebar,
    enablePublishSidebar
  } = dispatch(editorStore);
  return {
    onTogglePublishSidebar: () => {
      if (isPublishSidebarEnabled) {
        disablePublishSidebar();
      } else {
        enablePublishSidebar();
      }
    }
  };
}), withFocusReturn, withConstrainedTabbing])(PostPublishPanel);
//# sourceMappingURL=index.js.map
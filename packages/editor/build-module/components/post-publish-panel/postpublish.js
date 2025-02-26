/**
 * WordPress dependencies
 */
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { Component, createRef } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { addQueryArgs, safeDecodeURIComponent } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { useCopyToClipboard } from '@wordpress/compose';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import PostScheduleLabel from '../post-schedule/label';
import { store as editorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const POSTNAME = '%postname%';
const PAGENAME = '%pagename%';

/**
 * Returns URL for a future post.
 *
 * @param {Object} post Post object.
 *
 * @return {string} PostPublish URL.
 */

const getFuturePostUrl = post => {
  const {
    slug
  } = post;
  if (post.permalink_template.includes(POSTNAME)) {
    return post.permalink_template.replace(POSTNAME, slug);
  }
  if (post.permalink_template.includes(PAGENAME)) {
    return post.permalink_template.replace(PAGENAME, slug);
  }
  return post.permalink_template;
};
function CopyButton({
  text,
  onCopy,
  children
}) {
  const ref = useCopyToClipboard(text, onCopy);
  return /*#__PURE__*/_jsx(Button, {
    __next40pxDefaultSize: true,
    variant: "secondary",
    ref: ref,
    children: children
  });
}
class PostPublishPanelPostpublish extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showCopyConfirmation: false
    };
    this.onCopy = this.onCopy.bind(this);
    this.onSelectInput = this.onSelectInput.bind(this);
    this.postLink = createRef();
  }
  componentDidMount() {
    if (this.props.focusOnMount) {
      this.postLink.current.focus();
    }
  }
  componentWillUnmount() {
    clearTimeout(this.dismissCopyConfirmation);
  }
  onCopy() {
    this.setState({
      showCopyConfirmation: true
    });
    clearTimeout(this.dismissCopyConfirmation);
    this.dismissCopyConfirmation = setTimeout(() => {
      this.setState({
        showCopyConfirmation: false
      });
    }, 4000);
  }
  onSelectInput(event) {
    event.target.select();
  }
  render() {
    const {
      children,
      isScheduled,
      post,
      postType
    } = this.props;
    const postLabel = postType?.labels?.singular_name;
    const viewPostLabel = postType?.labels?.view_item;
    const addNewPostLabel = postType?.labels?.add_new_item;
    const link = post.status === 'future' ? getFuturePostUrl(post) : post.link;
    const addLink = addQueryArgs('post-new.php', {
      post_type: post.type
    });
    const postPublishNonLinkHeader = isScheduled ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [__('is now scheduled. It will go live on'), ' ', /*#__PURE__*/_jsx(PostScheduleLabel, {}), "."]
    }) : __('is now live.');
    return /*#__PURE__*/_jsxs("div", {
      className: "post-publish-panel__postpublish",
      children: [/*#__PURE__*/_jsxs(PanelBody, {
        className: "post-publish-panel__postpublish-header",
        children: [/*#__PURE__*/_jsx("a", {
          ref: this.postLink,
          href: link,
          children: decodeEntities(post.title) || __('(no title)')
        }), ' ', postPublishNonLinkHeader]
      }), /*#__PURE__*/_jsxs(PanelBody, {
        children: [/*#__PURE__*/_jsx("p", {
          className: "post-publish-panel__postpublish-subheader",
          children: /*#__PURE__*/_jsx("strong", {
            children: __('What’s next?')
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "post-publish-panel__postpublish-post-address-container",
          children: [/*#__PURE__*/_jsx(TextControl, {
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true,
            className: "post-publish-panel__postpublish-post-address",
            readOnly: true,
            label: sprintf( /* translators: %s: post type singular name */
            __('%s address'), postLabel),
            value: safeDecodeURIComponent(link),
            onFocus: this.onSelectInput
          }), /*#__PURE__*/_jsx("div", {
            className: "post-publish-panel__postpublish-post-address__copy-button-wrap",
            children: /*#__PURE__*/_jsx(CopyButton, {
              text: link,
              onCopy: this.onCopy,
              children: this.state.showCopyConfirmation ? __('Copied!') : __('Copy')
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "post-publish-panel__postpublish-buttons",
          children: [!isScheduled && /*#__PURE__*/_jsx(Button, {
            variant: "primary",
            href: link,
            __next40pxDefaultSize: true,
            children: viewPostLabel
          }), /*#__PURE__*/_jsx(Button, {
            variant: isScheduled ? 'primary' : 'secondary',
            __next40pxDefaultSize: true,
            href: addLink,
            children: addNewPostLabel
          })]
        })]
      }), children]
    });
  }
}
export default withSelect(select => {
  const {
    getEditedPostAttribute,
    getCurrentPost,
    isCurrentPostScheduled
  } = select(editorStore);
  const {
    getPostType
  } = select(coreStore);
  return {
    post: getCurrentPost(),
    postType: getPostType(getEditedPostAttribute('type')),
    isScheduled: isCurrentPostScheduled()
  };
})(PostPublishPanelPostpublish);
//# sourceMappingURL=postpublish.js.map
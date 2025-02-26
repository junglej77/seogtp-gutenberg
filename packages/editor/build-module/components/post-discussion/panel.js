/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Dropdown, Button, __experimentalVStack as VStack } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState, useMemo } from '@wordpress/element';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostTypeSupportCheck from '../post-type-support-check';
import PostComments from '../post-comments';
import PostPingbacks from '../post-pingbacks';
import PostPanelRow from '../post-panel-row';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const PANEL_NAME = 'discussion-panel';
function ModalContents({
  onClose
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "editor-post-discussion",
    children: [/*#__PURE__*/_jsx(InspectorPopoverHeader, {
      title: __('Discussion'),
      onClose: onClose
    }), /*#__PURE__*/_jsxs(VStack, {
      spacing: 4,
      children: [/*#__PURE__*/_jsx(PostTypeSupportCheck, {
        supportKeys: "comments",
        children: /*#__PURE__*/_jsx(PostComments, {})
      }), /*#__PURE__*/_jsx(PostTypeSupportCheck, {
        supportKeys: "trackbacks",
        children: /*#__PURE__*/_jsx(PostPingbacks, {})
      })]
    })]
  });
}
function PostDiscussionToggle({
  isOpen,
  onClick
}) {
  const {
    commentStatus,
    pingStatus,
    commentsSupported,
    trackbacksSupported
  } = useSelect(select => {
    var _getEditedPostAttribu, _getEditedPostAttribu2;
    const {
      getEditedPostAttribute
    } = select(editorStore);
    const {
      getPostType
    } = select(coreStore);
    const postType = getPostType(getEditedPostAttribute('type'));
    return {
      commentStatus: (_getEditedPostAttribu = getEditedPostAttribute('comment_status')) !== null && _getEditedPostAttribu !== void 0 ? _getEditedPostAttribu : 'open',
      pingStatus: (_getEditedPostAttribu2 = getEditedPostAttribute('ping_status')) !== null && _getEditedPostAttribu2 !== void 0 ? _getEditedPostAttribu2 : 'open',
      commentsSupported: !!postType.supports.comments,
      trackbacksSupported: !!postType.supports.trackbacks
    };
  }, []);
  let label;
  if (commentStatus === 'open') {
    if (pingStatus === 'open') {
      label = _x('Open', 'Adjective: e.g. "Comments are open"');
    } else {
      label = trackbacksSupported ? __('Comments only') : _x('Open', 'Adjective: e.g. "Comments are open"');
    }
  } else if (pingStatus === 'open') {
    label = commentsSupported ? __('Pings only') : __('Pings enabled');
  } else {
    label = __('Closed');
  }
  return /*#__PURE__*/_jsx(Button, {
    size: "compact",
    className: "editor-post-discussion__panel-toggle",
    variant: "tertiary",
    "aria-label": __('Change discussion options'),
    "aria-expanded": isOpen,
    onClick: onClick,
    children: label
  });
}

/**
 * This component allows to update comment and pingback
 * settings for the current post. Internally there are
 * checks whether the current post has support for the
 * above and if the `discussion-panel` panel is enabled.
 *
 * @return {JSX.Element|null} The rendered PostDiscussionPanel component.
 */
export default function PostDiscussionPanel() {
  const {
    isEnabled
  } = useSelect(select => {
    const {
      isEditorPanelEnabled
    } = select(editorStore);
    return {
      isEnabled: isEditorPanelEnabled(PANEL_NAME)
    };
  }, []);

  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  // Memoize popoverProps to avoid returning a new object every time.
  const popoverProps = useMemo(() => ({
    // Anchor the popover to the middle of the entire row so that it doesn't
    // move around when the label changes.
    anchor: popoverAnchor,
    placement: 'left-start',
    offset: 36,
    shift: true
  }), [popoverAnchor]);
  if (!isEnabled) {
    return null;
  }
  return /*#__PURE__*/_jsx(PostTypeSupportCheck, {
    supportKeys: ['comments', 'trackbacks'],
    children: /*#__PURE__*/_jsx(PostPanelRow, {
      label: __('Discussion'),
      ref: setPopoverAnchor,
      children: /*#__PURE__*/_jsx(Dropdown, {
        popoverProps: popoverProps,
        className: "editor-post-discussion__panel-dropdown",
        contentClassName: "editor-post-discussion__panel-dialog",
        focusOnMount: true,
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/_jsx(PostDiscussionToggle, {
          isOpen: isOpen,
          onClick: onToggle
        }),
        renderContent: ({
          onClose
        }) => /*#__PURE__*/_jsx(ModalContents, {
          onClose: onClose
        })
      })
    })
  });
}
//# sourceMappingURL=panel.js.map
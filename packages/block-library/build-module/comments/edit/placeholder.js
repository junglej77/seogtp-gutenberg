/**
 * WordPress dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CommentsForm from '../../post-comments-form/form';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PostCommentsPlaceholder({
  postType,
  postId
}) {
  let [postTitle] = useEntityProp('postType', postType, 'title', postId);
  postTitle = postTitle || __('Post Title');
  const {
    avatarURL
  } = useSelect(select => select(blockEditorStore).getSettings().__experimentalDiscussionSettings);
  return /*#__PURE__*/_jsxs("div", {
    className: "wp-block-comments__legacy-placeholder",
    inert: "true",
    children: [/*#__PURE__*/_jsx("h3", {
      children: /* translators: %s: Post title. */
      sprintf(__('One response to %s'), postTitle)
    }), /*#__PURE__*/_jsxs("div", {
      className: "navigation",
      children: [/*#__PURE__*/_jsx("div", {
        className: "alignleft",
        children: /*#__PURE__*/_jsxs("a", {
          href: "#top",
          children: ["\xAB ", __('Older Comments')]
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "alignright",
        children: /*#__PURE__*/_jsxs("a", {
          href: "#top",
          children: [__('Newer Comments'), " \xBB"]
        })
      })]
    }), /*#__PURE__*/_jsx("ol", {
      className: "commentlist",
      children: /*#__PURE__*/_jsx("li", {
        className: "comment even thread-even depth-1",
        children: /*#__PURE__*/_jsxs("article", {
          className: "comment-body",
          children: [/*#__PURE__*/_jsxs("footer", {
            className: "comment-meta",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "comment-author vcard",
              children: [/*#__PURE__*/_jsx("img", {
                alt: __('Commenter Avatar'),
                src: avatarURL,
                className: "avatar avatar-32 photo",
                height: "32",
                width: "32",
                loading: "lazy"
              }), /*#__PURE__*/_jsx("b", {
                className: "fn",
                children: /*#__PURE__*/_jsx("a", {
                  href: "#top",
                  className: "url",
                  children: __('A WordPress Commenter')
                })
              }), ' ', /*#__PURE__*/_jsxs("span", {
                className: "says",
                children: [__('says'), ":"]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "comment-metadata",
              children: [/*#__PURE__*/_jsx("a", {
                href: "#top",
                children: /*#__PURE__*/_jsx("time", {
                  dateTime: "2000-01-01T00:00:00+00:00",
                  children: __('January 1, 2000 at 00:00 am')
                })
              }), ' ', /*#__PURE__*/_jsx("span", {
                className: "edit-link",
                children: /*#__PURE__*/_jsx("a", {
                  className: "comment-edit-link",
                  href: "#top",
                  children: __('Edit')
                })
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "comment-content",
            children: /*#__PURE__*/_jsxs("p", {
              children: [__('Hi, this is a comment.'), /*#__PURE__*/_jsx("br", {}), __('To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.'), /*#__PURE__*/_jsx("br", {}), createInterpolateElement(__('Commenter avatars come from <a>Gravatar</a>.'), {
                a:
                /*#__PURE__*/
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                _jsx("a", {
                  href: "https://gravatar.com/"
                })
              })]
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "reply",
            children: /*#__PURE__*/_jsx("a", {
              className: "comment-reply-link",
              href: "#top",
              "aria-label": __('Reply to A WordPress Commenter'),
              children: __('Reply')
            })
          })]
        })
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "navigation",
      children: [/*#__PURE__*/_jsx("div", {
        className: "alignleft",
        children: /*#__PURE__*/_jsxs("a", {
          href: "#top",
          children: ["\xAB ", __('Older Comments')]
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "alignright",
        children: /*#__PURE__*/_jsxs("a", {
          href: "#top",
          children: [__('Newer Comments'), " \xBB"]
        })
      })]
    }), /*#__PURE__*/_jsx(CommentsForm, {
      postId: postId,
      postType: postType
    })]
  });
}
//# sourceMappingURL=placeholder.js.map
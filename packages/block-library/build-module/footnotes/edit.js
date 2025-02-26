/**
 * WordPress dependencies
 */
import { BlockIcon, RichText, useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import { formatListNumbered as icon } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function FootnotesEdit({
  context: {
    postType,
    postId
  }
}) {
  const [meta, updateMeta] = useEntityProp('postType', postType, 'meta', postId);
  const footnotesSupported = 'string' === typeof meta?.footnotes;
  const footnotes = meta?.footnotes ? JSON.parse(meta.footnotes) : [];
  const blockProps = useBlockProps();
  if (!footnotesSupported) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Placeholder, {
        icon: /*#__PURE__*/_jsx(BlockIcon, {
          icon: icon
        }),
        label: __('Footnotes'),
        instructions: __('Footnotes are not supported here. Add this block to post or page content.')
      })
    });
  }
  if (!footnotes.length) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Placeholder, {
        icon: /*#__PURE__*/_jsx(BlockIcon, {
          icon: icon
        }),
        label: __('Footnotes'),
        instructions: __('Footnotes found in blocks within this document will be displayed here.')
      })
    });
  }
  return /*#__PURE__*/_jsx("ol", {
    ...blockProps,
    children: footnotes.map(({
      id,
      content
    }) =>
    /*#__PURE__*/
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
    _jsxs("li", {
      onMouseDown: event => {
        // When clicking on the list item (not on descendants),
        // focus the rich text element since it's only 1px wide when
        // empty.
        if (event.target === event.currentTarget) {
          event.target.firstElementChild.focus();
          event.preventDefault();
        }
      },
      children: [/*#__PURE__*/_jsx(RichText, {
        id: id,
        tagName: "span",
        value: content,
        identifier: id
        // To do: figure out why the browser is not scrolling
        // into view when it receives focus.
        ,
        onFocus: event => {
          if (!event.target.textContent.trim()) {
            event.target.scrollIntoView();
          }
        },
        onChange: nextFootnote => {
          updateMeta({
            ...meta,
            footnotes: JSON.stringify(footnotes.map(footnote => {
              return footnote.id === id ? {
                content: nextFootnote,
                id
              } : footnote;
            }))
          });
        }
      }), ' ', /*#__PURE__*/_jsx("a", {
        href: `#${id}-link`,
        children: "\u21A9\uFE0E"
      })]
    }, id))
  });
}
//# sourceMappingURL=edit.js.map
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, PlainText } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const arrowMap = {
  none: '',
  arrow: '→',
  chevron: '»'
};
export default function CommentsPaginationNextEdit({
  attributes: {
    label
  },
  setAttributes,
  context: {
    'comments/paginationArrow': paginationArrow
  }
}) {
  const displayArrow = arrowMap[paginationArrow];
  return /*#__PURE__*/_jsxs("a", {
    href: "#comments-pagination-next-pseudo-link",
    onClick: event => event.preventDefault(),
    ...useBlockProps(),
    children: [/*#__PURE__*/_jsx(PlainText, {
      __experimentalVersion: 2,
      tagName: "span",
      "aria-label": __('Newer comments page link'),
      placeholder: __('Newer Comments'),
      value: label,
      onChange: newLabel => setAttributes({
        label: newLabel
      })
    }), displayArrow && /*#__PURE__*/_jsx("span", {
      className: `wp-block-comments-pagination-next-arrow is-arrow-${paginationArrow}`,
      children: displayArrow
    })]
  });
}
//# sourceMappingURL=edit.js.map
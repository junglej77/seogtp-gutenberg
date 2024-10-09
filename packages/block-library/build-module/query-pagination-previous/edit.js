/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, PlainText } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const arrowMap = {
  none: '',
  arrow: '←',
  chevron: '«'
};
export default function QueryPaginationPreviousEdit({
  attributes: {
    label
  },
  setAttributes,
  context: {
    paginationArrow,
    showLabel
  }
}) {
  const displayArrow = arrowMap[paginationArrow];
  return /*#__PURE__*/_jsxs("a", {
    href: "#pagination-previous-pseudo-link",
    onClick: event => event.preventDefault(),
    ...useBlockProps(),
    children: [displayArrow && /*#__PURE__*/_jsx("span", {
      className: `wp-block-query-pagination-previous-arrow is-arrow-${paginationArrow}`,
      "aria-hidden": true,
      children: displayArrow
    }), showLabel && /*#__PURE__*/_jsx(PlainText, {
      __experimentalVersion: 2,
      tagName: "span",
      "aria-label": __('Previous page link'),
      placeholder: __('Previous Page'),
      value: label,
      onChange: newLabel => setAttributes({
        label: newLabel
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map
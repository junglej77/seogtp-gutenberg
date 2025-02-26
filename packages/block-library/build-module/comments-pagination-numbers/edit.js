/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const PaginationItem = ({
  content,
  tag: Tag = 'a',
  extraClass = ''
}) => Tag === 'a' ? /*#__PURE__*/_jsx(Tag, {
  className: `page-numbers ${extraClass}`,
  href: "#comments-pagination-numbers-pseudo-link",
  onClick: event => event.preventDefault(),
  children: content
}) : /*#__PURE__*/_jsx(Tag, {
  className: `page-numbers ${extraClass}`,
  children: content
});
export default function CommentsPaginationNumbersEdit() {
  return /*#__PURE__*/_jsxs("div", {
    ...useBlockProps(),
    children: [/*#__PURE__*/_jsx(PaginationItem, {
      content: "1"
    }), /*#__PURE__*/_jsx(PaginationItem, {
      content: "2"
    }), /*#__PURE__*/_jsx(PaginationItem, {
      content: "3",
      tag: "span",
      extraClass: "current"
    }), /*#__PURE__*/_jsx(PaginationItem, {
      content: "4"
    }), /*#__PURE__*/_jsx(PaginationItem, {
      content: "5"
    }), /*#__PURE__*/_jsx(PaginationItem, {
      content: "...",
      tag: "span",
      extraClass: "dots"
    }), /*#__PURE__*/_jsx(PaginationItem, {
      content: "8"
    })]
  });
}
//# sourceMappingURL=edit.js.map
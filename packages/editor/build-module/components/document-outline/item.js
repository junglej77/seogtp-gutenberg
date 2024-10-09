/**
 * External dependencies
 */
import clsx from 'clsx';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TableOfContentsItem = ({
  children,
  isValid,
  level,
  href,
  onSelect
}) => /*#__PURE__*/_jsx("li", {
  className: clsx('document-outline__item', `is-${level.toLowerCase()}`, {
    'is-invalid': !isValid
  }),
  children: /*#__PURE__*/_jsxs("a", {
    href: href,
    className: "document-outline__button",
    onClick: onSelect,
    children: [/*#__PURE__*/_jsx("span", {
      className: "document-outline__emdash",
      "aria-hidden": "true"
    }), /*#__PURE__*/_jsx("strong", {
      className: "document-outline__level",
      children: level
    }), /*#__PURE__*/_jsx("span", {
      className: "document-outline__item-content",
      children: children
    })]
  })
});
export default TableOfContentsItem;
//# sourceMappingURL=item.js.map
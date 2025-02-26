import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

const ENTRY_CLASS_NAME = 'wp-block-table-of-contents__entry';
export default function TableOfContentsList({
  nestedHeadingList,
  disableLinkActivation,
  onClick
}) {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: nestedHeadingList.map((node, index) => {
      const {
        content,
        link
      } = node.heading;
      const entry = link ? /*#__PURE__*/_jsx("a", {
        className: ENTRY_CLASS_NAME,
        href: link,
        "aria-disabled": disableLinkActivation || undefined,
        onClick: disableLinkActivation && 'function' === typeof onClick ? onClick : undefined,
        children: content
      }) : /*#__PURE__*/_jsx("span", {
        className: ENTRY_CLASS_NAME,
        children: content
      });
      return /*#__PURE__*/_jsxs("li", {
        children: [entry, node.children ? /*#__PURE__*/_jsx("ol", {
          children: /*#__PURE__*/_jsx(TableOfContentsList, {
            nestedHeadingList: node.children,
            disableLinkActivation: disableLinkActivation,
            onClick: disableLinkActivation && 'function' === typeof onClick ? onClick : undefined
          })
        }) : null]
      }, index);
    })
  });
}
//# sourceMappingURL=list.js.map
/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { RawHTML } from '@wordpress/element';
import { safeHTML } from '@wordpress/dom';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BlockView({
  title,
  rawContent,
  renderedContent,
  action,
  actionText,
  className
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "block-editor-block-compare__content",
      children: [/*#__PURE__*/_jsx("h2", {
        className: "block-editor-block-compare__heading",
        children: title
      }), /*#__PURE__*/_jsx("div", {
        className: "block-editor-block-compare__html",
        children: rawContent
      }), /*#__PURE__*/_jsx("div", {
        className: "block-editor-block-compare__preview edit-post-visual-editor",
        children: /*#__PURE__*/_jsx(RawHTML, {
          children: safeHTML(renderedContent)
        })
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "block-editor-block-compare__action",
      children: /*#__PURE__*/_jsx(Button, {
        __next40pxDefaultSize: true,
        variant: "secondary",
        tabIndex: "0",
        onClick: action,
        children: actionText
      })
    })]
  });
}
//# sourceMappingURL=block-view.js.map
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const PostPanelRow = forwardRef(({
  className,
  label,
  children
}, ref) => {
  return /*#__PURE__*/_jsxs(HStack, {
    className: clsx('editor-post-panel__row', className),
    ref: ref,
    children: [label && /*#__PURE__*/_jsx("div", {
      className: "editor-post-panel__row-label",
      children: label
    }), /*#__PURE__*/_jsx("div", {
      className: "editor-post-panel__row-control",
      children: children
    })]
  });
});
export default PostPanelRow;
//# sourceMappingURL=index.js.map
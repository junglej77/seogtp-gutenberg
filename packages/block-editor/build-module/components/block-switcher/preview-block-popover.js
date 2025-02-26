/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockPreview from '../block-preview';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PreviewBlockPopover({
  blocks
}) {
  const isMobile = useViewportMatch('medium', '<');
  if (isMobile) {
    return null;
  }
  return /*#__PURE__*/_jsx("div", {
    className: "block-editor-block-switcher__popover-preview-container",
    children: /*#__PURE__*/_jsx(Popover, {
      className: "block-editor-block-switcher__popover-preview",
      placement: "right-start",
      focusOnMount: false,
      offset: 16,
      children: /*#__PURE__*/_jsxs("div", {
        className: "block-editor-block-switcher__preview",
        children: [/*#__PURE__*/_jsx("div", {
          className: "block-editor-block-switcher__preview-title",
          children: __('Preview')
        }), /*#__PURE__*/_jsx(BlockPreview, {
          viewportWidth: 500,
          blocks: blocks
        })]
      })
    })
  });
}
//# sourceMappingURL=preview-block-popover.js.map
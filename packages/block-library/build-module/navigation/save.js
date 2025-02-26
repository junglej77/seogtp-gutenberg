/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
export default function save({
  attributes
}) {
  if (attributes.ref) {
    // Avoid rendering inner blocks when a ref is defined.
    // When this id is defined the inner blocks are loaded from the
    // `wp_navigation` entity rather than the hard-coded block html.
    return;
  }
  return /*#__PURE__*/_jsx(InnerBlocks.Content, {});
}
//# sourceMappingURL=save.js.map
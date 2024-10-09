/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { insert } from '@wordpress/rich-text';
import { RichTextShortcut } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
const name = 'core/non-breaking-space';
const title = __('Non breaking space');
export const nonBreakingSpace = {
  name,
  title,
  tagName: 'nbsp',
  className: null,
  edit({
    value,
    onChange
  }) {
    function addNonBreakingSpace() {
      onChange(insert(value, '\u00a0'));
    }
    return /*#__PURE__*/_jsx(RichTextShortcut, {
      type: "primaryShift",
      character: " ",
      onUse: addNonBreakingSpace
    });
  }
};
//# sourceMappingURL=index.js.map
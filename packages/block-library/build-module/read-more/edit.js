/**
 * WordPress dependencies
 */
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ReadMore({
  attributes: {
    content,
    linkTarget
  },
  setAttributes,
  insertBlocksAfter
}) {
  const blockProps = useBlockProps();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Open in new tab'),
          onChange: value => setAttributes({
            linkTarget: value ? '_blank' : '_self'
          }),
          checked: linkTarget === '_blank'
        })
      })
    }), /*#__PURE__*/_jsx(RichText, {
      identifier: "content",
      tagName: "a",
      "aria-label": __('“Read more” link text'),
      placeholder: __('Read more'),
      value: content,
      onChange: newValue => setAttributes({
        content: newValue
      }),
      __unstableOnSplitAtEnd: () => insertBlocksAfter(createBlock(getDefaultBlockName())),
      withoutInteractiveFormatting: true,
      ...blockProps
    })]
  });
}
//# sourceMappingURL=edit.js.map
/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';
import { BlockControls, BlockAlignmentToolbar, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import deprecated from '@wordpress/deprecated';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TextColumnsEdit({
  attributes,
  setAttributes
}) {
  const {
    width,
    content,
    columns
  } = attributes;
  deprecated('The Text Columns block', {
    since: '5.3',
    alternative: 'the Columns block'
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(BlockAlignmentToolbar, {
        value: width,
        onChange: nextWidth => setAttributes({
          width: nextWidth
        }),
        controls: ['center', 'wide', 'full']
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        children: /*#__PURE__*/_jsx(RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Columns'),
          value: columns,
          onChange: value => setAttributes({
            columns: value
          }),
          min: 2,
          max: 4,
          required: true
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      ...useBlockProps({
        className: `align${width} columns-${columns}`
      }),
      children: Array.from({
        length: columns
      }).map((_, index) => {
        return /*#__PURE__*/_jsx("div", {
          className: "wp-block-column",
          children: /*#__PURE__*/_jsx(RichText, {
            tagName: "p",
            value: content?.[index]?.children,
            onChange: nextContent => {
              setAttributes({
                content: [...content.slice(0, index), {
                  children: nextContent
                }, ...content.slice(index + 1)]
              });
            },
            "aria-label": sprintf(
            // translators: %d: column index (starting with 1)
            __('Column %d text'), index + 1),
            placeholder: __('New Column')
          })
        }, `column-${index}`);
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map
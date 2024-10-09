/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const createPaginationItem = (content, Tag = 'a', extraClass = '') => /*#__PURE__*/_jsx(Tag, {
  className: `page-numbers ${extraClass}`,
  children: content
}, content);
const previewPaginationNumbers = midSize => {
  const paginationItems = [];

  // First set of pagination items.
  for (let i = 1; i <= midSize; i++) {
    paginationItems.push(createPaginationItem(i));
  }

  // Current pagination item.
  paginationItems.push(createPaginationItem(midSize + 1, 'span', 'current'));

  // Second set of pagination items.
  for (let i = 1; i <= midSize; i++) {
    paginationItems.push(createPaginationItem(midSize + 1 + i));
  }

  // Dots.
  paginationItems.push(createPaginationItem('...', 'span', 'dots'));

  // Last pagination item.
  paginationItems.push(createPaginationItem(midSize * 2 + 3));
  return /*#__PURE__*/_jsx(_Fragment, {
    children: paginationItems
  });
};
export default function QueryPaginationNumbersEdit({
  attributes,
  setAttributes
}) {
  const {
    midSize
  } = attributes;
  const paginationNumbers = previewPaginationNumbers(parseInt(midSize, 10));
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(PanelBody, {
        title: __('Settings'),
        children: /*#__PURE__*/_jsx(RangeControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: __('Number of links'),
          help: __('Specify how many links can appear before and after the current page number. Links to the first, current and last page are always visible.'),
          value: midSize,
          onChange: value => {
            setAttributes({
              midSize: parseInt(value, 10)
            });
          },
          min: 0,
          max: 5,
          withInputField: false
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      ...useBlockProps(),
      children: paginationNumbers
    })]
  });
}
//# sourceMappingURL=edit.js.map
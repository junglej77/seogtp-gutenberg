/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Edit({
  attributes: {
    linkTarget,
    textAlign
  },
  setAttributes
}) {
  const blockProps = useBlockProps({
    className: clsx({
      [`has-text-align-${textAlign}`]: textAlign
    })
  });
  const blockControls = /*#__PURE__*/_jsx(BlockControls, {
    group: "block",
    children: /*#__PURE__*/_jsx(AlignmentControl, {
      value: textAlign,
      onChange: newAlign => setAttributes({
        textAlign: newAlign
      })
    })
  });
  const inspectorControls = /*#__PURE__*/_jsx(InspectorControls, {
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
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [blockControls, inspectorControls, /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx("a", {
        href: "#edit-comment-pseudo-link",
        onClick: event => event.preventDefault(),
        children: __('Edit')
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map
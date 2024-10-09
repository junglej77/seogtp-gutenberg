/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl, SelectControl, Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function ArchivesEdit({
  attributes,
  setAttributes
}) {
  const {
    showLabel,
    showPostCounts,
    displayAsDropdown,
    type
  } = attributes;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display as dropdown'),
          checked: displayAsDropdown,
          onChange: () => setAttributes({
            displayAsDropdown: !displayAsDropdown
          })
        }), displayAsDropdown && /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show label'),
          checked: showLabel,
          onChange: () => setAttributes({
            showLabel: !showLabel
          })
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show post counts'),
          checked: showPostCounts,
          onChange: () => setAttributes({
            showPostCounts: !showPostCounts
          })
        }), /*#__PURE__*/_jsx(SelectControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: __('Group by:'),
          options: [{
            label: __('Year'),
            value: 'yearly'
          }, {
            label: __('Month'),
            value: 'monthly'
          }, {
            label: __('Week'),
            value: 'weekly'
          }, {
            label: __('Day'),
            value: 'daily'
          }],
          value: type,
          onChange: value => setAttributes({
            type: value
          })
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      ...useBlockProps(),
      children: /*#__PURE__*/_jsx(Disabled, {
        children: /*#__PURE__*/_jsx(ServerSideRender, {
          block: "core/archives",
          skipBlockSupportAttributes: true,
          attributes: attributes
        })
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map
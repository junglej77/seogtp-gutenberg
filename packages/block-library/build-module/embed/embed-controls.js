/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton, PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function getResponsiveHelp(checked) {
  return checked ? __('This embed will preserve its aspect ratio when the browser is resized.') : __('This embed may not preserve its aspect ratio when the browser is resized.');
}
const EmbedControls = ({
  blockSupportsResponsive,
  showEditButton,
  themeSupportsResponsive,
  allowResponsive,
  toggleResponsive,
  switchBackToURLInput
}) => /*#__PURE__*/_jsxs(_Fragment, {
  children: [/*#__PURE__*/_jsx(BlockControls, {
    children: /*#__PURE__*/_jsx(ToolbarGroup, {
      children: showEditButton && /*#__PURE__*/_jsx(ToolbarButton, {
        className: "components-toolbar__control",
        label: __('Edit URL'),
        icon: edit,
        onClick: switchBackToURLInput
      })
    })
  }), themeSupportsResponsive && blockSupportsResponsive && /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsx(PanelBody, {
      title: __('Media settings'),
      className: "blocks-responsive",
      children: /*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Resize for smaller devices'),
        checked: allowResponsive,
        help: getResponsiveHelp,
        onChange: toggleResponsive
      })
    })
  })]
});
export default EmbedControls;
//# sourceMappingURL=embed-controls.js.map
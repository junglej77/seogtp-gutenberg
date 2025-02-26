/**
 * Internal dependencies
 */
import EmbedLinkSettings from './embed-link-settings';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
// eslint-disable-next-line no-restricted-imports
import { store as editPostStore } from '@wordpress/edit-post';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function getResponsiveHelp(checked) {
  return checked ? __('This embed will preserve its aspect ratio when the browser is resized.') : __('This embed may not preserve its aspect ratio when the browser is resized.');
}
const EmbedControls = ({
  blockSupportsResponsive,
  themeSupportsResponsive,
  allowResponsive,
  toggleResponsive,
  url,
  linkLabel,
  onEditURL
}) => {
  const {
    closeGeneralSidebar: closeSettingsBottomSheet
  } = useDispatch(editPostStore);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(InspectorControls, {
      children: [themeSupportsResponsive && blockSupportsResponsive && /*#__PURE__*/_jsx(PanelBody, {
        title: __('Media settings'),
        children: /*#__PURE__*/_jsx(ToggleControl, {
          label: __('Resize for smaller devices'),
          checked: allowResponsive,
          help: getResponsiveHelp,
          onChange: toggleResponsive
        })
      }), /*#__PURE__*/_jsx(PanelBody, {
        title: __('Link settings'),
        children: /*#__PURE__*/_jsx(EmbedLinkSettings, {
          value: url,
          label: linkLabel,
          onSubmit: value => {
            closeSettingsBottomSheet();
            onEditURL(value);
          }
        })
      })]
    })
  });
};
export default EmbedControls;
//# sourceMappingURL=embed-controls.native.js.map
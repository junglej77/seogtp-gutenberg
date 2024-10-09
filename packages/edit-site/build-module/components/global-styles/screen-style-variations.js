/**
 * WordPress dependencies
 */
import { Card, CardBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useZoomOut } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import ScreenHeader from './header';
import SidebarNavigationScreenGlobalStylesContent from '../sidebar-navigation-screen-global-styles/content';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ScreenStyleVariations() {
  // Move to zoom out mode when this component is mounted
  // and back to the previous mode when unmounted.
  useZoomOut();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Browse styles'),
      description: __('Choose a variation to change the look of the site.')
    }), /*#__PURE__*/_jsx(Card, {
      size: "small",
      isBorderless: true,
      className: "edit-site-global-styles-screen-style-variations",
      children: /*#__PURE__*/_jsx(CardBody, {
        children: /*#__PURE__*/_jsx(SidebarNavigationScreenGlobalStylesContent, {})
      })
    })]
  });
}
export default ScreenStyleVariations;
//# sourceMappingURL=screen-style-variations.js.map
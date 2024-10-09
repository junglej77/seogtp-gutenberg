/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { privateApis as componentsPrivateApis } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ColorPalettePanel from './color-palette-panel';
import GradientPalettePanel from './gradients-palette-panel';
import ScreenHeader from './header';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  Tabs
} = unlock(componentsPrivateApis);
function ScreenColorPalette({
  name
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Edit palette'),
      description: __('The combination of colors used across the site and in color pickers.')
    }), /*#__PURE__*/_jsxs(Tabs, {
      children: [/*#__PURE__*/_jsxs(Tabs.TabList, {
        children: [/*#__PURE__*/_jsx(Tabs.Tab, {
          tabId: "color",
          children: __('Color')
        }), /*#__PURE__*/_jsx(Tabs.Tab, {
          tabId: "gradient",
          children: __('Gradient')
        })]
      }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
        tabId: "color",
        focusable: false,
        children: /*#__PURE__*/_jsx(ColorPalettePanel, {
          name: name
        })
      }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
        tabId: "gradient",
        focusable: false,
        children: /*#__PURE__*/_jsx(GradientPalettePanel, {
          name: name
        })
      })]
    })]
  });
}
export default ScreenColorPalette;
//# sourceMappingURL=screen-color-palette.js.map
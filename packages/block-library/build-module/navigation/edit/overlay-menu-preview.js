/**
 * WordPress dependencies
 */
import { ToggleControl, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import OverlayMenuIcon from './overlay-menu-icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function OverlayMenuPreview({
  setAttributes,
  hasIcon,
  icon
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Show icon button'),
      help: __('Configure the visual appearance of the button that toggles the overlay menu.'),
      onChange: value => setAttributes({
        hasIcon: value
      }),
      checked: hasIcon
    }), /*#__PURE__*/_jsxs(ToggleGroupControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      className: "wp-block-navigation__overlay-menu-icon-toggle-group",
      label: __('Icon'),
      value: icon,
      onChange: value => setAttributes({
        icon: value
      }),
      isBlock: true,
      children: [/*#__PURE__*/_jsx(ToggleGroupControlOption, {
        value: "handle",
        "aria-label": __('handle'),
        label: /*#__PURE__*/_jsx(OverlayMenuIcon, {
          icon: "handle"
        })
      }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
        value: "menu",
        "aria-label": __('menu'),
        label: /*#__PURE__*/_jsx(OverlayMenuIcon, {
          icon: "menu"
        })
      })]
    })]
  });
}
//# sourceMappingURL=overlay-menu-preview.js.map
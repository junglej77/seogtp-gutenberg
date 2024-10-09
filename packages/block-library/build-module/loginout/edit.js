/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function LoginOutEdit({
  attributes,
  setAttributes
}) {
  const {
    displayLoginAsForm,
    redirectToCurrent
  } = attributes;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Display login as form'),
          checked: displayLoginAsForm,
          onChange: () => setAttributes({
            displayLoginAsForm: !displayLoginAsForm
          })
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Redirect to current URL'),
          checked: redirectToCurrent,
          onChange: () => setAttributes({
            redirectToCurrent: !redirectToCurrent
          })
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      ...useBlockProps({
        className: 'logged-in'
      }),
      children: /*#__PURE__*/_jsx("a", {
        href: "#login-pseudo-link",
        children: __('Log out')
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map
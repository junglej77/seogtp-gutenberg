/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ResponsiveBlockControlLabel from './label';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ResponsiveBlockControl(props) {
  const {
    title,
    property,
    toggleLabel,
    onIsResponsiveChange,
    renderDefaultControl,
    renderResponsiveControls,
    isResponsive = false,
    defaultLabel = {
      id: 'all',
      label: _x('All', 'screen sizes')
    },
    viewports = [{
      id: 'small',
      label: __('Small screens')
    }, {
      id: 'medium',
      label: __('Medium screens')
    }, {
      id: 'large',
      label: __('Large screens')
    }]
  } = props;
  if (!title || !property || !renderDefaultControl) {
    return null;
  }
  const toggleControlLabel = toggleLabel || sprintf( /* translators: %s: Property value for the control (eg: margin, padding, etc.). */
  __('Use the same %s on all screen sizes.'), property);
  const toggleHelpText = __('Toggle between using the same value for all screen sizes or using a unique value per screen size.');
  const defaultControl = renderDefaultControl( /*#__PURE__*/_jsx(ResponsiveBlockControlLabel, {
    property: property,
    viewport: defaultLabel
  }), defaultLabel);
  const defaultResponsiveControls = () => {
    return viewports.map(viewport => /*#__PURE__*/_jsx(Fragment, {
      children: renderDefaultControl( /*#__PURE__*/_jsx(ResponsiveBlockControlLabel, {
        property: property,
        viewport: viewport
      }), viewport)
    }, viewport.id));
  };
  return /*#__PURE__*/_jsxs("fieldset", {
    className: "block-editor-responsive-block-control",
    children: [/*#__PURE__*/_jsx("legend", {
      className: "block-editor-responsive-block-control__title",
      children: title
    }), /*#__PURE__*/_jsxs("div", {
      className: "block-editor-responsive-block-control__inner",
      children: [/*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        className: "block-editor-responsive-block-control__toggle",
        label: toggleControlLabel,
        checked: !isResponsive,
        onChange: onIsResponsiveChange,
        help: toggleHelpText
      }), /*#__PURE__*/_jsxs("div", {
        className: clsx('block-editor-responsive-block-control__group', {
          'is-responsive': isResponsive
        }),
        children: [!isResponsive && defaultControl, isResponsive && (renderResponsiveControls ? renderResponsiveControls(viewports) : defaultResponsiveControls())]
      })]
    })]
  });
}
export default ResponsiveBlockControl;
//# sourceMappingURL=index.js.map
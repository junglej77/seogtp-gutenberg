/**
 * WordPress dependencies
 */
import { RangeControl, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { withColors, __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown, __experimentalUseGradient as useGradient, __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Overlay = ({
  clientId,
  attributes,
  setAttributes,
  overlayColor,
  setOverlayColor
}) => {
  const {
    dimRatio
  } = attributes;
  const {
    gradientValue,
    setGradient
  } = useGradient();
  const colorGradientSettings = useMultipleOriginColorsAndGradients();
  if (!colorGradientSettings.hasColorsOrGradients) {
    return null;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ColorGradientSettingsDropdown, {
      __experimentalIsRenderedInSidebar: true,
      settings: [{
        colorValue: overlayColor.color,
        gradientValue,
        label: __('Overlay'),
        onColorChange: setOverlayColor,
        onGradientChange: setGradient,
        isShownByDefault: true,
        resetAllFilter: () => ({
          overlayColor: undefined,
          customOverlayColor: undefined,
          gradient: undefined,
          customGradient: undefined
        })
      }],
      panelId: clientId,
      ...colorGradientSettings
    }), /*#__PURE__*/_jsx(ToolsPanelItem, {
      hasValue: () => dimRatio !== undefined,
      label: __('Overlay opacity'),
      onDeselect: () => setAttributes({
        dimRatio: 0
      }),
      resetAllFilter: () => ({
        dimRatio: 0
      }),
      isShownByDefault: true,
      panelId: clientId,
      children: /*#__PURE__*/_jsx(RangeControl, {
        __nextHasNoMarginBottom: true,
        label: __('Overlay opacity'),
        value: dimRatio,
        onChange: newDimRatio => setAttributes({
          dimRatio: newDimRatio
        }),
        min: 0,
        max: 100,
        step: 10,
        required: true,
        __next40pxDefaultSize: true
      })
    })]
  });
};
export default compose([withColors({
  overlayColor: 'background-color'
})])(Overlay);
//# sourceMappingURL=overlay-controls.js.map
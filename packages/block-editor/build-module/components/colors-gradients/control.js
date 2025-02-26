/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, __experimentalVStack as VStack, ColorPalette, GradientPicker, privateApis as componentsPrivateApis } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useSettings } from '../use-settings';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Tabs
} = unlock(componentsPrivateApis);
const colorsAndGradientKeys = ['colors', 'disableCustomColors', 'gradients', 'disableCustomGradients'];
const TAB_IDS = {
  color: 'color',
  gradient: 'gradient'
};
function ColorGradientControlInner({
  colors,
  gradients,
  disableCustomColors,
  disableCustomGradients,
  __experimentalIsRenderedInSidebar,
  className,
  label,
  onColorChange,
  onGradientChange,
  colorValue,
  gradientValue,
  clearable,
  showTitle = true,
  enableAlpha,
  headingLevel
}) {
  const canChooseAColor = onColorChange && (colors && colors.length > 0 || !disableCustomColors);
  const canChooseAGradient = onGradientChange && (gradients && gradients.length > 0 || !disableCustomGradients);
  if (!canChooseAColor && !canChooseAGradient) {
    return null;
  }
  const tabPanels = {
    [TAB_IDS.color]: /*#__PURE__*/_jsx(ColorPalette, {
      value: colorValue,
      onChange: canChooseAGradient ? newColor => {
        onColorChange(newColor);
        onGradientChange();
      } : onColorChange,
      colors,
      disableCustomColors,
      __experimentalIsRenderedInSidebar: __experimentalIsRenderedInSidebar,
      clearable: clearable,
      enableAlpha: enableAlpha,
      headingLevel: headingLevel
    }),
    [TAB_IDS.gradient]: /*#__PURE__*/_jsx(GradientPicker, {
      value: gradientValue,
      onChange: canChooseAColor ? newGradient => {
        onGradientChange(newGradient);
        onColorChange();
      } : onGradientChange,
      gradients,
      disableCustomGradients,
      __experimentalIsRenderedInSidebar: __experimentalIsRenderedInSidebar,
      clearable: clearable,
      headingLevel: headingLevel
    })
  };
  const renderPanelType = type => /*#__PURE__*/_jsx("div", {
    className: "block-editor-color-gradient-control__panel",
    children: tabPanels[type]
  });
  return /*#__PURE__*/_jsx(BaseControl, {
    __nextHasNoMarginBottom: true,
    className: clsx('block-editor-color-gradient-control', className),
    children: /*#__PURE__*/_jsx("fieldset", {
      className: "block-editor-color-gradient-control__fieldset",
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 1,
        children: [showTitle && /*#__PURE__*/_jsx("legend", {
          children: /*#__PURE__*/_jsx("div", {
            className: "block-editor-color-gradient-control__color-indicator",
            children: /*#__PURE__*/_jsx(BaseControl.VisualLabel, {
              children: label
            })
          })
        }), canChooseAColor && canChooseAGradient && /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsxs(Tabs, {
            defaultTabId: gradientValue ? TAB_IDS.gradient : !!canChooseAColor && TAB_IDS.color,
            children: [/*#__PURE__*/_jsxs(Tabs.TabList, {
              children: [/*#__PURE__*/_jsx(Tabs.Tab, {
                tabId: TAB_IDS.color,
                children: __('Color')
              }), /*#__PURE__*/_jsx(Tabs.Tab, {
                tabId: TAB_IDS.gradient,
                children: __('Gradient')
              })]
            }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
              tabId: TAB_IDS.color,
              className: "block-editor-color-gradient-control__panel",
              focusable: false,
              children: tabPanels.color
            }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
              tabId: TAB_IDS.gradient,
              className: "block-editor-color-gradient-control__panel",
              focusable: false,
              children: tabPanels.gradient
            })]
          })
        }), !canChooseAGradient && renderPanelType(TAB_IDS.color), !canChooseAColor && renderPanelType(TAB_IDS.gradient)]
      })
    })
  });
}
function ColorGradientControlSelect(props) {
  const [colors, gradients, customColors, customGradients] = useSettings('color.palette', 'color.gradients', 'color.custom', 'color.customGradient');
  return /*#__PURE__*/_jsx(ColorGradientControlInner, {
    colors: colors,
    gradients: gradients,
    disableCustomColors: !customColors,
    disableCustomGradients: !customGradients,
    ...props
  });
}
function ColorGradientControl(props) {
  if (colorsAndGradientKeys.every(key => props.hasOwnProperty(key))) {
    return /*#__PURE__*/_jsx(ColorGradientControlInner, {
      ...props
    });
  }
  return /*#__PURE__*/_jsx(ColorGradientControlSelect, {
    ...props
  });
}
export default ColorGradientControl;
//# sourceMappingURL=control.js.map
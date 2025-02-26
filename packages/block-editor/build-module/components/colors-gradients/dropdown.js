/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Button, ColorIndicator, Dropdown, FlexItem, __experimentalDropdownContentWrapper as DropdownContentWrapper, __experimentalHStack as HStack, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ColorGradientControl from './control';

// When the `ColorGradientSettingsDropdown` controls are being rendered to a
// `ToolsPanel` they must be wrapped in a `ToolsPanelItem`.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const WithToolsPanelItem = ({
  setting,
  children,
  panelId,
  ...props
}) => {
  const clearValue = () => {
    if (setting.colorValue) {
      setting.onColorChange();
    } else if (setting.gradientValue) {
      setting.onGradientChange();
    }
  };
  return /*#__PURE__*/_jsx(ToolsPanelItem, {
    hasValue: () => {
      return !!setting.colorValue || !!setting.gradientValue;
    },
    label: setting.label,
    onDeselect: clearValue,
    isShownByDefault: setting.isShownByDefault !== undefined ? setting.isShownByDefault : true,
    ...props,
    className: "block-editor-tools-panel-color-gradient-settings__item",
    panelId: panelId
    // Pass resetAllFilter if supplied due to rendering via SlotFill
    // into parent ToolsPanel.
    ,
    resetAllFilter: setting.resetAllFilter,
    children: children
  });
};
const LabeledColorIndicator = ({
  colorValue,
  label
}) => /*#__PURE__*/_jsxs(HStack, {
  justify: "flex-start",
  children: [/*#__PURE__*/_jsx(ColorIndicator, {
    className: "block-editor-panel-color-gradient-settings__color-indicator",
    colorValue: colorValue
  }), /*#__PURE__*/_jsx(FlexItem, {
    className: "block-editor-panel-color-gradient-settings__color-name",
    title: label,
    children: label
  })]
});

// Renders a color dropdown's toggle as an `Item` if it is within an `ItemGroup`
// or as a `Button` if it isn't e.g. the controls are being rendered in
// a `ToolsPanel`.
const renderToggle = settings => ({
  onToggle,
  isOpen
}) => {
  const {
    colorValue,
    label
  } = settings;
  const toggleProps = {
    onClick: onToggle,
    className: clsx('block-editor-panel-color-gradient-settings__dropdown', {
      'is-open': isOpen
    }),
    'aria-expanded': isOpen
  };
  return /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    ...toggleProps,
    children: /*#__PURE__*/_jsx(LabeledColorIndicator, {
      colorValue: colorValue,
      label: label
    })
  });
};

// Renders a collection of color controls as dropdowns. Depending upon the
// context in which these dropdowns are being rendered, they may be wrapped
// in an `ItemGroup` with each dropdown's toggle as an `Item`, or alternatively,
// the may be individually wrapped in a `ToolsPanelItem` with the toggle as
// a regular `Button`.
//
// For more context see: https://github.com/WordPress/gutenberg/pull/40084
export default function ColorGradientSettingsDropdown({
  colors,
  disableCustomColors,
  disableCustomGradients,
  enableAlpha,
  gradients,
  settings,
  __experimentalIsRenderedInSidebar,
  ...props
}) {
  let popoverProps;
  if (__experimentalIsRenderedInSidebar) {
    popoverProps = {
      placement: 'left-start',
      offset: 36,
      shift: true
    };
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: settings.map((setting, index) => {
      var _setting$gradientValu;
      const controlProps = {
        clearable: false,
        colorValue: setting.colorValue,
        colors,
        disableCustomColors,
        disableCustomGradients,
        enableAlpha,
        gradientValue: setting.gradientValue,
        gradients,
        label: setting.label,
        onColorChange: setting.onColorChange,
        onGradientChange: setting.onGradientChange,
        showTitle: false,
        __experimentalIsRenderedInSidebar,
        ...setting
      };
      const toggleSettings = {
        colorValue: (_setting$gradientValu = setting.gradientValue) !== null && _setting$gradientValu !== void 0 ? _setting$gradientValu : setting.colorValue,
        label: setting.label
      };
      return setting &&
      /*#__PURE__*/
      // If not in an `ItemGroup` wrap the dropdown in a
      // `ToolsPanelItem`
      _jsx(WithToolsPanelItem, {
        setting: setting,
        ...props,
        children: /*#__PURE__*/_jsx(Dropdown, {
          popoverProps: popoverProps,
          className: "block-editor-tools-panel-color-gradient-settings__dropdown",
          renderToggle: renderToggle(toggleSettings),
          renderContent: () => /*#__PURE__*/_jsx(DropdownContentWrapper, {
            paddingSize: "none",
            children: /*#__PURE__*/_jsx("div", {
              className: "block-editor-panel-color-gradient-settings__dropdown-content",
              children: /*#__PURE__*/_jsx(ColorGradientControl, {
                ...controlProps
              })
            })
          })
        })
      }, index);
    })
  });
}
//# sourceMappingURL=dropdown.js.map
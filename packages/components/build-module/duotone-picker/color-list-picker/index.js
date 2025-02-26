/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { swatch } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../button';
import ColorPalette from '../../color-palette';
import ColorIndicator from '../../color-indicator';
import Icon from '../../icon';
import { HStack } from '../../h-stack';
import { useInstanceId } from '@wordpress/compose';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ColorOption({
  label,
  value,
  colors,
  disableCustomColors,
  enableAlpha,
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const idRoot = useInstanceId(ColorOption, 'color-list-picker-option');
  const labelId = `${idRoot}__label`;
  const contentId = `${idRoot}__content`;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      className: "components-color-list-picker__swatch-button",
      onClick: () => setIsOpen(prev => !prev),
      "aria-expanded": isOpen,
      "aria-controls": contentId,
      children: /*#__PURE__*/_jsxs(HStack, {
        justify: "flex-start",
        spacing: 2,
        children: [value ? /*#__PURE__*/_jsx(ColorIndicator, {
          colorValue: value,
          className: "components-color-list-picker__swatch-color"
        }) : /*#__PURE__*/_jsx(Icon, {
          icon: swatch
        }), /*#__PURE__*/_jsx("span", {
          id: labelId,
          children: label
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      role: "group",
      id: contentId,
      "aria-labelledby": labelId,
      "aria-hidden": !isOpen,
      children: isOpen && /*#__PURE__*/_jsx(ColorPalette, {
        "aria-label": __('Color options'),
        className: "components-color-list-picker__color-picker",
        colors: colors,
        value: value,
        clearable: false,
        onChange: onChange,
        disableCustomColors: disableCustomColors,
        enableAlpha: enableAlpha
      })
    })]
  });
}
function ColorListPicker({
  colors,
  labels,
  value = [],
  disableCustomColors,
  enableAlpha,
  onChange
}) {
  return /*#__PURE__*/_jsx("div", {
    className: "components-color-list-picker",
    children: labels.map((label, index) => /*#__PURE__*/_jsx(ColorOption, {
      label: label,
      value: value[index],
      colors: colors,
      disableCustomColors: disableCustomColors,
      enableAlpha: enableAlpha,
      onChange: newColor => {
        const newColors = value.slice();
        newColors[index] = newColor;
        onChange(newColors);
      }
    }, index))
  });
}
export default ColorListPicker;
//# sourceMappingURL=index.js.map
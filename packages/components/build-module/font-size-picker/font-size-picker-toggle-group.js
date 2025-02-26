/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ToggleGroupControl, ToggleGroupControlOption } from '../toggle-group-control';
import { T_SHIRT_ABBREVIATIONS, T_SHIRT_NAMES } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
const FontSizePickerToggleGroup = props => {
  const {
    fontSizes,
    value,
    __next40pxDefaultSize,
    size,
    onChange
  } = props;
  return /*#__PURE__*/_jsx(ToggleGroupControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: __next40pxDefaultSize,
    label: __('Font size'),
    hideLabelFromVision: true,
    value: value,
    onChange: onChange,
    isBlock: true,
    size: size,
    children: fontSizes.map((fontSize, index) => /*#__PURE__*/_jsx(ToggleGroupControlOption, {
      value: fontSize.size,
      label: T_SHIRT_ABBREVIATIONS[index],
      "aria-label": fontSize.name || T_SHIRT_NAMES[index],
      showTooltip: true
    }, fontSize.slug))
  });
};
export default FontSizePickerToggleGroup;
//# sourceMappingURL=font-size-picker-toggle-group.js.map
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { StyledUnitControl, ControlWrapper } from './styles/focal-point-picker-style';
import { fractionToPercentage } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TEXTCONTROL_MIN = 0;
const TEXTCONTROL_MAX = 100;
const noop = () => {};
export default function FocalPointPickerControls({
  __nextHasNoMarginBottom,
  hasHelpText,
  onChange = noop,
  point = {
    x: 0.5,
    y: 0.5
  }
}) {
  const valueX = fractionToPercentage(point.x);
  const valueY = fractionToPercentage(point.y);
  const handleChange = (value, axis) => {
    if (value === undefined) {
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      onChange({
        ...point,
        [axis]: num / 100
      });
    }
  };
  return /*#__PURE__*/_jsxs(ControlWrapper, {
    className: "focal-point-picker__controls",
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    hasHelpText: hasHelpText,
    gap: 4,
    children: [/*#__PURE__*/_jsx(FocalPointUnitControl, {
      label: __('Left'),
      "aria-label": __('Focal point left position'),
      value: [valueX, '%'].join(''),
      onChange: next => handleChange(next, 'x'),
      dragDirection: "e"
    }), /*#__PURE__*/_jsx(FocalPointUnitControl, {
      label: __('Top'),
      "aria-label": __('Focal point top position'),
      value: [valueY, '%'].join(''),
      onChange: next => handleChange(next, 'y'),
      dragDirection: "s"
    })]
  });
}
function FocalPointUnitControl(props) {
  return /*#__PURE__*/_jsx(StyledUnitControl, {
    __next40pxDefaultSize: true,
    className: "focal-point-picker__controls-position-unit-control",
    labelPosition: "top",
    max: TEXTCONTROL_MAX,
    min: TEXTCONTROL_MIN,
    units: [{
      value: '%',
      label: '%'
    }],
    ...props
  });
}
//# sourceMappingURL=controls.js.map
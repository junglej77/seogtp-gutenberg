/**
 * External dependencies
 */
import { colord } from 'colord';

/**
 * Internal dependencies
 */
import { InputWithSlider } from './input-with-slider';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const RgbInput = ({
  color,
  onChange,
  enableAlpha
}) => {
  const {
    r,
    g,
    b,
    a
  } = color.toRgb();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 255,
      label: "Red",
      abbreviation: "R",
      value: r,
      onChange: nextR => onChange(colord({
        r: nextR,
        g,
        b,
        a
      }))
    }), /*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 255,
      label: "Green",
      abbreviation: "G",
      value: g,
      onChange: nextG => onChange(colord({
        r,
        g: nextG,
        b,
        a
      }))
    }), /*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 255,
      label: "Blue",
      abbreviation: "B",
      value: b,
      onChange: nextB => onChange(colord({
        r,
        g,
        b: nextB,
        a
      }))
    }), enableAlpha && /*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 100,
      label: "Alpha",
      abbreviation: "A",
      value: Math.trunc(a * 100),
      onChange: nextA => onChange(colord({
        r,
        g,
        b,
        a: nextA / 100
      }))
    })]
  });
};
//# sourceMappingURL=rgb-input.js.map
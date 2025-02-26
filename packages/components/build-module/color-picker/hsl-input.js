/**
 * External dependencies
 */
import { colord } from 'colord';

/**
 * WordPress dependencies
 */
import { useState, useEffect, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { InputWithSlider } from './input-with-slider';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const HslInput = ({
  color,
  onChange,
  enableAlpha
}) => {
  const colorPropHSLA = useMemo(() => color.toHsl(), [color]);
  const [internalHSLA, setInternalHSLA] = useState({
    ...colorPropHSLA
  });
  const isInternalColorSameAsReceivedColor = color.isEqual(colord(internalHSLA));
  useEffect(() => {
    if (!isInternalColorSameAsReceivedColor) {
      // Keep internal HSLA color up to date with the received color prop
      setInternalHSLA(colorPropHSLA);
    }
  }, [colorPropHSLA, isInternalColorSameAsReceivedColor]);

  // If the internal color is equal to the received color prop, we can use the
  // HSLA values from the local state which, compared to the received color prop,
  // retain more details about the actual H and S values that the user selected,
  // and thus allow for better UX when interacting with the H and S sliders.
  const colorValue = isInternalColorSameAsReceivedColor ? internalHSLA : colorPropHSLA;
  const updateHSLAValue = partialNewValue => {
    const nextOnChangeValue = colord({
      ...colorValue,
      ...partialNewValue
    });

    // Fire `onChange` only if the resulting color is different from the
    // current one.
    // Otherwise, update the internal HSLA color to cause a re-render.
    if (!color.isEqual(nextOnChangeValue)) {
      onChange(nextOnChangeValue);
    } else {
      setInternalHSLA(prevHSLA => ({
        ...prevHSLA,
        ...partialNewValue
      }));
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 359,
      label: "Hue",
      abbreviation: "H",
      value: colorValue.h,
      onChange: nextH => {
        updateHSLAValue({
          h: nextH
        });
      }
    }), /*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 100,
      label: "Saturation",
      abbreviation: "S",
      value: colorValue.s,
      onChange: nextS => {
        updateHSLAValue({
          s: nextS
        });
      }
    }), /*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 100,
      label: "Lightness",
      abbreviation: "L",
      value: colorValue.l,
      onChange: nextL => {
        updateHSLAValue({
          l: nextL
        });
      }
    }), enableAlpha && /*#__PURE__*/_jsx(InputWithSlider, {
      min: 0,
      max: 100,
      label: "Alpha",
      abbreviation: "A",
      value: Math.trunc(100 * colorValue.a),
      onChange: nextA => {
        updateHSLAValue({
          a: nextA / 100
        });
      }
    })]
  });
};
//# sourceMappingURL=hsl-input.js.map
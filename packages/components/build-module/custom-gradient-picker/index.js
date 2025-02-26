/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AnglePickerControl from '../angle-picker-control';
import CustomGradientBar from './gradient-bar';
import { Flex } from '../flex';
import SelectControl from '../select-control';
import { VStack } from '../v-stack';
import { getGradientAstWithDefault, getLinearGradientRepresentation, getGradientAstWithControlPoints, getStopCssColor } from './utils';
import { serializeGradient } from './serializer';
import { DEFAULT_LINEAR_GRADIENT_ANGLE, HORIZONTAL_GRADIENT_ORIENTATION, GRADIENT_OPTIONS } from './constants';
import { AccessoryWrapper, SelectWrapper } from './styles/custom-gradient-picker-styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const GradientAnglePicker = ({
  gradientAST,
  hasGradient,
  onChange
}) => {
  var _gradientAST$orientat;
  const angle = (_gradientAST$orientat = gradientAST?.orientation?.value) !== null && _gradientAST$orientat !== void 0 ? _gradientAST$orientat : DEFAULT_LINEAR_GRADIENT_ANGLE;
  const onAngleChange = newAngle => {
    onChange(serializeGradient({
      ...gradientAST,
      orientation: {
        type: 'angular',
        value: `${newAngle}`
      }
    }));
  };
  return /*#__PURE__*/_jsx(AnglePickerControl, {
    onChange: onAngleChange,
    value: hasGradient ? angle : ''
  });
};
const GradientTypePicker = ({
  gradientAST,
  hasGradient,
  onChange
}) => {
  const {
    type
  } = gradientAST;
  const onSetLinearGradient = () => {
    onChange(serializeGradient({
      ...gradientAST,
      orientation: gradientAST.orientation ? undefined : HORIZONTAL_GRADIENT_ORIENTATION,
      type: 'linear-gradient'
    }));
  };
  const onSetRadialGradient = () => {
    const {
      orientation,
      ...restGradientAST
    } = gradientAST;
    onChange(serializeGradient({
      ...restGradientAST,
      type: 'radial-gradient'
    }));
  };
  const handleOnChange = next => {
    if (next === 'linear-gradient') {
      onSetLinearGradient();
    }
    if (next === 'radial-gradient') {
      onSetRadialGradient();
    }
  };
  return /*#__PURE__*/_jsx(SelectControl, {
    __nextHasNoMarginBottom: true,
    className: "components-custom-gradient-picker__type-picker",
    label: __('Type'),
    labelPosition: "top",
    onChange: handleOnChange,
    options: GRADIENT_OPTIONS,
    size: "__unstable-large",
    value: hasGradient ? type : undefined
  });
};

/**
 * CustomGradientPicker is a React component that renders a UI for specifying
 * linear or radial gradients. Radial gradients are displayed in the picker as
 * a slice of the gradient from the center to the outside.
 *
 * ```jsx
 * import { CustomGradientPicker } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyCustomGradientPicker = () => {
 *   const [ gradient, setGradient ] = useState();
 *
 *   return (
 *     <CustomGradientPicker
 *			value={ gradient }
 *			onChange={ setGradient }
 *     />
 *   );
 * };
 * ```
 */
export function CustomGradientPicker({
  value,
  onChange,
  __experimentalIsRenderedInSidebar = false
}) {
  const {
    gradientAST,
    hasGradient
  } = getGradientAstWithDefault(value);

  // On radial gradients the bar should display a linear gradient.
  // On radial gradients the bar represents a slice of the gradient from the center until the outside.
  // On liner gradients the bar represents the color stops from left to right independently of the angle.
  const background = getLinearGradientRepresentation(gradientAST);

  // Control points color option may be hex from presets, custom colors will be rgb.
  // The position should always be a percentage.
  const controlPoints = gradientAST.colorStops.map(colorStop => {
    return {
      color: getStopCssColor(colorStop),
      // Although it's already been checked by `hasUnsupportedLength` in `getGradientAstWithDefault`,
      // TypeScript doesn't know that `colorStop.length` is not undefined here.
      // @ts-expect-error
      position: parseInt(colorStop.length.value)
    };
  });
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 4,
    className: "components-custom-gradient-picker",
    children: [/*#__PURE__*/_jsx(CustomGradientBar, {
      __experimentalIsRenderedInSidebar: __experimentalIsRenderedInSidebar,
      background: background,
      hasGradient: hasGradient,
      value: controlPoints,
      onChange: newControlPoints => {
        onChange(serializeGradient(getGradientAstWithControlPoints(gradientAST, newControlPoints)));
      }
    }), /*#__PURE__*/_jsxs(Flex, {
      gap: 3,
      className: "components-custom-gradient-picker__ui-line",
      children: [/*#__PURE__*/_jsx(SelectWrapper, {
        children: /*#__PURE__*/_jsx(GradientTypePicker, {
          gradientAST: gradientAST,
          hasGradient: hasGradient,
          onChange: onChange
        })
      }), /*#__PURE__*/_jsx(AccessoryWrapper, {
        children: gradientAST.type === 'linear-gradient' && /*#__PURE__*/_jsx(GradientAnglePicker, {
          gradientAST: gradientAST,
          hasGradient: hasGradient,
          onChange: onChange
        })
      })]
    })]
  });
}
export default CustomGradientPicker;
//# sourceMappingURL=index.js.map
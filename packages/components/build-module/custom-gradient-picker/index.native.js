/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { colorsUtils } from '../mobile/color-settings/utils';
import { getGradientAstWithDefault } from './utils';
import { serializeGradient } from './serializer';
import { DEFAULT_LINEAR_GRADIENT_ANGLE, HORIZONTAL_GRADIENT_ORIENTATION } from './constants';
import styles from './style.scss';
import PanelBody from '../panel/body';
import RadioControl from '../radio-control';
import RangeControl from '../range-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function CustomGradientPicker({
  setColor,
  currentValue,
  isGradientColor
}) {
  const [gradientOrientation, setGradientOrientation] = useState(HORIZONTAL_GRADIENT_ORIENTATION);
  const [currentColor, setCurrentColor] = useState(currentValue);
  const {
    getGradientType,
    gradients,
    gradientOptions
  } = colorsUtils;
  const {
    gradientAST
  } = getGradientAstWithDefault(currentColor);
  const gradientType = getGradientType(currentColor);
  function isLinearGradient(type) {
    return type === gradients.linear;
  }
  function getGradientColor(type) {
    const {
      orientation,
      ...restGradientAST
    } = gradientAST;
    if (orientation) {
      setGradientOrientation(orientation);
    }
    return serializeGradient(isLinearGradient(type) ? {
      ...gradientAST,
      ...(gradientAST.orientation ? {} : {
        orientation: gradientOrientation
      }),
      type
    } : {
      ...restGradientAST,
      type
    });
  }
  function onGradientTypeChange(type) {
    const gradientColor = getGradientColor(type);
    setCurrentColor(gradientColor);
    setColor(gradientColor);
  }
  function setGradientAngle(value) {
    const gradientColor = serializeGradient({
      ...gradientAST,
      orientation: {
        type: 'angular',
        value
      }
    });
    if (isGradientColor && gradientColor !== currentColor) {
      setCurrentColor(gradientColor);
      setColor(gradientColor);
    }
  }
  function getGradientAngle() {
    var _gradientAST$orientat;
    return (_gradientAST$orientat = gradientAST?.orientation?.value) !== null && _gradientAST$orientat !== void 0 ? _gradientAST$orientat : DEFAULT_LINEAR_GRADIENT_ANGLE;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(PanelBody, {
      title: __('Gradient Type'),
      children: /*#__PURE__*/_jsx(RadioControl, {
        selected: gradientType,
        options: gradientOptions,
        onChange: onGradientTypeChange
      })
    }), isLinearGradient(gradientType) && /*#__PURE__*/_jsx(PanelBody, {
      style: styles.angleControl,
      children: /*#__PURE__*/_jsx(RangeControl, {
        label: __('Angle'),
        minimumValue: 0,
        maximumValue: 360,
        value: getGradientAngle(),
        onChange: setGradientAngle
      })
    })]
  });
}
export default CustomGradientPicker;
//# sourceMappingURL=index.native.js.map
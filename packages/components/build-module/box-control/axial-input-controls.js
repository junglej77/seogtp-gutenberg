/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import { parseQuantityAndUnitFromRawValue } from '../unit-control/utils';
import Tooltip from '../tooltip';
import { CUSTOM_VALUE_SETTINGS, LABELS } from './utils';
import { FlexedBoxControlIcon, FlexedRangeControl, InputWrapper, StyledUnitControl } from './styles/box-control-styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const groupedSides = ['vertical', 'horizontal'];
export default function AxialInputControls({
  __next40pxDefaultSize,
  onChange,
  onFocus,
  values,
  selectedUnits,
  setSelectedUnits,
  sides,
  ...props
}) {
  const generatedId = useInstanceId(AxialInputControls, `box-control-input`);
  const createHandleOnFocus = side => event => {
    if (!onFocus) {
      return;
    }
    onFocus(event, {
      side
    });
  };
  const handleOnValueChange = (side, next) => {
    if (!onChange) {
      return;
    }
    const nextValues = {
      ...values
    };
    const isNumeric = next !== undefined && !isNaN(parseFloat(next));
    const nextValue = isNumeric ? next : undefined;
    if (side === 'vertical') {
      nextValues.top = nextValue;
      nextValues.bottom = nextValue;
    }
    if (side === 'horizontal') {
      nextValues.left = nextValue;
      nextValues.right = nextValue;
    }
    onChange(nextValues);
  };
  const createHandleOnUnitChange = side => next => {
    const newUnits = {
      ...selectedUnits
    };
    if (side === 'vertical') {
      newUnits.top = next;
      newUnits.bottom = next;
    }
    if (side === 'horizontal') {
      newUnits.left = next;
      newUnits.right = next;
    }
    setSelectedUnits(newUnits);
  };

  // Filter sides if custom configuration provided, maintaining default order.
  const filteredSides = sides?.length ? groupedSides.filter(side => sides.includes(side)) : groupedSides;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: filteredSides.map(side => {
      var _CUSTOM_VALUE_SETTING, _CUSTOM_VALUE_SETTING2;
      const [parsedQuantity, parsedUnit] = parseQuantityAndUnitFromRawValue(side === 'vertical' ? values.top : values.left);
      const selectedUnit = side === 'vertical' ? selectedUnits.top : selectedUnits.left;
      const inputId = [generatedId, side].join('-');
      return /*#__PURE__*/_jsxs(InputWrapper, {
        children: [/*#__PURE__*/_jsx(FlexedBoxControlIcon, {
          side: side,
          sides: sides
        }), /*#__PURE__*/_jsx(Tooltip, {
          placement: "top-end",
          text: LABELS[side],
          children: /*#__PURE__*/_createElement(StyledUnitControl, {
            ...props,
            __next40pxDefaultSize: __next40pxDefaultSize,
            className: "component-box-control__unit-control",
            id: inputId,
            isPressEnterToChange: true,
            value: [parsedQuantity, selectedUnit !== null && selectedUnit !== void 0 ? selectedUnit : parsedUnit].join(''),
            onChange: newValue => handleOnValueChange(side, newValue),
            onUnitChange: createHandleOnUnitChange(side),
            onFocus: createHandleOnFocus(side),
            label: LABELS[side],
            hideLabelFromVision: true,
            key: side
          })
        }), /*#__PURE__*/_jsx(FlexedRangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: __next40pxDefaultSize,
          "aria-controls": inputId,
          label: LABELS[side],
          hideLabelFromVision: true,
          onChange: newValue => handleOnValueChange(side, newValue !== undefined ? [newValue, selectedUnit !== null && selectedUnit !== void 0 ? selectedUnit : parsedUnit].join('') : undefined),
          min: 0,
          max: (_CUSTOM_VALUE_SETTING = CUSTOM_VALUE_SETTINGS[selectedUnit !== null && selectedUnit !== void 0 ? selectedUnit : 'px']?.max) !== null && _CUSTOM_VALUE_SETTING !== void 0 ? _CUSTOM_VALUE_SETTING : 10,
          step: (_CUSTOM_VALUE_SETTING2 = CUSTOM_VALUE_SETTINGS[selectedUnit !== null && selectedUnit !== void 0 ? selectedUnit : 'px']?.step) !== null && _CUSTOM_VALUE_SETTING2 !== void 0 ? _CUSTOM_VALUE_SETTING2 : 0.1,
          value: parsedQuantity !== null && parsedQuantity !== void 0 ? parsedQuantity : 0,
          withInputField: false
        })]
      }, side);
    })
  });
}
//# sourceMappingURL=axial-input-controls.js.map
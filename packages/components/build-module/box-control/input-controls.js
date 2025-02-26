/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import Tooltip from '../tooltip';
import { parseQuantityAndUnitFromRawValue } from '../unit-control/utils';
import { ALL_SIDES, CUSTOM_VALUE_SETTINGS, LABELS } from './utils';
import { FlexedBoxControlIcon, FlexedRangeControl, InputWrapper, StyledUnitControl } from './styles/box-control-styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const noop = () => {};
export default function BoxInputControls({
  __next40pxDefaultSize,
  onChange = noop,
  onFocus = noop,
  values,
  selectedUnits,
  setSelectedUnits,
  sides,
  ...props
}) {
  const generatedId = useInstanceId(BoxInputControls, 'box-control-input');
  const createHandleOnFocus = side => event => {
    onFocus(event, {
      side
    });
  };
  const handleOnChange = nextValues => {
    onChange(nextValues);
  };
  const handleOnValueChange = (side, next, extra) => {
    const nextValues = {
      ...values
    };
    const isNumeric = next !== undefined && !isNaN(parseFloat(next));
    const nextValue = isNumeric ? next : undefined;
    nextValues[side] = nextValue;

    /**
     * Supports changing pair sides. For example, holding the ALT key
     * when changing the TOP will also update BOTTOM.
     */
    // @ts-expect-error - TODO: event.altKey is only present when the change event was
    // triggered by a keyboard event. Should this feature be implemented differently so
    // it also works with drag events?
    if (extra?.event.altKey) {
      switch (side) {
        case 'top':
          nextValues.bottom = nextValue;
          break;
        case 'bottom':
          nextValues.top = nextValue;
          break;
        case 'left':
          nextValues.right = nextValue;
          break;
        case 'right':
          nextValues.left = nextValue;
          break;
      }
    }
    handleOnChange(nextValues);
  };
  const createHandleOnUnitChange = side => next => {
    const newUnits = {
      ...selectedUnits
    };
    newUnits[side] = next;
    setSelectedUnits(newUnits);
  };

  // Filter sides if custom configuration provided, maintaining default order.
  const filteredSides = sides?.length ? ALL_SIDES.filter(side => sides.includes(side)) : ALL_SIDES;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: filteredSides.map(side => {
      var _CUSTOM_VALUE_SETTING, _CUSTOM_VALUE_SETTING2;
      const [parsedQuantity, parsedUnit] = parseQuantityAndUnitFromRawValue(values[side]);
      const computedUnit = values[side] ? parsedUnit : selectedUnits[side];
      const inputId = [generatedId, side].join('-');
      return /*#__PURE__*/_jsxs(InputWrapper, {
        expanded: true,
        children: [/*#__PURE__*/_jsx(FlexedBoxControlIcon, {
          side: side,
          sides: sides
        }), /*#__PURE__*/_jsx(Tooltip, {
          placement: "top-end",
          text: LABELS[side],
          children: /*#__PURE__*/_jsx(StyledUnitControl, {
            ...props,
            __next40pxDefaultSize: __next40pxDefaultSize,
            className: "component-box-control__unit-control",
            id: inputId,
            isPressEnterToChange: true,
            value: [parsedQuantity, computedUnit].join(''),
            onChange: (nextValue, extra) => handleOnValueChange(side, nextValue, extra),
            onUnitChange: createHandleOnUnitChange(side),
            onFocus: createHandleOnFocus(side),
            label: LABELS[side],
            hideLabelFromVision: true
          })
        }), /*#__PURE__*/_jsx(FlexedRangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: __next40pxDefaultSize,
          "aria-controls": inputId,
          label: LABELS[side],
          hideLabelFromVision: true,
          onChange: newValue => {
            handleOnValueChange(side, newValue !== undefined ? [newValue, computedUnit].join('') : undefined);
          },
          min: 0,
          max: (_CUSTOM_VALUE_SETTING = CUSTOM_VALUE_SETTINGS[computedUnit !== null && computedUnit !== void 0 ? computedUnit : 'px']?.max) !== null && _CUSTOM_VALUE_SETTING !== void 0 ? _CUSTOM_VALUE_SETTING : 10,
          step: (_CUSTOM_VALUE_SETTING2 = CUSTOM_VALUE_SETTINGS[computedUnit !== null && computedUnit !== void 0 ? computedUnit : 'px']?.step) !== null && _CUSTOM_VALUE_SETTING2 !== void 0 ? _CUSTOM_VALUE_SETTING2 : 0.1,
          value: parsedQuantity !== null && parsedQuantity !== void 0 ? parsedQuantity : 0,
          withInputField: false
        })]
      }, `box-control-${side}`);
    })
  });
}
//# sourceMappingURL=input-controls.js.map
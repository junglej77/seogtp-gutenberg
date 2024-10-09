/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useSettings, __experimentalSpacingSizesControl as SpacingSizesControl, isValueSpacingPreset, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { PanelBody, __experimentalUseCustomUnits as useCustomUnits, __experimentalUnitControl as UnitControl, __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { View } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import { unlock } from '../lock-unlock';
import { MIN_SPACER_SIZE } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useSpacingSizes
} = unlock(blockEditorPrivateApis);
function DimensionInput({
  label,
  onChange,
  isResizing,
  value = ''
}) {
  const inputId = useInstanceId(UnitControl, 'block-spacer-height-input');
  const spacingSizes = useSpacingSizes();
  const [spacingUnits] = useSettings('spacing.units');
  // In most contexts the spacer size cannot meaningfully be set to a
  // percentage, since this is relative to the parent container. This
  // unit is disabled from the UI.
  const availableUnits = spacingUnits ? spacingUnits.filter(unit => unit !== '%') : ['px', 'em', 'rem', 'vw', 'vh'];
  const units = useCustomUnits({
    availableUnits,
    defaultValues: {
      px: 100,
      em: 10,
      rem: 10,
      vw: 10,
      vh: 25
    }
  });
  const handleOnChange = unprocessedValue => {
    onChange(unprocessedValue.all);
  };

  // Force the unit to update to `px` when the Spacer is being resized.
  const [parsedQuantity, parsedUnit] = parseQuantityAndUnitFromRawValue(value);
  const computedValue = isValueSpacingPreset(value) ? value : [parsedQuantity, isResizing ? 'px' : parsedUnit].join('');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [(!spacingSizes || spacingSizes?.length === 0) && /*#__PURE__*/_jsx(UnitControl, {
      id: inputId,
      isResetValueOnUnitChange: true,
      min: MIN_SPACER_SIZE,
      onChange: handleOnChange,
      value: computedValue,
      units: units,
      label: label,
      __next40pxDefaultSize: true
    }), spacingSizes?.length > 0 && /*#__PURE__*/_jsx(View, {
      className: "tools-panel-item-spacing",
      children: /*#__PURE__*/_jsx(SpacingSizesControl, {
        values: {
          all: computedValue
        },
        onChange: handleOnChange,
        label: label,
        sides: ['all'],
        units: units,
        allowReset: false,
        splitOnAxis: false,
        showSideInLabel: false
      })
    })]
  });
}
export default function SpacerControls({
  setAttributes,
  orientation,
  height,
  width,
  isResizing
}) {
  return /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsxs(PanelBody, {
      title: __('Settings'),
      children: [orientation === 'horizontal' && /*#__PURE__*/_jsx(DimensionInput, {
        label: __('Width'),
        value: width,
        onChange: nextWidth => setAttributes({
          width: nextWidth
        }),
        isResizing: isResizing
      }), orientation !== 'horizontal' && /*#__PURE__*/_jsx(DimensionInput, {
        label: __('Height'),
        value: height,
        onChange: nextHeight => setAttributes({
          height: nextHeight
        }),
        isResizing: isResizing
      })]
    })
  });
}
//# sourceMappingURL=controls.js.map
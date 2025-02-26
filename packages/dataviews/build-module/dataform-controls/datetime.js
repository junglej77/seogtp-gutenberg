/**
 * WordPress dependencies
 */
import { BaseControl, TimePicker, VisuallyHidden } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function DateTime({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  const {
    id,
    label
  } = field;
  const value = field.getValue({
    item: data
  });
  const onChangeControl = useCallback(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  return /*#__PURE__*/_jsxs("fieldset", {
    className: "dataviews-controls__datetime",
    children: [!hideLabelFromVision && /*#__PURE__*/_jsx(BaseControl.VisualLabel, {
      as: "legend",
      children: label
    }), hideLabelFromVision && /*#__PURE__*/_jsx(VisuallyHidden, {
      as: "legend",
      children: label
    }), /*#__PURE__*/_jsx(TimePicker, {
      currentTime: value,
      onChange: onChangeControl,
      hideLabelFromVision: true
    })]
  });
}
//# sourceMappingURL=datetime.js.map
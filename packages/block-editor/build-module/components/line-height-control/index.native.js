/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { UnitControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { BASE_DEFAULT_VALUE, STEP, isLineHeightDefined } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
export default function LineHeightControl({
  value: lineHeight,
  onChange
}) {
  const isDefined = isLineHeightDefined(lineHeight);
  const value = isDefined ? lineHeight : BASE_DEFAULT_VALUE;
  return /*#__PURE__*/_jsx(UnitControl, {
    label: __('Line Height')
    // Set minimun value of 1 since lower values break on Android
    ,
    min: 1,
    max: 5,
    step: STEP,
    value: value,
    onChange: onChange
    // TODO: should be updated to avoid using `false`, in order to
    // align with the web version of `UnitControl`
    ,
    units: false
  });
}
//# sourceMappingURL=index.native.js.map
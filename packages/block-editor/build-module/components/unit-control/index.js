/**
 * WordPress dependencies
 */
import { __experimentalUseCustomUnits as useCustomUnits, __experimentalUnitControl as BaseUnitControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useSettings } from '../use-settings';
import { jsx as _jsx } from "react/jsx-runtime";
export default function UnitControl({
  units: unitsProp,
  ...props
}) {
  const [availableUnits] = useSettings('spacing.units');
  const units = useCustomUnits({
    availableUnits: availableUnits || ['%', 'px', 'em', 'rem', 'vw'],
    units: unitsProp
  });
  return /*#__PURE__*/_jsx(BaseUnitControl, {
    units: units,
    ...props
  });
}
//# sourceMappingURL=index.js.map
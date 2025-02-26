/**
 * Internal dependencies
 */
import type { WPUnitControlUnit } from './types';
/**
 * An array of all available CSS length units.
 */
export declare const ALL_CSS_UNITS: WPUnitControlUnit[];
/**
 * Units of measurements. `a11yLabel` is used by screenreaders.
 */
export declare const CSS_UNITS: WPUnitControlUnit[];
export declare const DEFAULT_UNIT: WPUnitControlUnit;
/**
 * Handles legacy value + unit handling.
 * This component use to manage both incoming value and units separately.
 *
 * Moving forward, ideally the value should be a string that contains both
 * the value and unit, example: '10px'
 *
 * @param rawValue     The raw value as a string (may or may not contain the unit)
 * @param fallbackUnit The unit used as a fallback, if not unit is detected in the `value`
 * @param allowedUnits Units to derive from.
 * @return The extracted quantity and unit. The quantity can be `undefined` in case the raw value
 * could not be parsed to a number correctly. The unit can be `undefined` in case the unit parse
 * from the raw value could not be matched against the list of allowed units.
 */
export declare function getParsedQuantityAndUnit(rawValue?: string | number, fallbackUnit?: string, allowedUnits?: WPUnitControlUnit[]): [number | undefined, string | undefined];
/**
 * Checks if units are defined.
 *
 * @param units List of units.
 * @return Whether the list actually contains any units.
 */
export declare function hasUnits(units?: WPUnitControlUnit[]): units is WPUnitControlUnit[];
/**
 * Parses a quantity and unit from a raw string value, given a list of allowed
 * units and otherwise falling back to the default unit.
 *
 * @param rawValue     The raw value as a string (may or may not contain the unit)
 * @param allowedUnits Units to derive from.
 * @return The extracted quantity and unit. The quantity can be `undefined` in case the raw value
 * could not be parsed to a number correctly. The unit can be `undefined` in case the unit parsed
 * from the raw value could not be matched against the list of allowed units.
 */
export declare function parseQuantityAndUnitFromRawValue(rawValue?: string | number, allowedUnits?: WPUnitControlUnit[]): [number | undefined, string | undefined];
/**
 * Parses quantity and unit from a raw value. Validates parsed value, using fallback
 * value if invalid.
 *
 * @param rawValue         The next value.
 * @param allowedUnits     Units to derive from.
 * @param fallbackQuantity The fallback quantity, used in case it's not possible to parse a valid quantity from the raw value.
 * @param fallbackUnit     The fallback unit, used in case it's not possible to parse a valid unit from the raw value.
 * @return The extracted quantity and unit. The quantity can be `undefined` in case the raw value
 * could not be parsed to a number correctly, and the `fallbackQuantity` was also `undefined`. The
 * unit can be `undefined` only if the unit parsed from the raw value could not be matched against
 * the list of allowed units, the `fallbackQuantity` is also `undefined` and the list of
 * `allowedUnits` is passed empty.
 */
export declare function getValidParsedQuantityAndUnit(rawValue: string | number, allowedUnits?: WPUnitControlUnit[], fallbackQuantity?: number, fallbackUnit?: string): [number | undefined, string | undefined];
/**
 * Takes a unit value and finds the matching accessibility label for the
 * unit abbreviation.
 *
 * @param unit Unit value (example: `px`)
 * @return a11y label for the unit abbreviation
 */
export declare function getAccessibleLabelForUnit(unit: string): string | undefined;
/**
 * Filters available units based on values defined a list of allowed unit values.
 *
 * @param allowedUnitValues Collection of allowed unit value strings.
 * @param availableUnits    Collection of available unit objects.
 * @return Filtered units.
 */
export declare function filterUnitsWithSettings(allowedUnitValues: string[] | undefined, availableUnits: WPUnitControlUnit[]): WPUnitControlUnit[];
/**
 * Custom hook to retrieve and consolidate units setting from add_theme_support().
 * TODO: ideally this hook shouldn't be needed
 * https://github.com/WordPress/gutenberg/pull/31822#discussion_r633280823
 *
 * @param args                An object containing units, settingPath & defaultUnits.
 * @param args.units          Collection of all potentially available units.
 * @param args.availableUnits Collection of unit value strings for filtering available units.
 * @param args.defaultValues  Collection of default values for defined units. Example: `{ px: 350, em: 15 }`.
 *
 * @return Filtered list of units, with their default values updated following the `defaultValues`
 * argument's property.
 */
export declare const useCustomUnits: ({ units, availableUnits, defaultValues, }: {
    units?: WPUnitControlUnit[];
    availableUnits?: string[];
    defaultValues?: Record<string, number>;
}) => WPUnitControlUnit[];
/**
 * Get available units with the unit for the currently selected value
 * prepended if it is not available in the list of units.
 *
 * This is useful to ensure that the current value's unit is always
 * accurately displayed in the UI, even if the intention is to hide
 * the availability of that unit.
 *
 * @param rawValue   Selected value to parse.
 * @param legacyUnit Legacy unit value, if rawValue needs it appended.
 * @param units      List of available units.
 *
 * @return A collection of units containing the unit for the current value.
 */
export declare function getUnitsWithCurrentUnit(rawValue?: string | number, legacyUnit?: string, units?: WPUnitControlUnit[]): WPUnitControlUnit[];
//# sourceMappingURL=utils.d.ts.map
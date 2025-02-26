import type { BoxControlProps, BoxControlValue, CustomValueUnits } from './types';
export declare const CUSTOM_VALUE_SETTINGS: CustomValueUnits;
export declare const LABELS: {
    all: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
    mixed: string;
    vertical: string;
    horizontal: string;
};
export declare const DEFAULT_VALUES: {
    top: undefined;
    right: undefined;
    bottom: undefined;
    left: undefined;
};
export declare const ALL_SIDES: readonly ["top", "right", "bottom", "left"];
/**
 * Gets the 'all' input value and unit from values data.
 *
 * @param values         Box values.
 * @param selectedUnits  Box units.
 * @param availableSides Available box sides to evaluate.
 *
 * @return A value + unit for the 'all' input.
 */
export declare function getAllValue(values?: BoxControlValue, selectedUnits?: BoxControlValue, availableSides?: BoxControlProps['sides']): string;
/**
 * Determine the most common unit selection to use as a fallback option.
 *
 * @param selectedUnits Current unit selections for individual sides.
 * @return  Most common unit selection.
 */
export declare function getAllUnitFallback(selectedUnits?: BoxControlValue): string | undefined;
/**
 * Checks to determine if values are mixed.
 *
 * @param values        Box values.
 * @param selectedUnits Box units.
 * @param sides         Available box sides to evaluate.
 *
 * @return Whether values are mixed.
 */
export declare function isValuesMixed(values?: BoxControlValue, selectedUnits?: BoxControlValue, sides?: BoxControlProps['sides']): boolean;
/**
 * Checks to determine if values are defined.
 *
 * @param values Box values.
 *
 * @return  Whether values are mixed.
 */
export declare function isValuesDefined(values?: BoxControlValue): boolean;
/**
 * Get initial selected side, factoring in whether the sides are linked,
 * and whether the vertical / horizontal directions are grouped via splitOnAxis.
 *
 * @param isLinked    Whether the box control's fields are linked.
 * @param splitOnAxis Whether splitting by horizontal or vertical axis.
 * @return The initial side.
 */
export declare function getInitialSide(isLinked: boolean, splitOnAxis: boolean): "vertical" | "top" | "all";
/**
 * Normalizes provided sides configuration to an array containing only top,
 * right, bottom and left. This essentially just maps `horizontal` or `vertical`
 * to their appropriate sides to facilitate correctly determining value for
 * all input control.
 *
 * @param sides Available sides for box control.
 * @return Normalized sides configuration.
 */
export declare function normalizeSides(sides: BoxControlProps['sides']): readonly ["top", "right", "bottom", "left"] | (keyof BoxControlValue)[];
/**
 * Applies a value to an object representing top, right, bottom and left sides
 * while taking into account any custom side configuration.
 *
 * @param currentValues The current values for each side.
 * @param newValue      The value to apply to the sides object.
 * @param sides         Array defining valid sides.
 *
 * @return Object containing the updated values for each side.
 */
export declare function applyValueToSides(currentValues: BoxControlValue, newValue?: string, sides?: BoxControlProps['sides']): BoxControlValue;
//# sourceMappingURL=utils.d.ts.map
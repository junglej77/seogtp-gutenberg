/**
 * Determines if a value is null or undefined.
 *
 * @template T
 *
 * @param {T} value The value to check.
 * @return {value is Exclude<T, null | undefined>} Whether value is not null or undefined.
 */
export function isValueDefined<T>(value: T): value is Exclude<T, null | undefined>;
/**
 * Determines if a value is empty, null, or undefined.
 *
 * @param {string | number | null | undefined} value The value to check.
 * @return {value is ("" | null | undefined)} Whether value is empty.
 */
export function isValueEmpty(value: string | number | null | undefined): value is ("" | null | undefined);
/**
 * Get the first defined/non-null value from an array.
 *
 * @template T
 *
 * @param {Array<T | null | undefined>} values        Values to derive from.
 * @param {T}                           fallbackValue Fallback value if there are no defined values.
 * @return {T} A defined value or the fallback value.
 */
export function getDefinedValue<T>(values: Array<T | null | undefined> | undefined, fallbackValue: T): T;
export function stringToNumber(value: string): number;
export function ensureNumber(value: string | number): number;
//# sourceMappingURL=values.d.ts.map
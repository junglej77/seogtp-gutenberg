/**
 * Internal dependencies
 */
import type { ColorObject, ColorPaletteProps, PaletteObject } from './types';
export declare const extractColorNameFromCurrentValue: (currentValue?: ColorPaletteProps["value"], colors?: ColorPaletteProps["colors"], showMultiplePalettes?: boolean) => string;
export declare const isMultiplePaletteObject: (obj: PaletteObject | ColorObject) => obj is PaletteObject;
export declare const isMultiplePaletteArray: (arr: (PaletteObject | ColorObject)[]) => arr is PaletteObject[];
/**
 * Transform a CSS variable used as background color into the color value itself.
 *
 * @param value   The color value that may be a CSS variable.
 * @param element The element for which to get the computed style.
 * @return The background color value computed from a element.
 */
export declare const normalizeColorValue: (value: string | undefined, element: HTMLElement | null) => string | undefined;
//# sourceMappingURL=utils.d.ts.map
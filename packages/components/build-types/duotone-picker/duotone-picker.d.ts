import type { DuotonePickerProps } from './types';
/**
 * ```jsx
 * import { DuotonePicker, DuotoneSwatch } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const DUOTONE_PALETTE = [
 * 	{ colors: [ '#8c00b7', '#fcff41' ], name: 'Purple and yellow', slug: 'purple-yellow' },
 * 	{ colors: [ '#000097', '#ff4747' ], name: 'Blue and red', slug: 'blue-red' },
 * ];
 *
 * const COLOR_PALETTE = [
 * 	{ color: '#ff4747', name: 'Red', slug: 'red' },
 * 	{ color: '#fcff41', name: 'Yellow', slug: 'yellow' },
 * 	{ color: '#000097', name: 'Blue', slug: 'blue' },
 * 	{ color: '#8c00b7', name: 'Purple', slug: 'purple' },
 * ];
 *
 * const Example = () => {
 * 	const [ duotone, setDuotone ] = useState( [ '#000000', '#ffffff' ] );
 * 	return (
 * 		<>
 * 			<DuotonePicker
 * 				duotonePalette={ DUOTONE_PALETTE }
 * 				colorPalette={ COLOR_PALETTE }
 * 				value={ duotone }
 * 				onChange={ setDuotone }
 * 			/>
 * 			<DuotoneSwatch values={ duotone } />
 * 		</>
 * 	);
 * };
 * ```
 */
declare function DuotonePicker({ asButtons, loop, clearable, unsetable, colorPalette, duotonePalette, disableCustomColors, disableCustomDuotone, value, onChange, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...otherProps }: DuotonePickerProps): import("react").JSX.Element;
export default DuotonePicker;
//# sourceMappingURL=duotone-picker.d.ts.map
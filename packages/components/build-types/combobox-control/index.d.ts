import type { ComboboxControlProps } from './types';
/**
 * `ComboboxControl` is an enhanced version of a [`SelectControl`](../select-control/README.md) with the addition of
 * being able to search for options using a search input.
 *
 * ```jsx
 * import { ComboboxControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const options = [
 * 	{
 * 		value: 'small',
 * 		label: 'Small',
 * 	},
 * 	{
 * 		value: 'normal',
 * 		label: 'Normal',
 * 		disabled: true,
 * 	},
 * 	{
 * 		value: 'large',
 * 		label: 'Large',
 * 		disabled: false,
 * 	},
 * ];
 *
 * function MyComboboxControl() {
 * 	const [ fontSize, setFontSize ] = useState();
 * 	const [ filteredOptions, setFilteredOptions ] = useState( options );
 * 	return (
 * 		<ComboboxControl
 * 			__nextHasNoMarginBottom
 * 			label="Font Size"
 * 			value={ fontSize }
 * 			onChange={ setFontSize }
 * 			options={ filteredOptions }
 * 			onFilterValueChange={ ( inputValue ) =>
 * 				setFilteredOptions(
 * 					options.filter( ( option ) =>
 * 						option.label
 * 							.toLowerCase()
 * 							.startsWith( inputValue.toLowerCase() )
 * 					)
 * 				)
 * 			}
 * 		/>
 * 	);
 * }
 * ```
 */
declare function ComboboxControl(props: ComboboxControlProps): import("react").JSX.Element;
export default ComboboxControl;
//# sourceMappingURL=index.d.ts.map
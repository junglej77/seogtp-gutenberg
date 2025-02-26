import type { DimensionControlProps } from './types';
/**
 * `DimensionControl` is a component designed to provide a UI to control spacing and/or dimensions.
 *
 * @deprecated
 *
 * ```jsx
 * import { __experimentalDimensionControl as DimensionControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * export default function MyCustomDimensionControl() {
 * 	const [ paddingSize, setPaddingSize ] = useState( '' );
 *
 * 	return (
 * 		<DimensionControl
 * 			__nextHasNoMarginBottom
 * 			label={ 'Padding' }
 * 			icon={ 'desktop' }
 * 			onChange={ ( value ) => setPaddingSize( value ) }
 * 			value={ paddingSize }
 * 		/>
 * 	);
 * }
 * ```
 */
export declare function DimensionControl(props: DimensionControlProps): import("react").JSX.Element;
export default DimensionControl;
//# sourceMappingURL=index.d.ts.map
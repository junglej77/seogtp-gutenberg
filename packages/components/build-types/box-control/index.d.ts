import type { BoxControlProps } from './types';
/**
 * BoxControl components let users set values for Top, Right, Bottom, and Left.
 * This can be used as an input control for values like `padding` or `margin`.
 *
 * ```jsx
 * import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const Example = () => {
 * 	const [ values, setValues ] = useState( {
 * 		top: '50px',
 * 		left: '10%',
 * 		right: '10%',
 * 		bottom: '50px',
 * 	} );
 *
 * 	return (
 * 		<BoxControl
 * 			values={ values }
 * 			onChange={ ( nextValues ) => setValues( nextValues ) }
 * 		/>
 * 	);
 * };
 * ```
 */
declare function BoxControl({ __next40pxDefaultSize, id: idProp, inputProps, onChange, label, values: valuesProp, units, sides, splitOnAxis, allowReset, resetValues, onMouseOver, onMouseOut, }: BoxControlProps): import("react").JSX.Element;
export { applyValueToSides } from './utils';
export default BoxControl;
//# sourceMappingURL=index.d.ts.map
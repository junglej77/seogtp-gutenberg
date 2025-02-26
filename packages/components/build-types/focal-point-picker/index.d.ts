import type { WordPressComponentProps } from '../context/wordpress-component';
import type { FocalPointPickerProps } from './types';
/**
 * Focal Point Picker is a component which creates a UI for identifying the most important visual point of an image.
 *
 * This component addresses a specific problem: with large background images it is common to see undesirable crops,
 * especially when viewing on smaller viewports such as mobile phones. This component allows the selection of
 * the point with the most important visual information and returns it as a pair of numbers between 0 and 1.
 * This value can be easily converted into the CSS `background-position` attribute, and will ensure that the
 * focal point is never cropped out, regardless of viewport.
 *
 * - Example focal point picker value: `{ x: 0.5, y: 0.1 }`
 * - Corresponding CSS: `background-position: 50% 10%;`
 *
 * ```jsx
 * import { FocalPointPicker } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const Example = () => {
 * 	const [ focalPoint, setFocalPoint ] = useState( {
 * 		x: 0.5,
 * 		y: 0.5,
 * 	} );
 *
 * 	const url = '/path/to/image';
 *
 * 	// Example function to render the CSS styles based on Focal Point Picker value
 * 	const style = {
 * 		backgroundImage: `url(${ url })`,
 * 		backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
 * 	};
 *
 * 	return (
 * 		<>
 * 			<FocalPointPicker
 *        __nextHasNoMarginBottom
 * 				url={ url }
 * 				value={ focalPoint }
 * 				onDragStart={ setFocalPoint }
 * 				onDrag={ setFocalPoint }
 * 				onChange={ setFocalPoint }
 * 			/>
 * 			<div style={ style } />
 * 		</>
 * 	);
 * };
 * ```
 */
export declare function FocalPointPicker({ __nextHasNoMarginBottom, autoPlay, className, help, label, onChange, onDrag, onDragEnd, onDragStart, resolvePoint, url, value: valueProp, ...restProps }: WordPressComponentProps<FocalPointPickerProps, 'div', false>): import("react").JSX.Element;
export default FocalPointPicker;
//# sourceMappingURL=index.d.ts.map
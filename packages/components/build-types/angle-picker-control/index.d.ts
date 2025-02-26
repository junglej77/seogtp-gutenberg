import type { AnglePickerControlProps } from './types';
/**
 * `AnglePickerControl` is a React component to render a UI that allows users to
 * pick an angle. Users can choose an angle in a visual UI with the mouse by
 * dragging an angle indicator inside a circle or by directly inserting the
 * desired angle in a text field.
 *
 * ```jsx
 * import { useState } from '@wordpress/element';
 * import { AnglePickerControl } from '@wordpress/components';
 *
 * function Example() {
 *   const [ angle, setAngle ] = useState( 0 );
 *   return (
 *     <AnglePickerControl
 *       value={ angle }
 *       onChange={ setAngle }
 *     </>
 *   );
 * }
 * ```
 */
export declare const AnglePickerControl: import("react").ForwardRefExoticComponent<AnglePickerControlProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | keyof AnglePickerControlProps> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & import("react").RefAttributes<any>>;
export default AnglePickerControl;
//# sourceMappingURL=index.d.ts.map
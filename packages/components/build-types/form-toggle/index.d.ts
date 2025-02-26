/**
 * Internal dependencies
 */
import type { FormToggleProps } from './types';
export declare const noop: () => void;
/**
 * FormToggle switches a single setting on or off.
 *
 * ```jsx
 * import { FormToggle } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyFormToggle = () => {
 *   const [ isChecked, setChecked ] = useState( true );
 *
 *   return (
 *     <FormToggle
 *       checked={ isChecked }
 *       onChange={ () => setChecked( ( state ) => ! state ) }
 *     />
 *   );
 * };
 * ```
 */
export declare const FormToggle: import("react").ForwardRefExoticComponent<FormToggleProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "as" | "children" | keyof FormToggleProps> & import("react").RefAttributes<HTMLInputElement>>;
export default FormToggle;
//# sourceMappingURL=index.d.ts.map
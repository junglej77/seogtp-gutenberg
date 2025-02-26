/**
 * ToggleControl is used to generate a toggle user interface.
 *
 * ```jsx
 * import { ToggleControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyToggleControl = () => {
 *   const [ value, setValue ] = useState( false );
 *
 *   return (
 *     <ToggleControl
 *       __nextHasNoMarginBottom
 *       label="Fixed Background"
 *       checked={ value }
 *       onChange={ () => setValue( ( state ) => ! state ) }
 *     />
 *   );
 * };
 * ```
 */
export declare const ToggleControl: import("react").ForwardRefExoticComponent<Pick<import("../form-toggle/types").FormToggleProps, "disabled" | "checked"> & Pick<import("../base-control/types").BaseControlProps, "className" | "__nextHasNoMarginBottom"> & {
    help?: import("react").ReactNode | ((checked: boolean) => import("react").ReactNode);
    label: import("react").ReactNode;
    onChange: (value: boolean) => void;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "label" | "as" | "children" | "className" | "onChange" | "disabled" | "checked" | "help" | "__nextHasNoMarginBottom"> & import("react").RefAttributes<HTMLInputElement>>;
export default ToggleControl;
//# sourceMappingURL=index.d.ts.map
/**
 * TextControl components let users enter and edit text.
 *
 * ```jsx
 * import { TextControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyTextControl = () => {
 *   const [ className, setClassName ] = useState( '' );
 *
 *   return (
 *     <TextControl
 *       __nextHasNoMarginBottom
 *       label="Additional CSS Class"
 *       value={ className }
 *       onChange={ ( value ) => setClassName( value ) }
 *     />
 *   );
 * };
 * ```
 */
export declare const TextControl: import("react").ForwardRefExoticComponent<Pick<import("../base-control/types").BaseControlProps, "label" | "className" | "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & {
    onChange: (value: string) => void;
    value: string | number;
    type?: "date" | "datetime-local" | "email" | "number" | "password" | "tel" | "text" | "time" | "search" | "url";
    __next40pxDefaultSize?: boolean;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "label" | "as" | "children" | "className" | "onChange" | "value" | "type" | "help" | "__nextHasNoMarginBottom" | "__next40pxDefaultSize" | "hideLabelFromVision"> & import("react").RefAttributes<HTMLInputElement>>;
export default TextControl;
//# sourceMappingURL=index.d.ts.map
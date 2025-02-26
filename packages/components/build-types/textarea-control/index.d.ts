/**
 * TextareaControls are TextControls that allow for multiple lines of text, and
 * wrap overflow text onto a new line. They are a fixed height and scroll
 * vertically when the cursor reaches the bottom of the field.
 *
 * ```jsx
 * import { TextareaControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyTextareaControl = () => {
 *   const [ text, setText ] = useState( '' );
 *
 *   return (
 *     <TextareaControl
 *       __nextHasNoMarginBottom
 *       label="Text"
 *       help="Enter some text"
 *       value={ text }
 *       onChange={ ( value ) => setText( value ) }
 *     />
 *   );
 * };
 * ```
 */
export declare const TextareaControl: import("react").ForwardRefExoticComponent<Pick<import("../base-control/types").BaseControlProps, "label" | "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & {
    onChange: (value: string) => void;
    value: string;
    rows?: import("react").TextareaHTMLAttributes<HTMLTextAreaElement>["rows"];
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref">, "label" | "as" | "children" | "onChange" | "value" | "rows" | "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & import("react").RefAttributes<HTMLTextAreaElement>>;
export default TextareaControl;
//# sourceMappingURL=index.d.ts.map
/**
 * RangeControls are used to make selections from a range of incremental values.
 *
 * ```jsx
 * import { RangeControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyRangeControl = () => {
 *   const [ isChecked, setChecked ] = useState( true );
 *   return (
 *     <RangeControl
 *       __nextHasNoMarginBottom
 *       help="Please select how transparent you would like this."
 *       initialPosition={50}
 *       label="Opacity"
 *       max={100}
 *       min={0}
 *       onChange={() => {}}
 *     />
 *   );
 * };
 * ```
 */
export declare const RangeControl: import("react").ForwardRefExoticComponent<Pick<import("../base-control/types").BaseControlProps, "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & import("./types").NumericProps & {
    disabled?: boolean;
    marks?: boolean | {
        value: number;
        label?: string;
    }[];
    step?: number | "any";
} & {
    afterIcon?: import("../icon").IconType;
    allowReset?: boolean;
    beforeIcon?: import("../icon").IconType;
    color?: import("react").CSSProperties["color"];
    currentInput?: number;
    icon?: string;
    initialPosition?: number;
    isShiftStepEnabled?: boolean;
    label?: string;
    onBlur?: import("react").FocusEventHandler<HTMLInputElement>;
    onChange?: (value?: number) => void;
    onFocus?: import("react").FocusEventHandler<HTMLInputElement>;
    onMouseLeave?: import("react").MouseEventHandler<HTMLInputElement>;
    onMouseMove?: import("react").MouseEventHandler<HTMLInputElement>;
    railColor?: import("react").CSSProperties["color"];
    renderTooltipContent?: (value?: import("./types").ControlledRangeValue) => string | number | null | undefined;
    resetFallbackValue?: number;
    separatorType?: "none" | "fullWidth" | "topFullWidth";
    shiftStep?: number;
    __next40pxDefaultSize?: boolean;
    showTooltip?: boolean;
    trackColor?: import("react").CSSProperties["color"];
    type?: "stepper";
    withInputField?: boolean;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "label" | "as" | "children" | "color" | "onFocus" | "onBlur" | "onChange" | "onMouseLeave" | "onMouseMove" | "disabled" | "type" | "step" | "help" | "icon" | "__nextHasNoMarginBottom" | "__next40pxDefaultSize" | "hideLabelFromVision" | "isShiftStepEnabled" | "shiftStep" | "showTooltip" | keyof import("./types").NumericProps | "marks" | "afterIcon" | "allowReset" | "beforeIcon" | "currentInput" | "initialPosition" | "railColor" | "renderTooltipContent" | "resetFallbackValue" | "separatorType" | "trackColor" | "withInputField"> & import("react").RefAttributes<HTMLInputElement>>;
export default RangeControl;
//# sourceMappingURL=index.d.ts.map
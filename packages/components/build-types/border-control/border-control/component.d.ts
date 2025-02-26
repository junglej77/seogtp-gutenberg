import type { LabelProps } from '../types';
/**
 * The `BorderControl` brings together internal sub-components which allow users to
 * set the various properties of a border. The first sub-component, a
 * `BorderDropdown` contains options representing border color and style. The
 * border width is controlled via a `UnitControl` and an optional `RangeControl`.
 *
 * Border radius is not covered by this control as it may be desired separate to
 * color, style, and width. For example, the border radius may be absorbed under
 * a "shape" abstraction.
 *
 * ```jsx
 * import { __experimentalBorderControl as BorderControl } from '@wordpress/components';
 * import { __ } from '@wordpress/i18n';
 *
 * const colors = [
 * 	{ name: 'Blue 20', color: '#72aee6' },
 * 	// ...
 * ];
 *
 * const MyBorderControl = () => {
 * 	const [ border, setBorder ] = useState();
 * 	const onChange = ( newBorder ) => setBorder( newBorder );
 *
 * 	return (
 * 		<BorderControl
 * 			colors={ colors }
 * 			label={ __( 'Border' ) }
 * 			onChange={ onChange }
 * 			value={ border }
 * 		/>
 * 	);
 * };
 * ```
 */
export declare const BorderControl: import("../../context").WordPressComponent<"div", Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & LabelProps & {
    disableUnits?: boolean;
    enableStyle?: boolean;
    isCompact?: boolean;
    onChange: (value?: import("../types").Border) => void;
    placeholder?: HTMLInputElement["placeholder"];
    __unstablePopoverProps?: Omit<import("../../popover/types").PopoverProps, "children">;
    shouldSanitizeBorder?: boolean;
    showDropdownHeader?: boolean;
    size?: "default" | "__unstable-large";
    value?: import("../types").Border;
    width?: import("react").CSSProperties["width"];
    withSlider?: boolean;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any>, false>;
export default BorderControl;
//# sourceMappingURL=component.d.ts.map
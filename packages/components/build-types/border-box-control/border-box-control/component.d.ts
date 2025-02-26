import type { LabelProps, BorderControlProps } from '../../border-control/types';
/**
 * The `BorderBoxControl` effectively has two view states. The first, a "linked"
 * view, allows configuration of a flat border via a single `BorderControl`.
 * The second, a "split" view, contains a `BorderControl` for each side
 * as well as a visualizer for the currently selected borders. Each view also
 * contains a button to toggle between the two.
 *
 * When switching from the "split" view to "linked", if the individual side
 * borders are not consistent, the "linked" view will display any border
 * properties selections that are consistent while showing a mixed state for
 * those that aren't. For example, if all borders had the same color and style
 * but different widths, then the border dropdown in the "linked" view's
 * `BorderControl` would show that consistent color and style but the "linked"
 * view's width input would show "Mixed" placeholder text.
 *
 * ```jsx
 * import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
 * import { __ } from '@wordpress/i18n';
 *
 * const colors = [
 * 	{ name: 'Blue 20', color: '#72aee6' },
 * 	// ...
 * ];
 *
 * const MyBorderBoxControl = () => {
 * 	const defaultBorder = {
 * 		color: '#72aee6',
 * 		style: 'dashed',
 * 		width: '1px',
 * 	};
 * 	const [ borders, setBorders ] = useState( {
 * 		top: defaultBorder,
 * 		right: defaultBorder,
 * 		bottom: defaultBorder,
 * 		left: defaultBorder,
 * 	} );
 * 	const onChange = ( newBorders ) => setBorders( newBorders );
 *
 * 	return (
 * 		<BorderBoxControl
 * 			colors={ colors }
 * 			label={ __( 'Borders' ) }
 * 			onChange={ onChange }
 * 			value={ borders }
 * 		/>
 * 	);
 * };
 * ```
 */
export declare const BorderBoxControl: import("../../context").WordPressComponent<"div", Pick<import("../../color-palette/types").ColorPaletteProps, "colors" | "enableAlpha" | "__experimentalIsRenderedInSidebar"> & {
    disableCustomColors?: boolean;
} & LabelProps & Pick<BorderControlProps, "size" | "enableStyle"> & {
    onChange: (value: import("../types").AnyBorder) => void;
    popoverPlacement?: import("../../popover/types").PopoverProps["placement"];
    popoverOffset?: import("../../popover/types").PopoverProps["offset"];
    value: import("../types").AnyBorder;
    __next40pxDefaultSize?: boolean;
} & import("react").RefAttributes<any>, false>;
export default BorderBoxControl;
//# sourceMappingURL=component.d.ts.map
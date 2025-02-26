import type { BaseControlProps, BaseControlVisualLabelProps } from './types';
export { useBaseControlProps } from './hooks';
export declare const VisualLabel: import("react").ForwardRefExoticComponent<BaseControlVisualLabelProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref">, "as" | "children"> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & import("react").RefAttributes<any>>;
/**
 * `BaseControl` is a component used to generate labels and help text for components handling user inputs.
 *
 * ```jsx
 * import { BaseControl, useBaseControlProps } from '@wordpress/components';
 *
 * // Render a `BaseControl` for a textarea input
 * const MyCustomTextareaControl = ({ children, ...baseProps }) => (
 * 	// `useBaseControlProps` is a convenience hook to get the props for the `BaseControl`
 * 	// and the inner control itself. Namely, it takes care of generating a unique `id`,
 * 	// properly associating it with the `label` and `help` elements.
 * 	const { baseControlProps, controlProps } = useBaseControlProps( baseProps );
 *
 * 	return (
 * 		<BaseControl { ...baseControlProps } __nextHasNoMarginBottom>
 * 			<textarea { ...controlProps }>
 * 			  { children }
 * 			</textarea>
 * 		</BaseControl>
 * 	);
 * );
 * ```
 */
export declare const BaseControl: import("../context").WordPressComponent<null, BaseControlProps, true> & {
    /**
     * `BaseControl.VisualLabel` is used to render a purely visual label inside a `BaseControl` component.
     *
     * It should only be used in cases where the children being rendered inside `BaseControl` are already accessibly labeled,
     * e.g., a button, but we want an additional visual label for that section equivalent to the labels `BaseControl` would
     * otherwise use if the `label` prop was passed.
     *
     * ```jsx
     * import { BaseControl } from '@wordpress/components';
     *
     * const MyBaseControl = () => (
     * 	<BaseControl
     * 		__nextHasNoMarginBottom
     * 		help="This button is already accessibly labeled."
     * 	>
     * 		<BaseControl.VisualLabel>Author</BaseControl.VisualLabel>
     * 		<Button>Select an author</Button>
     * 	</BaseControl>
     * );
     * ```
     */
    VisualLabel: import("react").ForwardRefExoticComponent<BaseControlVisualLabelProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref">, "as" | "children"> & {
        as?: keyof JSX.IntrinsicElements | undefined;
    } & import("react").RefAttributes<any>>;
};
export default BaseControl;
//# sourceMappingURL=index.d.ts.map
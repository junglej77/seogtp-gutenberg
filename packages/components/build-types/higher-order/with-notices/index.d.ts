/**
 * Override the default edit UI to include notices if supported.
 *
 * Wrapping the original component with `withNotices` encapsulates the component
 * with the additional props `noticeOperations` and `noticeUI`.
 *
 * ```jsx
 * import { withNotices, Button } from '@wordpress/components';
 *
 * const MyComponentWithNotices = withNotices(
 * 	( { noticeOperations, noticeUI } ) => {
 * 		const addError = () =>
 * 			noticeOperations.createErrorNotice( 'Error message' );
 * 		return (
 * 			<div>
 * 				{ noticeUI }
 * 				<Button variant="secondary" onClick={ addError }>
 * 					Add error
 * 				</Button>
 * 			</div>
 * 		);
 * 	}
 * );
 * ```
 *
 * @param OriginalComponent Original component.
 *
 * @return Wrapped component.
 */
declare const _default: (Inner: import("react").ComponentType<any>) => ((props: {
    [key: string]: any;
}, ref: React.ForwardedRef<any>) => import("react").JSX.Element) | import("react").ForwardRefExoticComponent<Omit<{
    [key: string]: any;
}, "ref"> & import("react").RefAttributes<any>>;
export default _default;
//# sourceMappingURL=index.d.ts.map
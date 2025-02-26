import type { TreeSelectProps } from './types';
/**
 * TreeSelect component is used to generate select input fields.
 *
 * ```jsx
 * import { TreeSelect } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyTreeSelect = () => {
 * 	const [ page, setPage ] = useState( 'p21' );
 *
 * 	return (
 * 		<TreeSelect
 * 			__nextHasNoMarginBottom
 * 			label="Parent page"
 * 			noOptionLabel="No parent page"
 * 			onChange={ ( newPage ) => setPage( newPage ) }
 * 			selectedId={ page }
 * 			tree={ [
 * 				{
 * 					name: 'Page 1',
 * 					id: 'p1',
 * 					children: [
 * 						{ name: 'Descend 1 of page 1', id: 'p11' },
 * 						{ name: 'Descend 2 of page 1', id: 'p12' },
 * 					],
 * 				},
 * 				{
 * 					name: 'Page 2',
 * 					id: 'p2',
 * 					children: [
 * 						{
 * 							name: 'Descend 1 of page 2',
 * 							id: 'p21',
 * 							children: [
 * 								{
 * 									name: 'Descend 1 of Descend 1 of page 2',
 * 									id: 'p211',
 * 								},
 * 							],
 * 						},
 * 					],
 * 				},
 * 			] }
 * 		/>
 * 	);
 * }
 * ```
 */
export declare function TreeSelect(props: TreeSelectProps): import("react").JSX.Element;
export default TreeSelect;
//# sourceMappingURL=index.d.ts.map
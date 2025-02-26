/**
 * Internal dependencies
 */
import type { KeyboardShortcutsProps } from './types';
/**
 * `KeyboardShortcuts` is a component which handles keyboard sequences during the lifetime of the rendering element.
 *
 * When passed children, it will capture key events which occur on or within the children. If no children are passed, events are captured on the document.
 *
 * It uses the [Mousetrap](https://craig.is/killing/mice) library to implement keyboard sequence bindings.
 *
 * ```jsx
 * import { KeyboardShortcuts } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyKeyboardShortcuts = () => {
 * 	const [ isAllSelected, setIsAllSelected ] = useState( false );
 * 	const selectAll = () => {
 * 		setIsAllSelected( true );
 * 	};
 *
 * 	return (
 * 		<div>
 * 			<KeyboardShortcuts
 * 				shortcuts={ {
 * 					'mod+a': selectAll,
 * 				} }
 * 			/>
 * 			[cmd/ctrl + A] Combination pressed? { isAllSelected ? 'Yes' : 'No' }
 * 		</div>
 * 	);
 * };
 * ```
 */
declare function KeyboardShortcuts({ children, shortcuts, bindGlobal, eventName, }: KeyboardShortcutsProps): import("react").JSX.Element;
export default KeyboardShortcuts;
//# sourceMappingURL=index.d.ts.map
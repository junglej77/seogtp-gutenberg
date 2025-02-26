/**
 * Internal dependencies
 */
import type { AnimateProps, GetAnimateOptions } from './types';
/**
 * @param options
 *
 * @return ClassName that applies the animations
 */
export declare function getAnimateClassName(options: GetAnimateOptions): string | undefined;
/**
 * Simple interface to introduce animations to components.
 *
 * ```jsx
 * import { Animate, Notice } from '@wordpress/components';
 *
 * const MyAnimatedNotice = () => (
 * 	<Animate type="slide-in" options={ { origin: 'top' } }>
 * 		{ ( { className } ) => (
 * 			<Notice className={ className } status="success">
 * 				<p>Animation finished.</p>
 * 			</Notice>
 * 		) }
 * 	</Animate>
 * );
 * ```
 */
export declare function Animate({ type, options, children }: AnimateProps): JSX.Element;
export default Animate;
//# sourceMappingURL=index.d.ts.map
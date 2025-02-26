/**
 * Internal dependencies
 */
import type { ResponsiveWrapperProps } from './types';
/**
 * A wrapper component that maintains its aspect ratio when resized.
 *
 * ```jsx
 * import { ResponsiveWrapper } from '@wordpress/components';
 *
 * const MyResponsiveWrapper = () => (
 * 	<ResponsiveWrapper naturalWidth={ 2000 } naturalHeight={ 680 }>
 * 		<img
 * 			src="https://s.w.org/style/images/about/WordPress-logotype-standard.png"
 * 			alt="WordPress"
 * 		/>
 * 	</ResponsiveWrapper>
 * );
 * ```
 */
declare function ResponsiveWrapper({ naturalWidth, naturalHeight, children, isInline, }: ResponsiveWrapperProps): import("react").JSX.Element | null;
export default ResponsiveWrapper;
//# sourceMappingURL=index.d.ts.map
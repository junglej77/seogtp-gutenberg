/**
 * Internal dependencies
 */
import type { SandBoxProps } from './types';
/**
 * This component provides an isolated environment for arbitrary HTML via iframes.
 *
 * ```jsx
 * import { SandBox } from '@wordpress/components';
 *
 * const MySandBox = () => (
 * 	<SandBox html="<p>Content</p>" title="SandBox" type="embed" />
 * );
 * ```
 */
declare function SandBox({ html, title, type, styles, scripts, onFocus, tabIndex, }: SandBoxProps): import("react").JSX.Element;
export default SandBox;
//# sourceMappingURL=index.d.ts.map
/**
 * Internal dependencies
 */
import type { ExternalLinkProps } from './types';
import type { WordPressComponentProps } from '../context';
/**
 * Link to an external resource.
 *
 * ```jsx
 * import { ExternalLink } from '@wordpress/components';
 *
 * const MyExternalLink = () => (
 *   <ExternalLink href="https://wordpress.org">WordPress.org</ExternalLink>
 * );
 * ```
 */
export declare const ExternalLink: import("react").ForwardRefExoticComponent<Omit<WordPressComponentProps<ExternalLinkProps, "a", false>, "target"> & import("react").RefAttributes<HTMLAnchorElement>>;
export default ExternalLink;
//# sourceMappingURL=index.d.ts.map
/**
 * Internal dependencies
 */
import type { ThemeProps } from './types';
import type { WordPressComponentProps } from '../context';
/**
 * `Theme` allows defining theme variables for components in the `@wordpress/components` package.
 *
 * Multiple `Theme` components can be nested in order to override specific theme variables.
 *
 *
 * ```jsx
 * const Example = () => {
 *   return (
 *     <Theme accent="red">
 *       <Button variant="primary">I'm red</Button>
 *       <Theme accent="blue">
 *         <Button variant="primary">I'm blue</Button>
 *       </Theme>
 *     </Theme>
 *   );
 * };
 * ```
 */
declare function Theme({ accent, background, className, ...props }: WordPressComponentProps<ThemeProps, 'div', true>): import("react").JSX.Element;
export default Theme;
//# sourceMappingURL=index.d.ts.map
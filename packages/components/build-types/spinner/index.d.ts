import type { ForwardedRef } from 'react';
import type { WordPressComponentProps } from '../context';
export declare function UnforwardedSpinner({ className, ...props }: WordPressComponentProps<{}, 'svg', false>, forwardedRef: ForwardedRef<any>): import("react").JSX.Element;
/**
 * `Spinner` is a component used to notify users that their action is being processed.
 *
 * ```js
 *   import { Spinner } from '@wordpress/components';
 *
 *   function Example() {
 *     return <Spinner />;
 *   }
 * ```
 */
export declare const Spinner: import("react").ForwardRefExoticComponent<Omit<Omit<import("react").SVGProps<SVGSVGElement>, "ref">, "as" | "children"> & import("react").RefAttributes<any>>;
export default Spinner;
//# sourceMappingURL=index.d.ts.map
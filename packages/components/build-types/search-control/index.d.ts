import type { WordPressComponentProps } from '../context/wordpress-component';
import type { SearchControlProps } from './types';
/**
 * SearchControl components let users display a search control.
 *
 * ```jsx
 * import { SearchControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * function MySearchControl( { className, setState } ) {
 *   const [ searchInput, setSearchInput ] = useState( '' );
 *
 *   return (
 *     <SearchControl
 *       __nextHasNoMarginBottom
 *       value={ searchInput }
 *       onChange={ setSearchInput }
 *     />
 *   );
 * }
 * ```
 */
export declare const SearchControl: import("react").ForwardRefExoticComponent<Omit<WordPressComponentProps<SearchControlProps, "input", false>, "disabled"> & import("react").RefAttributes<HTMLInputElement>>;
export default SearchControl;
//# sourceMappingURL=index.d.ts.map
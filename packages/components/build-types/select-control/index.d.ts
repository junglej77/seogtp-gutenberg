import type { WordPressComponentProps } from '../context';
import type { SelectControlProps } from './types';
/**
 * `SelectControl` allows users to select from a single or multiple option menu.
 * It functions as a wrapper around the browser's native `<select>` element.
 *
 * ```jsx
 * import { SelectControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MySelectControl = () => {
 *   const [ size, setSize ] = useState( '50%' );
 *
 *   return (
 *     <SelectControl
 *       __nextHasNoMarginBottom
 *       label="Size"
 *       value={ size }
 *       options={ [
 *         { label: 'Big', value: '100%' },
 *         { label: 'Medium', value: '50%' },
 *         { label: 'Small', value: '25%' },
 *       ] }
 *       onChange={ setSize }
 *     />
 *   );
 * };
 * ```
 */
export declare const SelectControl: <V extends string>(props: WordPressComponentProps<SelectControlProps<V>, "select", false> & {
    ref?: React.Ref<HTMLSelectElement>;
}) => React.JSX.Element | null;
export default SelectControl;
//# sourceMappingURL=index.d.ts.map
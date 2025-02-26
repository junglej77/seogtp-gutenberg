/**
 * Internal dependencies
 */
import type { DropZoneProps } from './types';
import type { WordPressComponentProps } from '../context';
/**
 * `DropZone` is a component creating a drop zone area taking the full size of its parent element. It supports dropping files, HTML content or any other HTML drop event.
 *
 * ```jsx
 * import { DropZone } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyDropZone = () => {
 *   const [ hasDropped, setHasDropped ] = useState( false );
 *
 *   return (
 *     <div>
 *       { hasDropped ? 'Dropped!' : 'Drop something here' }
 *       <DropZone
 *         onFilesDrop={ () => setHasDropped( true ) }
 *         onHTMLDrop={ () => setHasDropped( true ) }
 *         onDrop={ () => setHasDropped( true ) }
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export declare function DropZoneComponent({ className, label, onFilesDrop, onHTMLDrop, onDrop, ...restProps }: WordPressComponentProps<DropZoneProps, 'div', false>): import("react").JSX.Element;
export default DropZoneComponent;
//# sourceMappingURL=index.d.ts.map
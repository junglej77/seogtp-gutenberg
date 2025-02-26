import type { WordPressComponentProps } from '../context';
import type { FormFileUploadProps } from './types';
/**
 * FormFileUpload is a component that allows users to select files from their local device.
 *
 * ```jsx
 * import { FormFileUpload } from '@wordpress/components';
 *
 * const MyFormFileUpload = () => (
 *   <FormFileUpload
 *     accept="image/*"
 *     onChange={ ( event ) => console.log( event.currentTarget.files ) }
 *   >
 *     Upload
 *   </FormFileUpload>
 * );
 * ```
 */
export declare function FormFileUpload({ accept, children, multiple, onChange, onClick, render, ...props }: WordPressComponentProps<FormFileUploadProps, 'button', false>): import("react").JSX.Element;
export default FormFileUpload;
//# sourceMappingURL=index.d.ts.map
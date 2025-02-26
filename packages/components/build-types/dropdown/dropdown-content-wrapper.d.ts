import type { DropdownContentWrapperProps } from './types';
/**
 * A convenience wrapper for the `renderContent` when you want to apply
 * different padding. (Default is `paddingSize="small"`).
 *
 * ```jsx
 * import {
 *   Dropdown,
 *   __experimentalDropdownContentWrapper as DropdownContentWrapper,
 * } from '@wordpress/components';
 *
 * <Dropdown
 *   renderContent={ () => (
 *     <DropdownContentWrapper paddingSize="medium">
 *       My dropdown content
 *     </DropdownContentWrapper>
 * ) }
 * />
 * ```
 */
export declare const DropdownContentWrapper: import("../context").WordPressComponent<"div", DropdownContentWrapperProps & import("react").RefAttributes<any>, false>;
export default DropdownContentWrapper;
//# sourceMappingURL=dropdown-content-wrapper.d.ts.map
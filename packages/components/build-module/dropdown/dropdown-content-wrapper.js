/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

import { contextConnect, useContextSystem } from '../context';
import { DropdownContentWrapperDiv } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedDropdownContentWrapper(props, forwardedRef) {
  const {
    paddingSize = 'small',
    ...derivedProps
  } = useContextSystem(props, 'DropdownContentWrapper');
  return /*#__PURE__*/_jsx(DropdownContentWrapperDiv, {
    ...derivedProps,
    paddingSize: paddingSize,
    ref: forwardedRef
  });
}

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
export const DropdownContentWrapper = contextConnect(UnconnectedDropdownContentWrapper, 'DropdownContentWrapper');
export default DropdownContentWrapper;
//# sourceMappingURL=dropdown-content-wrapper.js.map
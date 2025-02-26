/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';

/**
 * Internal dependencies
 */

import { contextConnect, useContextSystem } from '../context';
import { DividerView } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedDivider(props, forwardedRef) {
  const contextProps = useContextSystem(props, 'Divider');
  return /*#__PURE__*/_jsx(Ariakit.Separator, {
    render: /*#__PURE__*/_jsx(DividerView, {}),
    ...contextProps,
    ref: forwardedRef
  });
}

/**
 * `Divider` is a layout component that separates groups of related content.
 *
 * ```js
 * import {
 * 		__experimentalDivider as Divider,
 * 		__experimentalText as Text,
 * 		__experimentalVStack as VStack,
 * } from `@wordpress/components`;
 *
 * function Example() {
 * 	return (
 * 		<VStack spacing={4}>
 * 			<Text>Some text here</Text>
 * 			<Divider />
 * 			<Text>Some more text here</Text>
 * 		</VStack>
 * 	);
 * }
 * ```
 */
export const Divider = contextConnect(UnconnectedDivider, 'Divider');
export default Divider;
//# sourceMappingURL=component.js.map
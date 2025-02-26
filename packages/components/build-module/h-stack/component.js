/**
 * Internal dependencies
 */

import { contextConnect } from '../context';
import { View } from '../view';
import { useHStack } from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedHStack(props, forwardedRef) {
  const hStackProps = useHStack(props);
  return /*#__PURE__*/_jsx(View, {
    ...hStackProps,
    ref: forwardedRef
  });
}

/**
 * `HStack` (Horizontal Stack) arranges child elements in a horizontal line.
 *
 * `HStack` can render anything inside.
 *
 * ```jsx
 * import {
 * 	__experimentalHStack as HStack,
 * 	__experimentalText as Text,
 * } from `@wordpress/components`;
 *
 * function Example() {
 * 	return (
 * 		<HStack>
 * 			<Text>Code</Text>
 * 			<Text>is</Text>
 * 			<Text>Poetry</Text>
 * 		</HStack>
 * 	);
 * }
 * ```
 */
export const HStack = contextConnect(UnconnectedHStack, 'HStack');
export default HStack;
//# sourceMappingURL=component.js.map
/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';
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
export declare const Divider: import("../context").WordPressComponent<"hr", Omit<Ariakit.SeparatorProps, "as" | "children" | "orientation" | "render" | "unstable_system"> & {
    margin?: import("../utils/space").SpaceInput;
    marginEnd?: import("../utils/space").SpaceInput;
    marginStart?: import("../utils/space").SpaceInput;
    orientation?: Ariakit.SeparatorProps["orientation"];
} & import("react").RefAttributes<any>, false>;
export default Divider;
//# sourceMappingURL=component.d.ts.map
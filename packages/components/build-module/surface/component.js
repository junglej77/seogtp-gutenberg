/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { contextConnect } from '../context';
import { View } from '../view';
import { useSurface } from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedSurface(props, forwardedRef) {
  const surfaceProps = useSurface(props);
  return /*#__PURE__*/_jsx(View, {
    ...surfaceProps,
    ref: forwardedRef
  });
}

/**
 * `Surface` is a core component that renders a primary background color.
 *
 * In the example below, notice how the `Surface` renders in white (or dark gray if in dark mode).
 *
 * ```jsx
 * import {
 *	__experimentalSurface as Surface,
 *	__experimentalText as Text,
 * } from '@wordpress/components';
 *
 * function Example() {
 * 	return (
 * 		<Surface>
 * 			<Text>Code is Poetry</Text>
 * 		</Surface>
 * 	);
 * }
 * ```
 */
export const Surface = contextConnect(UnconnectedSurface, 'Surface');
export default Surface;
//# sourceMappingURL=component.js.map
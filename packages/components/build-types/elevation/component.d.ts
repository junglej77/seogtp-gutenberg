import type { ElevationProps } from './types';
/**
 * `Elevation` is a core component that renders shadow, using the component
 * system's shadow system.
 *
 * The shadow effect is generated using the `value` prop.
 *
 * ```jsx
 * import {
 *	__experimentalElevation as Elevation,
 *	__experimentalSurface as Surface,
 *	__experimentalText as Text,
 * } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <Surface>
 *       <Text>Code is Poetry</Text>
 *       <Elevation value={ 5 } />
 *     </Surface>
 *   );
 * }
 * ```
 */
export declare const Elevation: import("../context").WordPressComponent<"div", ElevationProps & import("react").RefAttributes<any>, true>;
export default Elevation;
//# sourceMappingURL=component.d.ts.map
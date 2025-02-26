import type { NavigatorScreenProps } from '../types';
/**
 * The `NavigatorScreen` component represents a single view/screen/panel and
 * should be used in combination with the `NavigatorProvider`, the
 * `NavigatorButton` and the `NavigatorBackButton` components (or the `useNavigator`
 * hook).
 *
 * @example
 * ```jsx
 * import {
 *   __experimentalNavigatorProvider as NavigatorProvider,
 *   __experimentalNavigatorScreen as NavigatorScreen,
 *   __experimentalNavigatorButton as NavigatorButton,
 *   __experimentalNavigatorBackButton as NavigatorBackButton,
 * } from '@wordpress/components';
 *
 * const MyNavigation = () => (
 *   <NavigatorProvider initialPath="/">
 *     <NavigatorScreen path="/">
 *       <p>This is the home screen.</p>
 *        <NavigatorButton path="/child">
 *          Navigate to child screen.
 *       </NavigatorButton>
 *     </NavigatorScreen>
 *
 *     <NavigatorScreen path="/child">
 *       <p>This is the child screen.</p>
 *       <NavigatorBackButton>
 *         Go back
 *       </NavigatorBackButton>
 *     </NavigatorScreen>
 *   </NavigatorProvider>
 * );
 * ```
 */
export declare const NavigatorScreen: import("../../context").WordPressComponent<"div", NavigatorScreenProps & import("react").RefAttributes<any>, false>;
export default NavigatorScreen;
//# sourceMappingURL=component.d.ts.map
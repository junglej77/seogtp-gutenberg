/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

import { contextConnect } from '../../context';
import { View } from '../../view';
import { useNavigatorBackButton } from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedNavigatorBackButton(props, forwardedRef) {
  const navigatorBackButtonProps = useNavigatorBackButton(props);
  return /*#__PURE__*/_jsx(View, {
    ref: forwardedRef,
    ...navigatorBackButtonProps
  });
}

/**
 * The `NavigatorBackButton` component can be used to navigate to a screen and
 * should be used in combination with the `NavigatorProvider`, the
 * `NavigatorScreen` and the `NavigatorButton` components (or the `useNavigator`
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
 *         Go back (to parent)
 *       </NavigatorBackButton>
 *     </NavigatorScreen>
 *   </NavigatorProvider>
 * );
 * ```
 */
export const NavigatorBackButton = contextConnect(UnconnectedNavigatorBackButton, 'NavigatorBackButton');
export default NavigatorBackButton;
//# sourceMappingURL=component.js.map
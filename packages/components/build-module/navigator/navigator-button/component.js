/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

import { contextConnect } from '../../context';
import { View } from '../../view';
import { useNavigatorButton } from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedNavigatorButton(props, forwardedRef) {
  const navigatorButtonProps = useNavigatorButton(props);
  return /*#__PURE__*/_jsx(View, {
    ref: forwardedRef,
    ...navigatorButtonProps
  });
}

/**
 * The `NavigatorButton` component can be used to navigate to a screen and should
 * be used in combination with the `NavigatorProvider`, the `NavigatorScreen`
 * and the `NavigatorBackButton` components (or the `useNavigator` hook).
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
export const NavigatorButton = contextConnect(UnconnectedNavigatorButton, 'NavigatorButton');
export default NavigatorButton;
//# sourceMappingURL=component.js.map
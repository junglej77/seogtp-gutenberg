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
export declare const NavigatorBackButton: import("../../context").WordPressComponent<"button", {
    __next40pxDefaultSize?: boolean;
    accessibleWhenDisabled?: boolean;
    children?: import("react").ReactNode;
    description?: string;
    icon?: import("../../icon").Props["icon"];
    iconPosition?: "left" | "right";
    iconSize?: import("../../icon").Props["size"];
    isBusy?: boolean;
    isDestructive?: boolean;
    isPressed?: boolean;
    label?: string;
    shortcut?: string | {
        display: string;
        ariaLabel: string;
    };
    showTooltip?: boolean;
    size?: "default" | "compact" | "small";
    text?: string;
    tooltipPosition?: import("../../popover/types").PopoverProps["position"];
    variant?: "primary" | "secondary" | "tertiary" | "link";
} & {
    disabled?: boolean;
} & import("react").RefAttributes<any>, true>;
export default NavigatorBackButton;
//# sourceMappingURL=component.d.ts.map
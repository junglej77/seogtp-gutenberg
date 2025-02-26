/**
 * _Note: this component is deprecated. Please use the `NavigatorBackButton`
 * component instead._
 *
 * @deprecated
 */
export declare const NavigatorToParentButton: import("../../context").WordPressComponent<"button", {
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
export default NavigatorToParentButton;
//# sourceMappingURL=component.d.ts.map
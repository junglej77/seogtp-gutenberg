/**
 * `CardDivider` renders an optional divider within a `Card`.
 * It is typically used to divide multiple `CardBody` components from each other.
 *
 * ```jsx
 * import { Card, CardBody, CardDivider } from `@wordpress/components`;
 *
 * <Card>
 *  <CardBody>...</CardBody>
 *  <CardDivider />
 *  <CardBody>...</CardBody>
 * </Card>
 * ```
 */
export declare const CardDivider: import("../../context").WordPressComponent<"hr", Omit<import("@ariakit/react").SeparatorProps, "as" | "children" | "orientation" | "render" | "unstable_system"> & {
    margin?: import("../../utils/space").SpaceInput;
    marginEnd?: import("../../utils/space").SpaceInput;
    marginStart?: import("../../utils/space").SpaceInput;
    orientation?: import("@ariakit/react").SeparatorProps["orientation"];
} & import("react").RefAttributes<any>, false>;
export default CardDivider;
//# sourceMappingURL=component.d.ts.map
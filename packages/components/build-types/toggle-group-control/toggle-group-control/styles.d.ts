import type { ToggleGroupControlProps } from '../types';
export declare const toggleGroupControl: ({ isBlock, isDeselectable, size, }: Pick<ToggleGroupControlProps, "isBlock" | "isDeselectable"> & {
    size: NonNullable<ToggleGroupControlProps["size"]>;
}) => import("@emotion/utils").SerializedStyles;
export declare const toggleGroupControlSize: (size: NonNullable<ToggleGroupControlProps["size"]>) => import("@emotion/utils").SerializedStyles;
export declare const block: import("@emotion/utils").SerializedStyles;
export declare const VisualLabelWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
//# sourceMappingURL=styles.d.ts.map
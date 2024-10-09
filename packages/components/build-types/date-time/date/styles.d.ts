export declare const Wrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const Navigator: import("@emotion/styled").StyledComponent<Omit<import("../../flex/types").FlexProps, "gap" | "align"> & {
    alignment?: import("../../h-stack/types").HStackAlignment | import("react").CSSProperties["alignItems"];
    spacing?: import("react").CSSProperties["width"];
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "direction" | "spacing" | "wrap" | "justify" | keyof import("react").RefAttributes<any> | "expanded" | "isReversed" | "alignment"> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const NavigatorHeading: import("@emotion/styled").StyledComponent<Omit<import("../../text/types").Props, "color" | "weight" | "isBlock"> & {
    level?: import("../../heading/types").HeadingSize;
    isBlock?: import("../../text/types").Props["isBlock"];
    color?: import("../../text/types").Props["color"];
    weight?: import("../../text/types").Props["weight"];
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref">, "as" | "children" | "color" | "display" | "letterSpacing" | "lineHeight" | "size" | "align" | keyof import("react").RefAttributes<any> | "ellipsis" | "weight" | "adjustLineHeightForInnerControls" | "isDestructive" | "highlightEscape" | "highlightCaseSensitive" | "highlightSanitize" | "isBlock" | "optimizeReadabilityFor" | "truncate" | "upperCase" | "variant" | "highlightWords" | "ellipsizeMode" | "limit" | "numberOfLines" | "level"> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const Calendar: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const DayOfWeek: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const DayButton: import("@emotion/styled").StyledComponent<(((import("../../button/types").ButtonProps & import("../../button/types").DeprecatedButtonProps) & import("react").RefAttributes<any>) & {
    theme?: import("@emotion/react").Theme;
}) & {
    column: number;
    isSelected: boolean;
    isToday: boolean;
    hasEvents: boolean;
}, {}, {}>;
//# sourceMappingURL=styles.d.ts.map
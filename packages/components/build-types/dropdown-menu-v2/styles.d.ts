/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';
import type { DropdownMenuContext } from './types';
export declare const MenuPopoverOuterWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & Pick<DropdownMenuContext, "variant">, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const MenuPopoverInnerWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const DropdownMenuItem: import("@emotion/styled").StyledComponent<Ariakit.MenuItemOptions<"div"> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof Ariakit.MenuItemOptions<T>> & {
    [index: `data-${string}`]: unknown;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const DropdownMenuCheckboxItem: import("@emotion/styled").StyledComponent<Ariakit.MenuItemCheckboxOptions<"div"> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof Ariakit.MenuItemCheckboxOptions<T>> & {
    [index: `data-${string}`]: unknown;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const DropdownMenuRadioItem: import("@emotion/styled").StyledComponent<Ariakit.MenuItemRadioOptions<"div"> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof Ariakit.MenuItemRadioOptions<T>> & {
    [index: `data-${string}`]: unknown;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const ItemPrefixWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const DropdownMenuItemContentWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const DropdownMenuItemChildrenWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const ItemSuffixWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const DropdownMenuGroup: import("@emotion/styled").StyledComponent<Ariakit.MenuGroupOptions<"div"> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof Ariakit.MenuGroupOptions<T>> & {
    [index: `data-${string}`]: unknown;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const DropdownMenuGroupLabel: import("@emotion/styled").StyledComponent<Ariakit.MenuGroupLabelOptions<"div"> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof Ariakit.MenuGroupLabelOptions<T>> & {
    [index: `data-${string}`]: unknown;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const DropdownMenuSeparator: import("@emotion/styled").StyledComponent<Ariakit.MenuSeparatorOptions<"hr"> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHRElement>, HTMLHRElement>, "ref"> & {
    ref?: ((instance: HTMLHRElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLHRElement> | null | undefined;
}, keyof Ariakit.MenuSeparatorOptions<T>> & {
    [index: `data-${string}`]: unknown;
} & {
    theme?: import("@emotion/react").Theme;
} & Pick<DropdownMenuContext, "variant">, {}, {}>;
export declare const SubmenuChevronIcon: import("@emotion/styled").StyledComponent<import("../icon").Props & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const DropdownMenuItemLabel: import("@emotion/styled").StyledComponent<import("../truncate/types").TruncateProps & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref">, "as" | keyof import("react").RefAttributes<any> | keyof import("../truncate/types").TruncateProps> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const DropdownMenuItemHelpText: import("@emotion/styled").StyledComponent<import("../truncate/types").TruncateProps & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref">, "as" | keyof import("react").RefAttributes<any> | keyof import("../truncate/types").TruncateProps> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
//# sourceMappingURL=styles.d.ts.map
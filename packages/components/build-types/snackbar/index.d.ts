import type { NoticeAction } from '../notice/types';
/**
 * A Snackbar displays a succinct message that is cleared out after a small delay.
 *
 * It can also offer the user options, like viewing a published post.
 * But these options should also be available elsewhere in the UI.
 *
 * ```jsx
 * const MySnackbarNotice = () => (
 *   <Snackbar>Post published successfully.</Snackbar>
 * );
 * ```
 */
export declare const Snackbar: import("react").ForwardRefExoticComponent<Pick<import("../notice/types").NoticeProps, "children" | "className" | "spokenMessage" | "onRemove" | "politeness" | "onDismiss"> & {
    icon?: import("react").ReactNode;
    explicitDismiss?: boolean;
    listRef?: import("react").MutableRefObject<HTMLDivElement | null>;
} & {
    actions?: Pick<NoticeAction, "label" | "url" | "onClick">[];
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "className" | "actions" | "spokenMessage" | "onRemove" | "politeness" | "onDismiss" | keyof {
    icon?: import("react").ReactNode;
    explicitDismiss?: boolean;
    listRef?: import("react").MutableRefObject<HTMLDivElement | null>;
}> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & import("react").RefAttributes<any>>;
export default Snackbar;
//# sourceMappingURL=index.d.ts.map
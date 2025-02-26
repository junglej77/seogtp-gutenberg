/**
 * @template TProps
 * @typedef {TProps & { className: string }} ConnectedProps
 */
/**
 * Custom hook that derives registered props from the Context system.
 * These derived props are then consolidated with incoming component props.
 *
 * @template {{ className?: string }} P
 * @param {P}      props     Incoming props from the component.
 * @param {string} namespace The namespace to register and to derive context props from.
 * @return {ConnectedProps<P>} The connected props.
 */
export function useContextSystem<P extends {
    className?: string;
}>(props: P, namespace: string): ConnectedProps<P>;
export type ConnectedProps<TProps> = TProps & {
    className: string;
};
//# sourceMappingURL=use-context-system.d.ts.map
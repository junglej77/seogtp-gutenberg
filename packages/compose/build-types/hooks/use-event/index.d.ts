/**
 * Any function.
 */
export type AnyFunction = (...args: any) => any;
/**
 * Creates a stable callback function that has access to the latest state and
 * can be used within event handlers and effect callbacks. Throws when used in
 * the render phase.
 *
 * @param callback The callback function to wrap.
 *
 * @example
 *
 * ```tsx
 * function Component( props ) {
 *   const onClick = useEvent( props.onClick );
 *   useEffect( () => {
 *     onClick();
 *     // Won't trigger the effect again when props.onClick is updated.
 *   }, [ onClick ] );
 *   // Won't re-render Button when props.onClick is updated (if `Button` is
 *   // wrapped in `React.memo`).
 *   return <Button onClick={ onClick } />;
 * }
 * ```
 */
export default function useEvent<T extends AnyFunction>(
/**
 * The callback function to wrap.
 */
callback?: T): T;
//# sourceMappingURL=index.d.ts.map
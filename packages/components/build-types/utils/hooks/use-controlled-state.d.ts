export default useControlledState;
export type Options<T> = {
    /**
     * Initial value
     */
    initial?: T | undefined;
    /**
     * Fallback value
     */
    fallback: T | "";
};
/**
 * Custom hooks for "controlled" components to track and consolidate internal
 * state and incoming values. This is useful for components that render
 * `input`, `textarea`, or `select` HTML elements.
 *
 * https://reactjs.org/docs/forms.html#controlled-components
 *
 * At first, a component using useControlledState receives an initial prop
 * value, which is used as initial internal state.
 *
 * This internal state can be maintained and updated without
 * relying on new incoming prop values.
 *
 * Unlike the basic useState hook, useControlledState's state can
 * be updated if a new incoming prop value is changed.
 *
 * @template T
 *
 * @param {T | undefined} currentState             The current value.
 * @param {Options<T>}    [options=defaultOptions] Additional options for the hook.
 *
 * @return {[T | "", (nextState: T) => void]} The controlled value and the value setter.
 */
declare function useControlledState<T>(currentState: T | undefined, options?: Options<T> | undefined): [T | "", (nextState: T) => void];
//# sourceMappingURL=use-controlled-state.d.ts.map
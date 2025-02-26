/**
 * Throttles a function similar to Lodash's `throttle`. A new throttled function will
 * be returned and any scheduled calls cancelled if any of the arguments change,
 * including the function to throttle, so please wrap functions created on
 * render in components in `useCallback`.
 *
 * @see https://lodash.com/docs/4#throttle
 *
 * @template {(...args: any[]) => void} TFunc
 *
 * @param {TFunc}                                          fn        The function to throttle.
 * @param {number}                                         [wait]    The number of milliseconds to throttle invocations to.
 * @param {import('../../utils/throttle').ThrottleOptions} [options] The options object. See linked documentation for details.
 * @return {import('../../utils/debounce').DebouncedFunc<TFunc>} Throttled function.
 */
export default function useThrottle<TFunc extends (...args: any[]) => void>(fn: TFunc, wait?: number | undefined, options?: import("../../utils/throttle").ThrottleOptions | undefined): import("../../utils/debounce").DebouncedFunc<TFunc>;
//# sourceMappingURL=index.d.ts.map
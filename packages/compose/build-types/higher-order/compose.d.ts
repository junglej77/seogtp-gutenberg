/**
 * Composes multiple higher-order components into a single higher-order component. Performs right-to-left function
 * composition, where each successive invocation is supplied the return value of the previous.
 *
 * This is inspired by `lodash`'s `flowRight` function.
 *
 * @see https://lodash.com/docs/4#flow-right
 */
declare const compose: (...funcs: Function[]) => (...args: unknown[]) => unknown;
export default compose;
//# sourceMappingURL=compose.d.ts.map
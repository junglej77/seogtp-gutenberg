export default ifMatchingAction;
export type AnyFunction = import("../types").AnyFunction;
/** @typedef {import('../types').AnyFunction} AnyFunction */
/**
 * A higher-order reducer creator which invokes the original reducer only if
 * the dispatching action matches the given predicate, **OR** if state is
 * initializing (undefined).
 *
 * @param {AnyFunction} isMatch Function predicate for allowing reducer call.
 *
 * @return {AnyFunction} Higher-order reducer.
 */
declare function ifMatchingAction(isMatch: AnyFunction): AnyFunction;
//# sourceMappingURL=if-matching-action.d.ts.map
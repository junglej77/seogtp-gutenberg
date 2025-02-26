export default replaceAction;
export type AnyFunction = import("../types").AnyFunction;
/** @typedef {import('../types').AnyFunction} AnyFunction */
/**
 * Higher-order reducer creator which substitutes the action object before
 * passing to the original reducer.
 *
 * @param {AnyFunction} replacer Function mapping original action to replacement.
 *
 * @return {AnyFunction} Higher-order reducer.
 */
declare function replaceAction(replacer: AnyFunction): AnyFunction;
//# sourceMappingURL=replace-action.d.ts.map
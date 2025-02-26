/**
 * External dependencies
 */
import EquivalentKeyMap from 'equivalent-key-map';
type Action = ReturnType<typeof import('./actions').startResolution> | ReturnType<typeof import('./actions').finishResolution> | ReturnType<typeof import('./actions').failResolution> | ReturnType<typeof import('./actions').startResolutions> | ReturnType<typeof import('./actions').finishResolutions> | ReturnType<typeof import('./actions').failResolutions> | ReturnType<typeof import('./actions').invalidateResolution> | ReturnType<typeof import('./actions').invalidateResolutionForStore> | ReturnType<typeof import('./actions').invalidateResolutionForStoreSelector>;
type StateKey = unknown[] | unknown;
export type StateValue = {
    status: 'resolving' | 'finished';
} | {
    status: 'error';
    error: Error | unknown;
};
export type Status = StateValue['status'];
export type State = EquivalentKeyMap<StateKey, StateValue>;
/**
 * Reducer function returning next state for selector resolution, object form:
 *
 *   selectorName -> EquivalentKeyMap<Array, boolean>
 *
 * @param state  Current state.
 * @param action Dispatched action.
 *
 * @return Next state.
 */
declare const isResolved: (state: Record<string, State> | undefined, action: Action) => Record<string, State>;
export default isResolved;
//# sourceMappingURL=reducer.d.ts.map
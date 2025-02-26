/**
 * Creates a data store descriptor for the provided Redux store configuration containing
 * properties describing reducer, actions, selectors, controls and resolvers.
 *
 * @example
 * ```js
 * import { createReduxStore } from '@wordpress/data';
 *
 * const store = createReduxStore( 'demo', {
 *     reducer: ( state = 'OK' ) => state,
 *     selectors: {
 *         getValue: ( state ) => state,
 *     },
 * } );
 * ```
 *
 * @template State
 * @template {Record<string,import('../types').ActionCreator>} Actions
 * @template Selectors
 * @param {string}                                    key     Unique namespace identifier.
 * @param {ReduxStoreConfig<State,Actions,Selectors>} options Registered store options, with properties
 *                                                            describing reducer, actions, selectors,
 *                                                            and resolvers.
 *
 * @return   {StoreDescriptor<ReduxStoreConfig<State,Actions,Selectors>>} Store Object.
 */
export default function createReduxStore<State, Actions extends Record<string, import("../types").ActionCreator>, Selectors>(key: string, options: ReduxStoreConfig<State, Actions, Selectors>): StoreDescriptor<ReduxStoreConfig<State, Actions, Selectors>>;
export { combineReducers };
export type DataRegistry = import("../types").DataRegistry;
export type ListenerFunction = import("../types").ListenerFunction;
export type StoreDescriptor<C extends import("../types").AnyConfig> = import("../types").StoreDescriptor<C>;
export type ReduxStoreConfig<State, Actions extends Record<string, import("../types").ActionCreator>, Selectors> = import("../types").ReduxStoreConfig<State, Actions, Selectors>;
import { combineReducers } from './combine-reducers';
//# sourceMappingURL=index.d.ts.map
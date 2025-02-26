export declare const stores: Map<any, any>;
/**
 * Get the defined config for the store with the passed namespace.
 *
 * @param namespace Store's namespace from which to retrieve the config.
 * @return Defined config for the given namespace.
 */
export declare const getConfig: (namespace?: string) => any;
interface StoreOptions {
    /**
     * Property to block/unblock private store namespaces.
     *
     * If the passed value is `true`, it blocks the given namespace, making it
     * accessible only trough the returned variables of the `store()` call. In
     * the case a lock string is passed, it also blocks the namespace, but can
     * be unblocked for other `store()` calls using the same lock string.
     *
     * @example
     * ```
     * // The store can only be accessed where the `state` const can.
     * const { state } = store( 'myblock/private', { ... }, { lock: true } );
     * ```
     *
     * @example
     * ```
     * // Other modules knowing `SECRET_LOCK_STRING` can access the namespace.
     * const { state } = store(
     *   'myblock/private',
     *   { ... },
     *   { lock: 'SECRET_LOCK_STRING' }
     * );
     * ```
     */
    lock?: boolean | string;
}
export declare const universalUnlock = "I acknowledge that using a private store means my plugin will inevitably break on the next store release.";
/**
 * Extends the Interactivity API global store adding the passed properties to
 * the given namespace. It also returns stable references to the namespace
 * content.
 *
 * These props typically consist of `state`, which is the reactive part of the
 * store ― which means that any directive referencing a state property will be
 * re-rendered anytime it changes ― and function properties like `actions` and
 * `callbacks`, mostly used for event handlers. These props can then be
 * referenced by any directive to make the HTML interactive.
 *
 * @example
 * ```js
 *  const { state } = store( 'counter', {
 *    state: {
 *      value: 0,
 *      get double() { return state.value * 2; },
 *    },
 *    actions: {
 *      increment() {
 *        state.value += 1;
 *      },
 *    },
 *  } );
 * ```
 *
 * The code from the example above allows blocks to subscribe and interact with
 * the store by using directives in the HTML, e.g.:
 *
 * ```html
 * <div data-wp-interactive="counter">
 *   <button
 *     data-wp-text="state.double"
 *     data-wp-on--click="actions.increment"
 *   >
 *     0
 *   </button>
 * </div>
 * ```
 * @param namespace The store namespace to interact with.
 * @param storePart Properties to add to the store namespace.
 * @param options   Options for the given namespace.
 *
 * @return A reference to the namespace content.
 */
export declare function store<S extends object = {}>(namespace: string, storePart?: S, options?: StoreOptions): S;
export declare function store<T extends object>(namespace: string, storePart?: T, options?: StoreOptions): T;
export declare const parseServerData: (dom?: Document) => any;
export declare const populateServerData: (data?: {
    state?: Record<string, unknown>;
    config?: Record<string, unknown>;
}) => void;
export {};
//# sourceMappingURL=store.d.ts.map
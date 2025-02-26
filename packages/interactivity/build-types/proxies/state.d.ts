/**
 *  Checks wether a {@link PropSignal | `PropSignal`} instance exists for the
 *  given property in the passed proxy.
 *
 * @param proxy Proxy of a state object or array.
 * @param key   The property key.
 * @return `true` when it exists; false otherwise.
 */
export declare const hasPropSignal: (proxy: object, key: string) => boolean;
/**
 * Returns the proxy associated with the given state object, creating it if it
 * does not exist.
 *
 * @param namespace The namespace that will be associated to this proxy.
 * @param obj       The object to proxify.
 *
 * @throws Error if the object cannot be proxified. Use {@link shouldProxy} to
 *         check if a proxy can be created for a specific object.
 *
 * @return The associated proxy.
 */
export declare const proxifyState: <T extends object>(namespace: string, obj: T) => T;
/**
 * Reads the value of the specified property without subscribing to it.
 *
 * @param obj The object to read the property from.
 * @param key The property key.
 * @return The property value.
 */
export declare const peek: <T extends object, K extends keyof T>(obj: T, key: K) => T[K];
/**
 * Recursively update prop values inside the passed `target` and nested plain
 * objects, using the values present in `source`. References to plain objects
 * are kept, only updating props containing primitives or arrays. Arrays are
 * replaced instead of merged or concatenated.
 *
 * If the `override` parameter is set to `false`, then all values in `target`
 * are preserved, and only new properties from `source` are added.
 *
 * @param target   The target object.
 * @param source   The source object containing new values and props.
 * @param override Whether existing props should be overwritten or not (`true`
 *                 by default).
 */
export declare const deepMerge: (target: any, source: any, override?: boolean) => void;
//# sourceMappingURL=state.d.ts.map
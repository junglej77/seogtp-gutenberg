export default createResolversCacheMiddleware;
export type WPDataRegistry = import("./registry").WPDataRegistry;
/** @typedef {import('./registry').WPDataRegistry} WPDataRegistry */
/**
 * Creates a middleware handling resolvers cache invalidation.
 *
 * @param {WPDataRegistry} registry  Registry for which to create the middleware.
 * @param {string}         storeName Name of the store for which to create the middleware.
 *
 * @return {Function} Middleware function.
 */
declare function createResolversCacheMiddleware(registry: WPDataRegistry, storeName: string): Function;
//# sourceMappingURL=resolvers-cache-middleware.d.ts.map
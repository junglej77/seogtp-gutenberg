export default apiFetch;
export type APIFetchMiddleware = import("./types").APIFetchMiddleware;
export type APIFetchOptions = import("./types").APIFetchOptions;
export type FetchHandler = (options: import("./types").APIFetchOptions) => Promise<any>;
/**
 * @template T
 * @param {import('./types').APIFetchOptions} options
 * @return {Promise<T>} A promise representing the request processed via the registered middlewares.
 */
declare function apiFetch<T>(options: import("./types").APIFetchOptions): Promise<T>;
declare namespace apiFetch {
    export { registerMiddleware as use };
    export { setFetchHandler };
    export { createNonceMiddleware };
    export { createPreloadingMiddleware };
    export { createRootURLMiddleware };
    export { fetchAllMiddleware };
    export { mediaUploadMiddleware };
    export { createThemePreviewMiddleware };
}
/**
 * Register a middleware
 *
 * @param {import('./types').APIFetchMiddleware} middleware
 */
declare function registerMiddleware(middleware: import("./types").APIFetchMiddleware): void;
/**
 * Defines a custom fetch handler for making the requests that will override
 * the default one using window.fetch
 *
 * @param {FetchHandler} newFetchHandler The new fetch handler
 */
declare function setFetchHandler(newFetchHandler: FetchHandler): void;
import createNonceMiddleware from './middlewares/nonce';
import createPreloadingMiddleware from './middlewares/preloading';
import createRootURLMiddleware from './middlewares/root-url';
import fetchAllMiddleware from './middlewares/fetch-all-middleware';
import mediaUploadMiddleware from './middlewares/media-upload';
import createThemePreviewMiddleware from './middlewares/theme-preview';
//# sourceMappingURL=index.d.ts.map
export default createThemePreviewMiddleware;
/**
 * This appends a `wp_theme_preview` parameter to the REST API request URL if
 * the admin URL contains a `theme` GET parameter.
 *
 * If the REST API request URL has contained the `wp_theme_preview` parameter as `''`,
 * then bypass this middleware.
 *
 * @param {Record<string, any>} themePath
 * @return {import('../types').APIFetchMiddleware} Preloading middleware.
 */
declare function createThemePreviewMiddleware(themePath: Record<string, any>): import("../types").APIFetchMiddleware;
//# sourceMappingURL=theme-preview.d.ts.map
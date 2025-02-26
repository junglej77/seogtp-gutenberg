/** @typedef {import('./types').AnyFunction} AnyFunction */
/**
 * Reducer managing terms state. Keyed by taxonomy slug, the value is either
 * undefined (if no request has been made for given taxonomy), null (if a
 * request is in-flight for given taxonomy), or the array of terms for the
 * taxonomy.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function terms(state: any | undefined, action: any): any;
/**
 * Reducer managing authors state. Keyed by id.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function users(state: any | undefined, action: any): any;
/**
 * Reducer managing current user state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function currentUser(state: any | undefined, action: any): any;
/**
 * Reducer managing taxonomies.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function taxonomies(state: any | undefined, action: any): any;
/**
 * Reducer managing the current theme.
 *
 * @param {string|undefined} state  Current state.
 * @param {Object}           action Dispatched action.
 *
 * @return {string|undefined} Updated state.
 */
export function currentTheme(state: string | undefined, action: any): string | undefined;
/**
 * Reducer managing the current global styles id.
 *
 * @param {string|undefined} state  Current state.
 * @param {Object}           action Dispatched action.
 *
 * @return {string|undefined} Updated state.
 */
export function currentGlobalStylesId(state: string | undefined, action: any): string | undefined;
/**
 * Reducer managing the theme base global styles.
 *
 * @param {Record<string, object>} state  Current state.
 * @param {Object}                 action Dispatched action.
 *
 * @return {Record<string, object>} Updated state.
 */
export function themeBaseGlobalStyles(state: Record<string, object> | undefined, action: any): Record<string, object>;
/**
 * Reducer managing the theme global styles variations.
 *
 * @param {Record<string, object>} state  Current state.
 * @param {Object}                 action Dispatched action.
 *
 * @return {Record<string, object>} Updated state.
 */
export function themeGlobalStyleVariations(state: Record<string, object> | undefined, action: any): Record<string, object>;
/**
 * Reducer keeping track of the registered entities.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function entitiesConfig(state: any | undefined, action: any): any;
/**
 * @type {UndoManager}
 */
export function undoManager(state?: import("@wordpress/undo-manager/build-types/types").UndoManager): import("@wordpress/undo-manager/build-types/types").UndoManager;
export function editsReference(state: {} | undefined, action: any): {};
/**
 * Reducer managing embed preview data.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function embedPreviews(state: any | undefined, action: any): any;
/**
 * State which tracks whether the user can perform an action on a REST
 * resource.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function userPermissions(state: any | undefined, action: any): any;
/**
 * Reducer returning autosaves keyed by their parent's post id.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function autosaves(state: any | undefined, action: any): any;
export function blockPatterns(state: any[] | undefined, action: any): any;
export function blockPatternCategories(state: any[] | undefined, action: any): any;
export function userPatternCategories(state: any[] | undefined, action: any): any;
export function navigationFallbackId(state: null | undefined, action: any): any;
/**
 * Reducer managing the theme global styles revisions.
 *
 * @param {Record<string, object>} state  Current state.
 * @param {Object}                 action Dispatched action.
 *
 * @return {Record<string, object>} Updated state.
 */
export function themeGlobalStyleRevisions(state: Record<string, object> | undefined, action: any): Record<string, object>;
/**
 * Reducer managing the template lookup per query.
 *
 * @param {Record<string, string>} state  Current state.
 * @param {Object}                 action Dispatched action.
 *
 * @return {Record<string, string>} Updated state.
 */
export function defaultTemplates(state: Record<string, string> | undefined, action: any): Record<string, string>;
export function entities(state: any | undefined, action: any): any;
declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    terms: any;
    users: any;
    currentTheme: string | undefined;
    currentGlobalStylesId: string | undefined;
    currentUser: any;
    themeGlobalStyleVariations: Record<string, any>;
    themeBaseGlobalStyles: Record<string, any>;
    themeGlobalStyleRevisions: Record<string, any>;
    taxonomies: any;
    entities: any;
    editsReference: {};
    undoManager: import("@wordpress/undo-manager/build-types/types").UndoManager;
    embedPreviews: any;
    userPermissions: any;
    autosaves: any;
    blockPatterns: any;
    blockPatternCategories: any;
    userPatternCategories: any;
    navigationFallbackId: any;
    defaultTemplates: Record<string, string>;
}>, any>;
export default _default;
export type AnyFunction = import("./types").AnyFunction;
//# sourceMappingURL=reducer.d.ts.map
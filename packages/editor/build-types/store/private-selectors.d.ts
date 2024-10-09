export function getListViewToggleRef(state: any): any;
export function getInserterSidebarToggleRef(state: any): any;
export function getEntityActions(state: any, ...args: any[]): import("@wordpress/dataviews").Action<any>[];
export function isEntityReady(state: any, ...args: any[]): boolean;
/**
 * Get the insertion point for the inserter.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} The root client ID, index to insert at and starting filter value.
 */
export const getInsertionPoint: Function;
export const getPostIcon: Function;
/**
 * Returns true if there are unsaved changes to the
 * post's meta fields, and false otherwise.
 *
 * @param {Object} state    Global application state.
 * @param {string} postType The post type of the post.
 * @param {number} postId   The ID of the post.
 *
 * @return {boolean} Whether there are edits or not in the meta fields of the relevant post.
 */
export const hasPostMetaChanges: Function;
/**
 * Similar to getBlocksByName in @wordpress/block-editor, but only returns the top-most
 * blocks that aren't descendants of the query block.
 *
 * @param {Object}       state      Global application state.
 * @param {Array|string} blockNames Block names of the blocks to retrieve.
 *
 * @return {Array} Block client IDs.
 */
export const getPostBlocksByName: Function;
//# sourceMappingURL=private-selectors.d.ts.map
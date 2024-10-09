/**
 * Internal dependencies
 */
import type { State } from './selectors';
type EntityRecordKey = string | number;
/**
 * Returns the previous edit from the current undo offset
 * for the entity records edits history, if any.
 *
 * @param state State tree.
 *
 * @return The undo manager.
 */
export declare function getUndoManager(state: State): import("@wordpress/undo-manager/build-types/types").UndoManager;
/**
 * Retrieve the fallback Navigation.
 *
 * @param state Data state.
 * @return The ID for the fallback Navigation post.
 */
export declare function getNavigationFallbackId(state: State): EntityRecordKey | undefined;
export declare const getBlockPatternsForPostType: Function;
/**
 * Returns the entity records permissions for the given entity record ids.
 */
export declare const getEntityRecordsPermissions: Function;
/**
 * Returns the entity record permissions for the given entity record id.
 *
 * @param state Data state.
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param id    Entity record id.
 *
 * @return The entity record permissions.
 */
export declare function getEntityRecordPermissions(state: State, kind: string, name: string, id: string): any;
export {};
//# sourceMappingURL=private-selectors.d.ts.map
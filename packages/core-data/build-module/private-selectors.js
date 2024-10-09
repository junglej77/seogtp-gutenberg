/**
 * WordPress dependencies
 */
import { createSelector, createRegistrySelector } from '@wordpress/data';

/**
 * Internal dependencies
 */

import { STORE_NAME } from './name';
/**
 * Returns the previous edit from the current undo offset
 * for the entity records edits history, if any.
 *
 * @param state State tree.
 *
 * @return The undo manager.
 */
export function getUndoManager(state) {
  return state.undoManager;
}

/**
 * Retrieve the fallback Navigation.
 *
 * @param state Data state.
 * @return The ID for the fallback Navigation post.
 */
export function getNavigationFallbackId(state) {
  return state.navigationFallbackId;
}
export const getBlockPatternsForPostType = createRegistrySelector(select => createSelector((state, postType) => select(STORE_NAME).getBlockPatterns().filter(({
  postTypes
}) => !postTypes || Array.isArray(postTypes) && postTypes.includes(postType)), () => [select(STORE_NAME).getBlockPatterns()]));

/**
 * Returns the entity records permissions for the given entity record ids.
 */
export const getEntityRecordsPermissions = createRegistrySelector(select => createSelector((state, kind, name, ids) => {
  const normalizedIds = Array.isArray(ids) ? ids : [ids];
  return normalizedIds.map(id => ({
    delete: select(STORE_NAME).canUser('delete', {
      kind,
      name,
      id
    }),
    update: select(STORE_NAME).canUser('update', {
      kind,
      name,
      id
    })
  }));
}, state => [state.userPermissions]));

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
export function getEntityRecordPermissions(state, kind, name, id) {
  return getEntityRecordsPermissions(state, kind, name, id)[0];
}
//# sourceMappingURL=private-selectors.js.map
/**
 * WordPress dependencies
 */
import { createSelector, createRegistrySelector } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './name';
import { getQueriedItems, getQueriedTotalItems, getQueriedTotalPages } from './queried-data';
import { DEFAULT_ENTITY_KEY } from './entities';
import { getNormalizedCommaSeparable, isRawAttribute, setNestedValue, isNumericID, getUserPermissionCacheKey } from './utils';

// This is an incomplete, high-level approximation of the State type.
// It makes the selectors slightly more safe, but is intended to evolve
// into a more detailed representation over time.
// See https://github.com/WordPress/gutenberg/pull/40025#discussion_r865410589 for more context.

/**
 * HTTP Query parameters sent with the API request to fetch the entity records.
 */

/**
 * Arguments for EntityRecord selectors.
 */

/**
 * Shared reference to an empty object for cases where it is important to avoid
 * returning a new object reference on every invocation, as in a connected or
 * other pure component which performs `shouldComponentUpdate` check on props.
 * This should be used as a last resort, since the normalized data should be
 * maintained by the reducer result in state.
 */
const EMPTY_OBJECT = {};

/**
 * Returns true if a request is in progress for embed preview data, or false
 * otherwise.
 *
 * @param state Data state.
 * @param url   URL the preview would be for.
 *
 * @return Whether a request is in progress for an embed preview.
 */
export const isRequestingEmbedPreview = createRegistrySelector(select => (state, url) => {
  return select(STORE_NAME).isResolving('getEmbedPreview', [url]);
});

/**
 * Returns all available authors.
 *
 * @deprecated since 11.3. Callers should use `select( 'core' ).getUsers({ who: 'authors' })` instead.
 *
 * @param      state Data state.
 * @param      query Optional object of query parameters to
 *                   include with request. For valid query parameters see the [Users page](https://developer.wordpress.org/rest-api/reference/users/) in the REST API Handbook and see the arguments for [List Users](https://developer.wordpress.org/rest-api/reference/users/#list-users) and [Retrieve a User](https://developer.wordpress.org/rest-api/reference/users/#retrieve-a-user).
 * @return Authors list.
 */
export function getAuthors(state, query) {
  deprecated("select( 'core' ).getAuthors()", {
    since: '5.9',
    alternative: "select( 'core' ).getUsers({ who: 'authors' })"
  });
  const path = addQueryArgs('/wp/v2/users/?who=authors&per_page=100', query);
  return getUserQueryResults(state, path);
}

/**
 * Returns the current user.
 *
 * @param state Data state.
 *
 * @return Current user object.
 */
export function getCurrentUser(state) {
  return state.currentUser;
}

/**
 * Returns all the users returned by a query ID.
 *
 * @param state   Data state.
 * @param queryID Query ID.
 *
 * @return Users list.
 */
export const getUserQueryResults = createSelector((state, queryID) => {
  var _state$users$queries$;
  const queryResults = (_state$users$queries$ = state.users.queries[queryID]) !== null && _state$users$queries$ !== void 0 ? _state$users$queries$ : [];
  return queryResults.map(id => state.users.byId[id]);
}, (state, queryID) => [state.users.queries[queryID], state.users.byId]);

/**
 * Returns the loaded entities for the given kind.
 *
 * @deprecated since WordPress 6.0. Use getEntitiesConfig instead
 * @param      state Data state.
 * @param      kind  Entity kind.
 *
 * @return Array of entities with config matching kind.
 */
export function getEntitiesByKind(state, kind) {
  deprecated("wp.data.select( 'core' ).getEntitiesByKind()", {
    since: '6.0',
    alternative: "wp.data.select( 'core' ).getEntitiesConfig()"
  });
  return getEntitiesConfig(state, kind);
}

/**
 * Returns the loaded entities for the given kind.
 *
 * @param state Data state.
 * @param kind  Entity kind.
 *
 * @return Array of entities with config matching kind.
 */
export const getEntitiesConfig = createSelector((state, kind) => state.entities.config.filter(entity => entity.kind === kind), /* eslint-disable @typescript-eslint/no-unused-vars */
(state, kind) => state.entities.config
/* eslint-enable @typescript-eslint/no-unused-vars */);
/**
 * Returns the entity config given its kind and name.
 *
 * @deprecated since WordPress 6.0. Use getEntityConfig instead
 * @param      state Data state.
 * @param      kind  Entity kind.
 * @param      name  Entity name.
 *
 * @return Entity config
 */
export function getEntity(state, kind, name) {
  deprecated("wp.data.select( 'core' ).getEntity()", {
    since: '6.0',
    alternative: "wp.data.select( 'core' ).getEntityConfig()"
  });
  return getEntityConfig(state, kind, name);
}

/**
 * Returns the entity config given its kind and name.
 *
 * @param state Data state.
 * @param kind  Entity kind.
 * @param name  Entity name.
 *
 * @return Entity config
 */
export function getEntityConfig(state, kind, name) {
  return state.entities.config?.find(config => config.kind === kind && config.name === name);
}

/**
 * GetEntityRecord is declared as a *callable interface* with
 * two signatures to work around the fact that TypeScript doesn't
 * allow currying generic functions:
 *
 * ```ts
 * 		type CurriedState = F extends ( state: any, ...args: infer P ) => infer R
 * 			? ( ...args: P ) => R
 * 			: F;
 * 		type Selector = <K extends string | number>(
 *         state: any,
 *         kind: K,
 *         key: K extends string ? 'string value' : false
 *    ) => K;
 * 		type BadlyInferredSignature = CurriedState< Selector >
 *    // BadlyInferredSignature evaluates to:
 *    // (kind: string number, key: false | "string value") => string number
 * ```
 *
 * The signature without the state parameter shipped as CurriedSignature
 * is used in the return value of `select( coreStore )`.
 *
 * See https://github.com/WordPress/gutenberg/pull/41578 for more details.
 */

/**
 * Returns the Entity's record object by key. Returns `null` if the value is not
 * yet received, undefined if the value entity is known to not exist, or the
 * entity object if it exists and is received.
 *
 * @param state State tree
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param key   Record's key
 * @param query Optional query. If requesting specific
 *              fields, fields must always include the ID. For valid query parameters see the [Reference](https://developer.wordpress.org/rest-api/reference/) in the REST API Handbook and select the entity kind. Then see the arguments available "Retrieve a [Entity kind]".
 *
 * @return Record.
 */
export const getEntityRecord = createSelector((state, kind, name, key, query) => {
  var _query$context;
  const queriedState = state.entities.records?.[kind]?.[name]?.queriedData;
  if (!queriedState) {
    return undefined;
  }
  const context = (_query$context = query?.context) !== null && _query$context !== void 0 ? _query$context : 'default';
  if (query === undefined) {
    // If expecting a complete item, validate that completeness.
    if (!queriedState.itemIsComplete[context]?.[key]) {
      return undefined;
    }
    return queriedState.items[context][key];
  }
  const item = queriedState.items[context]?.[key];
  if (item && query._fields) {
    var _getNormalizedCommaSe;
    const filteredItem = {};
    const fields = (_getNormalizedCommaSe = getNormalizedCommaSeparable(query._fields)) !== null && _getNormalizedCommaSe !== void 0 ? _getNormalizedCommaSe : [];
    for (let f = 0; f < fields.length; f++) {
      const field = fields[f].split('.');
      let value = item;
      field.forEach(fieldName => {
        value = value?.[fieldName];
      });
      setNestedValue(filteredItem, field, value);
    }
    return filteredItem;
  }
  return item;
}, (state, kind, name, recordId, query) => {
  var _query$context2;
  const context = (_query$context2 = query?.context) !== null && _query$context2 !== void 0 ? _query$context2 : 'default';
  return [state.entities.records?.[kind]?.[name]?.queriedData?.items[context]?.[recordId], state.entities.records?.[kind]?.[name]?.queriedData?.itemIsComplete[context]?.[recordId]];
});

/**
 * Normalizes `recordKey`s that look like numeric IDs to numbers.
 *
 * @param args EntityRecordArgs the selector arguments.
 * @return EntityRecordArgs the normalized arguments.
 */
getEntityRecord.__unstableNormalizeArgs = args => {
  const newArgs = [...args];
  const recordKey = newArgs?.[2];

  // If recordKey looks to be a numeric ID then coerce to number.
  newArgs[2] = isNumericID(recordKey) ? Number(recordKey) : recordKey;
  return newArgs;
};

/**
 * Returns the Entity's record object by key. Doesn't trigger a resolver nor requests the entity records from the API if the entity record isn't available in the local state.
 *
 * @param state State tree
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param key   Record's key
 *
 * @return Record.
 */
export function __experimentalGetEntityRecordNoResolver(state, kind, name, key) {
  return getEntityRecord(state, kind, name, key);
}

/**
 * Returns the entity's record object by key,
 * with its attributes mapped to their raw values.
 *
 * @param state State tree.
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param key   Record's key.
 *
 * @return Object with the entity's raw attributes.
 */
export const getRawEntityRecord = createSelector((state, kind, name, key) => {
  const record = getEntityRecord(state, kind, name, key);
  return record && Object.keys(record).reduce((accumulator, _key) => {
    if (isRawAttribute(getEntityConfig(state, kind, name), _key)) {
      var _record$_key$raw;
      // Because edits are the "raw" attribute values,
      // we return those from record selectors to make rendering,
      // comparisons, and joins with edits easier.
      accumulator[_key] = (_record$_key$raw = record[_key]?.raw) !== null && _record$_key$raw !== void 0 ? _record$_key$raw : record[_key];
    } else {
      accumulator[_key] = record[_key];
    }
    return accumulator;
  }, {});
}, (state, kind, name, recordId, query) => {
  var _query$context3;
  const context = (_query$context3 = query?.context) !== null && _query$context3 !== void 0 ? _query$context3 : 'default';
  return [state.entities.config, state.entities.records?.[kind]?.[name]?.queriedData?.items[context]?.[recordId], state.entities.records?.[kind]?.[name]?.queriedData?.itemIsComplete[context]?.[recordId]];
});

/**
 * Returns true if records have been received for the given set of parameters,
 * or false otherwise.
 *
 * @param state State tree
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param query Optional terms query. For valid query parameters see the [Reference](https://developer.wordpress.org/rest-api/reference/) in the REST API Handbook and select the entity kind. Then see the arguments available for "List [Entity kind]s".
 *
 * @return  Whether entity records have been received.
 */
export function hasEntityRecords(state, kind, name, query) {
  return Array.isArray(getEntityRecords(state, kind, name, query));
}

/**
 * GetEntityRecord is declared as a *callable interface* with
 * two signatures to work around the fact that TypeScript doesn't
 * allow currying generic functions.
 *
 * @see GetEntityRecord
 * @see https://github.com/WordPress/gutenberg/pull/41578
 */

/**
 * Returns the Entity's records.
 *
 * @param state State tree
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param query Optional terms query. If requesting specific
 *              fields, fields must always include the ID. For valid query parameters see the [Reference](https://developer.wordpress.org/rest-api/reference/) in the REST API Handbook and select the entity kind. Then see the arguments available for "List [Entity kind]s".
 *
 * @return Records.
 */
export const getEntityRecords = (state, kind, name, query) => {
  // Queried data state is prepopulated for all known entities. If this is not
  // assigned for the given parameters, then it is known to not exist.
  const queriedState = state.entities.records?.[kind]?.[name]?.queriedData;
  if (!queriedState) {
    return null;
  }
  return getQueriedItems(queriedState, query);
};

/**
 * Returns the Entity's total available records for a given query (ignoring pagination).
 *
 * @param state State tree
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param query Optional terms query. If requesting specific
 *              fields, fields must always include the ID. For valid query parameters see the [Reference](https://developer.wordpress.org/rest-api/reference/) in the REST API Handbook and select the entity kind. Then see the arguments available for "List [Entity kind]s".
 *
 * @return number | null.
 */
export const getEntityRecordsTotalItems = (state, kind, name, query) => {
  // Queried data state is prepopulated for all known entities. If this is not
  // assigned for the given parameters, then it is known to not exist.
  const queriedState = state.entities.records?.[kind]?.[name]?.queriedData;
  if (!queriedState) {
    return null;
  }
  return getQueriedTotalItems(queriedState, query);
};

/**
 * Returns the number of available pages for the given query.
 *
 * @param state State tree
 * @param kind  Entity kind.
 * @param name  Entity name.
 * @param query Optional terms query. If requesting specific
 *              fields, fields must always include the ID. For valid query parameters see the [Reference](https://developer.wordpress.org/rest-api/reference/) in the REST API Handbook and select the entity kind. Then see the arguments available for "List [Entity kind]s".
 *
 * @return number | null.
 */
export const getEntityRecordsTotalPages = (state, kind, name, query) => {
  // Queried data state is prepopulated for all known entities. If this is not
  // assigned for the given parameters, then it is known to not exist.
  const queriedState = state.entities.records?.[kind]?.[name]?.queriedData;
  if (!queriedState) {
    return null;
  }
  if (query.per_page === -1) {
    return 1;
  }
  const totalItems = getQueriedTotalItems(queriedState, query);
  if (!totalItems) {
    return totalItems;
  }
  // If `per_page` is not set and the query relies on the defaults of the
  // REST endpoint, get the info from query's meta.
  if (!query.per_page) {
    return getQueriedTotalPages(queriedState, query);
  }
  return Math.ceil(totalItems / query.per_page);
};
/**
 * Returns the list of dirty entity records.
 *
 * @param state State tree.
 *
 * @return The list of updated records
 */
export const __experimentalGetDirtyEntityRecords = createSelector(state => {
  const {
    entities: {
      records
    }
  } = state;
  const dirtyRecords = [];
  Object.keys(records).forEach(kind => {
    Object.keys(records[kind]).forEach(name => {
      const primaryKeys = Object.keys(records[kind][name].edits).filter(primaryKey =>
      // The entity record must exist (not be deleted),
      // and it must have edits.
      getEntityRecord(state, kind, name, primaryKey) && hasEditsForEntityRecord(state, kind, name, primaryKey));
      if (primaryKeys.length) {
        const entityConfig = getEntityConfig(state, kind, name);
        primaryKeys.forEach(primaryKey => {
          const entityRecord = getEditedEntityRecord(state, kind, name, primaryKey);
          dirtyRecords.push({
            // We avoid using primaryKey because it's transformed into a string
            // when it's used as an object key.
            key: entityRecord ? entityRecord[entityConfig.key || DEFAULT_ENTITY_KEY] : undefined,
            title: entityConfig?.getTitle?.(entityRecord) || '',
            name,
            kind
          });
        });
      }
    });
  });
  return dirtyRecords;
}, state => [state.entities.records]);

/**
 * Returns the list of entities currently being saved.
 *
 * @param state State tree.
 *
 * @return The list of records being saved.
 */
export const __experimentalGetEntitiesBeingSaved = createSelector(state => {
  const {
    entities: {
      records
    }
  } = state;
  const recordsBeingSaved = [];
  Object.keys(records).forEach(kind => {
    Object.keys(records[kind]).forEach(name => {
      const primaryKeys = Object.keys(records[kind][name].saving).filter(primaryKey => isSavingEntityRecord(state, kind, name, primaryKey));
      if (primaryKeys.length) {
        const entityConfig = getEntityConfig(state, kind, name);
        primaryKeys.forEach(primaryKey => {
          const entityRecord = getEditedEntityRecord(state, kind, name, primaryKey);
          recordsBeingSaved.push({
            // We avoid using primaryKey because it's transformed into a string
            // when it's used as an object key.
            key: entityRecord ? entityRecord[entityConfig.key || DEFAULT_ENTITY_KEY] : undefined,
            title: entityConfig?.getTitle?.(entityRecord) || '',
            name,
            kind
          });
        });
      }
    });
  });
  return recordsBeingSaved;
}, state => [state.entities.records]);

/**
 * Returns the specified entity record's edits.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return The entity record's edits.
 */
export function getEntityRecordEdits(state, kind, name, recordId) {
  return state.entities.records?.[kind]?.[name]?.edits?.[recordId];
}

/**
 * Returns the specified entity record's non transient edits.
 *
 * Transient edits don't create an undo level, and
 * are not considered for change detection.
 * They are defined in the entity's config.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return The entity record's non transient edits.
 */
export const getEntityRecordNonTransientEdits = createSelector((state, kind, name, recordId) => {
  const {
    transientEdits
  } = getEntityConfig(state, kind, name) || {};
  const edits = getEntityRecordEdits(state, kind, name, recordId) || {};
  if (!transientEdits) {
    return edits;
  }
  return Object.keys(edits).reduce((acc, key) => {
    if (!transientEdits[key]) {
      acc[key] = edits[key];
    }
    return acc;
  }, {});
}, (state, kind, name, recordId) => [state.entities.config, state.entities.records?.[kind]?.[name]?.edits?.[recordId]]);

/**
 * Returns true if the specified entity record has edits,
 * and false otherwise.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return Whether the entity record has edits or not.
 */
export function hasEditsForEntityRecord(state, kind, name, recordId) {
  return isSavingEntityRecord(state, kind, name, recordId) || Object.keys(getEntityRecordNonTransientEdits(state, kind, name, recordId)).length > 0;
}

/**
 * Returns the specified entity record, merged with its edits.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return The entity record, merged with its edits.
 */
export const getEditedEntityRecord = createSelector((state, kind, name, recordId) => {
  const raw = getRawEntityRecord(state, kind, name, recordId);
  const edited = getEntityRecordEdits(state, kind, name, recordId);
  // Never return a non-falsy empty object. Unfortunately we can't return
  // undefined or null because we were previously returning an empty
  // object, so trying to read properties from the result would throw.
  // Using false here is a workaround to avoid breaking changes.
  if (!raw && !edited) {
    return false;
  }
  return {
    ...raw,
    ...edited
  };
}, (state, kind, name, recordId, query) => {
  var _query$context4;
  const context = (_query$context4 = query?.context) !== null && _query$context4 !== void 0 ? _query$context4 : 'default';
  return [state.entities.config, state.entities.records?.[kind]?.[name]?.queriedData.items[context]?.[recordId], state.entities.records?.[kind]?.[name]?.queriedData.itemIsComplete[context]?.[recordId], state.entities.records?.[kind]?.[name]?.edits?.[recordId]];
});

/**
 * Returns true if the specified entity record is autosaving, and false otherwise.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return Whether the entity record is autosaving or not.
 */
export function isAutosavingEntityRecord(state, kind, name, recordId) {
  var _state$entities$recor;
  const {
    pending,
    isAutosave
  } = (_state$entities$recor = state.entities.records?.[kind]?.[name]?.saving?.[recordId]) !== null && _state$entities$recor !== void 0 ? _state$entities$recor : {};
  return Boolean(pending && isAutosave);
}

/**
 * Returns true if the specified entity record is saving, and false otherwise.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return Whether the entity record is saving or not.
 */
export function isSavingEntityRecord(state, kind, name, recordId) {
  var _state$entities$recor2;
  return (_state$entities$recor2 = state.entities.records?.[kind]?.[name]?.saving?.[recordId]?.pending) !== null && _state$entities$recor2 !== void 0 ? _state$entities$recor2 : false;
}

/**
 * Returns true if the specified entity record is deleting, and false otherwise.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return Whether the entity record is deleting or not.
 */
export function isDeletingEntityRecord(state, kind, name, recordId) {
  var _state$entities$recor3;
  return (_state$entities$recor3 = state.entities.records?.[kind]?.[name]?.deleting?.[recordId]?.pending) !== null && _state$entities$recor3 !== void 0 ? _state$entities$recor3 : false;
}

/**
 * Returns the specified entity record's last save error.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return The entity record's save error.
 */
export function getLastEntitySaveError(state, kind, name, recordId) {
  return state.entities.records?.[kind]?.[name]?.saving?.[recordId]?.error;
}

/**
 * Returns the specified entity record's last delete error.
 *
 * @param state    State tree.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record ID.
 *
 * @return The entity record's save error.
 */
export function getLastEntityDeleteError(state, kind, name, recordId) {
  return state.entities.records?.[kind]?.[name]?.deleting?.[recordId]?.error;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Returns the previous edit from the current undo offset
 * for the entity records edits history, if any.
 *
 * @deprecated since 6.3
 *
 * @param      state State tree.
 *
 * @return The edit.
 */
export function getUndoEdit(state) {
  deprecated("select( 'core' ).getUndoEdit()", {
    since: '6.3'
  });
  return undefined;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Returns the next edit from the current undo offset
 * for the entity records edits history, if any.
 *
 * @deprecated since 6.3
 *
 * @param      state State tree.
 *
 * @return The edit.
 */
export function getRedoEdit(state) {
  deprecated("select( 'core' ).getRedoEdit()", {
    since: '6.3'
  });
  return undefined;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Returns true if there is a previous edit from the current undo offset
 * for the entity records edits history, and false otherwise.
 *
 * @param state State tree.
 *
 * @return Whether there is a previous edit or not.
 */
export function hasUndo(state) {
  return state.undoManager.hasUndo();
}

/**
 * Returns true if there is a next edit from the current undo offset
 * for the entity records edits history, and false otherwise.
 *
 * @param state State tree.
 *
 * @return Whether there is a next edit or not.
 */
export function hasRedo(state) {
  return state.undoManager.hasRedo();
}

/**
 * Return the current theme.
 *
 * @param state Data state.
 *
 * @return The current theme.
 */
export function getCurrentTheme(state) {
  if (!state.currentTheme) {
    return null;
  }
  return getEntityRecord(state, 'root', 'theme', state.currentTheme);
}

/**
 * Return the ID of the current global styles object.
 *
 * @param state Data state.
 *
 * @return The current global styles ID.
 */
export function __experimentalGetCurrentGlobalStylesId(state) {
  return state.currentGlobalStylesId;
}

/**
 * Return theme supports data in the index.
 *
 * @param state Data state.
 *
 * @return Index data.
 */
export function getThemeSupports(state) {
  var _getCurrentTheme$them;
  return (_getCurrentTheme$them = getCurrentTheme(state)?.theme_supports) !== null && _getCurrentTheme$them !== void 0 ? _getCurrentTheme$them : EMPTY_OBJECT;
}

/**
 * Returns the embed preview for the given URL.
 *
 * @param state Data state.
 * @param url   Embedded URL.
 *
 * @return Undefined if the preview has not been fetched, otherwise, the preview fetched from the embed preview API.
 */
export function getEmbedPreview(state, url) {
  return state.embedPreviews[url];
}

/**
 * Determines if the returned preview is an oEmbed link fallback.
 *
 * WordPress can be configured to return a simple link to a URL if it is not embeddable.
 * We need to be able to determine if a URL is embeddable or not, based on what we
 * get back from the oEmbed preview API.
 *
 * @param state Data state.
 * @param url   Embedded URL.
 *
 * @return Is the preview for the URL an oEmbed link fallback.
 */
export function isPreviewEmbedFallback(state, url) {
  const preview = state.embedPreviews[url];
  const oEmbedLinkCheck = '<a href="' + url + '">' + url + '</a>';
  if (!preview) {
    return false;
  }
  return preview.html === oEmbedLinkCheck;
}

/**
 * Returns whether the current user can perform the given action on the given
 * REST resource.
 *
 * Calling this may trigger an OPTIONS request to the REST API via the
 * `canUser()` resolver.
 *
 * https://developer.wordpress.org/rest-api/reference/
 *
 * @param state    Data state.
 * @param action   Action to check. One of: 'create', 'read', 'update', 'delete'.
 * @param resource Entity resource to check. Accepts entity object `{ kind: 'root', name: 'media', id: 1 }`
 *                 or REST base as a string - `media`.
 * @param id       Optional ID of the rest resource to check.
 *
 * @return Whether or not the user can perform the action,
 *                             or `undefined` if the OPTIONS request is still being made.
 */
export function canUser(state, action, resource, id) {
  const isEntity = typeof resource === 'object';
  if (isEntity && (!resource.kind || !resource.name)) {
    return false;
  }
  const key = getUserPermissionCacheKey(action, resource, id);
  return state.userPermissions[key];
}

/**
 * Returns whether the current user can edit the given entity.
 *
 * Calling this may trigger an OPTIONS request to the REST API via the
 * `canUser()` resolver.
 *
 * https://developer.wordpress.org/rest-api/reference/
 *
 * @param state    Data state.
 * @param kind     Entity kind.
 * @param name     Entity name.
 * @param recordId Record's id.
 * @return Whether or not the user can edit,
 * or `undefined` if the OPTIONS request is still being made.
 */
export function canUserEditEntityRecord(state, kind, name, recordId) {
  deprecated(`wp.data.select( 'core' ).canUserEditEntityRecord()`, {
    since: '6.7',
    alternative: `wp.data.select( 'core' ).canUser( 'update', { kind, name, id } )`
  });
  return canUser(state, 'update', {
    kind,
    name,
    id: recordId
  });
}

/**
 * Returns the latest autosaves for the post.
 *
 * May return multiple autosaves since the backend stores one autosave per
 * author for each post.
 *
 * @param state    State tree.
 * @param postType The type of the parent post.
 * @param postId   The id of the parent post.
 *
 * @return An array of autosaves for the post, or undefined if there is none.
 */
export function getAutosaves(state, postType, postId) {
  return state.autosaves[postId];
}

/**
 * Returns the autosave for the post and author.
 *
 * @param state    State tree.
 * @param postType The type of the parent post.
 * @param postId   The id of the parent post.
 * @param authorId The id of the author.
 *
 * @return The autosave for the post and author.
 */
export function getAutosave(state, postType, postId, authorId) {
  if (authorId === undefined) {
    return;
  }
  const autosaves = state.autosaves[postId];
  return autosaves?.find(autosave => autosave.author === authorId);
}

/**
 * Returns true if the REST request for autosaves has completed.
 *
 * @param state    State tree.
 * @param postType The type of the parent post.
 * @param postId   The id of the parent post.
 *
 * @return True if the REST request was completed. False otherwise.
 */
export const hasFetchedAutosaves = createRegistrySelector(select => (state, postType, postId) => {
  return select(STORE_NAME).hasFinishedResolution('getAutosaves', [postType, postId]);
});

/**
 * Returns a new reference when edited values have changed. This is useful in
 * inferring where an edit has been made between states by comparison of the
 * return values using strict equality.
 *
 * @example
 *
 * ```
 * const hasEditOccurred = (
 *    getReferenceByDistinctEdits( beforeState ) !==
 *    getReferenceByDistinctEdits( afterState )
 * );
 * ```
 *
 * @param state Editor state.
 *
 * @return A value whose reference will change only when an edit occurs.
 */
export function getReferenceByDistinctEdits(state) {
  return state.editsReference;
}

/**
 * Retrieve the frontend template used for a given link.
 *
 * @param state Editor state.
 * @param link  Link.
 *
 * @return The template record.
 */
export function __experimentalGetTemplateForLink(state, link) {
  const records = getEntityRecords(state, 'postType', 'wp_template', {
    'find-template': link
  });
  if (records?.length) {
    return getEditedEntityRecord(state, 'postType', 'wp_template', records[0].id);
  }
  return null;
}

/**
 * Retrieve the current theme's base global styles
 *
 * @param state Editor state.
 *
 * @return The Global Styles object.
 */
export function __experimentalGetCurrentThemeBaseGlobalStyles(state) {
  const currentTheme = getCurrentTheme(state);
  if (!currentTheme) {
    return null;
  }
  return state.themeBaseGlobalStyles[currentTheme.stylesheet];
}

/**
 * Return the ID of the current global styles object.
 *
 * @param state Data state.
 *
 * @return The current global styles ID.
 */
export function __experimentalGetCurrentThemeGlobalStylesVariations(state) {
  const currentTheme = getCurrentTheme(state);
  if (!currentTheme) {
    return null;
  }
  return state.themeGlobalStyleVariations[currentTheme.stylesheet];
}

/**
 * Retrieve the list of registered block patterns.
 *
 * @param state Data state.
 *
 * @return Block pattern list.
 */
export function getBlockPatterns(state) {
  return state.blockPatterns;
}

/**
 * Retrieve the list of registered block pattern categories.
 *
 * @param state Data state.
 *
 * @return Block pattern category list.
 */
export function getBlockPatternCategories(state) {
  return state.blockPatternCategories;
}

/**
 * Retrieve the registered user pattern categories.
 *
 * @param state Data state.
 *
 * @return User patterns category array.
 */

export function getUserPatternCategories(state) {
  return state.userPatternCategories;
}

/**
 * Returns the revisions of the current global styles theme.
 *
 * @deprecated since WordPress 6.5.0. Callers should use `select( 'core' ).getRevisions( 'root', 'globalStyles', ${ recordKey } )` instead, where `recordKey` is the id of the global styles parent post.
 *
 * @param      state Data state.
 *
 * @return The current global styles.
 */
export function getCurrentThemeGlobalStylesRevisions(state) {
  deprecated("select( 'core' ).getCurrentThemeGlobalStylesRevisions()", {
    since: '6.5.0',
    alternative: "select( 'core' ).getRevisions( 'root', 'globalStyles', ${ recordKey } )"
  });
  const currentGlobalStylesId = __experimentalGetCurrentGlobalStylesId(state);
  if (!currentGlobalStylesId) {
    return null;
  }
  return state.themeGlobalStyleRevisions[currentGlobalStylesId];
}

/**
 * Returns the default template use to render a given query.
 *
 * @param state Data state.
 * @param query Query.
 *
 * @return The default template id for the given query.
 */
export function getDefaultTemplateId(state, query) {
  return state.defaultTemplates[JSON.stringify(query)];
}

/**
 * Returns an entity's revisions.
 *
 * @param state     State tree
 * @param kind      Entity kind.
 * @param name      Entity name.
 * @param recordKey The key of the entity record whose revisions you want to fetch.
 * @param query     Optional query. If requesting specific
 *                  fields, fields must always include the ID. For valid query parameters see revisions schema in [the REST API Handbook](https://developer.wordpress.org/rest-api/reference/). Then see the arguments available "Retrieve a [Entity kind]".
 *
 * @return Record.
 */
export const getRevisions = (state, kind, name, recordKey, query) => {
  const queriedStateRevisions = state.entities.records?.[kind]?.[name]?.revisions?.[recordKey];
  if (!queriedStateRevisions) {
    return null;
  }
  return getQueriedItems(queriedStateRevisions, query);
};

/**
 * Returns a single, specific revision of a parent entity.
 *
 * @param state       State tree
 * @param kind        Entity kind.
 * @param name        Entity name.
 * @param recordKey   The key of the entity record whose revisions you want to fetch.
 * @param revisionKey The revision's key.
 * @param query       Optional query. If requesting specific
 *                    fields, fields must always include the ID. For valid query parameters see revisions schema in [the REST API Handbook](https://developer.wordpress.org/rest-api/reference/). Then see the arguments available "Retrieve a [entity kind]".
 *
 * @return Record.
 */
export const getRevision = createSelector((state, kind, name, recordKey, revisionKey, query) => {
  var _query$context5;
  const queriedState = state.entities.records?.[kind]?.[name]?.revisions?.[recordKey];
  if (!queriedState) {
    return undefined;
  }
  const context = (_query$context5 = query?.context) !== null && _query$context5 !== void 0 ? _query$context5 : 'default';
  if (query === undefined) {
    // If expecting a complete item, validate that completeness.
    if (!queriedState.itemIsComplete[context]?.[revisionKey]) {
      return undefined;
    }
    return queriedState.items[context][revisionKey];
  }
  const item = queriedState.items[context]?.[revisionKey];
  if (item && query._fields) {
    var _getNormalizedCommaSe2;
    const filteredItem = {};
    const fields = (_getNormalizedCommaSe2 = getNormalizedCommaSeparable(query._fields)) !== null && _getNormalizedCommaSe2 !== void 0 ? _getNormalizedCommaSe2 : [];
    for (let f = 0; f < fields.length; f++) {
      const field = fields[f].split('.');
      let value = item;
      field.forEach(fieldName => {
        value = value?.[fieldName];
      });
      setNestedValue(filteredItem, field, value);
    }
    return filteredItem;
  }
  return item;
}, (state, kind, name, recordKey, revisionKey, query) => {
  var _query$context6;
  const context = (_query$context6 = query?.context) !== null && _query$context6 !== void 0 ? _query$context6 : 'default';
  return [state.entities.records?.[kind]?.[name]?.revisions?.[recordKey]?.items?.[context]?.[revisionKey], state.entities.records?.[kind]?.[name]?.revisions?.[recordKey]?.itemIsComplete?.[context]?.[revisionKey]];
});
//# sourceMappingURL=selectors.js.map
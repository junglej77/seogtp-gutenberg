/**
 * Returns true if the currently edited post is yet to be saved, or false if
 * the post has been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is new.
 */
export function isEditedPostNew(state: Object): boolean;
/**
 * Returns true if content includes unsaved changes, or false otherwise.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether content includes unsaved changes.
 */
export function hasChangedContent(state: Object): boolean;
/**
 * Returns true if there are no unsaved values for the current edit session and
 * if the currently edited post is new (has never been saved before).
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether new post and unsaved values exist.
 */
export function isCleanNewPost(state: Object): boolean;
/**
 * Returns the post type of the post currently being edited.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post type.
 */
export function getCurrentPostType(state: Object): string;
/**
 * Returns the ID of the post currently being edited, or null if the post has
 * not yet been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {?number} ID of current post.
 */
export function getCurrentPostId(state: Object): number | null;
/**
 * Returns the template ID currently being rendered/edited
 *
 * @param {Object} state Global application state.
 *
 * @return {string?} Template ID.
 */
export function getCurrentTemplateId(state: Object): string | null;
/**
 * Returns the number of revisions of the post currently being edited.
 *
 * @param {Object} state Global application state.
 *
 * @return {number} Number of revisions.
 */
export function getCurrentPostRevisionsCount(state: Object): number;
/**
 * Returns the last revision ID of the post currently being edited,
 * or null if the post has no revisions.
 *
 * @param {Object} state Global application state.
 *
 * @return {?number} ID of the last revision.
 */
export function getCurrentPostLastRevisionId(state: Object): number | null;
/**
 * Returns an attribute value of the saved post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Post attribute name.
 *
 * @return {*} Post attribute value.
 */
export function getCurrentPostAttribute(state: Object, attributeName: string): any;
/**
 * Returns a single attribute of the post being edited, preferring the unsaved
 * edit if one exists, but falling back to the attribute for the last known
 * saved state of the post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Post attribute name.
 *
 * @return {*} Post attribute value.
 */
export function getEditedPostAttribute(state: Object, attributeName: string): any;
/**
 * Returns the current visibility of the post being edited, preferring the
 * unsaved value if different than the saved post. The return value is one of
 * "private", "password", or "public".
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post visibility.
 */
export function getEditedPostVisibility(state: Object): string;
/**
 * Returns true if post is pending review.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether current post is pending review.
 */
export function isCurrentPostPending(state: Object): boolean;
/**
 * Return true if the current post has already been published.
 *
 * @param {Object}  state       Global application state.
 * @param {Object?} currentPost Explicit current post for bypassing registry selector.
 *
 * @return {boolean} Whether the post has been published.
 */
export function isCurrentPostPublished(state: Object, currentPost: Object | null): boolean;
/**
 * Returns true if post is already scheduled.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether current post is scheduled to be posted.
 */
export function isCurrentPostScheduled(state: Object): boolean;
/**
 * Return true if the post being edited can be published.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post can been published.
 */
export function isEditedPostPublishable(state: Object): boolean;
/**
 * Returns true if the post can be saved, or false otherwise. A post must
 * contain a title, an excerpt, or non-empty content to be valid for save.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post can be saved.
 */
export function isEditedPostSaveable(state: Object): boolean;
/**
 * Return true if the post being edited is being scheduled. Preferring the
 * unsaved status values.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post has been published.
 */
export function isEditedPostBeingScheduled(state: Object): boolean;
/**
 * Returns whether the current post should be considered to have a "floating"
 * date (i.e. that it would publish "Immediately" rather than at a set time).
 *
 * Unlike in the PHP backend, the REST API returns a full date string for posts
 * where the 0000-00-00T00:00:00 placeholder is present in the database. To
 * infer that a post is set to publish "Immediately" we check whether the date
 * and modified date are the same.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether the edited post has a floating date value.
 */
export function isEditedPostDateFloating(state: Object): boolean;
/**
 * Returns true if the post is currently being deleted, or false otherwise.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether post is being deleted.
 */
export function isDeletingPost(state: Object): boolean;
/**
 * Returns true if the post is currently being saved, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post is being saved.
 */
export function isSavingPost(state: Object): boolean;
/**
 * Returns true if the post is autosaving, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is autosaving.
 */
export function isAutosavingPost(state: Object): boolean;
/**
 * Returns true if the post is being previewed, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is being previewed.
 */
export function isPreviewingPost(state: Object): boolean;
/**
 * Returns the post preview link
 *
 * @param {Object} state Global application state.
 *
 * @return {string | undefined} Preview Link.
 */
export function getEditedPostPreviewLink(state: Object): string | undefined;
/**
 * Returns true if the post is being published, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post is being published.
 */
export function isPublishingPost(state: Object): boolean;
/**
 * Returns whether the permalink is editable or not.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether or not the permalink is editable.
 */
export function isPermalinkEditable(state: Object): boolean;
/**
 * Returns the permalink for the post.
 *
 * @param {Object} state Editor state.
 *
 * @return {?string} The permalink, or null if the post is not viewable.
 */
export function getPermalink(state: Object): string | null;
/**
 * Returns the slug for the post being edited, preferring a manually edited
 * value if one exists, then a sanitized version of the current post title, and
 * finally the post ID.
 *
 * @param {Object} state Editor state.
 *
 * @return {string} The current slug to be displayed in the editor
 */
export function getEditedPostSlug(state: Object): string;
/**
 * Returns the permalink for a post, split into its three parts: the prefix,
 * the postName, and the suffix.
 *
 * @param {Object} state Editor state.
 *
 * @return {Object} An object containing the prefix, postName, and suffix for
 *                  the permalink, or null if the post is not viewable.
 */
export function getPermalinkParts(state: Object): Object;
/**
 * Returns whether the post is locked.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is locked.
 */
export function isPostLocked(state: Object): boolean;
/**
 * Returns whether post saving is locked.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is locked.
 */
export function isPostSavingLocked(state: Object): boolean;
/**
 * Returns whether post autosaving is locked.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is locked.
 */
export function isPostAutosavingLocked(state: Object): boolean;
/**
 * Returns whether the edition of the post has been taken over.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is post lock takeover.
 */
export function isPostLockTakeover(state: Object): boolean;
/**
 * Returns details about the post lock user.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} A user object.
 */
export function getPostLockUser(state: Object): Object;
/**
 * Returns the active post lock.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} The lock object.
 */
export function getActivePostLock(state: Object): Object;
/**
 * Returns whether or not the user has the unfiltered_html capability.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether the user can or can't post unfiltered HTML.
 */
export function canUserUseUnfilteredHTML(state: Object): boolean;
/**
 * Returns true if the given panel was programmatically removed, or false otherwise.
 * All panels are not removed by default.
 *
 * @param {Object} state     Global application state.
 * @param {string} panelName A string that identifies the panel.
 *
 * @return {boolean} Whether or not the panel is removed.
 */
export function isEditorPanelRemoved(state: Object, panelName: string): boolean;
/**
 * A block selection object.
 *
 * @typedef {Object} WPBlockSelection
 *
 * @property {string} clientId     A block client ID.
 * @property {string} attributeKey A block attribute key.
 * @property {number} offset       An attribute value offset, based on the rich
 *                                 text value. See `wp.richText.create`.
 */
/**
 * Returns the current selection start.
 *
 * @param {Object} state
 * @return {WPBlockSelection} The selection start.
 *
 * @deprecated since Gutenberg 10.0.0.
 */
export function getEditorSelectionStart(state: Object): WPBlockSelection;
/**
 * Returns the current selection end.
 *
 * @param {Object} state
 * @return {WPBlockSelection} The selection end.
 *
 * @deprecated since Gutenberg 10.0.0.
 */
export function getEditorSelectionEnd(state: Object): WPBlockSelection;
/**
 * Returns the current selection.
 *
 * @param {Object} state
 * @return {WPBlockSelection} The selection end.
 */
export function getEditorSelection(state: Object): WPBlockSelection;
/**
 * Is the editor ready
 *
 * @param {Object} state
 * @return {boolean} is Ready.
 */
export function __unstableIsEditorReady(state: Object): boolean;
/**
 * Returns the post editor settings.
 *
 * @param {Object} state Editor state.
 *
 * @return {Object} The editor settings object.
 */
export function getEditorSettings(state: Object): Object;
/**
 * Returns the post editor's rendering mode.
 *
 * @param {Object} state Editor state.
 *
 * @return {string} Rendering mode.
 */
export function getRenderingMode(state: Object): string;
/**
 * Returns true if the list view is opened.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the list view is opened.
 */
export function isListViewOpened(state: Object): boolean;
/**
 * Returns true if the inserter is opened.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the inserter is opened.
 */
export function isInserterOpened(state: Object): boolean;
/**
 * Returns state object prior to a specified optimist transaction ID, or `null`
 * if the transaction corresponding to the given ID cannot be found.
 *
 * @deprecated since Gutenberg 9.7.0.
 */
export function getStateBeforeOptimisticTransaction(): null;
/**
 * Returns true if an optimistic transaction is pending commit, for which the
 * before state satisfies the given predicate function.
 *
 * @deprecated since Gutenberg 9.7.0.
 */
export function inSomeHistory(): boolean;
/**
 * Returns the default template types.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} The template types.
 */
export function __experimentalGetDefaultTemplateTypes(state: Object): Object;
/**
 * Returns true if the publish sidebar is opened.
 *
 * @param {Object} state Global application state
 *
 * @return {boolean} Whether the publish sidebar is open.
 */
export function isPublishSidebarOpened(state: Object): boolean;
/**
 * Returns true if any past editor history snapshots exist, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether undo history exists.
 */
export const hasEditorUndo: Function;
/**
 * Returns true if any future editor history snapshots exist, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether redo history exists.
 */
export const hasEditorRedo: Function;
/**
 * Returns true if there are unsaved values for the current edit session, or
 * false if the editing state matches the saved or new post.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether unsaved values exist.
 */
export const isEditedPostDirty: Function;
/**
 * Returns true if there are unsaved edits for entities other than
 * the editor's post, and false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether there are edits or not.
 */
export const hasNonPostEntityChanges: Function;
/**
 * Returns the post currently being edited in its last known saved state, not
 * including unsaved edits. Returns an object containing relevant default post
 * values if the post has not yet been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Post object.
 */
export const getCurrentPost: Function;
/**
 * Returns any post values which have been changed in the editor but not yet
 * been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Object of key value pairs comprising unsaved edits.
 */
export const getPostEdits: Function;
/**
 * Returns an attribute value of the current autosave revision for a post, or
 * null if there is no autosave for the post.
 *
 * @deprecated since 5.6. Callers should use the `getAutosave( postType, postId, userId )` selector
 * 			   from the '@wordpress/core-data' package and access properties on the returned
 * 			   autosave object using getPostRawValue.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Autosave attribute name.
 *
 * @return {*} Autosave attribute value.
 */
export const getAutosaveAttribute: Function;
/**
 * Returns true if the edited post has content. A post has content if it has at
 * least one saveable block or otherwise has a non-empty content property
 * assigned.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post has content.
 */
export const isEditedPostEmpty: Function;
/**
 * Returns true if the post can be autosaved, or false otherwise.
 *
 * @param {Object} state    Global application state.
 * @param {Object} autosave A raw autosave object from the REST API.
 *
 * @return {boolean} Whether the post can be autosaved.
 */
export const isEditedPostAutosaveable: Function;
/**
 * Returns true if non-post entities are currently being saved, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether non-post entities are being saved.
 */
export const isSavingNonPostEntityChanges: Function;
/**
 * Returns true if a previous post save was attempted successfully, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post was saved successfully.
 */
export const didPostSaveRequestSucceed: Function;
/**
 * Returns true if a previous post save was attempted but failed, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post save failed.
 */
export const didPostSaveRequestFail: Function;
/**
 * Returns a suggested post format for the current post, inferred only if there
 * is a single block within the post and it is of a type known to match a
 * default post format. Returns null if the format cannot be determined.
 *
 * @return {?string} Suggested post format.
 */
export const getSuggestedPostFormat: Function;
/**
 * Returns the content of the post being edited.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post content.
 */
export const getEditedPostContent: Function;
/**
 * Returns whether the pre-publish panel should be shown
 * or skipped when the user clicks the "publish" button.
 *
 * @return {boolean} Whether the pre-publish panel should be shown or not.
 */
export const isPublishSidebarEnabled: Function;
/**
 * Return the current block list.
 *
 * @param {Object} state
 * @return {Array} Block list.
 */
export const getEditorBlocks: ((state: any) => any) & import("rememo").EnhancedSelector;
/**
 * Returns true if the given panel is enabled, or false otherwise. Panels are
 * enabled by default.
 *
 * @param {Object} state     Global application state.
 * @param {string} panelName A string that identifies the panel.
 *
 * @return {boolean} Whether or not the panel is enabled.
 */
export const isEditorPanelEnabled: Function;
/**
 * Returns true if the given panel is open, or false otherwise. Panels are
 * closed by default.
 *
 * @param {Object} state     Global application state.
 * @param {string} panelName A string that identifies the panel.
 *
 * @return {boolean} Whether or not the panel is open.
 */
export const isEditorPanelOpened: Function;
/**
 * Returns the current editing canvas device type.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Device type.
 */
export const getDeviceType: Function;
/**
 * Returns the current editing mode.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Editing mode.
 */
export const getEditorMode: Function;
/**
 * @see getBlockName in core/block-editor store.
 */
export const getBlockName: Function;
/**
 * @see isBlockValid in core/block-editor store.
 */
export const isBlockValid: Function;
/**
 * @see getBlockAttributes in core/block-editor store.
 */
export const getBlockAttributes: Function;
/**
 * @see getBlock in core/block-editor store.
 */
export const getBlock: Function;
/**
 * @see getBlocks in core/block-editor store.
 */
export const getBlocks: Function;
/**
 * @see getClientIdsOfDescendants in core/block-editor store.
 */
export const getClientIdsOfDescendants: Function;
/**
 * @see getClientIdsWithDescendants in core/block-editor store.
 */
export const getClientIdsWithDescendants: Function;
/**
 * @see getGlobalBlockCount in core/block-editor store.
 */
export const getGlobalBlockCount: Function;
/**
 * @see getBlocksByClientId in core/block-editor store.
 */
export const getBlocksByClientId: Function;
/**
 * @see getBlockCount in core/block-editor store.
 */
export const getBlockCount: Function;
/**
 * @see getBlockSelectionStart in core/block-editor store.
 */
export const getBlockSelectionStart: Function;
/**
 * @see getBlockSelectionEnd in core/block-editor store.
 */
export const getBlockSelectionEnd: Function;
/**
 * @see getSelectedBlockCount in core/block-editor store.
 */
export const getSelectedBlockCount: Function;
/**
 * @see hasSelectedBlock in core/block-editor store.
 */
export const hasSelectedBlock: Function;
/**
 * @see getSelectedBlockClientId in core/block-editor store.
 */
export const getSelectedBlockClientId: Function;
/**
 * @see getSelectedBlock in core/block-editor store.
 */
export const getSelectedBlock: Function;
/**
 * @see getBlockRootClientId in core/block-editor store.
 */
export const getBlockRootClientId: Function;
/**
 * @see getBlockHierarchyRootClientId in core/block-editor store.
 */
export const getBlockHierarchyRootClientId: Function;
/**
 * @see getAdjacentBlockClientId in core/block-editor store.
 */
export const getAdjacentBlockClientId: Function;
/**
 * @see getPreviousBlockClientId in core/block-editor store.
 */
export const getPreviousBlockClientId: Function;
/**
 * @see getNextBlockClientId in core/block-editor store.
 */
export const getNextBlockClientId: Function;
/**
 * @see getSelectedBlocksInitialCaretPosition in core/block-editor store.
 */
export const getSelectedBlocksInitialCaretPosition: Function;
/**
 * @see getMultiSelectedBlockClientIds in core/block-editor store.
 */
export const getMultiSelectedBlockClientIds: Function;
/**
 * @see getMultiSelectedBlocks in core/block-editor store.
 */
export const getMultiSelectedBlocks: Function;
/**
 * @see getFirstMultiSelectedBlockClientId in core/block-editor store.
 */
export const getFirstMultiSelectedBlockClientId: Function;
/**
 * @see getLastMultiSelectedBlockClientId in core/block-editor store.
 */
export const getLastMultiSelectedBlockClientId: Function;
/**
 * @see isFirstMultiSelectedBlock in core/block-editor store.
 */
export const isFirstMultiSelectedBlock: Function;
/**
 * @see isBlockMultiSelected in core/block-editor store.
 */
export const isBlockMultiSelected: Function;
/**
 * @see isAncestorMultiSelected in core/block-editor store.
 */
export const isAncestorMultiSelected: Function;
/**
 * @see getMultiSelectedBlocksStartClientId in core/block-editor store.
 */
export const getMultiSelectedBlocksStartClientId: Function;
/**
 * @see getMultiSelectedBlocksEndClientId in core/block-editor store.
 */
export const getMultiSelectedBlocksEndClientId: Function;
/**
 * @see getBlockOrder in core/block-editor store.
 */
export const getBlockOrder: Function;
/**
 * @see getBlockIndex in core/block-editor store.
 */
export const getBlockIndex: Function;
/**
 * @see isBlockSelected in core/block-editor store.
 */
export const isBlockSelected: Function;
/**
 * @see hasSelectedInnerBlock in core/block-editor store.
 */
export const hasSelectedInnerBlock: Function;
/**
 * @see isBlockWithinSelection in core/block-editor store.
 */
export const isBlockWithinSelection: Function;
/**
 * @see hasMultiSelection in core/block-editor store.
 */
export const hasMultiSelection: Function;
/**
 * @see isMultiSelecting in core/block-editor store.
 */
export const isMultiSelecting: Function;
/**
 * @see isSelectionEnabled in core/block-editor store.
 */
export const isSelectionEnabled: Function;
/**
 * @see getBlockMode in core/block-editor store.
 */
export const getBlockMode: Function;
/**
 * @see isTyping in core/block-editor store.
 */
export const isTyping: Function;
/**
 * @see isCaretWithinFormattedText in core/block-editor store.
 */
export const isCaretWithinFormattedText: Function;
/**
 * @see getBlockInsertionPoint in core/block-editor store.
 */
export const getBlockInsertionPoint: Function;
/**
 * @see isBlockInsertionPointVisible in core/block-editor store.
 */
export const isBlockInsertionPointVisible: Function;
/**
 * @see isValidTemplate in core/block-editor store.
 */
export const isValidTemplate: Function;
/**
 * @see getTemplate in core/block-editor store.
 */
export const getTemplate: Function;
/**
 * @see getTemplateLock in core/block-editor store.
 */
export const getTemplateLock: Function;
/**
 * @see canInsertBlockType in core/block-editor store.
 */
export const canInsertBlockType: Function;
/**
 * @see getInserterItems in core/block-editor store.
 */
export const getInserterItems: Function;
/**
 * @see hasInserterItems in core/block-editor store.
 */
export const hasInserterItems: Function;
/**
 * @see getBlockListSettings in core/block-editor store.
 */
export const getBlockListSettings: Function;
/**
 * Returns the default template part areas.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} The template part areas.
 */
export const __experimentalGetDefaultTemplatePartAreas: ((state: any) => any) & import("rememo").EnhancedSelector;
/**
 * Returns a default template type searched by slug.
 *
 * @param {Object} state Global application state.
 * @param {string} slug  The template type slug.
 *
 * @return {Object} The template type.
 */
export const __experimentalGetDefaultTemplateType: ((state: any, slug: any) => any) & import("rememo").EnhancedSelector;
/**
 * Given a template entity, return information about it which is ready to be
 * rendered, such as the title, description, and icon.
 *
 * @param {Object} state    Global application state.
 * @param {Object} template The template for which we need information.
 * @return {Object} Information about the template, including title, description, and icon.
 */
export const __experimentalGetTemplateInfo: ((state: any, template: any) => {}) & import("rememo").EnhancedSelector;
/**
 * Returns a post type label depending on the current post.
 *
 * @param {Object} state Global application state.
 *
 * @return {string|undefined} The post type label if available, otherwise undefined.
 */
export const getPostTypeLabel: Function;
/**
 * A block selection object.
 */
export type WPBlockSelection = {
    /**
     * A block client ID.
     */
    clientId: string;
    /**
     * A block attribute key.
     */
    attributeKey: string;
    /**
     * An attribute value offset, based on the rich
     * text value. See `wp.richText.create`.
     */
    offset: number;
};
//# sourceMappingURL=selectors.d.ts.map
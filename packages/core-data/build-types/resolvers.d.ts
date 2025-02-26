export function getAuthors(query: any | undefined): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
export function getCurrentUser(): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
export function getEntityRecord(kind: string, name: string, key: (number | string) | undefined, query: any | undefined): ({ select, dispatch, registry }: {
    select: any;
    dispatch: any;
    registry: any;
}) => Promise<void>;
/**
 * Requests an entity's record from the REST API.
 */
export const getRawEntityRecord: Function;
/**
 * Requests an entity's record from the REST API.
 */
export const getEditedEntityRecord: Function;
export function getEntityRecords(kind: string, name: string, query?: any | null): ({ dispatch, registry }: {
    dispatch: any;
    registry: any;
}) => Promise<void>;
export namespace getEntityRecords {
    function shouldInvalidate(action: any, kind: any, name: any): any;
}
export function getCurrentTheme(): ({ dispatch, resolveSelect }: {
    dispatch: any;
    resolveSelect: any;
}) => Promise<void>;
/**
 * Requests theme supports data from the index.
 */
export const getThemeSupports: Function;
export function getEmbedPreview(url: string): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
export function canUser(requestedAction: string, resource: string | any, id: string | null): ({ dispatch, registry }: {
    dispatch: any;
    registry: any;
}) => Promise<void>;
export function canUserEditEntityRecord(kind: string, name: string, recordId: number | string): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
export function getAutosaves(postType: string, postId: number): ({ dispatch, resolveSelect }: {
    dispatch: any;
    resolveSelect: any;
}) => Promise<void>;
export function getAutosave(postType: string, postId: number): ({ resolveSelect }: {
    resolveSelect: any;
}) => Promise<void>;
export function __experimentalGetTemplateForLink(link: string): ({ dispatch, resolveSelect }: {
    dispatch: any;
    resolveSelect: any;
}) => Promise<void>;
export namespace __experimentalGetTemplateForLink {
    function shouldInvalidate(action: any): any;
}
export function __experimentalGetCurrentGlobalStylesId(): ({ dispatch, resolveSelect }: {
    dispatch: any;
    resolveSelect: any;
}) => Promise<void>;
export function __experimentalGetCurrentThemeBaseGlobalStyles(): ({ resolveSelect, dispatch }: {
    resolveSelect: any;
    dispatch: any;
}) => Promise<void>;
export function __experimentalGetCurrentThemeGlobalStylesVariations(): ({ resolveSelect, dispatch }: {
    resolveSelect: any;
    dispatch: any;
}) => Promise<void>;
export function getCurrentThemeGlobalStylesRevisions(): ({ resolveSelect, dispatch }: {
    resolveSelect: any;
    dispatch: any;
}) => Promise<void>;
export namespace getCurrentThemeGlobalStylesRevisions {
    function shouldInvalidate(action: any): boolean;
}
export function getBlockPatterns(): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
export function getBlockPatternCategories(): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
export function getUserPatternCategories(): ({ dispatch, resolveSelect }: {
    dispatch: any;
    resolveSelect: any;
}) => Promise<void>;
export function getNavigationFallbackId(): ({ dispatch, select, registry }: {
    dispatch: any;
    select: any;
    registry: any;
}) => Promise<void>;
export function getDefaultTemplateId(query: any): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
export function getRevisions(kind: string, name: string, recordKey: number | string, query?: any | undefined): ({ dispatch, registry }: {
    dispatch: any;
    registry: any;
}) => Promise<void>;
export namespace getRevisions {
    function shouldInvalidate(action: any, kind: any, name: any, recordKey: any): boolean;
}
export function getRevision(kind: string, name: string, recordKey: number | string, revisionKey: number | string, query: any | undefined): ({ dispatch }: {
    dispatch: any;
}) => Promise<void>;
//# sourceMappingURL=resolvers.d.ts.map
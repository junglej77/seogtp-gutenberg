/**
 * Returns an action object used in signalling that selector resolution has
 * started.
 *
 * @param {string}    selectorName Name of selector for which resolver triggered.
 * @param {unknown[]} args         Arguments to associate for uniqueness.
 *
 * @return {{ type: 'START_RESOLUTION', selectorName: string, args: unknown[] }} Action object.
 */
export function startResolution(selectorName: string, args: unknown[]): {
    type: "START_RESOLUTION";
    selectorName: string;
    args: unknown[];
};
/**
 * Returns an action object used in signalling that selector resolution has
 * completed.
 *
 * @param {string}    selectorName Name of selector for which resolver triggered.
 * @param {unknown[]} args         Arguments to associate for uniqueness.
 *
 * @return {{ type: 'FINISH_RESOLUTION', selectorName: string, args: unknown[] }} Action object.
 */
export function finishResolution(selectorName: string, args: unknown[]): {
    type: "FINISH_RESOLUTION";
    selectorName: string;
    args: unknown[];
};
/**
 * Returns an action object used in signalling that selector resolution has
 * failed.
 *
 * @param {string}        selectorName Name of selector for which resolver triggered.
 * @param {unknown[]}     args         Arguments to associate for uniqueness.
 * @param {Error|unknown} error        The error that caused the failure.
 *
 * @return {{ type: 'FAIL_RESOLUTION', selectorName: string, args: unknown[], error: Error|unknown }} Action object.
 */
export function failResolution(selectorName: string, args: unknown[], error: Error | unknown): {
    type: "FAIL_RESOLUTION";
    selectorName: string;
    args: unknown[];
    error: Error | unknown;
};
/**
 * Returns an action object used in signalling that a batch of selector resolutions has
 * started.
 *
 * @param {string}      selectorName Name of selector for which resolver triggered.
 * @param {unknown[][]} args         Array of arguments to associate for uniqueness, each item
 *                                   is associated to a resolution.
 *
 * @return {{ type: 'START_RESOLUTIONS', selectorName: string, args: unknown[][] }} Action object.
 */
export function startResolutions(selectorName: string, args: unknown[][]): {
    type: "START_RESOLUTIONS";
    selectorName: string;
    args: unknown[][];
};
/**
 * Returns an action object used in signalling that a batch of selector resolutions has
 * completed.
 *
 * @param {string}      selectorName Name of selector for which resolver triggered.
 * @param {unknown[][]} args         Array of arguments to associate for uniqueness, each item
 *                                   is associated to a resolution.
 *
 * @return {{ type: 'FINISH_RESOLUTIONS', selectorName: string, args: unknown[][] }} Action object.
 */
export function finishResolutions(selectorName: string, args: unknown[][]): {
    type: "FINISH_RESOLUTIONS";
    selectorName: string;
    args: unknown[][];
};
/**
 * Returns an action object used in signalling that a batch of selector resolutions has
 * completed and at least one of them has failed.
 *
 * @param {string}            selectorName Name of selector for which resolver triggered.
 * @param {unknown[]}         args         Array of arguments to associate for uniqueness, each item
 *                                         is associated to a resolution.
 * @param {(Error|unknown)[]} errors       Array of errors to associate for uniqueness, each item
 *                                         is associated to a resolution.
 * @return {{ type: 'FAIL_RESOLUTIONS', selectorName: string, args: unknown[], errors: Array<Error|unknown> }} Action object.
 */
export function failResolutions(selectorName: string, args: unknown[], errors: (Error | unknown)[]): {
    type: "FAIL_RESOLUTIONS";
    selectorName: string;
    args: unknown[];
    errors: Array<Error | unknown>;
};
/**
 * Returns an action object used in signalling that we should invalidate the resolution cache.
 *
 * @param {string}    selectorName Name of selector for which resolver should be invalidated.
 * @param {unknown[]} args         Arguments to associate for uniqueness.
 *
 * @return {{ type: 'INVALIDATE_RESOLUTION', selectorName: string, args: any[] }} Action object.
 */
export function invalidateResolution(selectorName: string, args: unknown[]): {
    type: "INVALIDATE_RESOLUTION";
    selectorName: string;
    args: any[];
};
/**
 * Returns an action object used in signalling that the resolution
 * should be invalidated.
 *
 * @return {{ type: 'INVALIDATE_RESOLUTION_FOR_STORE' }} Action object.
 */
export function invalidateResolutionForStore(): {
    type: "INVALIDATE_RESOLUTION_FOR_STORE";
};
/**
 * Returns an action object used in signalling that the resolution cache for a
 * given selectorName should be invalidated.
 *
 * @param {string} selectorName Name of selector for which all resolvers should
 *                              be invalidated.
 *
 * @return  {{ type: 'INVALIDATE_RESOLUTION_FOR_STORE_SELECTOR', selectorName: string }} Action object.
 */
export function invalidateResolutionForStoreSelector(selectorName: string): {
    type: "INVALIDATE_RESOLUTION_FOR_STORE_SELECTOR";
    selectorName: string;
};
//# sourceMappingURL=actions.d.ts.map
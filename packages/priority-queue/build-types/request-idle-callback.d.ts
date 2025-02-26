/**
 * @typedef {( timeOrDeadline: IdleDeadline | number ) => void} Callback
 */
/**
 * @return {(callback: Callback) => void} RequestIdleCallback
 */
export function createRequestIdleCallback(): (callback: Callback) => void;
declare const _default: (callback: Callback) => void;
export default _default;
export type Callback = (timeOrDeadline: IdleDeadline | number) => void;
//# sourceMappingURL=request-idle-callback.d.ts.map
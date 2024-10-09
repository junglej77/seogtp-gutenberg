/**
 * External dependencies
 */
import type { h as createElement, RefObject } from 'preact';
import type { Evaluate } from './hooks';
export interface Scope {
    evaluate: Evaluate;
    context: object;
    ref: RefObject<HTMLElement>;
    attributes: createElement.JSX.HTMLAttributes;
}
export declare const getScope: () => Scope;
export declare const setScope: (scope: Scope) => void;
export declare const resetScope: () => void;
/**
 * Retrieves the context inherited by the element evaluating a function from the
 * store. The returned value depends on the element and the namespace where the
 * function calling `getContext()` exists.
 *
 * @param namespace Store namespace. By default, the namespace where the calling
 *                  function exists is used.
 * @return The context content.
 */
export declare const getContext: <T extends object>(namespace?: string) => T;
/**
 * Retrieves a representation of the element where a function from the store
 * is being evalutated. Such representation is read-only, and contains a
 * reference to the DOM element, its props and a local reactive state.
 *
 * @return Element representation.
 */
export declare const getElement: () => Readonly<{
    ref: HTMLElement | null;
    attributes: createElement.JSX.HTMLAttributes<EventTarget>;
}>;
//# sourceMappingURL=scopes.d.ts.map
/**
 * External dependencies
 */
import { type ComponentChildren } from 'preact';
import type { VNode, Context } from 'preact';
import { type Scope } from './scopes';
export interface DirectiveEntry {
    value: string | object;
    namespace: string;
    suffix: string;
}
type DirectiveEntries = Record<string, DirectiveEntry[]>;
interface DirectiveArgs {
    /**
     * Object map with the defined directives of the element being evaluated.
     */
    directives: DirectiveEntries;
    /**
     * Props present in the current element.
     */
    props: {
        children?: ComponentChildren;
    };
    /**
     * Virtual node representing the element.
     */
    element: VNode<{
        class?: string;
        style?: string | Record<string, string | number>;
        content?: ComponentChildren;
    }>;
    /**
     * The inherited context.
     */
    context: Context<any>;
    /**
     * Function that resolves a given path to a value either in the store or the
     * context.
     */
    evaluate: Evaluate;
}
interface DirectiveCallback {
    (args: DirectiveArgs): VNode<any> | null | void;
}
interface DirectiveOptions {
    /**
     * Value that specifies the priority to evaluate directives of this type.
     * Lower numbers correspond with earlier execution.
     *
     * @default 10
     */
    priority?: number;
}
export interface Evaluate {
    (entry: DirectiveEntry, ...args: any[]): any;
}
interface GetEvaluate {
    (args: {
        scope: Scope;
    }): Evaluate;
}
/**
 * Register a new directive type in the Interactivity API runtime.
 *
 * @example
 * ```js
 * directive(
 *   'alert', // Name without the `data-wp-` prefix.
 *   ( { directives: { alert }, element, evaluate } ) => {
 *     const defaultEntry = alert.find( entry => entry.suffix === 'default' );
 *     element.props.onclick = () => { alert( evaluate( defaultEntry ) ); }
 *   }
 * )
 * ```
 *
 * The previous code registers a custom directive type for displaying an alert
 * message whenever an element using it is clicked. The message text is obtained
 * from the store under the inherited namespace, using `evaluate`.
 *
 * When the HTML is processed by the Interactivity API, any element containing
 * the `data-wp-alert` directive will have the `onclick` event handler, e.g.,
 *
 * ```html
 * <div data-wp-interactive="messages">
 *   <button data-wp-alert="state.alert">Click me!</button>
 * </div>
 * ```
 * Note that, in the previous example, the directive callback gets the path
 * value (`state.alert`) from the directive entry with suffix `default`. A
 * custom suffix can also be specified by appending `--` to the directive
 * attribute, followed by the suffix, like in the following HTML snippet:
 *
 * ```html
 * <div data-wp-interactive="myblock">
 *   <button
 *     data-wp-color--text="state.text"
 *     data-wp-color--background="state.background"
 *   >Click me!</button>
 * </div>
 * ```
 *
 * This could be an hypothetical implementation of the custom directive used in
 * the snippet above.
 *
 * @example
 * ```js
 * directive(
 *   'color', // Name without prefix and suffix.
 *   ( { directives: { color: colors }, ref, evaluate } ) =>
 *     colors.forEach( ( color ) => {
 *       if ( color.suffix = 'text' ) {
 *         ref.style.setProperty(
 *           'color',
 *           evaluate( color.text )
 *         );
 *       }
 *       if ( color.suffix = 'background' ) {
 *         ref.style.setProperty(
 *           'background-color',
 *           evaluate( color.background )
 *         );
 *       }
 *     } );
 *   }
 * )
 * ```
 *
 * @param name             Directive name, without the `data-wp-` prefix.
 * @param callback         Function that runs the directive logic.
 * @param options          Options object.
 * @param options.priority Option to control the directive execution order. The
 *                         lesser, the highest priority. Default is `10`.
 */
export declare const directive: (name: string, callback: DirectiveCallback, { priority }?: DirectiveOptions) => void;
export declare const getEvaluate: GetEvaluate;
export {};
//# sourceMappingURL=hooks.d.ts.map
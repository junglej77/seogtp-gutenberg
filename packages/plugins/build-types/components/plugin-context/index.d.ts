/**
 * Internal dependencies
 */
import type { WPPlugin } from '../../api';
export interface PluginContext {
    name: null | WPPlugin['name'];
    icon: null | WPPlugin['icon'];
}
export declare const PluginContextProvider: import("react").Provider<PluginContext>;
/**
 * A hook that returns the plugin context.
 *
 * @return {PluginContext} Plugin context
 */
export declare function usePluginContext(): PluginContext;
/**
 * A Higher Order Component used to inject Plugin context to the
 * wrapped component.
 *
 * @param  mapContextToProps Function called on every context change,
 *                           expected to return object of props to
 *                           merge with the component's own props.
 *
 * @return {Component} Enhanced component with injected context as props.
 */
export declare const withPluginContext: (mapContextToProps: <T>(context: PluginContext, props: T) => T & PluginContext) => (Inner: import("react").ComponentType<any>) => (props: any) => import("react").JSX.Element;
//# sourceMappingURL=index.d.ts.map
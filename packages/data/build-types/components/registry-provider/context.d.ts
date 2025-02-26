export const Context: import("react").Context<import("../../registry").WPDataRegistry>;
/**
 * A custom react Context consumer exposing the provided `registry` to
 * children components. Used along with the RegistryProvider.
 *
 * You can read more about the react context api here:
 * https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context
 *
 * @example
 * ```js
 * import {
 *   RegistryProvider,
 *   RegistryConsumer,
 *   createRegistry
 * } from '@wordpress/data';
 *
 * const registry = createRegistry( {} );
 *
 * const App = ( { props } ) => {
 *   return <RegistryProvider value={ registry }>
 *     <div>Hello There</div>
 *     <RegistryConsumer>
 *       { ( registry ) => (
 *         <ComponentUsingRegistry
 *         		{ ...props }
 *         	  registry={ registry }
 *       ) }
 *     </RegistryConsumer>
 *   </RegistryProvider>
 * }
 * ```
 */
export const RegistryConsumer: import("react").Consumer<import("../../registry").WPDataRegistry>;
export default Provider;
declare const Provider: import("react").Provider<import("../../registry").WPDataRegistry>;
//# sourceMappingURL=context.d.ts.map
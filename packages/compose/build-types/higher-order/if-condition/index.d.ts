/**
 * External dependencies
 */
import type { ComponentType } from 'react';
/**
 * Higher-order component creator, creating a new component which renders if
 * the given condition is satisfied or with the given optional prop name.
 *
 * @example
 * ```ts
 * type Props = { foo: string };
 * const Component = ( props: Props ) => <div>{ props.foo }</div>;
 * const ConditionalComponent = ifCondition( ( props: Props ) => props.foo.length !== 0 )( Component );
 * <ConditionalComponent foo="" />; // => null
 * <ConditionalComponent foo="bar" />; // => <div>bar</div>;
 * ```
 *
 * @param predicate Function to test condition.
 *
 * @return Higher-order component.
 */
declare function ifCondition<Props extends {}>(predicate: (props: Props) => boolean): (Inner: ComponentType<Props>) => (props: Props) => import("react").JSX.Element | null;
export default ifCondition;
//# sourceMappingURL=index.d.ts.map
/**
 * Creates a higher-order component which adds filtering capability to the
 * wrapped component. Filters get applied when the original component is about
 * to be mounted. When a filter is added or removed that matches the hook name,
 * the wrapped component re-renders.
 *
 * @param hookName Hook name exposed to be used by filters.
 *
 * @return Higher-order component factory.
 *
 * ```jsx
 * import { withFilters } from '@wordpress/components';
 * import { addFilter } from '@wordpress/hooks';
 *
 * const MyComponent = ( { title } ) => <h1>{ title }</h1>;
 *
 * const ComponentToAppend = () => <div>Appended component</div>;
 *
 * function withComponentAppended( FilteredComponent ) {
 * 	return ( props ) => (
 * 		<>
 * 			<FilteredComponent { ...props } />
 * 			<ComponentToAppend />
 * 		</>
 * 	);
 * }
 *
 * addFilter(
 * 	'MyHookName',
 * 	'my-plugin/with-component-appended',
 * 	withComponentAppended
 * );
 *
 * const MyComponentWithFilters = withFilters( 'MyHookName' )( MyComponent );
 * ```
 */
export default function withFilters(hookName: string): (Inner: import("react").ComponentType<any>) => {
    new (props: {
        [key: string]: any;
    }): {
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): import("react").JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => Pick<{}, K> | {} | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{}>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): any | null;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
    };
    instances: {
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): import("react").JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => Pick<{}, K> | {} | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{}>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): any | null;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
    }[];
    contextType?: import("react").Context<any> | undefined;
};
//# sourceMappingURL=index.d.ts.map
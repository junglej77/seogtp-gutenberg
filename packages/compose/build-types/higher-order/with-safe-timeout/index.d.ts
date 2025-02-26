/**
 * Internal dependencies
 */
import type { WithInjectedProps, WithoutInjectedProps } from '../../utils/create-higher-order-component';
/**
 * We cannot use the `Window['setTimeout']` and `Window['clearTimeout']`
 * types here because those functions include functionality that is not handled
 * by this component, like the ability to pass extra arguments.
 *
 * In the case of this component, we only handle the simplest case where
 * `setTimeout` only accepts a function (not a string) and an optional delay.
 */
interface TimeoutProps {
    setTimeout: (fn: () => void, delay: number) => number;
    clearTimeout: (id: number) => void;
}
/**
 * A higher-order component used to provide and manage delayed function calls
 * that ought to be bound to a component's lifecycle.
 */
declare const withSafeTimeout: <C extends WithInjectedProps<C, TimeoutProps>>(Inner: C) => {
    new (props: WithoutInjectedProps<C, TimeoutProps>): {
        timeouts: number[];
        componentWillUnmount(): void;
        setTimeout(fn: () => void, delay: number): number;
        clearTimeout(id: number): void;
        render(): import("react").JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<WithoutInjectedProps<C, TimeoutProps>>) => Pick<{}, K> | {} | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<WithoutInjectedProps<C, TimeoutProps>>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<WithoutInjectedProps<C, TimeoutProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<WithoutInjectedProps<C, TimeoutProps>>, prevState: Readonly<{}>): any | null;
        componentDidUpdate?(prevProps: Readonly<WithoutInjectedProps<C, TimeoutProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<WithoutInjectedProps<C, TimeoutProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<WithoutInjectedProps<C, TimeoutProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<WithoutInjectedProps<C, TimeoutProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<WithoutInjectedProps<C, TimeoutProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default withSafeTimeout;
//# sourceMappingURL=index.d.ts.map
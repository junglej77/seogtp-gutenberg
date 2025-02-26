type Props = {
    node?: HTMLElement;
    [key: string]: any;
};
type State = {
    fallbackStyles?: {
        [key: string]: any;
    };
    grabStylesCompleted: boolean;
};
declare const _default: (mapNodeToProps: (node: HTMLElement, props: Props) => {
    [key: string]: any;
}) => (Inner: import("react").ComponentType<any>) => {
    new (props: Props): {
        nodeRef?: HTMLElement;
        bindRef(node: HTMLDivElement): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        grabFallbackStyles(): void;
        render(): import("react").JSX.Element;
        context: unknown;
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => Pick<State, K> | State | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props>;
        state: Readonly<State>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props>, prevState: Readonly<State>): any | null;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
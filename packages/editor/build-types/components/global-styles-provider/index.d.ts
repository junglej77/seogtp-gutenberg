export function mergeBaseAndUserConfigs(base: any, user: any): any;
export function useGlobalStylesContext(): {
    isReady: any;
    user: boolean | {
        settings: any;
        styles: any;
        title: any;
        _links: any;
    } | ((callbackOrObject: Function | Object, options?: Object) => void);
    base: any;
    merged: any;
    setUserConfig: boolean | {
        settings: any;
        styles: any;
        title: any;
        _links: any;
    } | ((callbackOrObject: Function | Object, options?: Object) => void);
};
export function GlobalStylesProvider({ children }: {
    children: any;
}): import("react").JSX.Element | null;
//# sourceMappingURL=index.d.ts.map
export function mergeBaseAndUserConfigs(base: any, user: any): any;
export function useGlobalStylesContext(): {
    isReady: any;
    user: boolean | {
        settings: any;
        styles: any;
        _links: any;
    } | ((callbackOrObject: Function | Object, options?: Object) => void);
    base: any;
    merged: any;
    setUserConfig: boolean | {
        settings: any;
        styles: any;
        _links: any;
    } | ((callbackOrObject: Function | Object, options?: Object) => void);
};
export function GlobalStylesProvider({ children }: {
    children: any;
}): import("react").JSX.Element | null;
//# sourceMappingURL=index%E6%BA%90%E6%96%87%E4%BB%B6%E5%A4%87%E4%BB%BD.d.ts.map
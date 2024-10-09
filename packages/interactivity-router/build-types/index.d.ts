interface NavigateOptions {
    force?: boolean;
    html?: string;
    replace?: boolean;
    timeout?: number;
    loadingAnimation?: boolean;
    screenReaderAnnouncement?: boolean;
}
interface PrefetchOptions {
    force?: boolean;
    html?: string;
}
export declare const state: {
    url: string;
    navigation: {
        hasStarted: boolean;
        hasFinished: boolean;
        texts: {
            loading: string;
            loaded: string;
        };
        message: string;
    };
}, actions: {
    /**
     * Navigates to the specified page.
     *
     * This function normalizes the passed href, fetchs the page HTML if
     * needed, and updates any interactive regions whose contents have
     * changed. It also creates a new entry in the browser session history.
     *
     * @param href                               The page href.
     * @param [options]                          Options object.
     * @param [options.force]                    If true, it forces re-fetching the URL.
     * @param [options.html]                     HTML string to be used instead of fetching the requested URL.
     * @param [options.replace]                  If true, it replaces the current entry in the browser session history.
     * @param [options.timeout]                  Time until the navigation is aborted, in milliseconds. Default is 10000.
     * @param [options.loadingAnimation]         Whether an animation should be shown while navigating. Default to `true`.
     * @param [options.screenReaderAnnouncement] Whether a message for screen readers should be announced while navigating. Default to `true`.
     *
     * @return  Promise that resolves once the navigation is completed or aborted.
     */
    navigate(href: string, options?: NavigateOptions): any;
    /**
     * Prefetchs the page with the passed URL.
     *
     * The function normalizes the URL and stores internally the fetch
     * promise, to avoid triggering a second fetch for an ongoing request.
     *
     * @param url             The page URL.
     * @param [options]       Options object.
     * @param [options.force] Force fetching the URL again.
     * @param [options.html]  HTML string to be used instead of fetching the requested URL.
     */
    prefetch(url: string, options?: PrefetchOptions): void;
};
export {};
//# sourceMappingURL=index.d.ts.map
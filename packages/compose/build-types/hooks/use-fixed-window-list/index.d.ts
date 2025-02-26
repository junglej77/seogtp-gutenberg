/**
 * @typedef {Object} WPFixedWindowList
 *
 * @property {number}                  visibleItems Items visible in the current viewport
 * @property {number}                  start        Start index of the window
 * @property {number}                  end          End index of the window
 * @property {(index:number)=>boolean} itemInView   Returns true if item is in the window
 */
/**
 * @typedef {Object} WPFixedWindowListOptions
 *
 * @property {number}  [windowOverscan] Renders windowOverscan number of items before and after the calculated visible window.
 * @property {boolean} [useWindowing]   When false avoids calculating the window size
 * @property {number}  [initWindowSize] Initial window size to use on first render before we can calculate the window size.
 * @property {any}     [expandedState]  Used to recalculate the window size when the expanded state of a list changes.
 */
/**
 *
 * @param {import('react').RefObject<HTMLElement>} elementRef Used to find the closest scroll container that contains element.
 * @param { number }                               itemHeight Fixed item height in pixels
 * @param { number }                               totalItems Total items in list
 * @param { WPFixedWindowListOptions }             [options]  Options object
 * @return {[ WPFixedWindowList, setFixedListWindow:(nextWindow:WPFixedWindowList)=>void]} Array with the fixed window list and setter
 */
export default function useFixedWindowList(elementRef: import("react").RefObject<HTMLElement>, itemHeight: number, totalItems: number, options?: WPFixedWindowListOptions | undefined): [WPFixedWindowList, setFixedListWindow: (nextWindow: WPFixedWindowList) => void];
export type WPFixedWindowList = {
    /**
     * Items visible in the current viewport
     */
    visibleItems: number;
    /**
     * Start index of the window
     */
    start: number;
    /**
     * End index of the window
     */
    end: number;
    /**
     * Returns true if item is in the window
     */
    itemInView: (index: number) => boolean;
};
export type WPFixedWindowListOptions = {
    /**
     * Renders windowOverscan number of items before and after the calculated visible window.
     */
    windowOverscan?: number | undefined;
    /**
     * When false avoids calculating the window size
     */
    useWindowing?: boolean | undefined;
    /**
     * Initial window size to use on first render before we can calculate the window size.
     */
    initWindowSize?: number | undefined;
    /**
     * Used to recalculate the window size when the expanded state of a list changes.
     */
    expandedState?: any;
};
//# sourceMappingURL=index.d.ts.map
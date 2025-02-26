/**
 * WordPress dependencies
 */
import { useState, useLayoutEffect } from '@wordpress/element';
import { getScrollContainer } from '@wordpress/dom';
import { PAGEUP, PAGEDOWN, HOME, END } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import { debounce } from '../../utils/debounce';
const DEFAULT_INIT_WINDOW_SIZE = 30;

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
export default function useFixedWindowList(elementRef, itemHeight, totalItems, options) {
  var _options$initWindowSi, _options$useWindowing;
  const initWindowSize = (_options$initWindowSi = options?.initWindowSize) !== null && _options$initWindowSi !== void 0 ? _options$initWindowSi : DEFAULT_INIT_WINDOW_SIZE;
  const useWindowing = (_options$useWindowing = options?.useWindowing) !== null && _options$useWindowing !== void 0 ? _options$useWindowing : true;
  const [fixedListWindow, setFixedListWindow] = useState({
    visibleItems: initWindowSize,
    start: 0,
    end: initWindowSize,
    itemInView: ( /** @type {number} */index) => {
      return index >= 0 && index <= initWindowSize;
    }
  });
  useLayoutEffect(() => {
    if (!useWindowing) {
      return;
    }
    const scrollContainer = getScrollContainer(elementRef.current);
    const measureWindow = ( /** @type {boolean | undefined} */initRender) => {
      var _options$windowOversc;
      if (!scrollContainer) {
        return;
      }
      const visibleItems = Math.ceil(scrollContainer.clientHeight / itemHeight);
      // Aim to keep opening list view fast, afterward we can optimize for scrolling.
      const windowOverscan = initRender ? visibleItems : (_options$windowOversc = options?.windowOverscan) !== null && _options$windowOversc !== void 0 ? _options$windowOversc : visibleItems;
      const firstViewableIndex = Math.floor(scrollContainer.scrollTop / itemHeight);
      const start = Math.max(0, firstViewableIndex - windowOverscan);
      const end = Math.min(totalItems - 1, firstViewableIndex + visibleItems + windowOverscan);
      setFixedListWindow(lastWindow => {
        const nextWindow = {
          visibleItems,
          start,
          end,
          itemInView: ( /** @type {number} */index) => {
            return start <= index && index <= end;
          }
        };
        if (lastWindow.start !== nextWindow.start || lastWindow.end !== nextWindow.end || lastWindow.visibleItems !== nextWindow.visibleItems) {
          return nextWindow;
        }
        return lastWindow;
      });
    };
    measureWindow(true);
    const debounceMeasureList = debounce(() => {
      measureWindow();
    }, 16);
    scrollContainer?.addEventListener('scroll', debounceMeasureList);
    scrollContainer?.ownerDocument?.defaultView?.addEventListener('resize', debounceMeasureList);
    scrollContainer?.ownerDocument?.defaultView?.addEventListener('resize', debounceMeasureList);
    return () => {
      scrollContainer?.removeEventListener('scroll', debounceMeasureList);
      scrollContainer?.ownerDocument?.defaultView?.removeEventListener('resize', debounceMeasureList);
    };
  }, [itemHeight, elementRef, totalItems, options?.expandedState, options?.windowOverscan, useWindowing]);
  useLayoutEffect(() => {
    if (!useWindowing) {
      return;
    }
    const scrollContainer = getScrollContainer(elementRef.current);
    const handleKeyDown = ( /** @type {KeyboardEvent} */event) => {
      switch (event.keyCode) {
        case HOME:
          {
            return scrollContainer?.scrollTo({
              top: 0
            });
          }
        case END:
          {
            return scrollContainer?.scrollTo({
              top: totalItems * itemHeight
            });
          }
        case PAGEUP:
          {
            return scrollContainer?.scrollTo({
              top: scrollContainer.scrollTop - fixedListWindow.visibleItems * itemHeight
            });
          }
        case PAGEDOWN:
          {
            return scrollContainer?.scrollTo({
              top: scrollContainer.scrollTop + fixedListWindow.visibleItems * itemHeight
            });
          }
      }
    };
    scrollContainer?.ownerDocument?.defaultView?.addEventListener('keydown', handleKeyDown);
    return () => {
      scrollContainer?.ownerDocument?.defaultView?.removeEventListener('keydown', handleKeyDown);
    };
  }, [totalItems, itemHeight, elementRef, fixedListWindow.visibleItems, useWindowing, options?.expandedState]);
  return [fixedListWindow, setFixedListWindow];
}
//# sourceMappingURL=index.js.map
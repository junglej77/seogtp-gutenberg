/* eslint-disable jsdoc/require-param */
/**
 * WordPress dependencies
 */
import { useRef, useEffect, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { useEvent } from './hooks/use-event';

/**
 * `useTrackElementRectUpdates` options.
 */

/**
 * Tracks an element's "rect" (size and position) and fires `onRect` for all
 * of its discrete values. The element can be changed dynamically and **it
 * must not be stored in a ref**. Instead, it should be stored in a React
 * state or equivalent.
 *
 * By default, `onRect` is called initially for the target element (including
 * when the target element changes), not only on size or position updates.
 * This allows consumers of the hook to always be in sync with all rect values
 * of the target element throughout its lifetime. This behavior can be
 * disabled by setting the `fireOnElementInit` option to `false`.
 *
 * Under the hood, it sets up a `ResizeObserver` that tracks the element. The
 * target element can be changed dynamically, and the observer will be
 * updated accordingly.
 *
 * @example
 *
 * ```tsx
 * const [ targetElement, setTargetElement ] = useState< HTMLElement | null >();
 *
 * useTrackElementRectUpdates( targetElement, ( element ) => {
 *   console.log( 'Element resized:', element );
 * } );
 *
 * <div ref={ setTargetElement } />;
 * ```
 */
export function useTrackElementRectUpdates(
/**
 * The target element to observe. It can be changed dynamically.
 */
targetElement,
/**
 * Callback to fire when the element is resized. It will also be
 * called when the observer is set up, unless `fireOnElementInit` is
 * set to `false`.
 */
onRect, {
  fireOnElementInit = true
} = {}) {
  const onRectEvent = useEvent(onRect);
  const observedElementRef = useRef();
  const resizeObserverRef = useRef();

  // TODO: could this be a layout effect?
  useEffect(() => {
    if (targetElement === observedElementRef.current) {
      return;
    }
    observedElementRef.current = targetElement;

    // Set up a ResizeObserver.
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(entries => {
        if (observedElementRef.current) {
          onRectEvent(observedElementRef.current, entries);
        }
      });
    }
    const {
      current: resizeObserver
    } = resizeObserverRef;

    // Observe new element.
    if (targetElement) {
      if (fireOnElementInit) {
        // TODO: investigate if this can be removed,
        // see: https://stackoverflow.com/a/60026394
        onRectEvent(targetElement);
      }
      resizeObserver.observe(targetElement);
    }
    return () => {
      // Unobserve previous element.
      if (observedElementRef.current) {
        resizeObserver.unobserve(observedElementRef.current);
      }
    };
  }, [fireOnElementInit, onRectEvent, targetElement]);
}

/**
 * The position and dimensions of an element, relative to its offset parent.
 */

/**
 * An `ElementOffsetRect` object with all values set to zero.
 */
export const NULL_ELEMENT_OFFSET_RECT = {
  left: 0,
  top: 0,
  width: 0,
  height: 0
};

/**
 * Returns the position and dimensions of an element, relative to its offset
 * parent. This is useful in contexts where `getBoundingClientRect` is not
 * suitable, such as when the element is transformed.
 *
 * **Note:** the `left` and `right` values are adjusted due to a limitation
 * in the way the browser calculates the offset position of the element,
 * which can cause unwanted scrollbars to appear. This adjustment makes the
 * values potentially inaccurate within a range of 1 pixel.
 */
export function getElementOffsetRect(element) {
  return {
    // The adjustments mentioned in the documentation above are necessary
    // because `offsetLeft` and `offsetTop` are rounded to the nearest pixel,
    // which can result in a position mismatch that causes unwanted overflow.
    // For context, see: https://github.com/WordPress/gutenberg/pull/61979
    left: Math.max(element.offsetLeft - 1, 0),
    top: Math.max(element.offsetTop - 1, 0),
    // This is a workaround to obtain these values with a sub-pixel precision,
    // since `offsetWidth` and `offsetHeight` are rounded to the nearest pixel.
    width: parseFloat(getComputedStyle(element).width),
    height: parseFloat(getComputedStyle(element).height)
  };
}

/**
 * Tracks the position and dimensions of an element, relative to its offset
 * parent. The element can be changed dynamically.
 */
export function useTrackElementOffsetRect(targetElement) {
  const [indicatorPosition, setIndicatorPosition] = useState(NULL_ELEMENT_OFFSET_RECT);
  useTrackElementRectUpdates(targetElement, element => setIndicatorPosition(getElementOffsetRect(element)));
  return indicatorPosition;
}

/* eslint-enable jsdoc/require-param */
//# sourceMappingURL=element-rect.js.map
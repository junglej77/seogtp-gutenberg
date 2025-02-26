/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */
import useEvent from '../use-event';
import _useLegacyResizeObserver from './_legacy';
/**
 * External dependencies
 */

// This is the current implementation of `useResizeObserver`.
//
// The legacy implementation is still supported for backwards compatibility.
// This is achieved by overloading the exported function with both signatures,
// and detecting which API is being used at runtime.
function _useResizeObserver(callback, resizeObserverOptions = {}) {
  const callbackEvent = useEvent(callback);
  const observedElementRef = useRef();
  const resizeObserverRef = useRef();
  return useEvent(element => {
    var _resizeObserverRef$cu;
    if (element === observedElementRef.current) {
      return;
    }
    observedElementRef.current = element;

    // Set up `ResizeObserver`.
    (_resizeObserverRef$cu = resizeObserverRef.current) !== null && _resizeObserverRef$cu !== void 0 ? _resizeObserverRef$cu : resizeObserverRef.current = new ResizeObserver(callbackEvent);
    const {
      current: resizeObserver
    } = resizeObserverRef;

    // Unobserve previous element.
    if (observedElementRef.current) {
      resizeObserver.unobserve(observedElementRef.current);
    }

    // Observe new element.
    if (element) {
      resizeObserver.observe(element, resizeObserverOptions);
    }
  });
}

/**
 * Sets up a [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API)
 * for an HTML or SVG element.
 *
 * Pass the returned setter as a callback ref to the React element you want
 * to observe, or use it in layout effects for advanced use cases.
 *
 * @example
 *
 * ```tsx
 * const setElement = useResizeObserver(
 * 	( resizeObserverEntries ) => console.log( resizeObserverEntries ),
 * 	{ box: 'border-box' }
 * );
 * <div ref={ setElement } />;
 *
 * // The setter can be used in other ways, for example:
 * useLayoutEffect( () => {
 * 	setElement( document.querySelector( `data-element-id="${ elementId }"` ) );
 * }, [ elementId ] );
 * ```
 *
 * @param callback The `ResizeObserver` callback - [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver#callback).
 * @param options  Options passed to `ResizeObserver.observe` when called - [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#options). Changes will be ignored.
 */

/**
 * **This is a legacy API and should not be used.**
 *
 * @deprecated Use the other `useResizeObserver` API instead: `const ref = useResizeObserver( ( entries ) => { ... } )`.
 *
 * Hook which allows to listen to the resize event of any target element when it changes size.
 * _Note: `useResizeObserver` will report `null` sizes until after first render.
 *
 * @example
 *
 * ```js
 * const App = () => {
 * 	const [ resizeListener, sizes ] = useResizeObserver();
 *
 * 	return (
 * 		<div>
 * 			{ resizeListener }
 * 			Your content here
 * 		</div>
 * 	);
 * };
 * ```
 */

export default function useResizeObserver(callback, options = {}) {
  return callback ? _useResizeObserver(callback, options) : _useLegacyResizeObserver();
}
//# sourceMappingURL=index.js.map
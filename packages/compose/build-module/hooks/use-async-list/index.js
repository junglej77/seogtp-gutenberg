/**
 * WordPress dependencies
 */
import { flushSync, useEffect, useState } from '@wordpress/element';
import { createQueue } from '@wordpress/priority-queue';
/**
 * Returns the first items from list that are present on state.
 *
 * @param list  New array.
 * @param state Current state.
 * @return First items present iin state.
 */
function getFirstItemsPresentInState(list, state) {
  const firstItems = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!state.includes(item)) {
      break;
    }
    firstItems.push(item);
  }
  return firstItems;
}

/**
 * React hook returns an array which items get asynchronously appended from a source array.
 * This behavior is useful if we want to render a list of items asynchronously for performance reasons.
 *
 * @param list   Source array.
 * @param config Configuration object.
 *
 * @return Async array.
 */
function useAsyncList(list, config = {
  step: 1
}) {
  const {
    step = 1
  } = config;
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    // On reset, we keep the first items that were previously rendered.
    let firstItems = getFirstItemsPresentInState(list, current);
    if (firstItems.length < step) {
      firstItems = firstItems.concat(list.slice(firstItems.length, step));
    }
    setCurrent(firstItems);
    const asyncQueue = createQueue();
    for (let i = firstItems.length; i < list.length; i += step) {
      asyncQueue.add({}, () => {
        flushSync(() => {
          setCurrent(state => [...state, ...list.slice(i, i + step)]);
        });
      });
    }
    return () => asyncQueue.reset();
  }, [list]);
  return current;
}
export default useAsyncList;
//# sourceMappingURL=index.js.map
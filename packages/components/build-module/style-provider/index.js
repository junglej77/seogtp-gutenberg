/**
 * External dependencies
 */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import * as uuid from 'uuid';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
const uuidCache = new Set();
// Use a weak map so that when the container is detached it's automatically
// dereferenced to avoid memory leak.
const containerCacheMap = new WeakMap();
const memoizedCreateCacheWithContainer = container => {
  if (containerCacheMap.has(container)) {
    return containerCacheMap.get(container);
  }

  // Emotion only accepts alphabetical and hyphenated keys so we just
  // strip the numbers from the UUID. It _should_ be fine.
  let key = uuid.v4().replace(/[0-9]/g, '');
  while (uuidCache.has(key)) {
    key = uuid.v4().replace(/[0-9]/g, '');
  }
  uuidCache.add(key);
  const cache = createCache({
    container,
    key
  });
  containerCacheMap.set(container, cache);
  return cache;
};
export function StyleProvider(props) {
  const {
    children,
    document
  } = props;
  if (!document) {
    return null;
  }
  const cache = memoizedCreateCacheWithContainer(document.head);
  return /*#__PURE__*/_jsx(CacheProvider, {
    value: cache,
    children: children
  });
}
export default StyleProvider;
//# sourceMappingURL=index.js.map
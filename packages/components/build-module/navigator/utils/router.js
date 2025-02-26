/**
 * External dependencies
 */
import { match } from 'path-to-regexp';

/**
 * Internal dependencies
 */

function matchPath(path, pattern) {
  const matchingFunction = match(pattern, {
    decode: decodeURIComponent
  });
  return matchingFunction(path);
}
export function patternMatch(path, screens) {
  for (const screen of screens) {
    const matched = matchPath(path, screen.path);
    if (matched) {
      return {
        params: matched.params,
        id: screen.id
      };
    }
  }
  return undefined;
}
export function findParent(path, screens) {
  if (!path.startsWith('/')) {
    return undefined;
  }
  const pathParts = path.split('/');
  let parentPath;
  while (pathParts.length > 1 && parentPath === undefined) {
    pathParts.pop();
    const potentialParentPath = pathParts.join('/') === '' ? '/' : pathParts.join('/');
    if (screens.find(screen => {
      return matchPath(potentialParentPath, screen.path) !== false;
    })) {
      parentPath = potentialParentPath;
    }
  }
  return parentPath;
}
//# sourceMappingURL=router.js.map
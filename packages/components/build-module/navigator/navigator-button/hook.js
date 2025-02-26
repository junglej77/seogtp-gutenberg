/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';
import { escapeAttribute } from '@wordpress/escape-html';

/**
 * Internal dependencies
 */

import { useContextSystem } from '../../context';
import Button from '../../button';
import { useNavigator } from '../use-navigator';
const cssSelectorForAttribute = (attrName, attrValue) => `[${attrName}="${attrValue}"]`;
export function useNavigatorButton(props) {
  const {
    path,
    onClick,
    as = Button,
    attributeName = 'id',
    ...otherProps
  } = useContextSystem(props, 'NavigatorButton');
  const escapedPath = escapeAttribute(path);
  const {
    goTo
  } = useNavigator();
  const handleClick = useCallback(e => {
    e.preventDefault();
    goTo(escapedPath, {
      focusTargetSelector: cssSelectorForAttribute(attributeName, escapedPath)
    });
    onClick?.(e);
  }, [goTo, onClick, attributeName, escapedPath]);
  return {
    as,
    onClick: handleClick,
    ...otherProps,
    [attributeName]: escapedPath
  };
}
//# sourceMappingURL=hook.js.map
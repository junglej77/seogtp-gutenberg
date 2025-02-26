/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { useContextSystem } from '../../context';
import Button from '../../button';
import { useNavigator } from '../use-navigator';
export function useNavigatorBackButton(props) {
  const {
    onClick,
    as = Button,
    ...otherProps
  } = useContextSystem(props, 'NavigatorBackButton');
  const {
    goBack
  } = useNavigator();
  const handleClick = useCallback(e => {
    e.preventDefault();
    goBack();
    onClick?.(e);
  }, [goBack, onClick]);
  return {
    as,
    onClick: handleClick,
    ...otherProps
  };
}
//# sourceMappingURL=hook.js.map
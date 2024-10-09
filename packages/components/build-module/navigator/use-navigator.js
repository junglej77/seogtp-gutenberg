/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { NavigatorContext } from './context';
/**
 * Retrieves a `navigator` instance.
 */
export function useNavigator() {
  const {
    location,
    params,
    goTo,
    goBack,
    goToParent
  } = useContext(NavigatorContext);
  return {
    location,
    goTo,
    goBack,
    goToParent,
    params
  };
}
//# sourceMappingURL=use-navigator.js.map
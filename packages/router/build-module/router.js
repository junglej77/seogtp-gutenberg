/**
 * WordPress dependencies
 */
import { createContext, useContext, useSyncExternalStore } from '@wordpress/element';

/**
 * Internal dependencies
 */
import history from './history';
import { jsx as _jsx } from "react/jsx-runtime";
const RoutesContext = createContext();
const HistoryContext = createContext();
export function useLocation() {
  return useContext(RoutesContext);
}
export function useHistory() {
  return useContext(HistoryContext);
}
export function RouterProvider({
  children
}) {
  const location = useSyncExternalStore(history.listen, history.getLocationWithParams, history.getLocationWithParams);
  return /*#__PURE__*/_jsx(HistoryContext.Provider, {
    value: history,
    children: /*#__PURE__*/_jsx(RoutesContext.Provider, {
      value: location,
      children: children
    })
  });
}
//# sourceMappingURL=router.js.map
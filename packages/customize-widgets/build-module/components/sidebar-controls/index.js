/**
 * WordPress dependencies
 */
import { createContext, useMemo, useContext } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
export const SidebarControlsContext = createContext();
export default function SidebarControls({
  sidebarControls,
  activeSidebarControl,
  children
}) {
  const context = useMemo(() => ({
    sidebarControls,
    activeSidebarControl
  }), [sidebarControls, activeSidebarControl]);
  return /*#__PURE__*/_jsx(SidebarControlsContext.Provider, {
    value: context,
    children: children
  });
}
export function useSidebarControls() {
  const {
    sidebarControls
  } = useContext(SidebarControlsContext);
  return sidebarControls;
}
export function useActiveSidebarControl() {
  const {
    activeSidebarControl
  } = useContext(SidebarControlsContext);
  return activeSidebarControl;
}
//# sourceMappingURL=index.js.map
/**
 * WordPress dependencies
 */
import { useState, useEffect, useRef, createPortal } from '@wordpress/element';
import { SlotFillProvider, Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ErrorBoundary from '../error-boundary';
import SidebarBlockEditor from '../sidebar-block-editor';
import FocusControl from '../focus-control';
import SidebarControls from '../sidebar-controls';
import useClearSelectedBlock from './use-clear-selected-block';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function CustomizeWidgets({
  api,
  sidebarControls,
  blockEditorSettings
}) {
  const [activeSidebarControl, setActiveSidebarControl] = useState(null);
  const parentContainer = document.getElementById('customize-theme-controls');
  const popoverRef = useRef();
  useClearSelectedBlock(activeSidebarControl, popoverRef);
  useEffect(() => {
    const unsubscribers = sidebarControls.map(sidebarControl => sidebarControl.subscribe(expanded => {
      if (expanded) {
        setActiveSidebarControl(sidebarControl);
      }
    }));
    return () => {
      unsubscribers.forEach(unsubscriber => unsubscriber());
    };
  }, [sidebarControls]);
  const activeSidebar = activeSidebarControl && createPortal( /*#__PURE__*/_jsx(ErrorBoundary, {
    children: /*#__PURE__*/_jsx(SidebarBlockEditor, {
      blockEditorSettings: blockEditorSettings,
      sidebar: activeSidebarControl.sidebarAdapter,
      inserter: activeSidebarControl.inserter,
      inspector: activeSidebarControl.inspector
    }, activeSidebarControl.id)
  }), activeSidebarControl.container[0]);

  // We have to portal this to the parent of both the editor and the inspector,
  // so that the popovers will appear above both of them.
  const popover = parentContainer && createPortal( /*#__PURE__*/_jsx("div", {
    className: "customize-widgets-popover",
    ref: popoverRef,
    children: /*#__PURE__*/_jsx(Popover.Slot, {})
  }), parentContainer);
  return /*#__PURE__*/_jsx(SlotFillProvider, {
    children: /*#__PURE__*/_jsx(SidebarControls, {
      sidebarControls: sidebarControls,
      activeSidebarControl: activeSidebarControl,
      children: /*#__PURE__*/_jsxs(FocusControl, {
        api: api,
        sidebarControls: sidebarControls,
        children: [activeSidebar, popover]
      })
    })
  });
}
//# sourceMappingURL=index.js.map
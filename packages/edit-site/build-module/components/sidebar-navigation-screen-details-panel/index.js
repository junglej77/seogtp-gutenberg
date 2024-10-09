/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack, __experimentalHeading as Heading } from '@wordpress/components';

/**
 * Internal dependencies
 */
import SidebarNavigationScreenDetailsPanelLabel from './sidebar-navigation-screen-details-panel-label';
import SidebarNavigationScreenDetailsPanelRow from './sidebar-navigation-screen-details-panel-row';
import SidebarNavigationScreenDetailsPanelValue from './sidebar-navigation-screen-details-panel-value';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function SidebarNavigationScreenDetailsPanel({
  title,
  children,
  spacing
}) {
  return /*#__PURE__*/_jsxs(VStack, {
    className: "edit-site-sidebar-navigation-details-screen-panel",
    spacing: spacing,
    children: [title && /*#__PURE__*/_jsx(Heading, {
      className: "edit-site-sidebar-navigation-details-screen-panel__heading",
      level: 2,
      children: title
    }), children]
  });
}
export { SidebarNavigationScreenDetailsPanel, SidebarNavigationScreenDetailsPanelRow, SidebarNavigationScreenDetailsPanelLabel, SidebarNavigationScreenDetailsPanelValue };
//# sourceMappingURL=index.js.map
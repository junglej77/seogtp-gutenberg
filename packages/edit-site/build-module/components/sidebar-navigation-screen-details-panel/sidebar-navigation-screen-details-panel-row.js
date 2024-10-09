/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
export default function SidebarNavigationScreenDetailsPanelRow({
  label,
  children,
  className,
  ...extraProps
}) {
  return /*#__PURE__*/_jsx(HStack, {
    spacing: 5,
    alignment: "left",
    className: clsx('edit-site-sidebar-navigation-details-screen-panel__row', className),
    ...extraProps,
    children: children
  }, label);
}
//# sourceMappingURL=sidebar-navigation-screen-details-panel-row.js.map
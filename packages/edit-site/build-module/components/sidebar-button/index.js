/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
export default function SidebarButton(props) {
  return /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    ...props,
    className: clsx('edit-site-sidebar-button', props.className)
  });
}
//# sourceMappingURL=index.js.map
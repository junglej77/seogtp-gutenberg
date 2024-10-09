/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
export function IconWithCurrentColor({
  className,
  ...props
}) {
  return /*#__PURE__*/_jsx(Icon, {
    className: clsx(className, 'edit-site-global-styles-icon-with-current-color'),
    ...props
  });
}
//# sourceMappingURL=icon-with-current-color.js.map
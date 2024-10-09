/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Flex } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
function ColorIndicatorWrapper({
  className,
  ...props
}) {
  return /*#__PURE__*/_jsx(Flex, {
    className: clsx('edit-site-global-styles__color-indicator-wrapper', className),
    ...props
  });
}
export default ColorIndicatorWrapper;
//# sourceMappingURL=color-indicator-wrapper.js.map
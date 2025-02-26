/**
 * WordPress dependencies
 */
import { link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../button';
import Tooltip from '../tooltip';
import { jsx as _jsx } from "react/jsx-runtime";
export default function LinkedButton({
  isLinked,
  ...props
}) {
  const label = isLinked ? __('Unlink sides') : __('Link sides');
  return /*#__PURE__*/_jsx(Tooltip, {
    text: label,
    children: /*#__PURE__*/_jsx(Button, {
      ...props,
      className: "component-box-control__linked-button",
      size: "small",
      icon: isLinked ? link : linkOff,
      iconSize: 24,
      "aria-label": label
    })
  });
}
//# sourceMappingURL=linked-button.js.map
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton } from '@wordpress/components';
import { fullscreen } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
function BlockFullHeightAlignmentControl({
  isActive,
  label = __('Toggle full height'),
  onToggle,
  isDisabled
}) {
  return /*#__PURE__*/_jsx(ToolbarButton, {
    isActive: isActive,
    icon: fullscreen,
    label: label,
    onClick: () => onToggle(!isActive),
    disabled: isDisabled
  });
}
export default BlockFullHeightAlignmentControl;
//# sourceMappingURL=index.js.map
/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Fill: ToolsMoreMenuGroup,
  Slot
} = createSlotFill('EditWidgetsToolsMoreMenuGroup');
ToolsMoreMenuGroup.Slot = ({
  fillProps
}) => /*#__PURE__*/_jsx(Slot, {
  fillProps: fillProps,
  children: fills => fills.length > 0 && fills
});
export default ToolsMoreMenuGroup;
//# sourceMappingURL=tools-more-menu-group.js.map
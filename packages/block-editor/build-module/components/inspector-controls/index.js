/**
 * Internal dependencies
 */
import InspectorControlsFill from './fill';
import InspectorControlsSlot from './slot';
import { jsx as _jsx } from "react/jsx-runtime";
const InspectorControls = InspectorControlsFill;
InspectorControls.Slot = InspectorControlsSlot;

// This is just here for backward compatibility.
export const InspectorAdvancedControls = props => {
  return /*#__PURE__*/_jsx(InspectorControlsFill, {
    ...props,
    group: "advanced"
  });
};
InspectorAdvancedControls.Slot = props => {
  return /*#__PURE__*/_jsx(InspectorControlsSlot, {
    ...props,
    group: "advanced"
  });
};
InspectorAdvancedControls.slotName = 'InspectorAdvancedControls';
export default InspectorControls;
//# sourceMappingURL=index.js.map
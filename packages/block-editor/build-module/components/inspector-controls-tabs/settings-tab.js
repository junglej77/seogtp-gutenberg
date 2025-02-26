/**
 * Internal dependencies
 */
import AdvancedControls from './advanced-controls-panel';
import PositionControls from './position-controls-panel';
import { default as InspectorControls } from '../inspector-controls';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const SettingsTab = ({
  showAdvancedControls = false
}) => /*#__PURE__*/_jsxs(_Fragment, {
  children: [/*#__PURE__*/_jsx(InspectorControls.Slot, {}), /*#__PURE__*/_jsx(PositionControls, {}), /*#__PURE__*/_jsx(InspectorControls.Slot, {
    group: "bindings"
  }), showAdvancedControls && /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(AdvancedControls, {})
  })]
});
export default SettingsTab;
//# sourceMappingURL=settings-tab.js.map
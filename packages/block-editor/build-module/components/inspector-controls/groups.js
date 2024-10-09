/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
const InspectorControlsDefault = createSlotFill('InspectorControls');
const InspectorControlsBindings = createSlotFill('InspectorControlsBindings');
const InspectorControlsBackground = createSlotFill('InspectorControlsBackground');
const InspectorControlsBorder = createSlotFill('InspectorControlsBorder');
const InspectorControlsColor = createSlotFill('InspectorControlsColor');
const InspectorControlsFilter = createSlotFill('InspectorControlsFilter');
const InspectorControlsDimensions = createSlotFill('InspectorControlsDimensions');
const InspectorControlsPosition = createSlotFill('InspectorControlsPosition');
const InspectorControlsTypography = createSlotFill('InspectorControlsTypography');
const InspectorControlsListView = createSlotFill('InspectorControlsListView');
const InspectorControlsLayout = createSlotFill('InspectorControlsLayout');
const InspectorControlsStyles = createSlotFill('InspectorControlsStyles');
const InspectorControlsAdvanced = createSlotFill('InspectorControlsAdvanced');
const InspectorControlsEffects = createSlotFill('InspectorControlsEffects');
const groups = {
  default: InspectorControlsDefault,
  background: InspectorControlsBackground,
  bindings: InspectorControlsBindings,
  border: InspectorControlsBorder,
  color: InspectorControlsColor,
  dimensions: InspectorControlsDimensions,
  effects: InspectorControlsEffects,
  filter: InspectorControlsFilter,
  list: InspectorControlsListView,
  position: InspectorControlsPosition,
  settings: InspectorControlsDefault,
  // Alias for default.
  layout: InspectorControlsLayout,
  styles: InspectorControlsStyles,
  advanced: InspectorControlsAdvanced,
  typography: InspectorControlsTypography
};
export default groups;
//# sourceMappingURL=groups.js.map
/**
 * WordPress dependencies
 */
import { __experimentalUseSlotFills as useSlotFills } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import InspectorControlsGroups from '../inspector-controls/groups';
import useIsListViewTabDisabled from './use-is-list-view-tab-disabled';
import { TAB_LIST_VIEW, TAB_LAYOUT, TAB_STYLES, TAB_ADVANCED } from './utils';
import { store as blockEditorStore } from '../../store';
const EMPTY_ARRAY = [];
function getShowTabs(blockName, tabSettings = {}) {
  // Block specific setting takes precedence over generic default.
  if (tabSettings[blockName] !== undefined) {
    return tabSettings[blockName];
  }

  // Use generic default if set over the Gutenberg experiment option.
  if (tabSettings.default !== undefined) {
    return tabSettings.default;
  }
  return true;
}
export default function useInspectorControlsTabs(blockName) {
  const tabs = [];
  const {
    bindings: bindingsGroup,
    border: borderGroup,
    color: colorGroup,
    dimensions: dimensionsGroup,
    list: listGroup,
    styles: stylesGroup,
    typography: typographyGroup,
    effects: effectsGroup,
    position: positionGroup
  } = InspectorControlsGroups;

  // List View Tab: If there are any fills for the list group add that tab.
  const listViewDisabled = useIsListViewTabDisabled(blockName);
  const listFills = useSlotFills(listGroup.Slot.__unstableName);
  const hasListFills = !listViewDisabled && !!listFills && listFills.length;
  const layoutFills = [...(useSlotFills(dimensionsGroup.Slot.__unstableName) || [])];
  const hasLayoutFills = layoutFills.length;
  const styleFills = [...(useSlotFills(borderGroup.Slot.__unstableName) || []), ...(useSlotFills(colorGroup.Slot.__unstableName) || []), ...(useSlotFills(stylesGroup.Slot.__unstableName) || []), ...(useSlotFills(typographyGroup.Slot.__unstableName) || []), ...(useSlotFills(effectsGroup.Slot.__unstableName) || []), ...(useSlotFills(bindingsGroup.Slot.__unstableName) || [])];
  const hasStyleFills = styleFills.length;
  const advancedFills = [...(useSlotFills(positionGroup.Slot.__unstableName) || [])];
  const hasAdvancedFills = advancedFills.length;

  // Add the tabs in the order that they will default to if available.
  if (hasListFills) {
    tabs.push(TAB_LIST_VIEW);
  }
  if (hasLayoutFills) {
    tabs.push(TAB_LAYOUT);
  }
  if (hasStyleFills) {
    tabs.push(TAB_STYLES);
  }
  if (hasAdvancedFills) {
    tabs.push(TAB_ADVANCED);
  }
  const tabSettings = useSelect(select => {
    return select(blockEditorStore).getSettings().blockInspectorTabs;
  }, []);
  const showTabs = getShowTabs(blockName, tabSettings);
  return showTabs ? tabs : EMPTY_ARRAY;
}
//# sourceMappingURL=use-inspector-controls-tabs.js.map
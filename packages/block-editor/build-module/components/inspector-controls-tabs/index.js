/**
 * WordPress dependencies
 */
import { Button, privateApis as componentsPrivateApis } from '@wordpress/components';
import { store as preferencesStore } from '@wordpress/preferences';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { TAB_LAYOUT, TAB_STYLES, TAB_ADVANCED, TAB_LIST_VIEW } from './utils';
import LayoutTab from './seogtp-layout-tab';
import StylesTab from './seogtp-style-tab';
import AdvancedTab from './seogtp-advanced-tab';
import InspectorControls from '../inspector-controls';
import useIsListViewTabDisabled from './use-is-list-view-tab-disabled';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Tabs
} = unlock(componentsPrivateApis);
export default function InspectorControlsTabs({
  blockName,
  clientId,
  hasBlockStyles,
  tabs
}) {
  const showIconLabels = useSelect(select => {
    return select(preferencesStore).get('core', 'showIconLabels');
  }, []);

  // 选项卡面板会在列表视图的填充内容渲染之前挂载。这意味着列表视图选项卡最初不会包含在可用选项卡中，
  // 所以面板默认选择设置选项卡，这在当时是第一个选项卡。
  // 此检查允许已知包含列表视图选项卡的块将其设置为默认选中的选项卡。
  const initialTabName = !useIsListViewTabDisabled(blockName) ? TAB_LIST_VIEW.name : undefined;
  return /*#__PURE__*/_jsx("div", {
    className: "block-editor-block-inspector__tabs",
    children: /*#__PURE__*/_jsxs(Tabs, {
      defaultTabId: initialTabName,
      children: [/*#__PURE__*/_jsx(Tabs.TabList, {
        children: tabs.map(tab => /*#__PURE__*/_jsx(Tabs.Tab, {
          tabId: tab.name,
          render: /*#__PURE__*/_jsx(Button
          // TODO: Switch to `true` (40px size) if possible
          , {
            __next40pxDefaultSize: false,
            icon: !showIconLabels ? tab.icon : undefined,
            label: !showIconLabels ? tab.title : undefined,
            className: tab.className,
            children: showIconLabels && tab.title
          })
        }, tab.name))
      }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
        tabId: TAB_LAYOUT.name,
        focusable: false,
        children: /*#__PURE__*/_jsx(LayoutTab, {
          blockName: blockName,
          clientId: clientId
        })
      }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
        tabId: TAB_STYLES.name,
        focusable: false,
        children: /*#__PURE__*/_jsx(StylesTab, {
          blockName: blockName,
          clientId: clientId,
          hasBlockStyles: hasBlockStyles
        })
      }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
        tabId: TAB_ADVANCED.name,
        focusable: false,
        children: /*#__PURE__*/_jsx(AdvancedTab, {
          blockName: blockName,
          clientId: clientId
        })
      }), /*#__PURE__*/_jsx(Tabs.TabPanel, {
        tabId: TAB_LIST_VIEW.name,
        focusable: false,
        children: /*#__PURE__*/_jsx(InspectorControls.Slot, {
          group: "list"
        })
      })]
    }, clientId)
  });
}
//# sourceMappingURL=index.js.map
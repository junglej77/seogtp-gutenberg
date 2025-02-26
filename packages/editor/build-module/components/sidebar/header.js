/**
 * WordPress dependencies
 */
import { privateApis as componentsPrivateApis } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { sidebars } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Tabs
} = unlock(componentsPrivateApis);
const SidebarHeader = (_, ref) => {
  const {
    documentLabel
  } = useSelect(select => {
    const {
      getPostTypeLabel
    } = select(editorStore);
    return {
      // translators: Default label for the Document sidebar tab, not selected.
      documentLabel: getPostTypeLabel() || _x('Document', 'noun')
    };
  }, []);
  return /*#__PURE__*/_jsxs(Tabs.TabList, {
    ref: ref,
    children: [/*#__PURE__*/_jsx(Tabs.Tab, {
      tabId: sidebars.document
      // Used for focus management in the SettingsSidebar component.
      ,
      "data-tab-id": sidebars.document,
      children: documentLabel
    }), /*#__PURE__*/_jsx(Tabs.Tab, {
      tabId: sidebars.block
      // Used for focus management in the SettingsSidebar component.
      ,
      "data-tab-id": sidebars.block,
      children: __('Block')
    })]
  });
};
export default forwardRef(SidebarHeader);
//# sourceMappingURL=header.js.map
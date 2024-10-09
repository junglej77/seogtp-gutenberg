/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import SiteExport from './site-export';
import WelcomeGuideMenuItem from './welcome-guide-menu-item';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  ToolsMoreMenuGroup,
  PreferencesModal
} = unlock(editorPrivateApis);
export default function MoreMenu() {
  const isBlockBasedTheme = useSelect(select => {
    return select(coreStore).getCurrentTheme().is_block_theme;
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(ToolsMoreMenuGroup, {
      children: [isBlockBasedTheme && /*#__PURE__*/_jsx(SiteExport, {}), /*#__PURE__*/_jsx(WelcomeGuideMenuItem, {})]
    }), /*#__PURE__*/_jsx(PreferencesModal, {})]
  });
}
//# sourceMappingURL=index.js.map
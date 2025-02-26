/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { privateApis as editorPrivateApis } from '@wordpress/editor';
import { PreferenceToggleMenuItem } from '@wordpress/preferences';
import { displayShortcut } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import ManagePatternsMenuItem from './manage-patterns-menu-item';
import WelcomeGuideMenuItem from './welcome-guide-menu-item';
import EditPostPreferencesModal from '../preferences-modal';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  ToolsMoreMenuGroup,
  ViewMoreMenuGroup
} = unlock(editorPrivateApis);
const MoreMenu = () => {
  const isLargeViewport = useViewportMatch('large');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isLargeViewport && /*#__PURE__*/_jsx(ViewMoreMenuGroup, {
      children: /*#__PURE__*/_jsx(PreferenceToggleMenuItem, {
        scope: "core/edit-post",
        name: "fullscreenMode",
        label: __('Fullscreen mode'),
        info: __('Show and hide the admin user interface'),
        messageActivated: __('Fullscreen mode activated'),
        messageDeactivated: __('Fullscreen mode deactivated'),
        shortcut: displayShortcut.secondary('f')
      })
    }), /*#__PURE__*/_jsxs(ToolsMoreMenuGroup, {
      children: [/*#__PURE__*/_jsx(ManagePatternsMenuItem, {}), /*#__PURE__*/_jsx(WelcomeGuideMenuItem, {})]
    }), /*#__PURE__*/_jsx(EditPostPreferencesModal, {})]
  });
};
export default MoreMenu;
//# sourceMappingURL=index.js.map
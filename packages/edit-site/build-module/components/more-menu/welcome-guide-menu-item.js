/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { MenuItem } from '@wordpress/components';
import { store as preferencesStore } from '@wordpress/preferences';
import { jsx as _jsx } from "react/jsx-runtime";
export default function WelcomeGuideMenuItem() {
  const {
    toggle
  } = useDispatch(preferencesStore);
  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: () => toggle('core/edit-site', 'welcomeGuide'),
    children: __('Welcome Guide')
  });
}
//# sourceMappingURL=welcome-guide-menu-item.js.map
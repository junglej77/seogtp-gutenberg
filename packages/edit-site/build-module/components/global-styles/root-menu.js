/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import { typography, color, layout, shadow as shadowIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { NavigationButtonAsItem } from './navigation-button';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useHasDimensionsPanel,
  useHasTypographyPanel,
  useHasColorPanel,
  useGlobalSetting,
  useSettingsForBlockElement
} = unlock(blockEditorPrivateApis);
function RootMenu() {
  const [rawSettings] = useGlobalSetting('');
  const settings = useSettingsForBlockElement(rawSettings);
  const hasTypographyPanel = useHasTypographyPanel(settings);
  const hasColorPanel = useHasColorPanel(settings);
  const hasShadowPanel = true; // useHasShadowPanel( settings );
  const hasDimensionsPanel = useHasDimensionsPanel(settings);
  const hasLayoutPanel = hasDimensionsPanel;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(ItemGroup, {
      children: [hasTypographyPanel && /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        icon: typography,
        path: "/typography",
        "aria-label": __('Typography styles'),
        children: __('Typography')
      }), hasColorPanel && /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        icon: color,
        path: "/colors",
        "aria-label": __('Colors styles'),
        children: __('Colors')
      }), hasShadowPanel && /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        icon: shadowIcon,
        path: "/shadows",
        "aria-label": __('Shadow styles'),
        children: __('Shadows')
      }), hasLayoutPanel && /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        icon: layout,
        path: "/layout",
        "aria-label": __('Layout styles'),
        children: __('Layout')
      })]
    })
  });
}
export default RootMenu;
//# sourceMappingURL=root-menu.js.map
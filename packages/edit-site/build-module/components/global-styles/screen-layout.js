/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import DimensionsPanel from './dimensions-panel';
import BackgroundPanel from './background-panel';
import ScreenHeader from './header';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useHasBackgroundPanel,
  useHasDimensionsPanel,
  useGlobalSetting,
  useSettingsForBlockElement
} = unlock(blockEditorPrivateApis);
function ScreenLayout() {
  const [rawSettings] = useGlobalSetting('');
  const settings = useSettingsForBlockElement(rawSettings);
  const hasDimensionsPanel = useHasDimensionsPanel(settings);
  /*
   * Use the raw settings to determine if the background panel should be displayed,
   * as the background panel is not dependent on the block element settings.
   */
  const hasBackgroundPanel = useHasBackgroundPanel(rawSettings);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Layout')
    }), hasDimensionsPanel && /*#__PURE__*/_jsx(DimensionsPanel, {}), hasBackgroundPanel && /*#__PURE__*/_jsx(BackgroundPanel, {})]
  });
}
export default ScreenLayout;
//# sourceMappingURL=screen-layout.js.map
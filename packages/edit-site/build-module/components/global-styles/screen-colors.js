/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalVStack as VStack } from '@wordpress/components';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import ScreenHeader from './header';
import Palette from './palette';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useGlobalStyle,
  useGlobalSetting,
  useSettingsForBlockElement,
  ColorPanel: StylesColorPanel
} = unlock(blockEditorPrivateApis);
function ScreenColors() {
  const [style] = useGlobalStyle('', undefined, 'user', {
    shouldDecodeEncode: false
  });
  const [inheritedStyle, setStyle] = useGlobalStyle('', undefined, 'all', {
    shouldDecodeEncode: false
  });
  const [rawSettings] = useGlobalSetting('');
  const settings = useSettingsForBlockElement(rawSettings);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ScreenHeader, {
      title: __('Colors'),
      description: __('Palette colors and the application of those colors on site elements.')
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-site-global-styles-screen",
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 7,
        children: [/*#__PURE__*/_jsx(Palette, {}), /*#__PURE__*/_jsx(StylesColorPanel, {
          inheritedValue: inheritedStyle,
          value: style,
          onChange: setStyle,
          settings: settings
        })]
      })
    })]
  });
}
export default ScreenColors;
//# sourceMappingURL=screen-colors.js.map
/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { __experimentalPaletteEdit as PaletteEdit, __experimentalVStack as VStack } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import ColorVariations from './variations/variations-color';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
const mobilePopoverProps = {
  placement: 'bottom-start',
  offset: 8
};
export default function ColorPalettePanel({
  name
}) {
  const [themeColors, setThemeColors] = useGlobalSetting('color.palette.theme', name);
  const [baseThemeColors] = useGlobalSetting('color.palette.theme', name, 'base');
  const [defaultColors, setDefaultColors] = useGlobalSetting('color.palette.default', name);
  const [baseDefaultColors] = useGlobalSetting('color.palette.default', name, 'base');
  const [customColors, setCustomColors] = useGlobalSetting('color.palette.custom', name);
  const [defaultPaletteEnabled] = useGlobalSetting('color.defaultPalette', name);
  const isMobileViewport = useViewportMatch('small', '<');
  const popoverProps = isMobileViewport ? mobilePopoverProps : undefined;
  return /*#__PURE__*/_jsxs(VStack, {
    className: "edit-site-global-styles-color-palette-panel",
    spacing: 8,
    children: [!!themeColors && !!themeColors.length && /*#__PURE__*/_jsx(PaletteEdit, {
      canReset: themeColors !== baseThemeColors
      // canOnlyChangeValues
      ,
      colors: themeColors,
      onChange: setThemeColors,
      paletteLabel: __('Theme'),
      paletteLabelHeadingLevel: 3,
      popoverProps: popoverProps
    }), !!defaultColors && !!defaultColors.length && !!defaultPaletteEnabled && /*#__PURE__*/_jsx(PaletteEdit, {
      canReset: defaultColors !== baseDefaultColors
      // canOnlyChangeValues
      ,
      colors: defaultColors,
      onChange: setDefaultColors,
      paletteLabel: __('Default'),
      paletteLabelHeadingLevel: 3,
      popoverProps: popoverProps
    }), /*#__PURE__*/_jsx(ColorVariations, {
      title: __('Palettes')
    })]
  });
}
//# sourceMappingURL=color-palette-panel.js.map
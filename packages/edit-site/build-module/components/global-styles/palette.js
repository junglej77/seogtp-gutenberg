/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup, FlexItem, __experimentalHStack as HStack, __experimentalZStack as ZStack, __experimentalVStack as VStack, ColorIndicator, Button } from '@wordpress/components';
import { isRTL, __ } from '@wordpress/i18n';
import { Icon, shuffle, chevronLeft, chevronRight } from '@wordpress/icons';
import { useMemo } from '@wordpress/element';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Subtitle from './subtitle';
import { NavigationButtonAsItem } from './navigation-button';
import { useColorRandomizer } from './hooks';
import ColorIndicatorWrapper from './color-indicator-wrapper';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
const EMPTY_COLORS = [];
function Palette({
  name
}) {
  const [customColors] = useGlobalSetting('color.palette.custom');
  const [themeColors] = useGlobalSetting('color.palette.theme');
  const [defaultColors] = useGlobalSetting('color.palette.default');
  const [defaultPaletteEnabled] = useGlobalSetting('color.defaultPalette', name);
  const [randomizeThemeColors] = useColorRandomizer();
  const colors = useMemo(() => [...(customColors || EMPTY_COLORS), ...(themeColors || EMPTY_COLORS), ...(defaultColors && defaultPaletteEnabled ? defaultColors : EMPTY_COLORS)], [customColors, themeColors, defaultColors, defaultPaletteEnabled]);
  const screenPath = !name ? '/colors/palette' : '/blocks/' + encodeURIComponent(name) + '/colors/palette';
  const paletteButtonText = colors.length > 0 ? __('Edit palette') : __('Add colors');
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 3,
    children: [/*#__PURE__*/_jsx(Subtitle, {
      level: 3,
      children: __('Palette')
    }), /*#__PURE__*/_jsx(ItemGroup, {
      isBordered: true,
      isSeparated: true,
      children: /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        path: screenPath,
        "aria-label": paletteButtonText,
        children: /*#__PURE__*/_jsxs(HStack, {
          direction: "row",
          children: [colors.length <= 0 && /*#__PURE__*/_jsx(FlexItem, {
            children: __('Add colors')
          }), /*#__PURE__*/_jsx(ZStack, {
            isLayered: false,
            offset: -8,
            children: colors.slice(0, 5).map(({
              color
            }, index) => /*#__PURE__*/_jsx(ColorIndicatorWrapper, {
              children: /*#__PURE__*/_jsx(ColorIndicator, {
                colorValue: color
              })
            }, `${color}-${index}`))
          }), /*#__PURE__*/_jsx(Icon, {
            icon: isRTL() ? chevronLeft : chevronRight
          })]
        })
      })
    }), window.__experimentalEnableColorRandomizer && themeColors?.length > 0 && /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      variant: "secondary",
      icon: shuffle,
      onClick: randomizeThemeColors,
      children: __('Randomize colors')
    })]
  });
}
export default Palette;
//# sourceMappingURL=palette.js.map
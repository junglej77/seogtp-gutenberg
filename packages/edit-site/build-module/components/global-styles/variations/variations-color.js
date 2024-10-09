/**
 * WordPress dependencies
 */
import { __experimentalGrid as Grid, __experimentalVStack as VStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import StylesPreviewColors from '../preview-colors';
import { useCurrentMergeThemeStyleVariationsWithUserConfig } from '../../../hooks/use-theme-style-variations/use-theme-style-variations-by-property';
import Subtitle from '../subtitle';
import Variation from './variation';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ColorVariations({
  title,
  gap = 2
}) {
  const propertiesToFilter = ['color'];
  const colorVariations = useCurrentMergeThemeStyleVariationsWithUserConfig(propertiesToFilter);

  // Return null if there is only one variation (the default).
  if (colorVariations?.length <= 1) {
    return null;
  }
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 3,
    children: [title && /*#__PURE__*/_jsx(Subtitle, {
      level: 3,
      children: title
    }), /*#__PURE__*/_jsx(Grid, {
      spacing: gap,
      children: colorVariations.map((variation, index) => /*#__PURE__*/_jsx(Variation, {
        variation: variation,
        isPill: true,
        properties: propertiesToFilter,
        showTooltip: true,
        children: () => /*#__PURE__*/_jsx(StylesPreviewColors, {})
      }, index))
    })]
  });
}
//# sourceMappingURL=variations-color.js.map
/**
 * WordPress dependencies
 */
import { __experimentalGrid as Grid, __experimentalVStack as VStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import StylesPreviewTypography from '../preview-typography';
import { useCurrentMergeThemeStyleVariationsWithUserConfig } from '../../../hooks/use-theme-style-variations/use-theme-style-variations-by-property';
import Subtitle from '../subtitle';
import Variation from './variation';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TypographyVariations({
  title,
  gap = 2
}) {
  const propertiesToFilter = ['typography'];
  const typographyVariations = useCurrentMergeThemeStyleVariationsWithUserConfig(propertiesToFilter);

  // Return null if there is only one variation (the default).
  if (typographyVariations?.length <= 1) {
    return null;
  }
  return /*#__PURE__*/_jsxs(VStack, {
    spacing: 3,
    children: [title && /*#__PURE__*/_jsx(Subtitle, {
      level: 3,
      children: title
    }), /*#__PURE__*/_jsx(Grid, {
      columns: 3,
      gap: gap,
      className: "edit-site-global-styles-style-variations-container",
      children: typographyVariations.map((variation, index) => {
        return /*#__PURE__*/_jsx(Variation, {
          variation: variation,
          properties: propertiesToFilter,
          showTooltip: true,
          children: () => /*#__PURE__*/_jsx(StylesPreviewTypography, {
            variation: variation
          })
        }, index);
      })
    })]
  });
}
//# sourceMappingURL=variations-typography.js.map
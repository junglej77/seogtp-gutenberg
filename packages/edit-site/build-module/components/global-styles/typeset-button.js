/**
 * WordPress dependencies
 */
import { isRTL, __ } from '@wordpress/i18n';
import { __experimentalItemGroup as ItemGroup, __experimentalVStack as VStack, __experimentalHStack as HStack, FlexItem } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { privateApis as editorPrivateApis } from '@wordpress/editor';
import { useMemo, useContext } from '@wordpress/element';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import FontLibraryProvider from './font-library-modal/context';
import { getFontFamilies } from './utils';
import { NavigationButtonAsItem } from './navigation-button';
import Subtitle from './subtitle';
import { unlock } from '../../lock-unlock';
import { filterObjectByProperties, useCurrentMergeThemeStyleVariationsWithUserConfig } from '../../hooks/use-theme-style-variations/use-theme-style-variations-by-property';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  GlobalStylesContext
} = unlock(blockEditorPrivateApis);
const {
  mergeBaseAndUserConfigs
} = unlock(editorPrivateApis);
function TypesetButton() {
  const propertiesToFilter = ['typography'];
  const typographyVariations = useCurrentMergeThemeStyleVariationsWithUserConfig(propertiesToFilter);
  const hasTypographyVariations = typographyVariations?.length > 1;
  const {
    base,
    user: userConfig
  } = useContext(GlobalStylesContext);
  const config = mergeBaseAndUserConfigs(base, userConfig);
  const allFontFamilies = getFontFamilies(config);
  const hasFonts = allFontFamilies.filter(font => font !== null).length > 0;
  const variations = useSelect(select => {
    return select(coreStore).__experimentalGetCurrentThemeGlobalStylesVariations();
  }, []);
  const userTypographyConfig = filterObjectByProperties(userConfig, 'typography');
  const title = useMemo(() => {
    if (Object.keys(userTypographyConfig).length === 0) {
      return __('Default');
    }
    const activeVariation = variations?.find(variation => {
      return JSON.stringify(filterObjectByProperties(variation, 'typography')) === JSON.stringify(userTypographyConfig);
    });
    if (activeVariation) {
      return activeVariation.title;
    }
    return allFontFamilies.map(font => font?.name).join(', ');
  }, [allFontFamilies, userTypographyConfig, variations]);
  return hasTypographyVariations && hasFonts && /*#__PURE__*/_jsxs(VStack, {
    spacing: 2,
    children: [/*#__PURE__*/_jsx(HStack, {
      justify: "space-between",
      children: /*#__PURE__*/_jsx(Subtitle, {
        level: 3,
        children: __('Typeset')
      })
    }), /*#__PURE__*/_jsx(ItemGroup, {
      isBordered: true,
      isSeparated: true,
      children: /*#__PURE__*/_jsx(NavigationButtonAsItem, {
        path: "/typography/typeset",
        "aria-label": __('Typeset'),
        children: /*#__PURE__*/_jsxs(HStack, {
          direction: "row",
          children: [/*#__PURE__*/_jsx(FlexItem, {
            children: title
          }), /*#__PURE__*/_jsx(Icon, {
            icon: isRTL() ? chevronLeft : chevronRight
          })]
        })
      })
    })]
  });
}
export default (({
  ...props
}) => /*#__PURE__*/_jsx(FontLibraryProvider, {
  children: /*#__PURE__*/_jsx(TypesetButton, {
    ...props
  })
}));
//# sourceMappingURL=typeset-button.js.map
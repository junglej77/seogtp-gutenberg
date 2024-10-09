/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { __experimentalText as Text, __experimentalItemGroup as ItemGroup, __experimentalVStack as VStack, Button } from '@wordpress/components';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import FontLibraryProvider, { FontLibraryContext } from './font-library-modal/context';
import FontLibraryModal from './font-library-modal';
import FontFamilyItem from './font-family-item';
import Subtitle from './subtitle';
import { setUIValuesNeeded } from './font-library-modal/utils';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useGlobalSetting
} = unlock(blockEditorPrivateApis);
function FontFamilies() {
  const {
    baseCustomFonts,
    modalTabOpen,
    setModalTabOpen
  } = useContext(FontLibraryContext);
  const [fontFamilies] = useGlobalSetting('typography.fontFamilies');
  const [baseFontFamilies] = useGlobalSetting('typography.fontFamilies', undefined, 'base');
  const themeFonts = fontFamilies?.theme ? fontFamilies.theme.map(f => setUIValuesNeeded(f, {
    source: 'theme'
  })).sort((a, b) => a.name.localeCompare(b.name)) : [];
  const customFonts = fontFamilies?.custom ? fontFamilies.custom.map(f => setUIValuesNeeded(f, {
    source: 'custom'
  })).sort((a, b) => a.name.localeCompare(b.name)) : [];
  const hasFonts = 0 < customFonts.length || 0 < themeFonts.length;
  const hasInstalledFonts = hasFonts || baseFontFamilies?.theme?.length > 0 || baseCustomFonts?.length > 0;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!!modalTabOpen && /*#__PURE__*/_jsx(FontLibraryModal, {
      onRequestClose: () => setModalTabOpen(null),
      defaultTabId: modalTabOpen
    }), /*#__PURE__*/_jsxs(VStack, {
      spacing: 4,
      children: [themeFonts.length > 0 && /*#__PURE__*/_jsxs(VStack, {
        children: [/*#__PURE__*/_jsx(Subtitle, {
          level: 3,
          children: /* translators: Heading for a list of fonts provided by the theme. */
          _x('Theme', 'font source')
        }), /*#__PURE__*/_jsx(ItemGroup, {
          size: "large",
          isBordered: true,
          isSeparated: true,
          children: themeFonts.map(font => /*#__PURE__*/_jsx(FontFamilyItem, {
            font: font
          }, font.slug))
        })]
      }), customFonts.length > 0 && /*#__PURE__*/_jsxs(VStack, {
        children: [/*#__PURE__*/_jsx(Subtitle, {
          level: 3,
          children: /* translators: Heading for a list of fonts installed by the user. */
          _x('Custom', 'font source')
        }), /*#__PURE__*/_jsx(ItemGroup, {
          size: "large",
          isBordered: true,
          isSeparated: true,
          children: customFonts.map(font => /*#__PURE__*/_jsx(FontFamilyItem, {
            font: font
          }, font.slug))
        })]
      }), !hasFonts && /*#__PURE__*/_jsxs(VStack, {
        children: [/*#__PURE__*/_jsx(Subtitle, {
          level: 3,
          children: __('Fonts')
        }), /*#__PURE__*/_jsx(Text, {
          as: "p",
          children: hasInstalledFonts ? __('No fonts activated.') : __('No fonts installed.')
        })]
      }), /*#__PURE__*/_jsx(Button, {
        className: "edit-site-global-styles-font-families__manage-fonts",
        variant: "secondary",
        __next40pxDefaultSize: true,
        onClick: () => {
          setModalTabOpen(hasInstalledFonts ? 'installed-fonts' : 'upload-fonts');
        },
        children: hasInstalledFonts ? __('Manage fonts') : __('Add fonts')
      })]
    })]
  });
}
export default (({
  ...props
}) => /*#__PURE__*/_jsx(FontLibraryProvider, {
  children: /*#__PURE__*/_jsx(FontFamilies, {
    ...props
  })
}));
//# sourceMappingURL=font-families.js.map
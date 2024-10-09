/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalItemGroup as ItemGroup, __experimentalVStack as VStack, __experimentalHStack as HStack } from '@wordpress/components';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { privateApis as editorPrivateApis } from '@wordpress/editor';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import FontLibraryProvider, { FontLibraryContext } from './font-library-modal/context';
import FontLibraryModal from './font-library-modal';
import FontFamilyItem from './font-family-item';
import Subtitle from './subtitle';
import { getFontFamilies } from './utils';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  GlobalStylesContext
} = unlock(blockEditorPrivateApis);
const {
  mergeBaseAndUserConfigs
} = unlock(editorPrivateApis);
function Typesets() {
  const {
    modalTabOpen,
    setModalTabOpen
  } = useContext(FontLibraryContext);
  const {
    base
  } = useContext(GlobalStylesContext);
  const {
    user: userConfig
  } = useContext(GlobalStylesContext);
  const config = mergeBaseAndUserConfigs(base, userConfig);
  const allFontFamilies = getFontFamilies(config);
  const hasFonts = allFontFamilies.filter(font => font !== null).length > 0;
  return hasFonts && /*#__PURE__*/_jsxs(_Fragment, {
    children: [!!modalTabOpen && /*#__PURE__*/_jsx(FontLibraryModal, {
      onRequestClose: () => setModalTabOpen(null),
      defaultTabId: modalTabOpen
    }), /*#__PURE__*/_jsxs(VStack, {
      spacing: 2,
      children: [/*#__PURE__*/_jsx(HStack, {
        justify: "space-between",
        children: /*#__PURE__*/_jsx(Subtitle, {
          level: 3,
          children: __('Fonts')
        })
      }), /*#__PURE__*/_jsx(ItemGroup, {
        isBordered: true,
        isSeparated: true,
        children: allFontFamilies.map(font => font && /*#__PURE__*/_jsx(FontFamilyItem, {
          font: font
        }, font.slug))
      })]
    })]
  });
}
export default (({
  ...props
}) => /*#__PURE__*/_jsx(FontLibraryProvider, {
  children: /*#__PURE__*/_jsx(Typesets, {
    ...props
  })
}));
//# sourceMappingURL=typeset.js.map
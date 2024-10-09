/**
 * WordPress dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import { __experimentalHStack as HStack, __experimentalItem as Item, FlexItem } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { FontLibraryContext } from './font-library-modal/context';
import { getFamilyPreviewStyle } from './font-library-modal/utils/preview-styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function FontFamilyItem({
  font
}) {
  const {
    handleSetLibraryFontSelected,
    setModalTabOpen
  } = useContext(FontLibraryContext);
  const variantsCount = font?.fontFace?.length || 1;
  const handleClick = () => {
    handleSetLibraryFontSelected(font);
    setModalTabOpen('installed-fonts');
  };
  const previewStyle = getFamilyPreviewStyle(font);
  return /*#__PURE__*/_jsx(Item, {
    onClick: handleClick,
    children: /*#__PURE__*/_jsxs(HStack, {
      justify: "space-between",
      children: [/*#__PURE__*/_jsx(FlexItem, {
        style: previewStyle,
        children: font.name
      }), /*#__PURE__*/_jsx(FlexItem, {
        className: "edit-site-global-styles-screen-typography__font-variants-count",
        children: sprintf( /* translators: %d: Number of font variants. */
        _n('%d variant', '%d variants', variantsCount), variantsCount)
      })]
    })
  });
}
export default FontFamilyItem;
//# sourceMappingURL=font-family-item.js.map
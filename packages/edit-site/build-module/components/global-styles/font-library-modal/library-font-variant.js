/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';
import { CheckboxControl, Flex, privateApis as componentsPrivateApis } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getFontFaceVariantName } from './utils';
import { FontLibraryContext } from './context';
import FontDemo from './font-demo';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  kebabCase
} = unlock(componentsPrivateApis);
function LibraryFontVariant({
  face,
  font
}) {
  const {
    isFontActivated,
    toggleActivateFont
  } = useContext(FontLibraryContext);
  const isInstalled = font?.fontFace?.length > 0 ? isFontActivated(font.slug, face.fontStyle, face.fontWeight, font.source) : isFontActivated(font.slug, null, null, font.source);
  const handleToggleActivation = () => {
    if (font?.fontFace?.length > 0) {
      toggleActivateFont(font, face);
      return;
    }
    toggleActivateFont(font);
  };
  const displayName = font.name + ' ' + getFontFaceVariantName(face);
  const checkboxId = kebabCase(`${font.slug}-${getFontFaceVariantName(face)}`);
  return /*#__PURE__*/_jsx("div", {
    className: "font-library-modal__font-card",
    children: /*#__PURE__*/_jsxs(Flex, {
      justify: "flex-start",
      align: "center",
      gap: "1rem",
      children: [/*#__PURE__*/_jsx(CheckboxControl, {
        checked: isInstalled,
        onChange: handleToggleActivation,
        __nextHasNoMarginBottom: true,
        id: checkboxId
      }), /*#__PURE__*/_jsx("label", {
        htmlFor: checkboxId,
        children: /*#__PURE__*/_jsx(FontDemo, {
          font: face,
          text: displayName,
          onClick: handleToggleActivation
        })
      })]
    })
  });
}
export default LibraryFontVariant;
//# sourceMappingURL=library-font-variant.js.map
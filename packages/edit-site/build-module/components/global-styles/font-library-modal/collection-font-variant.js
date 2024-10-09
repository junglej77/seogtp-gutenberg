/**
 * WordPress dependencies
 */
import { CheckboxControl, Flex, privateApis as componentsPrivateApis } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getFontFaceVariantName } from './utils';
import FontDemo from './font-demo';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  kebabCase
} = unlock(componentsPrivateApis);
function CollectionFontVariant({
  face,
  font,
  handleToggleVariant,
  selected
}) {
  const handleToggleActivation = () => {
    if (font?.fontFace) {
      handleToggleVariant(font, face);
      return;
    }
    handleToggleVariant(font);
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
        checked: selected,
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
export default CollectionFontVariant;
//# sourceMappingURL=collection-font-variant.js.map
/**
 * WordPress dependencies
 */
import { _n, sprintf, isRTL } from '@wordpress/i18n';
import { __experimentalUseNavigator as useNavigator, __experimentalText as Text, Button, Flex, FlexItem, Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import FontDemo from './font-demo';
import { chevronLeft, chevronRight } from '@wordpress/icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function FontCard({
  font,
  onClick,
  variantsText,
  navigatorPath
}) {
  const variantsCount = font.fontFace?.length || 1;
  const style = {
    cursor: !!onClick ? 'pointer' : 'default'
  };
  const navigator = useNavigator();
  return /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    onClick: () => {
      onClick();
      if (navigatorPath) {
        navigator.goTo(navigatorPath);
      }
    },
    style: style,
    className: "font-library-modal__font-card",
    children: /*#__PURE__*/_jsxs(Flex, {
      justify: "space-between",
      wrap: false,
      children: [/*#__PURE__*/_jsx(FontDemo, {
        font: font
      }), /*#__PURE__*/_jsxs(Flex, {
        justify: "flex-end",
        children: [/*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Text, {
            className: "font-library-modal__font-card__count",
            children: variantsText || sprintf( /* translators: %d: Number of font variants. */
            _n('%d variant', '%d variants', variantsCount), variantsCount)
          })
        }), /*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Icon, {
            icon: isRTL() ? chevronLeft : chevronRight
          })
        })]
      })]
    })
  });
}
export default FontCard;
//# sourceMappingURL=font-card.js.map
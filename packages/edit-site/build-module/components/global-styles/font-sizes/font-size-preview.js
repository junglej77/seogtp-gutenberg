/**
 * WordPress dependencies
 */
import { getComputedFluidTypographyValue, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
function FontSizePreview({
  fontSize
}) {
  var _font$fontFamily;
  const [font] = useGlobalStyle('typography');
  const input = fontSize?.fluid?.min && fontSize?.fluid?.max ? {
    minimumFontSize: fontSize.fluid.min,
    maximumFontSize: fontSize.fluid.max
  } : {
    fontSize: fontSize.size
  };
  const computedFontSize = getComputedFluidTypographyValue(input);
  return /*#__PURE__*/_jsx("div", {
    className: "edit-site-typography-preview",
    style: {
      fontSize: computedFontSize,
      fontFamily: (_font$fontFamily = font?.fontFamily) !== null && _font$fontFamily !== void 0 ? _font$fontFamily : 'serif'
    },
    children: __('Aa')
  });
}
export default FontSizePreview;
//# sourceMappingURL=font-size-preview.js.map
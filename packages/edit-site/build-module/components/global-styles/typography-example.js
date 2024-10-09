/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';
import { __unstableMotion as motion } from '@wordpress/components';
import { _x } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { getFamilyPreviewStyle } from './font-library-modal/utils/preview-styles';
import { getFontFamilies } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  GlobalStylesContext
} = unlock(blockEditorPrivateApis);
const {
  mergeBaseAndUserConfigs
} = unlock(editorPrivateApis);
export default function PreviewTypography({
  fontSize,
  variation
}) {
  const {
    base
  } = useContext(GlobalStylesContext);
  let config = base;
  if (variation) {
    config = mergeBaseAndUserConfigs(base, variation);
  }
  const [bodyFontFamilies, headingFontFamilies] = getFontFamilies(config);
  const bodyPreviewStyle = bodyFontFamilies ? getFamilyPreviewStyle(bodyFontFamilies) : {};
  const headingPreviewStyle = headingFontFamilies ? getFamilyPreviewStyle(headingFontFamilies) : {};
  if (fontSize) {
    bodyPreviewStyle.fontSize = fontSize;
    headingPreviewStyle.fontSize = fontSize;
  }
  return /*#__PURE__*/_jsxs(motion.div, {
    animate: {
      scale: 1,
      opacity: 1
    },
    initial: {
      scale: 0.1,
      opacity: 0
    },
    transition: {
      delay: 0.3,
      type: 'tween'
    },
    style: {
      textAlign: 'center'
    },
    children: [/*#__PURE__*/_jsx("span", {
      style: headingPreviewStyle,
      children: _x('A', 'Uppercase letter A')
    }), /*#__PURE__*/_jsx("span", {
      style: bodyPreviewStyle,
      children: _x('a', 'Lowercase letter A')
    })]
  });
}
//# sourceMappingURL=typography-example.js.map
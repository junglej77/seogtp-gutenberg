/**
 * WordPress dependencies
 */
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
export default function TypographyPreview({
  name,
  element,
  headingLevel
}) {
  var _ref;
  let prefix = '';
  if (element === 'heading') {
    prefix = `elements.${headingLevel}.`;
  } else if (element && element !== 'text') {
    prefix = `elements.${element}.`;
  }
  const [fontFamily] = useGlobalStyle(prefix + 'typography.fontFamily', name);
  const [gradientValue] = useGlobalStyle(prefix + 'color.gradient', name);
  const [backgroundColor] = useGlobalStyle(prefix + 'color.background', name);
  const [fallbackBackgroundColor] = useGlobalStyle('color.background');
  const [color] = useGlobalStyle(prefix + 'color.text', name);
  const [fontSize] = useGlobalStyle(prefix + 'typography.fontSize', name);
  const [fontStyle] = useGlobalStyle(prefix + 'typography.fontStyle', name);
  const [fontWeight] = useGlobalStyle(prefix + 'typography.fontWeight', name);
  const [letterSpacing] = useGlobalStyle(prefix + 'typography.letterSpacing', name);
  const extraStyles = element === 'link' ? {
    textDecoration: 'underline'
  } : {};
  return /*#__PURE__*/_jsx("div", {
    className: "edit-site-typography-preview",
    style: {
      fontFamily: fontFamily !== null && fontFamily !== void 0 ? fontFamily : 'serif',
      background: (_ref = gradientValue !== null && gradientValue !== void 0 ? gradientValue : backgroundColor) !== null && _ref !== void 0 ? _ref : fallbackBackgroundColor,
      color,
      fontSize,
      fontStyle,
      fontWeight,
      letterSpacing,
      ...extraStyles
    },
    children: "Aa"
  });
}
//# sourceMappingURL=typography-preview.js.map
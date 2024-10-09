/**
 * Internal dependencies
 */
import { useStylesPreviewColors } from './hooks';
import { jsx as _jsx } from "react/jsx-runtime";
export default function PresetColors() {
  const {
    paletteColors
  } = useStylesPreviewColors();
  return paletteColors.slice(0, 4).map(({
    slug,
    color
  }, index) => /*#__PURE__*/_jsx("div", {
    style: {
      flexGrow: 1,
      height: '100%',
      background: color
    }
  }, `${slug}-${index}`));
}
//# sourceMappingURL=preset-colors.js.map
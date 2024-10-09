/**
 * WordPress dependencies
 */
import { __unstableMotion as motion } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useStylesPreviewColors } from './hooks';
import { jsx as _jsx } from "react/jsx-runtime";
export default function HighlightedColors({
  normalizedColorSwatchSize,
  ratio
}) {
  const {
    highlightedColors
  } = useStylesPreviewColors();
  const scaledSwatchSize = normalizedColorSwatchSize * ratio;
  return highlightedColors.map(({
    slug,
    color
  }, index) => /*#__PURE__*/_jsx(motion.div, {
    style: {
      height: scaledSwatchSize,
      width: scaledSwatchSize,
      background: color,
      borderRadius: scaledSwatchSize / 2
    },
    animate: {
      scale: 1,
      opacity: 1
    },
    initial: {
      scale: 0.1,
      opacity: 0
    },
    transition: {
      delay: index === 1 ? 0.2 : 0.1
    }
  }, `${slug}-${index}`));
}
//# sourceMappingURL=highlighted-colors.js.map
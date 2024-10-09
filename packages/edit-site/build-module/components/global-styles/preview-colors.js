/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, __unstableMotion as motion } from '@wordpress/components';

/**
 * Internal dependencies
 */
import PresetColors from './preset-colors';
import PreviewIframe from './preview-iframe';
import { jsx as _jsx } from "react/jsx-runtime";
const firstFrameVariants = {
  start: {
    scale: 1,
    opacity: 1
  },
  hover: {
    scale: 0,
    opacity: 0
  }
};
const StylesPreviewColors = ({
  label,
  isFocused,
  withHoverView
}) => {
  return /*#__PURE__*/_jsx(PreviewIframe, {
    label: label,
    isFocused: isFocused,
    withHoverView: withHoverView,
    children: ({
      key
    }) => /*#__PURE__*/_jsx(motion.div, {
      variants: firstFrameVariants,
      style: {
        height: '100%',
        overflow: 'hidden'
      },
      children: /*#__PURE__*/_jsx(HStack, {
        spacing: 0,
        justify: "center",
        style: {
          height: '100%',
          overflow: 'hidden'
        },
        children: /*#__PURE__*/_jsx(PresetColors, {})
      })
    }, key)
  });
};
export default StylesPreviewColors;
//# sourceMappingURL=preview-colors.js.map
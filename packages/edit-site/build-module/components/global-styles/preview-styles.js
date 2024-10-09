/**
 * WordPress dependencies
 */
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { __experimentalHStack as HStack, __experimentalVStack as VStack, __unstableMotion as motion } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { useStylesPreviewColors } from './hooks';
import TypographyExample from './typography-example';
import HighlightedColors from './highlighted-colors';
import PreviewIframe from './preview-iframe';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
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
const midFrameVariants = {
  hover: {
    opacity: 1
  },
  start: {
    opacity: 0.5
  }
};
const secondFrameVariants = {
  hover: {
    scale: 1,
    opacity: 1
  },
  start: {
    scale: 0,
    opacity: 0
  }
};
const PreviewStyles = ({
  label,
  isFocused,
  withHoverView,
  variation
}) => {
  const [fontWeight] = useGlobalStyle('typography.fontWeight');
  const [fontFamily = 'serif'] = useGlobalStyle('typography.fontFamily');
  const [headingFontFamily = fontFamily] = useGlobalStyle('elements.h1.typography.fontFamily');
  const [headingFontWeight = fontWeight] = useGlobalStyle('elements.h1.typography.fontWeight');
  const [textColor = 'black'] = useGlobalStyle('color.text');
  const [headingColor = textColor] = useGlobalStyle('elements.h1.color.text');
  const {
    paletteColors
  } = useStylesPreviewColors();
  return /*#__PURE__*/_jsxs(PreviewIframe, {
    label: label,
    isFocused: isFocused,
    withHoverView: withHoverView,
    children: [({
      ratio,
      key
    }) => /*#__PURE__*/_jsx(motion.div, {
      variants: firstFrameVariants,
      style: {
        height: '100%',
        overflow: 'hidden'
      },
      children: /*#__PURE__*/_jsxs(HStack, {
        spacing: 10 * ratio,
        justify: "center",
        style: {
          height: '100%',
          overflow: 'hidden'
        },
        children: [/*#__PURE__*/_jsx(TypographyExample, {
          fontSize: 65 * ratio,
          variation: variation
        }), /*#__PURE__*/_jsx(VStack, {
          spacing: 4 * ratio,
          children: /*#__PURE__*/_jsx(HighlightedColors, {
            normalizedColorSwatchSize: 32,
            ratio: ratio
          })
        })]
      })
    }, key), ({
      key
    }) => /*#__PURE__*/_jsx(motion.div, {
      variants: withHoverView && midFrameVariants,
      style: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        overflow: 'hidden',
        filter: 'blur(60px)',
        opacity: 0.1
      },
      children: /*#__PURE__*/_jsx(HStack, {
        spacing: 0,
        justify: "flex-start",
        style: {
          height: '100%',
          overflow: 'hidden'
        },
        children: paletteColors.slice(0, 4).map(({
          color
        }, index) => /*#__PURE__*/_jsx("div", {
          style: {
            height: '100%',
            background: color,
            flexGrow: 1
          }
        }, index))
      })
    }, key), ({
      ratio,
      key
    }) => /*#__PURE__*/_jsx(motion.div, {
      variants: secondFrameVariants,
      style: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'absolute',
        top: 0
      },
      children: /*#__PURE__*/_jsx(VStack, {
        spacing: 3 * ratio,
        justify: "center",
        style: {
          height: '100%',
          overflow: 'hidden',
          padding: 10 * ratio,
          boxSizing: 'border-box'
        },
        children: label && /*#__PURE__*/_jsx("div", {
          style: {
            fontSize: 40 * ratio,
            fontFamily: headingFontFamily,
            color: headingColor,
            fontWeight: headingFontWeight,
            lineHeight: '1em',
            textAlign: 'center'
          },
          children: label
        })
      })
    }, key)]
  });
};
export default PreviewStyles;
//# sourceMappingURL=preview-styles.js.map
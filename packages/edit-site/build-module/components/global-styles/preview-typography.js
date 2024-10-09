/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import TypographyExample from './typography-example';
import PreviewIframe from './preview-iframe';
import { jsx as _jsx } from "react/jsx-runtime";
const StylesPreviewTypography = ({
  variation,
  isFocused,
  withHoverView
}) => {
  return /*#__PURE__*/_jsx(PreviewIframe, {
    label: variation.title,
    isFocused: isFocused,
    withHoverView: withHoverView,
    children: ({
      ratio,
      key
    }) => /*#__PURE__*/_jsx(HStack, {
      spacing: 10 * ratio,
      justify: "center",
      style: {
        height: '100%',
        overflow: 'hidden'
      },
      children: /*#__PURE__*/_jsx(TypographyExample, {
        variation: variation,
        fontSize: 85 * ratio
      })
    }, key)
  });
};
export default StylesPreviewTypography;
//# sourceMappingURL=preview-typography.js.map
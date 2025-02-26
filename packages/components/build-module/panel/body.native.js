/**
 * External dependencies
 */
import { Text, View } from 'react-native';

/**
 * Internal dependencies
 */
import styles from './body.scss';
import BottomSeparatorCover from './bottom-separator-cover';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PanelBody({
  children,
  title,
  style,
  titleStyle = {}
}) {
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.panelContainer, style],
    children: [title && /*#__PURE__*/_jsx(Text, {
      accessibilityRole: "header",
      style: [styles.sectionHeaderText, titleStyle],
      children: title
    }), children, /*#__PURE__*/_jsx(BottomSeparatorCover, {})]
  });
}
export default PanelBody;
//# sourceMappingURL=body.native.js.map
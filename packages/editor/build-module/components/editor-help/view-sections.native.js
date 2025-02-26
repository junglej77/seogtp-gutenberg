/**
 * External dependencies
 */
import { Text, Image, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { usePreferredColorScheme, usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const HelpDetailBodyText = ({
  text
}) => {
  const bodyStyle = usePreferredColorSchemeStyle(styles.helpDetailBody, styles.helpDetailBodyDark);
  return /*#__PURE__*/_jsx(Text, {
    selectable: true,
    style: bodyStyle,
    children: text
  });
};
export const HelpDetailSectionHeadingText = ({
  text,
  badge
}) => {
  const headingTextStyle = usePreferredColorSchemeStyle(styles.helpDetailSectionHeadingText, styles.helpDetailSectionHeadingTextDark);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.helpDetailSectionHeading,
    children: [badge && /*#__PURE__*/_jsx(HelpDetailBadge, {
      text: badge
    }), /*#__PURE__*/_jsx(Text, {
      accessibilityRole: "header",
      selectable: true,
      style: headingTextStyle,
      children: text
    })]
  });
};
export const HelpDetailImage = ({
  accessible,
  accessibilityLabel,
  source,
  sourceDarkMode
}) => {
  const imageStyle = usePreferredColorSchemeStyle(styles.helpDetailImage, styles.helpDetailImageDark);
  const darkModeEnabled = usePreferredColorScheme() === 'dark';
  return /*#__PURE__*/_jsx(Image, {
    accessible: accessible,
    accessibilityLabel: accessibilityLabel,
    source: darkModeEnabled && sourceDarkMode ? sourceDarkMode : source,
    style: imageStyle
  });
};
const HelpDetailBadge = ({
  text
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: styles.helpDetailBadgeContainer,
    children: /*#__PURE__*/_jsx(Text, {
      style: styles.helpDetailBadgeText,
      children: text
    })
  });
};
//# sourceMappingURL=view-sections.native.js.map
/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import WebPreformattedEdit from './edit.js';
import styles from './styles.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export default function PreformattedEdit(props) {
  const {
    style
  } = props;
  const textBaseStyle = usePreferredColorSchemeStyle(styles.wpRichTextLight, styles.wpRichTextDark);
  const wpBlockPreformatted = usePreferredColorSchemeStyle(styles.wpBlockPreformattedLight, styles.wpBlockPreformattedDark);
  const richTextStyle = {
    ...(!style?.baseColors && textBaseStyle),
    ...(style?.fontSize && {
      fontSize: style.fontSize
    }),
    ...(style?.color && {
      color: style.color
    })
  };
  const containerStyles = [wpBlockPreformatted, style?.backgroundColor && {
    backgroundColor: style.backgroundColor
  }, style?.baseColors?.color && !style?.backgroundColor && styles['wp-block-preformatted__no-background']];
  const propsWithStyle = {
    ...props,
    style: richTextStyle
  };
  return /*#__PURE__*/_jsx(View, {
    style: containerStyles,
    children: /*#__PURE__*/_jsx(WebPreformattedEdit, {
      ...propsWithStyle
    })
  });
}
//# sourceMappingURL=edit.native.js.map
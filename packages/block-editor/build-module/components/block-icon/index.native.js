/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { blockDefault } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export function BlockIcon({
  icon,
  fill,
  size,
  showColors = false
}) {
  if (icon?.src === 'block-default') {
    icon = {
      src: blockDefault
    };
  }
  const defaultFill = usePreferredColorSchemeStyle(styles.iconPlaceholder, styles.iconPlaceholderDark)?.fill;
  const iconForeground = showColors ? icon?.foreground : undefined;
  const renderedIcon = /*#__PURE__*/_jsx(Icon, {
    icon: icon && icon.src ? icon.src : icon,
    fill: fill || iconForeground || defaultFill,
    ...(size && {
      size
    })
  });
  const style = showColors ? {
    backgroundColor: icon && icon.background
  } : {};
  return /*#__PURE__*/_jsx(View, {
    style: style,
    children: renderedIcon
  });
}
export default BlockIcon;
//# sourceMappingURL=index.native.js.map
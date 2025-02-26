/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { blockDefault } from '@wordpress/icons';
import { memo } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
function BlockIcon({
  icon,
  showColors = false,
  className,
  context
}) {
  if (icon?.src === 'block-default') {
    icon = {
      src: blockDefault
    };
  }
  const renderedIcon = /*#__PURE__*/_jsx(Icon, {
    icon: icon && icon.src ? icon.src : icon,
    context: context
  });
  const style = showColors ? {
    backgroundColor: icon && icon.background,
    color: icon && icon.foreground
  } : {};
  return /*#__PURE__*/_jsx("span", {
    style: style,
    className: clsx('block-editor-block-icon', className, {
      'has-colors': showColors
    }),
    children: renderedIcon
  });
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/block-icon/README.md
 */
export default memo(BlockIcon);
//# sourceMappingURL=index.js.map
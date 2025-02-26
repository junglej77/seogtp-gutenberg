/**
 * WordPress dependencies
 */
import { MenuItem, __experimentalText as Text } from '@wordpress/components';
import { check } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import useStylesForBlocks from './use-styles-for-block';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const noop = () => {};
export default function BlockStylesMenuItems({
  clientId,
  onSwitch = noop
}) {
  const {
    onSelect,
    stylesToRender,
    activeStyle
  } = useStylesForBlocks({
    clientId,
    onSwitch
  });
  if (!stylesToRender || stylesToRender.length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: stylesToRender.map(style => {
      const menuItemText = style.label || style.name;
      return /*#__PURE__*/_jsx(MenuItem, {
        icon: activeStyle.name === style.name ? check : null,
        onClick: () => onSelect(style),
        children: /*#__PURE__*/_jsx(Text, {
          as: "span",
          limit: 18,
          ellipsizeMode: "tail",
          truncate: true,
          children: menuItemText
        })
      }, style.name);
    })
  });
}
//# sourceMappingURL=menu-items.js.map
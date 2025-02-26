/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Children } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * `MenuGroup` wraps a series of related `MenuItem` components into a common
 * section.
 *
 * ```jsx
 * import { MenuGroup, MenuItem } from '@wordpress/components';
 *
 * const MyMenuGroup = () => (
 *   <MenuGroup label="Settings">
 *     <MenuItem>Setting 1</MenuItem>
 *     <MenuItem>Setting 2</MenuItem>
 *   </MenuGroup>
 * );
 * ```
 */
export function MenuGroup(props) {
  const {
    children,
    className = '',
    label,
    hideSeparator
  } = props;
  const instanceId = useInstanceId(MenuGroup);
  if (!Children.count(children)) {
    return null;
  }
  const labelId = `components-menu-group-label-${instanceId}`;
  const classNames = clsx(className, 'components-menu-group', {
    'has-hidden-separator': hideSeparator
  });
  return /*#__PURE__*/_jsxs("div", {
    className: classNames,
    children: [label && /*#__PURE__*/_jsx("div", {
      className: "components-menu-group__label",
      id: labelId,
      "aria-hidden": "true",
      children: label
    }), /*#__PURE__*/_jsx("div", {
      role: "group",
      "aria-labelledby": label ? labelId : undefined,
      children: children
    })]
  });
}
export default MenuGroup;
//# sourceMappingURL=index.js.map
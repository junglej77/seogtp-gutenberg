/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { NavigationGroupContext } from './context';
import { GroupTitleUI } from '../styles/navigation-styles';
import { useNavigationContext } from '../context';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
let uniqueId = 0;

/**
 * @deprecated Use `Navigator` instead.
 */
export function NavigationGroup({
  children,
  className,
  title
}) {
  const [groupId] = useState(`group-${++uniqueId}`);
  const {
    navigationTree: {
      items
    }
  } = useNavigationContext();
  const context = {
    group: groupId
  };

  // Keep the children rendered to make sure invisible items are included in the navigation tree.
  if (!Object.values(items).some(item => item.group === groupId && item._isVisible)) {
    return /*#__PURE__*/_jsx(NavigationGroupContext.Provider, {
      value: context,
      children: children
    });
  }
  const groupTitleId = `components-navigation__group-title-${groupId}`;
  const classes = clsx('components-navigation__group', className);
  return /*#__PURE__*/_jsx(NavigationGroupContext.Provider, {
    value: context,
    children: /*#__PURE__*/_jsxs("li", {
      className: classes,
      children: [title && /*#__PURE__*/_jsx(GroupTitleUI, {
        className: "components-navigation__group-title",
        id: groupTitleId,
        level: 3,
        children: title
      }), /*#__PURE__*/_jsx("ul", {
        "aria-labelledby": groupTitleId,
        role: "group",
        children: children
      })]
    })
  });
}
export default NavigationGroup;
//# sourceMappingURL=index.js.map
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
import { useNavigationContext } from '../context';
import { useNavigationTreeItem } from './use-navigation-tree-item';
import { ItemBaseUI } from '../styles/navigation-styles';
import { jsx as _jsx } from "react/jsx-runtime";
let uniqueId = 0;
export default function NavigationItemBase(props) {
  // Also avoid to pass the `title` and `href` props to the ItemBaseUI styled component.
  const {
    children,
    className,
    title,
    href,
    ...restProps
  } = props;
  const [itemId] = useState(`item-${++uniqueId}`);
  useNavigationTreeItem(itemId, props);
  const {
    navigationTree
  } = useNavigationContext();
  if (!navigationTree.getItem(itemId)?._isVisible) {
    return null;
  }
  const classes = clsx('components-navigation__item', className);
  return /*#__PURE__*/_jsx(ItemBaseUI, {
    className: classes,
    ...restProps,
    children: children
  });
}
//# sourceMappingURL=base.js.map
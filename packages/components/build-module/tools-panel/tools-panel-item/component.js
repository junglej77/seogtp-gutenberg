/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { useToolsPanelItem } from './hook';
import { View } from '../../view';
import { contextConnect } from '../../context';
import { jsx as _jsx } from "react/jsx-runtime";
// This wraps controls to be conditionally displayed within a tools panel. It
// prevents props being applied to HTML elements that would make them invalid.
const UnconnectedToolsPanelItem = (props, forwardedRef) => {
  const {
    children,
    isShown,
    shouldRenderPlaceholder,
    ...toolsPanelItemProps
  } = useToolsPanelItem(props);
  if (!isShown) {
    return shouldRenderPlaceholder ? /*#__PURE__*/_jsx(View, {
      ...toolsPanelItemProps,
      ref: forwardedRef
    }) : null;
  }
  return /*#__PURE__*/_jsx(View, {
    ...toolsPanelItemProps,
    ref: forwardedRef,
    children: children
  });
};
export const ToolsPanelItem = contextConnect(UnconnectedToolsPanelItem, 'ToolsPanelItem');
export default ToolsPanelItem;
//# sourceMappingURL=component.js.map
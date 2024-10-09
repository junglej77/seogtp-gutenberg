/**
 * WordPress dependencies
 */
import { Button, Composite } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
function InserterListboxItem({
  isFirst,
  as: Component,
  children,
  ...props
}, ref) {
  return /*#__PURE__*/_jsx(Composite.Item, {
    ref: ref,
    role: "option"
    // Use the Composite.Item `accessibleWhenDisabled` prop
    // over Button's `isFocusable`. The latter was shown to
    // cause an issue with tab order in the inserter list.
    ,
    accessibleWhenDisabled: true,
    ...props,
    render: htmlProps => {
      const propsWithTabIndex = {
        ...htmlProps,
        tabIndex: isFirst ? 0 : htmlProps.tabIndex
      };
      if (Component) {
        return /*#__PURE__*/_jsx(Component, {
          ...propsWithTabIndex,
          children: children
        });
      }
      if (typeof children === 'function') {
        return children(propsWithTabIndex);
      }
      return /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        ...propsWithTabIndex,
        children: children
      });
    }
  });
}
export default forwardRef(InserterListboxItem);
//# sourceMappingURL=item.js.map
/**
 * External dependencies
 */
// 导入 React 的 ForwardedRef 类型，用于转发引用。

/**
 * Internal dependencies
 */
// 导入 ItemProps 类型，定义了 Item 组件的属性。
import { useItem } from './hook'; // 导入自定义钩子 useItem，用于处理 Item 组件的逻辑。

// 导入 WordPressComponentProps 类型，定义了 WordPress 组件的属性。
import { contextConnect } from '../../context'; // 导入 contextConnect 函数，用于将组件与上下文连接。
import { View } from '../../view'; // 导入 View 组件，用于渲染视图。
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedItem(props,
// 组件的属性，包括 ItemProps 和 'div' 元素的属性。
forwardedRef) {
  const {
    role,
    wrapperClassName,
    ...otherProps
  } = useItem(props); // 使用 useItem 钩子处理 props，提取 role 和 wrapperClassName。

  return /*#__PURE__*/_jsx("div", {
    role: role,
    className: wrapperClassName,
    children: /*#__PURE__*/_jsx(View, {
      ...otherProps,
      ref: forwardedRef
    })
  });
}

/**
 * `Item` is used in combination with `ItemGroup` to display a list of items
 * grouped and styled together.
 *
 * ```jsx
 * import {
 *   __experimentalItemGroup as ItemGroup,
 *   __experimentalItem as Item,
 * } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <ItemGroup>
 *       <Item>Code</Item>
 *       <Item>is</Item>
 *       <Item>Poetry</Item>
 *     </ItemGroup>
 *   );
 * }
 * ```
 */
export const Item = contextConnect(UnconnectedItem, 'Item'); // 使用 contextConnect 函数将 UnconnectedItem 组件与上下文连接，并导出为 Item 组件。

export default Item; // 默认导出 Item 组件。
//# sourceMappingURL=component.js.map
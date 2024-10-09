/**
 * Composite 是一个组件，可以包含由 Composite.Item 表示的可导航项。
 * 它受到 WAI-ARIA Composite 角色的启发，并实现了所有键盘导航机制，以确保整个 Composite 元素只有一个标签停止点。
 * 这意味着它可以作为 roving tabindex 或 aria-activedescendant 容器。
 *
 * @see https://ariakit.org/components/composite
 */

/**
 * 外部依赖
 */
import * as Ariakit from '@ariakit/react';

/**
 * WordPress 依赖
 */
import { isRTL } from '@wordpress/i18n';
import { useMemo, forwardRef } from '@wordpress/element';

/**
 * 内部依赖
 */

import { CompositeContext } from './context';
import { CompositeGroup } from './group';
import { CompositeGroupLabel } from './group-label';
import { CompositeHover } from './hover';
import { CompositeItem } from './item';
import { CompositeRow } from './row';
import { CompositeTypeahead } from './typeahead';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * 渲染一个基于 WAI-ARIA [`composite`](https://w3c.github.io/aria/#composite) 角色的组件，
 * 该组件在页面上提供一个标签停止点，并通过箭头键导航可聚焦的后代元素。
 *
 * @example
 * ```jsx
 * import { Composite } from '@wordpress/components';
 *
 * <Composite>
 *   <Composite.Item>Item 1</Composite.Item>
 *   <Composite.Item>Item 2</Composite.Item>
 * </Composite>
 * ```
 */
export const Composite = Object.assign(forwardRef(function Composite({
  // Composite store 属性
  activeId,
  defaultActiveId,
  setActiveId,
  focusLoop = false,
  focusWrap = false,
  focusShift = false,
  virtualFocus = false,
  orientation = 'both',
  rtl = isRTL(),
  // Composite 组件属性
  children,
  disabled = false,
  // 其他属性
  ...props
}, ref) {
  const store = Ariakit.useCompositeStore({
    activeId,
    defaultActiveId,
    setActiveId,
    focusLoop,
    focusWrap,
    focusShift,
    virtualFocus,
    orientation,
    rtl
  });
  const contextValue = useMemo(() => ({
    store
  }), [store]);
  return /*#__PURE__*/_jsx(Ariakit.Composite, {
    disabled: disabled,
    store: store,
    ...props,
    ref: ref,
    children: /*#__PURE__*/_jsx(CompositeContext.Provider, {
      value: contextValue,
      children: children
    })
  });
}), {
  /**
   * 渲染一个用于 composite 项的组元素。
   *
   * @example
   * ```jsx
   * import { Composite } from '@wordpress/components';
   *
   * <Composite>
   *   <Composite.Group>
   *     <Composite.GroupLabel>Label</Composite.GroupLabel>
   *     <Composite.Item>Item 1</Composite.Item>
   *     <Composite.Item>Item 2</Composite.Item>
   *   </CompositeGroup>
   * </Composite>
   * ```
   */
  Group: Object.assign(CompositeGroup, {
    displayName: 'Composite.Group'
  }),
  /**
   * 在 composite 组中渲染一个标签。此组件必须包裹在 `Composite.Group` 中，
   * 以便 `aria-labelledby` 属性正确设置在 composite 组元素上。
   *
   * @example
   * ```jsx
   * import { Composite } from '@wordpress/components';
   *
   * <Composite>
   *   <Composite.Group>
   *     <Composite.GroupLabel>Label</Composite.GroupLabel>
   *     <Composite.Item>Item 1</Composite.Item>
   *     <Composite.Item>Item 2</Composite.Item>
   *   </CompositeGroup>
   * </Composite>
   * ```
   */
  GroupLabel: Object.assign(CompositeGroupLabel, {
    displayName: 'Composite.GroupLabel'
  }),
  /**
   * 渲染一个 composite 项。
   *
   * @example
   * ```jsx
   * import { Composite } from '@wordpress/components';
   *
   * <Composite>
   *   <Composite.Item>Item 1</Composite.Item>
   *   <Composite.Item>Item 2</Composite.Item>
   *   <Composite.Item>Item 3</Composite.Item>
   * </Composite>
   * ```
   */
  Item: Object.assign(CompositeItem, {
    displayName: 'Composite.Item'
  }),
  /**
   * 渲染一个 composite 行。将 `Composite.Item` 元素包裹在 `Composite.Row` 中，
   * 将创建一个二维 composite 组件，例如网格。
   *
   * @example
   * ```jsx
   * import { Composite } from '@wordpress/components';
   *
   * <Composite>
   *   <Composite.Row>
   *     <Composite.Item>Item 1.1</Composite.Item>
   *     <Composite.Item>Item 1.2</Composite.Item>
   *     <Composite.Item>Item 1.3</Composite.Item>
   *   </Composite.Row>
   *   <Composite.Row>
   *     <Composite.Item>Item 2.1</Composite.Item>
   *     <Composite.Item>Item 2.2</Composite.Item>
   *     <Composite.Item>Item 2.3</Composite.Item>
   *   </Composite.Row>
   * </Composite>
   * ```
   */
  Row: Object.assign(CompositeRow, {
    displayName: 'Composite.Row'
  }),
  /**
   * 在 composite 组件中渲染一个元素，该元素在鼠标移动时获得焦点，并在鼠标离开时失去焦点到 composite 基本元素。
   * 这应该与 `Composite.Item` 组件结合使用。
   *
   * @example
   * ```jsx
   * import { Composite } from '@wordpress/components';
   *
   * <Composite>
   *   <Composite.Hover render={ <Composite.Item /> }>
   *     Item 1
   *   </Composite.Hover>
   *   <Composite.Hover render={ <Composite.Item /> }>
   *     Item 2
   *   </Composite.Hover>
   * </Composite>
   * ```
   */
  Hover: Object.assign(CompositeHover, {
    displayName: 'Composite.Hover'
  }),
  /**
   * 渲染一个组件，为 composite 组件添加 typeahead 功能。
   * 按下可打印字符键将使焦点移动到下一个以输入字符开头的 composite 项。
   *
   * @example
   * ```jsx
   * import { Composite } from '@wordpress/components';
   *
   * <Composite render={ <CompositeTypeahead /> }>
   *   <Composite.Item>Item 1</Composite.Item>
   *   <Composite.Item>Item 2</Composite.Item>
   * </Composite>
   * ```
   */
  Typeahead: Object.assign(CompositeTypeahead, {
    displayName: 'Composite.Typeahead'
  }),
  /**
   * 由 composite 组件使用的 React 上下文。它可以用于访问 composite store，
   * 并在 composite 子组件渲染到跨门户（例如 `SlotFill` 组件）时，将上下文转发到 `Fill` 子组件。
   *
   * @example
   * ```jsx
   * import { Composite } from '@wordpress/components';
   * import { useContext } from '@wordpress/element';
   *
   * const compositeContext = useContext( Composite.Context );
   * ```
   */
  Context: Object.assign(CompositeContext, {
    displayName: 'Composite.Context'
  })
});
//# sourceMappingURL=index.js.map
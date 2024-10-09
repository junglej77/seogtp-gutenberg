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
export declare const Composite: import("react").ForwardRefExoticComponent<{
    activeId?: Ariakit.CompositeStoreProps["activeId"];
    defaultActiveId?: Ariakit.CompositeStoreProps["defaultActiveId"];
    setActiveId?: Ariakit.CompositeStoreProps["setActiveId"];
    focusLoop?: Ariakit.CompositeStoreProps["focusLoop"];
    focusWrap?: Ariakit.CompositeStoreProps["focusWrap"];
    focusShift?: Ariakit.CompositeStoreProps["focusShift"];
    virtualFocus?: Ariakit.CompositeStoreProps["virtualFocus"];
    orientation?: Ariakit.CompositeStoreProps["orientation"];
    rtl?: Ariakit.CompositeStoreProps["rtl"];
} & {
    render?: Ariakit.CompositeProps["render"];
    focusable?: Ariakit.CompositeProps["focusable"];
    disabled?: Ariakit.CompositeProps["disabled"];
    accessibleWhenDisabled?: Ariakit.CompositeProps["accessibleWhenDisabled"];
    onFocusVisible?: Ariakit.CompositeProps["onFocusVisible"];
    children?: Ariakit.CompositeProps["children"];
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | keyof {
    activeId?: Ariakit.CompositeStoreProps["activeId"];
    defaultActiveId?: Ariakit.CompositeStoreProps["defaultActiveId"];
    setActiveId?: Ariakit.CompositeStoreProps["setActiveId"];
    focusLoop?: Ariakit.CompositeStoreProps["focusLoop"];
    focusWrap?: Ariakit.CompositeStoreProps["focusWrap"];
    focusShift?: Ariakit.CompositeStoreProps["focusShift"];
    virtualFocus?: Ariakit.CompositeStoreProps["virtualFocus"];
    orientation?: Ariakit.CompositeStoreProps["orientation"];
    rtl?: Ariakit.CompositeStoreProps["rtl"];
} | "render" | "focusable" | "disabled" | "accessibleWhenDisabled" | "onFocusVisible"> & import("react").RefAttributes<HTMLDivElement>> & {
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
    Group: import("react").ForwardRefExoticComponent<import("./types").CompositeGroupProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("./types").CompositeGroupProps> & import("react").RefAttributes<HTMLDivElement>> & {
        displayName: string;
    };
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
    GroupLabel: import("react").ForwardRefExoticComponent<import("./types").CompositeGroupLabelProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("./types").CompositeGroupLabelProps> & import("react").RefAttributes<HTMLDivElement>> & {
        displayName: string;
    };
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
    Item: import("react").ForwardRefExoticComponent<import("./types").CompositeItemProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "as" | keyof import("./types").CompositeItemProps> & import("react").RefAttributes<HTMLButtonElement>> & {
        displayName: string;
    };
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
    Row: import("react").ForwardRefExoticComponent<import("./types").CompositeRowProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("./types").CompositeRowProps> & import("react").RefAttributes<HTMLDivElement>> & {
        displayName: string;
    };
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
    Hover: import("react").ForwardRefExoticComponent<import("./types").CompositeHoverProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("./types").CompositeHoverProps> & import("react").RefAttributes<HTMLDivElement>> & {
        displayName: string;
    };
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
    Typeahead: import("react").ForwardRefExoticComponent<import("./types").CompositeTypeaheadProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("./types").CompositeTypeaheadProps> & import("react").RefAttributes<HTMLDivElement>> & {
        displayName: string;
    };
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
    Context: import("react").Context<import("./types").CompositeContextProps> & {
        displayName: string;
    };
};
//# sourceMappingURL=index.d.ts.map
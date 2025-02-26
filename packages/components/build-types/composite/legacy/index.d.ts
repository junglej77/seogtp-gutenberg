/**
 * Composite is a component that may contain navigable items represented by
 * CompositeItem. It's inspired by the WAI-ARIA Composite Role and implements
 * all the keyboard navigation mechanisms to ensure that there's only one
 * tab stop for the whole Composite element. This means that it can behave as
 * a roving tabindex or aria-activedescendant container.
 *
 * This file aims at providing components that are as close as possible to the
 * original `reakit`-based implementation (which was removed from the codebase),
 * although it is recommended that consumers of the package switch to the stable,
 * un-prefixed, `ariakit`-based version of `Composite`.
 *
 * @see https://ariakit.org/components/composite
 */
/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';
type Orientation = 'horizontal' | 'vertical';
export interface LegacyStateOptions {
    /**
     * ID that will serve as a base for all the items IDs.
     */
    baseId?: string;
    /**
     * Determines how next and previous functions will behave. If `rtl` is set
     * to `true`, they will be inverted. This only affects the composite widget
     * behavior. You still need to set `dir="rtl"` on HTML/CSS.
     *
     * @default false
     */
    rtl?: boolean;
    /**
     * Defines the orientation of the composite widget. If the composite has a
     * single row or column (one-dimensional), the orientation value determines
     * which arrow keys can be used to move focus.
     */
    orientation?: Orientation;
    /**
     * The current focused item `id`.
     */
    currentId?: string;
    /**
     * Determines how focus moves from the start and end of rows and columns.
     *
     * @default false
     */
    loop?: boolean | Orientation;
    /**
     * If enabled, moving to the next item from the last one in a row or column
     * will focus the first item in the next row or column and vice-versa.
     *
     * ** Has effect only on two-dimensional composites. **
     *
     * @default false
     */
    wrap?: boolean | Orientation;
    /**
     * If enabled, moving up or down when there's no next item or the next item
     * is disabled will shift to the item right before it.
     *
     * ** Has effect only on two-dimensional composites. **
     *
     * @default false
     */
    shift?: boolean;
    unstable_virtual?: boolean;
}
type Component = React.FunctionComponent<any>;
type CompositeStore = ReturnType<typeof Ariakit.useCompositeStore>;
type CompositeStoreState = {
    store: CompositeStore;
};
export type CompositeState = CompositeStoreState & Required<Pick<LegacyStateOptions, 'baseId'>>;
export type CompositeStateProps = {
    state: CompositeState;
} | (CompositeState & {
    state?: never;
});
type ComponentProps<C extends Component> = React.ComponentPropsWithRef<C>;
export type CompositeProps<C extends Component> = ComponentProps<C> & CompositeStateProps;
type CompositeComponent<C extends Component> = (props: CompositeProps<C>) => React.ReactElement;
/**
 * _Note: please use the `Composite` component instead._
 *
 * @deprecated
 */
export declare const Composite: CompositeComponent<Component>;
/**
 * _Note: please use the `Composite.Row` or `Composite.Group` components instead._
 *
 * @deprecated
 */
export declare const CompositeGroup: CompositeComponent<Component>;
/**
 * _Note: please use the `Composite.Item` component instead._
 *
 * @deprecated
 */
export declare const CompositeItem: CompositeComponent<Component>;
/**
 * _Note: please use the `Composite` component instead._
 *
 * @deprecated
 */
export declare function useCompositeState(legacyStateOptions?: LegacyStateOptions): CompositeState;
export {};
//# sourceMappingURL=index.d.ts.map
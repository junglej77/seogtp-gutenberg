import type { NavigationProps } from './types';
/**
 * Render a navigation list with optional groupings and hierarchy.
 *
 * @deprecated Use `Navigator` instead.
 *
 * ```jsx
 * import {
 *   __experimentalNavigation as Navigation,
 *   __experimentalNavigationGroup as NavigationGroup,
 *   __experimentalNavigationItem as NavigationItem,
 *   __experimentalNavigationMenu as NavigationMenu,
 * } from '@wordpress/components';
 *
 * const MyNavigation = () => (
 *   <Navigation>
 *     <NavigationMenu title="Home">
 *       <NavigationGroup title="Group 1">
 *         <NavigationItem item="item-1" title="Item 1" />
 *         <NavigationItem item="item-2" title="Item 2" />
 *       </NavigationGroup>
 *       <NavigationGroup title="Group 2">
 *         <NavigationItem
 *           item="item-3"
 *           navigateToMenu="category"
 *           title="Category"
 *         />
 *       </NavigationGroup>
 *     </NavigationMenu>
 *
 *     <NavigationMenu
 *       backButtonLabel="Home"
 *       menu="category"
 *       parentMenu="root"
 *       title="Category"
 *     >
 *       <NavigationItem badge="1" item="child-1" title="Child 1" />
 *       <NavigationItem item="child-2" title="Child 2" />
 *     </NavigationMenu>
 *   </Navigation>
 * );
 * ```
 */
export declare function Navigation({ activeItem, activeMenu, children, className, onActivateMenu, }: NavigationProps): import("react").JSX.Element;
export default Navigation;
//# sourceMappingURL=index.d.ts.map
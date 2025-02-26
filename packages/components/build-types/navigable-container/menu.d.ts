/**
 * External dependencies
 */
import type { ForwardedRef } from 'react';
import type { NavigableMenuProps } from './types';
export declare function UnforwardedNavigableMenu({ role, orientation, ...rest }: NavigableMenuProps, ref: ForwardedRef<any>): import("react").JSX.Element;
/**
 * A container for a navigable menu.
 *
 *  ```jsx
 *  import {
 *    NavigableMenu,
 *    Button,
 *  } from '@wordpress/components';
 *
 *  function onNavigate( index, target ) {
 *    console.log( `Navigates to ${ index }`, target );
 *  }
 *
 *  const MyNavigableContainer = () => (
 *    <div>
 *      <span>Navigable Menu:</span>
 *      <NavigableMenu onNavigate={ onNavigate } orientation="horizontal">
 *        <Button variant="secondary">Item 1</Button>
 *        <Button variant="secondary">Item 2</Button>
 *        <Button variant="secondary">Item 3</Button>
 *      </NavigableMenu>
 *    </div>
 *  );
 *  ```
 */
export declare const NavigableMenu: import("react").ForwardRefExoticComponent<{
    children?: import("react").ReactNode;
    cycle?: boolean;
    onKeyDown?: (event: KeyboardEvent) => void;
    onNavigate?: (index: number, focusable: HTMLElement) => void;
} & {
    orientation?: "vertical" | "horizontal" | "both";
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "orientation" | keyof {
    children?: import("react").ReactNode;
    cycle?: boolean;
    onKeyDown?: (event: KeyboardEvent) => void;
    onNavigate?: (index: number, focusable: HTMLElement) => void;
}> & import("react").RefAttributes<any>>;
export default NavigableMenu;
//# sourceMappingURL=menu.d.ts.map
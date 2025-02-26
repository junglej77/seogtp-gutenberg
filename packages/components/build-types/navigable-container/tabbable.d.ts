/**
 * External dependencies
 */
import type { ForwardedRef } from 'react';
import type { TabbableContainerProps } from './types';
export declare function UnforwardedTabbableContainer({ eventToOffset, ...props }: TabbableContainerProps, ref: ForwardedRef<any>): import("react").JSX.Element;
/**
 * A container for tabbable elements.
 *
 *  ```jsx
 *  import {
 *    TabbableContainer,
 *    Button,
 *  } from '@wordpress/components';
 *
 *  function onNavigate( index, target ) {
 *    console.log( `Navigates to ${ index }`, target );
 *  }
 *
 *  const MyTabbableContainer = () => (
 *    <div>
 *      <span>Tabbable Container:</span>
 *      <TabbableContainer onNavigate={ onNavigate }>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 1
 *        </Button>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 2
 *        </Button>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 3
 *        </Button>
 *        <Button variant="secondary" tabIndex="0">
 *          Section 4
 *        </Button>
 *      </TabbableContainer>
 *    </div>
 *  );
 *  ```
 */
export declare const TabbableContainer: import("react").ForwardRefExoticComponent<{
    children?: import("react").ReactNode;
    cycle?: boolean;
    onKeyDown?: (event: KeyboardEvent) => void;
    onNavigate?: (index: number, focusable: HTMLElement) => void;
} & Partial<Pick<import("./types").NavigableContainerProps, "eventToOffset">> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof {
    children?: import("react").ReactNode;
    cycle?: boolean;
    onKeyDown?: (event: KeyboardEvent) => void;
    onNavigate?: (index: number, focusable: HTMLElement) => void;
} | "eventToOffset"> & import("react").RefAttributes<any>>;
export default TabbableContainer;
//# sourceMappingURL=tabbable.d.ts.map
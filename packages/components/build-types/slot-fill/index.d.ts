/**
 * External dependencies
 */
import type { ForwardedRef } from 'react';
import type { WordPressComponentProps } from '../context';
export { default as useSlot } from './bubbles-virtually/use-slot';
export { default as useSlotFills } from './bubbles-virtually/use-slot-fills';
import type { DistributiveOmit, FillComponentProps, SlotComponentProps, SlotFillProviderProps, SlotKey } from './types';
export declare function Fill(props: FillComponentProps): import("react").JSX.Element;
export declare function UnforwardedSlot(props: SlotComponentProps & Omit<WordPressComponentProps<{}, 'div'>, 'className'>, ref: ForwardedRef<any>): import("react").JSX.Element;
export declare const Slot: import("react").ForwardRefExoticComponent<(SlotComponentProps & Omit<WordPressComponentProps<{}, "div">, "className">) & import("react").RefAttributes<any>>;
export declare function Provider({ children, passthrough, }: SlotFillProviderProps): import("react").JSX.Element;
export declare namespace Provider {
    var displayName: string;
}
export declare function createSlotFill(key: SlotKey): {
    Fill: {
        (props: Omit<FillComponentProps, "name">): import("react").JSX.Element;
        displayName: string;
    };
    Slot: {
        (props: DistributiveOmit<SlotComponentProps, "name">): import("react").JSX.Element;
        displayName: string;
        __unstableName: SlotKey;
    };
};
export declare const createPrivateSlotFill: (name: string) => {
    Fill: {
        (props: Omit<FillComponentProps, "name">): import("react").JSX.Element;
        displayName: string;
    };
    Slot: {
        (props: DistributiveOmit<SlotComponentProps, "name">): import("react").JSX.Element;
        displayName: string;
        __unstableName: SlotKey;
    };
    privateKey: symbol;
};
//# sourceMappingURL=index.d.ts.map
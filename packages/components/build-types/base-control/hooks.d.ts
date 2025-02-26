import type { BaseControlProps } from './types';
/**
 * Generate props for the `BaseControl` and the inner control itself.
 *
 * Namely, it takes care of generating a unique `id`, properly associating it with the `label` and `help` elements.
 *
 * @param props
 */
export declare function useBaseControlProps(props: Omit<BaseControlProps, 'children'>): {
    baseControlProps: {
        label?: import("react").ReactNode;
        className?: string;
        __nextHasNoMarginBottom?: boolean;
        hideLabelFromVision?: boolean;
        __associatedWPComponentName?: string;
        id: string;
        help: import("react").ReactNode;
    };
    controlProps: {
        'aria-describedby'?: string | undefined;
        id: string;
    };
};
//# sourceMappingURL=hooks.d.ts.map
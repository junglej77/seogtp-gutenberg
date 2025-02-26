type Props<T> = {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
};
/**
 * Simplified and improved implementation of useControlledState.
 *
 * @param props
 * @param props.defaultValue
 * @param props.value
 * @param props.onChange
 * @return The controlled value and the value setter.
 */
export declare function useControlledValue<T>({ defaultValue, onChange, value: valueProp, }: Props<T>): readonly [T | undefined, import("react").Dispatch<import("react").SetStateAction<T | undefined>>];
export {};
//# sourceMappingURL=use-controlled-value.d.ts.map
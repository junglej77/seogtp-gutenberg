import type { AutocompleteProps, UseAutocompleteProps } from './types';
export declare function useAutocomplete({ record, onChange, onReplace, completers, contentRef, }: UseAutocompleteProps): {
    listBoxId: string | undefined;
    activeId: string | null;
    onKeyDown: (event: KeyboardEvent) => void;
    popover: false | import("react").JSX.Element | null;
};
export declare function useAutocompleteProps(options: UseAutocompleteProps): {
    ref: (instance: HTMLElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES];
    children?: undefined;
    'aria-autocomplete'?: undefined;
    'aria-owns'?: undefined;
    'aria-activedescendant'?: undefined;
} | {
    ref: (instance: HTMLElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES];
    children: false | import("react").JSX.Element | null;
    'aria-autocomplete': string | undefined;
    'aria-owns': string | undefined;
    'aria-activedescendant': string | null;
};
export default function Autocomplete({ children, isSelected, ...options }: AutocompleteProps): import("react").JSX.Element;
//# sourceMappingURL=index.d.ts.map
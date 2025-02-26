export function toDom({ value, prepareEditableTree, isEditableTree, placeholder, doc, }: {
    value: any;
    prepareEditableTree: any;
    isEditableTree?: boolean | undefined;
    placeholder: any;
    doc?: Document | undefined;
}): {
    body: any;
    selection: {
        startPath: any[];
        endPath: any[];
    };
};
/**
 * Create an `Element` tree from a Rich Text value and applies the difference to
 * the `Element` tree contained by `current`.
 *
 * @param {Object}        $1                       Named arguments.
 * @param {RichTextValue} $1.value                 Value to apply.
 * @param {HTMLElement}   $1.current               The live root node to apply the element tree to.
 * @param {Function}      [$1.prepareEditableTree] Function to filter editorable formats.
 * @param {boolean}       [$1.__unstableDomOnly]   Only apply elements, no selection.
 * @param {string}        [$1.placeholder]         Placeholder text.
 */
export function apply({ value, current, prepareEditableTree, __unstableDomOnly, placeholder, }: {
    value: RichTextValue;
    current: HTMLElement;
    prepareEditableTree?: Function | undefined;
    __unstableDomOnly?: boolean | undefined;
    placeholder?: string | undefined;
}): void;
export function applyValue(future: any, current: any): void;
export function applySelection({ startPath, endPath }: {
    startPath: any;
    endPath: any;
}, current: any): void;
export type RichTextValue = import("./types").RichTextValue;
//# sourceMappingURL=to-dom.d.ts.map